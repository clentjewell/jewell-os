# CLAUDE.md — starter stack

Light, Claude-specific notes. Secondary to [`AGENTS.md`](./AGENTS.md). When they conflict,
`AGENTS.md` wins.

## Pointers

- Rules for working in this kit: `AGENTS.md`.
- Canonical operating instructions: `../AGENTS.md`.
- Full manual: `../OPERATING-SYSTEM.md`.

## Working mode

Use the mode language: Observe, Plan, Draft, Execute, Audit. Stay in Observe or Plan until the
task is clear. Move to Draft to propose a change (for example a dry-run diff). Only move to
Execute once a human has reviewed the draft. Use Audit to check a change already applied.

## Claude Code notes

- Ask before any destructive change: deleting a file, overwriting a target repo's existing
  `AGENTS.md` or `CLAUDE.md`, or force-applying a pack without `--dry-run` first.
- Do not run `03-scripts/clone-third-party-tools.sh` for a full clone unless the task explicitly
  asks for it. A targeted, single-tool clone into `.vendor/` is preferred over a full run.
- Prefer the smallest relevant pack over the whole kit. Read one pack `README.md`, not several.

**Next:** see `AGENTS.md` for the full rules.
