# jewell-os

The private home of the Jewell × Maxxim operating playbook. This repo is authoritative for
operating rules, AI instructions, skills, evals, governance, cadence and templates. It is not a
file store. Files, client work and finance records live in Google Drive.

## Start here

- **[OPERATING-SYSTEM.md](./OPERATING-SYSTEM.md)** — the canonical operating manual, Sections
  1 to 20. Read this first.
- **[ROADMAP.md](./ROADMAP.md)** — the phased build and the immediate next actions.
- **[AGENTS.md](./AGENTS.md)** — the portable AI operating instructions. Every model reads this.
- **[CLAUDE.md](./CLAUDE.md)** — light Claude-specific notes, secondary to `AGENTS.md`.

## The one rule

AI proposes, a human decides. Nothing is auto-promoted, auto-deleted, auto-published or
auto-committed to a client. Ask before you send. Approve before publish.

## What lives where (authority split)

| GitHub `jewell-os` is authoritative for | Google Drive is authoritative for |
| --- | --- |
| Operating rules and governance | Files and client work |
| AI instructions (`AGENTS.md`, `CLAUDE.md`) | Finance records |
| Skills and reusable workflows | Meeting notes |
| Evals and golden questions | Approved client outputs |
| Cadence definitions and templates | Human-facing summaries of the rules |

A rule is written once here. Drive links to it or summarises it. It is never copied in full into
both.

## Map of this repo

| Path | Holds |
| --- | --- |
| `00-governance/` | Constitution, roles and access, approval points, boundaries, source-of-truth map |
| `01-skills/` | Reusable Claude skills and workflows |
| `04-mcp/` | Connector and tool map, scopes, security posture |
| `05-evals/` | Eval system and golden questions |
| `06-memory/` | The memory layers and the decision log |
| `07-github-actions/` | CI: gitleaks, security review, checks |
| `08-templates/` | Templates: packs, briefs, Today door, case study |
| `09-playbook/` | The 3D Process spine, Ask and portal behaviour |
| `10-cadence/` | Daily to annual rhythm definitions |

Numbering leaves gaps on purpose, so folders can be added without renumbering.

## Status

Draft for approval. Nothing here changes a tool, file, permission or client commitment until
Clent signs it off.
