# Base Claude Code pack

The starting baseline for any repo that wants an AI agent working in it safely. Part of the
Jewell × Maxxim starter stack. This is a starter kit, not a production app.

Governance is set elsewhere and is not re-explained here. AI proposes, a human decides. Ask
before you send. Approve before publish. Least privilege. Secrets never touch prompts, docs,
Slack, Asana or GitHub. See the manual at `../../../OPERATING-SYSTEM.md` and the canonical
instructions at `../../../AGENTS.md`.

## What this pack gives a new repo

- **`AGENTS.md`-first portability.** A template canonical instruction file that any AI tool can
  read (Claude, ChatGPT, future models), so the repo's rules are not locked to one vendor.
- **A thin `CLAUDE.md`.** Points to `AGENTS.md` rather than repeating it, so the two files never
  drift apart.
- **A settings example.** `.claude/settings.example.json` shows a least-privilege permissions
  baseline: an allowlist for read-only tools, a deny list for dangerous patterns, and a
  placeholder env block.
- **A `.gitignore`.** The same exclusion set used across this kit, so secrets and vendor
  directories never land in the target repo by accident.

## How to apply it

Prefer the apply script over copying by hand:

```
../../03-scripts/apply-to-target-repo.sh --dry-run --pack base --target ../path/to/target-repo
```

If applying by hand:

1. If the target repo has no `AGENTS.md`, copy this pack's `AGENTS.md` in as-is and fill in every
   `PLACEHOLDER`. If it already has one, copy this pack's version in as `AGENTS.md.new` next to
   it, so the repo owner can merge rather than lose existing rules.
2. Do the same for `CLAUDE.md` (copy straight in if missing, else `CLAUDE.md.new`).
3. Copy `.gitignore` in, merging with any existing file rather than overwriting it.
4. Copy `.claude/settings.example.json` in as `.claude/settings.example.json` (not
   `settings.json`). A human decides which permissions to turn on for the real file.

## What to customise per repo

- Every `PLACEHOLDER` value in `AGENTS.md`: the repo's own source-of-truth table, its people, and
  any repo-specific security rule.
- The permissions allowlist and env block in `.claude/settings.example.json` — scope it to what
  this specific repo's agent actually needs, nothing wider.
- The voice section, if the target repo is not Jewell- or Maxxim-branded.

**Next:** run the apply script with `--dry-run`, review the diff, then apply for real and fill in
every `PLACEHOLDER`.
