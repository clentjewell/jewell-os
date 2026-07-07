# Security pack

Reusable CI security workflows and repo templates for a target repo. Part of the Jewell ×
Maxxim jewell-claude-stack starter kit. This is a starter kit, not a production app.

Governance is set elsewhere and is not re-explained here. AI proposes, a human decides. Ask
before you send. Approve before publish. Least privilege. Secrets never touch prompts, docs,
Slack, Asana or GitHub. Human sign-off before any permission, credential, scope or auth change.
See the manual at `../../../OPERATING-SYSTEM.md` (Section 11) and the pack policy at
`../../00-governance/security-review-policy.md`.

## What this pack is

A set of GitHub Actions workflows and `.github` templates that give a repo a security baseline:
secret scanning, workflow static analysis, dependency review, a posture score, and review
enforcement on the files that set the rules. Copy the parts you need into a target repo.

## How to apply it

1. Copy the workflows you want from `workflows/` into the target repo's `.github/workflows/`.
2. Copy the templates from `templates/` into the target repo's `.github/`:
   - `CODEOWNERS` → `.github/CODEOWNERS`
   - `pull_request_template.md` → `.github/pull_request_template.md`
   - `issue_template.md` → `.github/issue_template.md` (the apply script copies it flat)
3. Replace every value marked `PLACEHOLDER` (org name, owner handle, tokens, paths).
4. Read `repo-security-baseline.md` and meet it before scaling the repo.

Any workflow that needs a secret, a token or a paid feature is marked `PLACEHOLDER` in the file
and must be reviewed by Clent before it is enabled. Do not enable a paid or credentialed feature
on your own.

## Adopt-now vs Template-only

- **Adopt now:** gitleaks, trufflehog (quarterly), zizmor, dependency-review, scorecard. These
  run on open-source tooling with no paid dependency to start. Some features (SARIF upload,
  private-repo dependency review) need GitHub settings enabled first, noted per file.
- **Template-only:** semgrep, harden-runner-example. These are examples to adapt. semgrep's
  registry rules and hosted tier have their own terms. harden-runner is shown as a pattern, not
  switched on by default.

## Workflows at a glance

| Workflow | Tool | Licence | Cadence | Needs config? |
| --- | --- | --- | --- | --- |
| `gitleaks.yml` | gitleaks | MIT | push, PR | No (org licence key optional, PLACEHOLDER) |
| `trufflehog-quarterly.yml` | trufflehog | AGPL-3.0 (action use only) | quarterly + manual | No |
| `zizmor.yml` | zizmor | MIT | push, PR to workflows | Caveat: SARIF upload needs code-scanning |
| `dependency-review.yml` | dependency-review-action | MIT | PR | Caveat: private repos need GitHub Advanced Security |
| `scorecard.yml` | ossf/scorecard | Apache-2.0 | weekly + branch push | Caveat: `id-token: write` + code-scanning for full value |
| `semgrep.yml` | semgrep | LGPL-2.1 (OSS engine) | push, PR | Optional `SEMGREP_APP_TOKEN` (PLACEHOLDER); registry terms apply |
| `harden-runner-example.yml` | step-security/harden-runner | Apache-2.0 | example only | Example, not enabled |

Note on AGPL-3.0 (trufflehog): safe to invoke as a CI action, because that is usage, not
distribution. Never vendor or embed its source into our own code.

## Pinning

Every action is pinned to a major version tag (for example `@v4`). For production, pin to a full
commit SHA instead, so a moved tag cannot change what runs. This is noted in each file.

**Next:** copy the Adopt-now workflows into a target repo, replace the `PLACEHOLDER` values, then
walk `repo-security-baseline.md` with Clent.
