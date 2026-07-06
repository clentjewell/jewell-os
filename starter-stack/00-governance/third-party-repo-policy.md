# Third-party repo policy

How this kit brings in third-party tools, in strict preference order. Full reasoning in
`../README.md` ("How third-party repos are handled") and `../LICENSE-NOTES.md`. This file is the
binding ladder every pack and script in this kit follows.

## The preference ladder

1. **References and catalogue entries** — first choice. Record what a tool is, its licence, and
   its classification in `../01-catalogue/`, without pulling in any of its code.
2. **Reusable templates** — a template or config adapted from a tool's documented pattern (for
   example a CI workflow), rewritten or copied minimally into `08-templates`-style locations.
3. **Install or bootstrap scripts** — a script in `../03-scripts/` that installs or configures a
   tool on demand, rather than vendoring its source.
4. **Git submodules** — used only where a tool genuinely needs to track upstream closely and a
   submodule is the least-friction way to do that.
5. **Shallow clone into `.vendor/`** — only when a session needs the actual tool source to inspect,
   test, or extract from, via `../03-scripts/clone-third-party-tools.sh`.
6. **Full vendoring** — the last resort, only when explicitly justified (a real, stated need) and
   confirmed licence-safe by Clent.

Always start at the top of the ladder. Move down only as far as the task genuinely requires.

## Rules that apply at every rung

- **`.vendor/` is never committed.** It is git-ignored and disposable, per `../.gitignore` and
  `../README.md`.
- **Licences are preserved.** Every `LICENSE` file and attribution header from a cloned or adapted
  tool stays intact. Never strip, edit, or relicense them.
- **AGPL is usage, not vendoring.** Tools under AGPL-3.0 (for example trufflehog) may be run as a
  CI action or CLI tool. Their source is never vendored, forked, or embedded into our own code or
  products. See `../LICENSE-NOTES.md`.
- **Commons Clause is a no-hosted-service rule.** A tool under a Commons-Clause-style licence (for
  example claude-task-master) may be used internally, but must never be sold, resold, or offered
  as part of a paid, hosted service to third parties.
- **Classification changes go through `../01-catalogue/` with Clent's approval.** No tool moves
  between adopt-now, template-only, watch, or rejected on judgement alone; the move is proposed,
  recorded, and approved.

**Next:** see `../01-catalogue/` before bringing in any third-party tool, at any rung of the
ladder.
