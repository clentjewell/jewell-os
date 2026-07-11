# registry-sync

Keeps the Asana project "Jewell — Project Registry" (project GID 1216470239751419) current
without a human cutting and pasting status. Each Asana task represents one project.

## What it does

Nightly, and on demand, `sync.mjs` reads `09-playbook/registry.json`. For each entry with a
repo, it checks the repo's default branch, last push date and latest commit on GitHub, then
writes a status block into the matching Asana task's notes, between the markers
`--- AUTO STATUS ---` and `--- END AUTO STATUS ---`. Text outside the markers is never touched.
The task is only written to when the block content has actually changed, so there is no nightly
churn on quiet projects.

Schedule: 16:00 UTC (02:00 AEST). Also runs on `workflow_dispatch`.

## Secrets to add

Add both as repository secrets (Settings → Secrets and variables → Actions):

- `ASANA_TOKEN` — an Asana personal access token, scoped to the account that owns the Project
  Registry.
- `REGISTRY_GH_TOKEN` — a fine-grained GitHub PAT, read-only, metadata and contents, scoped to
  the `clentjewell` repos listed in `registry.json`.

Neither token is ever printed by the script. Passwords never go into Asana or this repo — not
in task notes, not in `registry.json`, not in a workflow file.

## Run manually

GitHub → Actions → `registry-sync` → Run workflow (`workflow_dispatch`). Or locally:

```
REGISTRY_GH_TOKEN=... ASANA_TOKEN=... node 07-github-actions/registry-sync/sync.mjs
```

## Add a registry entry

Edit `09-playbook/registry.json` and add an object with:

- `name` — short project name.
- `asana_task_gid` — the Asana task's GID, as a string.
- `repo` — `"owner/repo"`, or `null` if there is no linked repo.
- `visual_url` — the live or preview URL to show, or `null`.
- `extra_urls` — optional object of `{ "label": "url" }` pairs.
- `status_note` — a short numerals-first note, or `""` if none.

No code change is needed for a new entry; the next run picks it up.

## Boundaries

- The script only reads GitHub repo and commit metadata, and only reads and writes the notes
  field of the Asana tasks named in the registry.
- It never touches text outside the AUTO STATUS markers.
- It exits non-zero only on a systemic auth failure (a bad token). A single unreachable repo or
  task is logged and does not fail the run.
