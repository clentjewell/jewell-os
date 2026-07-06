# 07-github-actions

Continuous integration and security automation for the repo. The security programme lives in
[OPERATING-SYSTEM.md, Section 11](../OPERATING-SYSTEM.md#section-11-security-first-setup).

## What belongs here

- Workflow files for gitleaks (secret scanning on every push and PR).
- A Claude Code security review step in the loop for changes.
- The eval suite run (`05-evals`) on any change to a prompt, source set or portal.
- Basic checks: lint, type, build where relevant.

## What must never be here

Secret values in plain text. Use the repo's encrypted secret store for any token a workflow
needs, and grant it the narrowest scope.

## The guardrails

- Branch protection on `main`: no direct pushes, PR review required, checks must pass.
- Gitleaks blocks a merge if a secret is detected.
- The eval suite blocks a merge on a leakage or hallucination.
- Security review runs before merge on changes to answering rules, source sets or access.

## To set up (Phase 4)

1. Enable secret scanning and branch protection in repo settings.
2. Add the gitleaks workflow.
3. Add the eval workflow once `05-evals` has runnable fixtures.
4. Add the security review step.

None of these change a permission or credential. They only guard the repo.
