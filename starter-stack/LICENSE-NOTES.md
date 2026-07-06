# Licence notes

How this kit handles third-party licences. This is guidance for applying packs, not legal advice.
When a case is not covered below, record the concern in `01-catalogue/rejected.md` rather than
guessing.

## The general rule

- `01-catalogue/` records each tool's licence alongside its classification (adopt now, template
  only, watch, rejected).
- When a third-party repo is cloned via `03-scripts/clone-third-party-tools.sh`, its `LICENSE`
  file and any attribution headers are preserved as-is. Never strip, edit, or relicense them.
- Using a tool (running it as a CI action, a CLI, or a hosted service) is not the same as
  vendoring, forking, or embedding its source. This kit distinguishes the two throughout.

## Specific cases to know

- **trufflehog (AGPL-3.0)**, **renovate (AGPL-3.0)**, **claude-squad (AGPL-3.0)** — safe to use
  as a running tool or a CI action. Never vendor, fork, or embed the source into our own code or
  products. Using it as an external action is usage, not distribution.
- **claude-task-master (MIT + Commons Clause)** — usable internally. Cannot be sold, resold, or
  offered as part of a paid, hosted service to third parties. Treat this as a hard boundary for
  anything client-facing or commercialised.
- **semgrep (LGPL-2.1 OSS engine)** — the open-source scanning engine is LGPL-2.1. Its registry
  rules and its hosted (paid) tier carry their own separate terms. Read those terms before wiring
  up the hosted tier or pulling in registry rule packs at scale.

## When unsure

Do not guess. Record the tool, the licence as you understand it, and the specific concern in
`01-catalogue/rejected.md`, and flag it for Clent to review before it is used anywhere near a
target repo or a client-facing surface.

**Next:** check `01-catalogue/` before adopting or cloning any third-party tool.
