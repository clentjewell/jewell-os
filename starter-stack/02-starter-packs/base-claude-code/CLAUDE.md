# CLAUDE.md — PLACEHOLDER-repo-name

Light, Claude-specific notes. Secondary to [`AGENTS.md`](./AGENTS.md). When they conflict,
`AGENTS.md` wins. Keep this file short.

This is a template. Replace every `PLACEHOLDER` and delete this paragraph once done.

## Pointers

- Canonical instructions: `AGENTS.md`.
- PLACEHOLDER — link to the full manual or governance folder for this repo, if one exists.

## Claude Code notes

- Work only in this repo. Do not reach outside it.
- Use branch protection and open a draft pull request; never push to `main` (or PLACEHOLDER —
  the repo's protected branch) directly.
- Never commit a secret. If you find one already committed, stop and escalate — do not try to
  remove it yourself without human sign-off.
- Prefer the smallest change that helps. Pilot, then keep only what is used.

## Voice

PLACEHOLDER — repeat or link to the voice rules from `AGENTS.md`.

**Next:** see `AGENTS.md` for the full rules.

## Orchestration

The standing rule from `jewell-os/AGENTS.md` applies: the strongest available model (Fable, or
Opus when Fable is unavailable) orchestrates and reviews; execution is delegated to the lightest
model that meets the standard. Token efficiency never outranks the outcome.
