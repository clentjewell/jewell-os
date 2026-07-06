# Security-first setup

The condensed order of operations for putting a security baseline on a new repo. See
`../02-starter-packs/security/README.md` for the pack this draws on, and `OPERATING-SYSTEM.md`
Section 11 for the full security model.

## The order of operations

1. **Secrets sweep.** Before anything else, check the repo for any committed secret, key or
   credential. Never print or copy a found secret value; if one is found, stop and escalate to
   Clent rather than trying to fix it inline.
2. **`.gitignore`.** Confirm sensible ignores are in place (dependency directories, local env
   files, build output, and anywhere `.vendor/`-style disposable clones would land) before the
   next commit.
3. **Gitleaks workflow.** Apply `gitleaks.yml` from the security pack so every future push and
   pull request is scanned. This is the first automated guard, and it is adopt-now: no paid
   dependency, no credential required to start.
4. **Branch protection.** Manual, GitHub settings, not a script. Requires Clent's sign-off before
   it is enabled, per `OPERATING-SYSTEM.md` Section 11.
5. **CODEOWNERS.** Apply the template from the security pack and name real reviewers. An
   unresolved `PLACEHOLDER` owner is not a finished setup.
6. **Dependency review.** Apply `dependency-review.yml`. Note the caveat: a private repo needs
   GitHub Advanced Security enabled for this to have full effect.
7. **Scorecard (optional).** Apply `scorecard.yml` where the repo's ongoing life justifies it.
   Note the caveat: full value needs `id-token: write` and code-scanning enabled.
8. **Access review.** A read-only review of who has access to the repo today: collaborators,
   deploy keys, any connector or MCP server scoped to it. Findings go to a list; no access is
   changed without Clent's sign-off.

## What needs Clent's sign-off

- Enabling branch protection.
- Enabling GitHub Advanced Security, if the repo is private and needs it for dependency review.
- Any change to who has access, at any point in the sequence, not just at step 8.
- Any workflow left with a `PLACEHOLDER` token or secret reference, before it is enabled for real.

## What this order does not include

This is the condensed setup order, not the full ongoing cadence. See
`OPERATING-SYSTEM.md` Section 11 Part C for the weekly, monthly, quarterly and annual security
rhythm that continues after this setup is done, and
`../02-starter-packs/security/README.md` for the full workflow-by-workflow detail, including
which are adopt-now and which are template-only.

**Next:** once the order above is applied and verified with
`03-scripts/check-target-repo.sh`, move the repo into the normal weekly and monthly security
cadence rather than treating this as a one-off.
