#!/usr/bin/env node
// registry-sync/sync.mjs
//
// Nightly Asana registry sync. Reads 09-playbook/registry.json, pulls the latest repo
// activity from GitHub for each entry that has one, and writes a status block into the
// matching Asana task's notes, between two markers, so no one has to cut and paste status
// by hand. Node 20+, no npm dependencies — uses the built-in fetch only.
//
// Env:
//   REGISTRY_GH_TOKEN  GitHub token, read-only metadata/contents access.
//   ASANA_TOKEN        Asana personal access token.
//   REGISTRY_PATH       Optional override for the registry file path (defaults to
//                        09-playbook/registry.json under the current working directory,
//                        which must be the repo root).
//
// Exit code: non-zero only on a systemic auth failure (a bad token affecting every call).
// A single repo or task being unreachable is logged and does not fail the run.

import { readFile } from "node:fs/promises";
import path from "node:path";

const START_MARKER = "--- AUTO STATUS ---";
const END_MARKER = "--- END AUTO STATUS ---";
const BLOCK_RE = /--- AUTO STATUS ---\n([\s\S]*?)\n--- END AUTO STATUS ---/;
const TIMESTAMP_RE = /\(updated [0-9-]+ by jewell-os registry sync\)/;
const TIMESTAMP_PLACEHOLDER = "(updated · by jewell-os registry sync)";

const GITHUB_API = "https://api.github.com";
const ASANA_API = "https://app.asana.com/api/1.0";

const registryPath =
  process.env.REGISTRY_PATH ||
  path.join(process.cwd(), "09-playbook", "registry.json");

const ghToken = process.env.REGISTRY_GH_TOKEN || "";
const asanaToken = process.env.ASANA_TOKEN || "";

let ghAuthFailed = false;
let asanaAuthFailed = false;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function toDate(iso) {
  return typeof iso === "string" && iso.length >= 10 ? iso.slice(0, 10) : "unknown";
}

async function loadRegistry() {
  const raw = await readFile(registryPath, "utf8");
  const entries = JSON.parse(raw);
  if (!Array.isArray(entries)) {
    throw new Error(`registry at ${registryPath} must be a JSON array`);
  }
  return entries;
}

