# Starter stack

A reusable, portable AI-agent starter kit for the Jewell × Maxxim operating system. This is a
starter kit, not a production app. It exists so that Jewell, Maxxim, and future repos can adopt
the same baseline for AI agents, security, evals, skills and MCP without re-inventing it each
time.

Governance is set once, in the canonical manual, and is not restated in full here. AI proposes,
a human decides. Ask before you send. Approve before publish. One source of truth per object.
Least privilege. Secrets never enter prompts, docs, Slack, Asana or GitHub. See the manual at
[`../OPERATING-SYSTEM.md`](../OPERATING-SYSTEM.md) and the canonical instructions at
[`../AGENTS.md`](../AGENTS.md).

## What is in here

| Folder | What it holds |
| --- | --- |
| `00-governance` | Policy files the packs point back to (for example the security review policy). |
| `01-catalogue` | A classified list of third-party AI/dev tools: adopt now, template only, watch, rejected. |
| `02-starter-packs` | Self-contained packs a target repo can adopt: `base-claude-code`, `security`, `evals`, `skills`, `mcp`, `memory`, `operating-rhythm`. |
| `03-scripts` | Small scripts that apply a pack to a target repo, or clone a third-party tool on demand. |
| `04-third-party` | Tracked reference notes about third-party tools (licence, source, cadence). Not the tools' code. |
| `05-examples` | Worked examples of packs in use. |
| `06-docs` | Supporting documentation for the kit itself. |

## How to use this kit in a Claude Cloud session

Read in this order, and stop there. Do not read the whole kit up front.

1. This file (`README.md`).
2. [`AGENTS.md`](./AGENTS.md) — the rules for any agent working in this kit.
3. [`01-catalogue/adopt-now.md`](./01-catalogue/adopt-now.md) — what is already cleared to use.
4. The `README.md` of the one pack you actually need. Nothing else.

This order keeps context small and keeps you out of packs and tools that are not relevant to the
task in front of you.

## How to apply a pack to a target repo

Use the apply script rather than copying files by hand, and always dry-run first:

```
03-scripts/apply-to-target-repo.sh --dry-run --pack base --target ../path/to/target-repo
```

Read the diff it proposes. Only then re-run without `--dry-run` to write the files.

## How third-party repos are handled

Third-party tool source code is never committed into this kit. When a tool's actual source is
needed (to inspect it, test it, or extract a template), clone it on demand:

```
03-scripts/clone-third-party-tools.sh <group>
```

This clones into `.vendor/`, which is git-ignored and disposable. `04-third-party/` holds our own
notes about a tool (what it is, its licence, its cadence) — never the tool's code.

### Why we do not vendor everything

- Licence risk. Vendoring or forking an AGPL or source-available tool can trigger obligations we
  do not want on our own IP. See [`LICENSE-NOTES.md`](./LICENSE-NOTES.md).
- Token and repo weight. A vendored copy of every tool we might use would bloat every clone and
  every context window, for tools most sessions never touch.
- Drift. A vendored copy goes stale the moment the upstream project ships a fix. Cloning on
  demand always gets the current version.

## How to update the catalogue

Add or edit an entry in `01-catalogue/` (the relevant class file, plus `adopt-now.md` or
`rejected.md` as the tool's status changes). Record the licence and the reasoning. Do not move a
tool to `adopt-now.md` on your own judgement if it touches secrets, cost, or a new external
service — propose it and let Clent approve the move.

## Keeping token usage low

- Load the smallest relevant pack, not the whole kit.
- Never load `.vendor/` into context. It is cloned tool source, not something to read wholesale.
- Prefer a pack's `README.md` over its source files until you know you need the source.
- Use `--dry-run` output to decide what to read next, rather than reading every file in a pack.

## Use across repos

This kit is written to be adopted by Jewell, by Maxxim, and by any future repo. Nothing in here
is specific to one client or one codebase. Client data must never enter this kit or any pack
copied from it.

## Security warnings

- Never place a secret value in a file in this kit, in a prompt, or in a pack you apply to a
  target repo.
- Apply the principle of least privilege to every permission, token or scope a pack proposes.
- Always `--dry-run` before applying a pack. Read the proposed diff before writing it.
- Any workflow or config marked `PLACEHOLDER` needs a human to set the real value before it runs.

## Recommended adoption order

1. `base-claude-code` — AGENTS.md-first portability, thin CLAUDE.md, safe defaults.
2. `security` — secret scanning, dependency review, review enforcement.
3. `evals` — golden questions that prove the system behaves.
4. `skills` — reusable Claude skills for recurring work.
5. `mcp` — MCP server configuration and access patterns.

**Next:** read [`AGENTS.md`](./AGENTS.md), then `01-catalogue/adopt-now.md`, then start with the
`base-claude-code` pack on your target repo, `--dry-run` first.
