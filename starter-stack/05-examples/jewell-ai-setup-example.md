# Worked example: setting up jewell-ai

Applying `base-claude-code`, `security` and `evals` to the `jewell-ai` repo. Placeholder output
below; run the real scripts against the real repo before treating any of this as done. See
`../README.md` for how to apply a pack, and `../02-starter-packs/` for the packs themselves.

## Why these three packs, in this order

`jewell-ai` is a working product repo with real commits and existing structure, so it needs the
baseline in the order that reduces risk first: portable AI instructions and safe defaults, then a
security floor, then the evals that prove behaviour once there is something to test.

## Step 1: dry run

```
03-scripts/apply-to-target-repo.sh --dry-run --pack base --target ../jewell-ai
```

**What the dry run shows (illustrative):**

```
[dry-run] base-claude-code → ../jewell-ai

Would create:
  AGENTS.md
  CLAUDE.md
  .claude/settings.json

Would flag for review (target already has a file at this path):
  README.md  →  writes README.md.new instead, no overwrite

No files written. Re-run without --dry-run to apply.
```

The dry run never overwrites an existing file. Where the target already has a file at the same
path, it writes a `.new` file next to it so the two can be compared and merged by hand.

## Step 2: review and apply `base-claude-code`

Read the proposed `AGENTS.md` and `CLAUDE.md` against anything `jewell-ai` already has. If a
`.new` file was produced, merge it manually; do not simply overwrite. Once reviewed, re-run
without `--dry-run` to write the files.

## Step 3: dry run and apply `security`

```
03-scripts/apply-to-target-repo.sh --dry-run --pack security --target ../jewell-ai
```

**What gets copied:**

- The adopt-now workflows from `02-starter-packs/security/workflows/` (gitleaks, dependency
  review, and the others marked adopt-now in that pack's `README.md`) into
  `.github/workflows/`.
- `CODEOWNERS`, `pull_request_template.md` and the issue template from
  `02-starter-packs/security/templates/` into `.github/`.

**What needs Clent's sign-off before it goes live:**

- Every `PLACEHOLDER` value in a copied workflow (org name, owner handle, any token reference).
- Enabling branch protection on `jewell-ai`'s default branch. This is a manual GitHub setting
  change, not something a script applies, and it needs Clent's sign-off per
  `OPERATING-SYSTEM.md` Section 11.
- CODEOWNERS entries naming the actual reviewers.

## Step 4: dry run and apply `evals`

```
03-scripts/apply-to-target-repo.sh --dry-run --pack evals --target ../jewell-ai
```

Copies the `promptfoo` example config and the golden-test-question files. Evals only produce a
useful result once wired to a real `jewell-ai` endpoint or surface; until then, treat the copied
files as a template to adapt, not a running check.

## Next manual steps (not scripted, need a human)

1. Merge any `.new` files produced by the dry runs.
2. Replace every `PLACEHOLDER` value.
3. Ask Clent to enable branch protection on `jewell-ai`.
4. Ask Clent to confirm the CODEOWNERS list.
5. Wire the evals config to a real `jewell-ai` endpoint, then run `promptfoo eval` and read the
   result against `02-starter-packs/evals/README.md`.
6. Run `03-scripts/check-target-repo.sh --target ../jewell-ai` to confirm the applied state
   matches what was intended.

**Next:** see `cloud-session-usage-example.md` for what this looks like end to end inside a
Claude Cloud session.
