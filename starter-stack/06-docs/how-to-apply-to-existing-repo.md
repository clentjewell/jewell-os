# How to apply this kit to an existing repo

Step-by-step for applying one or more packs to a target repo that already exists. See
`../05-examples/` for three worked examples of this procedure end to end.

## Step 1: check the target repo first

```
03-scripts/check-target-repo.sh --target ../path/to/target-repo
```

Run this before proposing any change, so you know what the target already has: an existing
`AGENTS.md` or `CLAUDE.md`, existing workflows, existing CODEOWNERS. Do not assume the target is
empty.

## Step 2: dry run every pack you apply

```
03-scripts/apply-to-target-repo.sh --dry-run --pack <pack-name> --target ../path/to/target-repo
```

Read the proposed diff. Never skip straight to applying.

## Step 3: resolve conflicts

Where the target already has a file at the same path, the dry run does not overwrite it. It
writes a `.new` file alongside the original (for example `README.md.new`) so the two can be
compared and merged by hand. Resolve every `.new` file before moving on; do not leave a `.new`
file sitting unresolved in the target repo.

## Step 4: apply

Once the dry-run diff and any `.new` files are reviewed and resolved, re-run without `--dry-run`:

```
03-scripts/apply-to-target-repo.sh --pack <pack-name> --target ../path/to/target-repo
```

## Step 5: enable branch protection (manual, Clent)

Branch protection is a GitHub settings change, not something a script applies. Once the security
pack is applied, ask Clent to enable branch protection on the target repo's default branch,
matching `../02-starter-packs/security/repo-security-baseline.md`. This step is never automated
and never applied without Clent's sign-off, per `OPERATING-SYSTEM.md` Section 11.

## Step 6: verify

```
03-scripts/check-target-repo.sh --target ../path/to/target-repo
```

Confirm the applied state matches what was intended: files present, no `PLACEHOLDER` values
remaining in anything meant to run, and any manual steps (branch protection, GitHub Advanced
Security, code-scanning) named explicitly rather than assumed done.

**Next:** if the pack applied was `security`, read `security-first-setup.md` for the full order
of operations a new or hardened repo should end up matching.
