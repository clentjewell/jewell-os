# jewell-os

The private home of the Jewell × Maxxim operating playbook. This repo is authoritative for
operating rules, AI instructions, skills, evals, governance, cadence and templates. It is not a
file store. Files, client work and finance records live in Google Drive.

## Start here

- **[OPERATING-SYSTEM.md](./OPERATING-SYSTEM.md)** — the canonical operating manual, Sections
  1 to 20. Read this first.
- **[PLATFORM-OPERATING-SYSTEM.md](./PLATFORM-OPERATING-SYSTEM.md)** — the execution layer: tech
  stack roles, the Drive↔GitHub model, Sam (OpenClaw) shared-memory integration, a real Slack
  setup audit, and end-to-end workflows.
- **[FABLE-BUILD-PROMPT.md](./FABLE-BUILD-PROMPT.md)** — the pasteable prompt for building and
  optimising this system with Fable (`claude-fable-5`) in the Jewell Teams account.
- **[ROADMAP.md](./ROADMAP.md)** — the phased build and the immediate next actions.
- **[AGENTS.md](./AGENTS.md)** — the portable AI operating instructions. Every model reads this.
- **[CLAUDE.md](./CLAUDE.md)** — light Claude-specific notes, secondary to `AGENTS.md`.
- **[starter-stack/](./starter-stack/)** — the reusable Claude starter kit (catalogue, security,
  evals, skills, MCP, scripts) for applying this setup to Jewell, Maxxim and future repos.

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

| Path | Holds | Status |
| --- | --- | --- |
| `00-governance/` | Constitution, roles and access, approval points, boundaries, source-of-truth map | Populated |
| `01-skills/` | Jewell-specific skill overrides; skills are canonical in `starter-stack/02-starter-packs/skills/` for now | Scaffold |
| `04-mcp/` | Connector and tool map, scopes, security posture | Seed table filled; completed at the Phase 1 audit |
| `05-evals/` | Eval system and golden questions | Populated (golden questions); CI gate parked |
| `06-memory/` | The memory layers and the decision log | Populated (decision log live; layer templates seeded) |
| `07-github-actions/` | CI: gitleaks, security review, checks | Scaffold — guardrails defined, workflows not yet applied |
| `08-templates/` | Templates: packs, briefs, Today door, case study | Scaffold — not yet built; content lives in OPERATING-SYSTEM.md §12 and §15 for now |
| `09-playbook/` | The 3D Process spine, Ask and portal behaviour | Scaffold — not yet built; content lives in OPERATING-SYSTEM.md §8 and §9 for now |
| `10-cadence/` | Daily to annual rhythm definitions | Scaffold — not yet built; content lives in OPERATING-SYSTEM.md §12 for now |

Numbering leaves gaps on purpose (`02` and `03` are deliberately reserved), so folders can be
added without renumbering.

## Status

Draft for approval. Nothing here changes a tool, file, permission or client commitment until
Clent signs it off.
