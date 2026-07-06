# AGENTS.md — starter stack

Instructions for any AI agent working inside this kit. The canonical operating instructions for
the whole Jewell × Maxxim system are [`../AGENTS.md`](../AGENTS.md). When they conflict, that
file wins. This file adds the rules specific to working in a reusable starter kit.

## What this is

A starter kit, not a production app. Everything here is a template, a reference, or a script
meant to be applied to a target repo. Do not treat any file here as live production
configuration.

## Rules

- Do not load `.vendor/` into context unless the task explicitly needs a cloned tool's source.
  It is disposable and git-ignored; treat it as out of scope by default.
- Do not copy third-party code into a target repo unless the licence is confirmed safe for that
  use and Clent has explicitly approved it. Check `01-catalogue/` first.
- Preserve every licence file and header when cloning, copying, or adapting a third-party tool.
  Never strip attribution.
- Never touch a secret. Do not read, print, generate, or place a credential, token or key in any
  file, prompt, commit, issue, or chat surface.
- Prefer a template or a reference note over vendoring. Only clone actual source when the task
  needs it, and only into `.vendor/`.
- Use `--dry-run` before applying any pack to a target repo with
  `03-scripts/apply-to-target-repo.sh`. Read the proposed diff before writing anything for real.
- Classify a tool against `01-catalogue/` before adopting it. If it is not listed, propose an
  entry rather than using it unclassified.
- Prioritise security and token efficiency over completeness. Load the smallest relevant pack.
  Do not read the whole kit to answer a narrow question.
- Keep every change small and reviewable. One pack, one target repo, one diff at a time.
- When unsure, stop and ask, per the one rule in `../AGENTS.md`: AI proposes, a human decides.

**Next:** read the canonical instructions at [`../AGENTS.md`](../AGENTS.md), then the top-level
[`README.md`](./README.md) for how the kit is organised.
