# Repo security baseline

The checklist a target repo must meet before it is scaled or trusted with real work. Reference
the manual at `../../../OPERATING-SYSTEM.md`, Section 11 (Security-first setup), and the pack
policy at `../../00-governance/security-review-policy.md`. This is a starter-kit checklist, not a
production sign-off on its own.

Governance in short: least privilege, ask before you send, approve before publish, human sign-off
before any permission, credential, scope or auth change. Secrets never touch prompts, docs, Slack,
Asana or GitHub.

## Checklist

Sign-off column: "Clent" means the item cannot be marked done without Clent's approval, because it
changes a permission, credential, scope, access or paid feature.

| # | Item | Sign-off |
| --- | --- | --- |
| 1 | Branch protection on `main` (or the default branch) | Clent |
| 2 | PR review required before merge | Clent |
| 3 | Secret scanning on (GitHub secret scanning enabled) | Clent |
| 4 | gitleaks running in CI on push and PR | Operator (Ronnie) |
| 5 | No secrets in history (full-history scan clean) | Operator (Ronnie) |
| 6 | Least-privilege collaborators (only who needs access, at the level they need) | Clent |
| 7 | CODEOWNERS present and enforced on CI, agent files and governance | Clent |
| 8 | Dependency review on for pull requests | Operator (Ronnie) |
| 9 | `.gitignore` excludes `.env` and secret files | Operator (Ronnie) |
| 10 | GitHub Actions pinned (major tag now; full SHA for production) | Operator (Ronnie) |

## Notes

- Items 1, 2, 3, 6 and 7 change access or repo settings, so they need Clent's sign-off. Do not
  enable them on your own.
- Items 4, 5, 8, 9 and 10 are build-and-config work the operator can prepare and propose, with the
  change itself merged through a reviewed PR.
- If item 5 finds a secret in history, stop and escalate. Do not print or copy the value. Rotate
  the exposed credential — a rotation is a credential change and needs human sign-off.

**Next:** walk this list with Clent, mark each item, and only scale the repo once every item is
either met or has an owned, dated plan to meet it.