// Fetch repo metadata and the latest commit on the default branch.
// Returns one of:
//   { ok: true, defaultBranch, pushedAt, archived, commitSubject, commitDate }
//   { ok: false, reason: "auth" | "not-found" | "forbidden" | "error", detail }
async function fetchGithubInfo(repo) {
  if (ghAuthFailed) {
    return { ok: false, reason: "auth", detail: "skipped after earlier auth failure" };
  }

  const headers = {
    Authorization: `Bearer ${ghToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "jewell-os-registry-sync",
  };

  try {
    const repoRes = await fetch(`${GITHUB_API}/repos/${repo}`, { headers });

    if (repoRes.status === 401) {
      ghAuthFailed = true;
      return { ok: false, reason: "auth", detail: "401 from GitHub — check REGISTRY_GH_TOKEN" };
    }
    if (repoRes.status === 404) {
      return { ok: false, reason: "not-found", detail: "404 repo not found or no access" };
    }
    if (repoRes.status === 403) {
      return { ok: false, reason: "forbidden", detail: "403 from GitHub (rate limit or permission)" };
    }
    if (!repoRes.ok) {
      return { ok: false, reason: "error", detail: `HTTP ${repoRes.status}` };
    }

    const repoData = await repoRes.json();
    const defaultBranch = repoData.default_branch;
    const pushedAt = repoData.pushed_at;
    const archived = Boolean(repoData.archived);

    const commitRes = await fetch(
      `${GITHUB_API}/repos/${repo}/commits/${encodeURIComponent(defaultBranch)}`,
      { headers }
    );

    if (commitRes.status === 401) {
      ghAuthFailed = true;
      return { ok: false, reason: "auth", detail: "401 from GitHub — check REGISTRY_GH_TOKEN" };
    }
    if (!commitRes.ok) {
      // Repo metadata worked but the commit lookup failed — still report what we have.
      return {
        ok: true,
        defaultBranch,
        pushedAt,
        archived,
        commitSubject: null,
        commitDate: null,
      };
    }

    const commitData = await commitRes.json();
    const message = commitData?.commit?.message || "";
    const commitSubject = message.split("\n")[0] || null;
    const commitDate =
      commitData?.commit?.author?.date || commitData?.commit?.committer?.date || null;

    return { ok: true, defaultBranch, pushedAt, archived, commitSubject, commitDate };
  } catch (err) {
    return { ok: false, reason: "error", detail: String(err?.message || err) };
  }
}

function buildStatusInner(entry, gh) {
  const lines = [`AUTO STATUS (updated ${today()} by jewell-os registry sync)`];

  if (entry.repo) {
    if (gh && gh.ok) {
      const archivedNote = gh.archived ? " | ARCHIVED" : "";
      lines.push(
        `Repo: ${entry.repo} | default ${gh.defaultBranch} | last push ${toDate(gh.pushedAt)}${archivedNote}`
      );
      if (gh.commitSubject) {
        lines.push(`Latest: ${gh.commitSubject} (${toDate(gh.commitDate)})`);
      } else {
        lines.push("Latest: unavailable");
      }
    } else {
      const reason = gh ? gh.reason : "error";
      lines.push(`Repo: ${entry.repo} | unreachable (${reason})`);
    }
  }

  if (entry.visual_url) {
    lines.push(`Visual: ${entry.visual_url}`);
  }

  if (entry.extra_urls && typeof entry.extra_urls === "object") {
    for (const [label, url] of Object.entries(entry.extra_urls)) {
      lines.push(`${label[0].toUpperCase()}${label.slice(1)}: ${url}`);
    }
  }

  if (entry.status_note) {
    lines.push(`Note: ${entry.status_note}`);
  }

  return lines.join("\n");
}

function normaliseForCompare(block) {
  return block.replace(TIMESTAMP_RE, TIMESTAMP_PLACEHOLDER).trim();
}

function mergeNotes(existingNotes, newInner) {
  const newBlock = `${START_MARKER}\n${newInner}\n${END_MARKER}`;
  const notes = existingNotes || "";
  const match = notes.match(BLOCK_RE);

  if (match) {
    return {
      notes: notes.replace(BLOCK_RE, newBlock),
      existingInner: match[1],
    };
  }

  const separator = notes.trim().length > 0 ? "\n\n" : "";
  return {
    notes: `${notes}${separator}${newBlock}`,
    existingInner: null,
  };
}

// Returns { ok: true, notes } or { ok: false, reason }
async function getAsanaNotes(gid) {
  if (asanaAuthFailed) {
    return { ok: false, reason: "auth" };
  }
  try {
    const res = await fetch(`${ASANA_API}/tasks/${gid}?opt_fields=notes`, {
      headers: { Authorization: `Bearer ${asanaToken}` },
    });
    if (res.status === 401) {
      asanaAuthFailed = true;
      return { ok: false, reason: "auth" };
    }
    if (!res.ok) {
      return { ok: false, reason: `http-${res.status}` };
    }
    const data = await res.json();
    return { ok: true, notes: data?.data?.notes || "" };
  } catch (err) {
    return { ok: false, reason: String(err?.message || err) };
  }
}

async function putAsanaNotes(gid, notes) {
  try {
    const res = await fetch(`${ASANA_API}/tasks/${gid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${asanaToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { notes } }),
    });
    if (res.status === 401) {
      asanaAuthFailed = true;
      return { ok: false, reason: "auth" };
    }
    if (!res.ok) {
      return { ok: false, reason: `http-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: String(err?.message || err) };
  }
}

async function processEntry(entry) {
  const name = entry.name || entry.asana_task_gid;

  if (!entry.asana_task_gid) {
    console.log(`${name} | skipped | no asana_task_gid`);
    return;
  }

  const gh = entry.repo ? await fetchGithubInfo(entry.repo) : null;
  const inner = buildStatusInner(entry, gh);

  const fetched = await getAsanaNotes(entry.asana_task_gid);
  if (!fetched.ok) {
    if (fetched.reason === "auth") {
      console.log(`${name} | skipped | Asana auth failed`);
    } else {
      console.log(`${name} | unreachable | Asana GET failed (${fetched.reason})`);
    }
    return;
  }

  const { notes: mergedNotes, existingInner } = mergeNotes(fetched.notes, inner);

  const changed =
    existingInner === null || normaliseForCompare(existingInner) !== normaliseForCompare(inner);

  if (!changed) {
    console.log(`${name} | unchanged`);
    return;
  }

  const put = await putAsanaNotes(entry.asana_task_gid, mergedNotes);
  if (!put.ok) {
    if (put.reason === "auth") {
      console.log(`${name} | skipped | Asana auth failed on write`);
    } else {
      console.log(`${name} | unreachable | Asana PUT failed (${put.reason})`);
    }
    return;
  }

  console.log(`${name} | updated`);
}

async function main() {
  if (!ghToken) {
    console.log("REGISTRY_GH_TOKEN is not set — GitHub lookups will be skipped as unreachable.");
  }
  if (!asanaToken) {
    console.error("ASANA_TOKEN is not set. Cannot write to Asana. Exiting.");
    process.exitCode = 1;
    return;
  }

  const entries = await loadRegistry();
  console.log(`Loaded ${entries.length} registry entries from ${registryPath}`);

  for (const entry of entries) {
    await processEntry(entry);
  }

  if (ghAuthFailed) {
    console.error("Systemic failure: GitHub auth failed (REGISTRY_GH_TOKEN invalid or expired).");
  }
  if (asanaAuthFailed) {
    console.error("Systemic failure: Asana auth failed (ASANA_TOKEN invalid or expired).");
  }
  if (ghAuthFailed || asanaAuthFailed) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`Registry sync failed: ${err?.message || err}`);
  process.exitCode = 1;
});
