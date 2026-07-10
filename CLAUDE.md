# CLAUDE.md

Light, Claude-specific notes. Secondary to [AGENTS.md](./AGENTS.md). When they conflict,
`AGENTS.md` wins. Keep this file short.

## Pointers

- Canonical instructions: `AGENTS.md`.
- Full manual: `OPERATING-SYSTEM.md`.
- Governance: `00-governance/`.

## Claude Code notes

- Work only in the repos you are scoped to. Do not reach outside them.
- Use branch protection and open a draft PR; never push to `main` directly.
- Run the security review and gitleaks in the loop for any change.
- Never commit a secret. If you find one committed, stop and escalate.
- Prefer the smallest change that helps. Pilot, then keep only what is used.

## Voice

British English. Short, plain sentences. No exclamation marks. Numerals for metrics. Use
`3D Process` on first prominent use. End a flow on "Next".

## Model routing

The standing orchestration rule lives in `AGENTS.md`: Fable (or Opus when Fable is unavailable)
orchestrates and reviews; execution is delegated to the lightest model that meets the standard.
Keep quality consistent across models; the evals in `05-evals` confirm it.

- Orchestrate high, execute low: Fable (or Opus when Fable is unavailable) coordinates; Opus,
  Sonnet or Haiku do the heavy lifting, picked per task complexity.
- No outcome compromise: the orchestrator owns final quality regardless of which model executed.
- Always verify and fix: every build ends with a check-and-fix pass before it is declared done.
