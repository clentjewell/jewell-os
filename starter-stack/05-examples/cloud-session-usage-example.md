# Worked example: using the starter kit in a Claude Cloud session

A realistic, transcript-style walkthrough of an operator applying a pack from inside a Claude
Cloud session. Placeholder names and paths below. See `../06-docs/how-to-use-in-cloud-session.md`
for the general rules this example follows.

## The scenario

Ronnie opens a Claude Cloud session against the `jewell-os` repo, wanting to harden a target
repo's security baseline before a client build starts.

## Transcript

```
Ronnie: I need to get the security baseline onto the "acme-build" repo before we start.
        Use the starter kit.

Claude: I'll bootstrap the session against the starter kit first, so I load the smallest
        relevant context rather than the whole repo.

        Running: 03-scripts/bootstrap-cloud-session.sh

        [bootstrap-cloud-session.sh]
        Which mode? (security / skills / evals / mcp / full-review): security

        Loaded:
          - starter-stack/README.md
          - starter-stack/AGENTS.md
          - starter-stack/01-catalogue/adopt-now.md
          - starter-stack/02-starter-packs/security/README.md

        Not loaded (available on request): base-claude-code, evals, skills, mcp, memory,
        operating-rhythm, .vendor/

Claude: I've read the security pack's README. It has 5 adopt-now workflows (gitleaks,
        trufflehog-quarterly, zizmor, dependency-review, scorecard) and 2 template-only ones
        (semgrep, harden-runner-example). For a client build repo, the smallest sensible set is
        gitleaks only, per 05-examples/new-client-repo-example.md. Do you want the full
        adopt-now set instead, since this is going in ahead of a client build starting?

Ronnie: Full adopt-now set. It's a build repo but a bigger one, we want it locked down properly.

Claude: Running a dry run first.

        03-scripts/apply-to-target-repo.sh --dry-run --pack security --target ../acme-build

        [dry-run] security → ../acme-build

        Would create:
          .github/workflows/gitleaks.yml
          .github/workflows/trufflehog-quarterly.yml
          .github/workflows/zizmor.yml
          .github/workflows/dependency-review.yml
          .github/workflows/scorecard.yml
          .github/CODEOWNERS
          .github/pull_request_template.md
          .github/ISSUE_TEMPLATE/issue_template.md

        Flagged PLACEHOLDER values needing a real value before these run:
          - CODEOWNERS: PLACEHOLDER owner handle (2 lines)
          - scorecard.yml: PLACEHOLDER org name

        No files written. Re-run without --dry-run to apply.

Claude: This is a read-only preview, nothing has been written. The CODEOWNERS file and the
        scorecard workflow both need a real value before they'll do anything useful. Who should
        own review on acme-build?

Ronnie: Raef and me.

Claude: Applying now.

        03-scripts/apply-to-target-repo.sh --pack security --target ../acme-build

        Applied. 8 files written to ../acme-build.

        I've filled CODEOWNERS with Raef and Ronnie as owners, and left the scorecard org name
        as PLACEHOLDER — that one needs your GitHub org slug, which I don't have from here.

Ronnie: Org slug is "jewell-projects".

Claude: Updated. Verifying the applied state now.

        03-scripts/check-target-repo.sh --target ../acme-build

        [check-target-repo.sh]
        gitleaks.yml               present, no PLACEHOLDER remaining
        trufflehog-quarterly.yml   present, no PLACEHOLDER remaining
        zizmor.yml                 present, SARIF upload needs code-scanning enabled (manual)
        dependency-review.yml      present, private-repo dependency review needs GitHub
                                    Advanced Security (manual)
        scorecard.yml              present, no PLACEHOLDER remaining
        CODEOWNERS                 present, owners: Raef, Ronnie
        pull_request_template.md   present
        issue_template.md          present

        2 items need a manual GitHub settings change before they take full effect (noted above).
        No PLACEHOLDER values remain in committed files.

Claude: Applied and verified. Two things still need a manual GitHub setting, not a script:
        enabling code-scanning (for zizmor's SARIF upload) and confirming GitHub Advanced
        Security if acme-build is private (for the dependency-review workflow). Both are
        one-time settings changes, not something I should flip without Clent's sign-off if
        acme-build touches client-facing infrastructure. Do you want me to draft that request
        to Clent, or is this repo internal-only for now?

Ronnie: Internal only for now, that's fine. I'll take it from here on the GitHub settings.
```

## What this example demonstrates

- The session starts with `bootstrap-cloud-session.sh`, not by reading the whole kit.
- The operator chooses a mode ("security"), and only that pack's `README.md` loads.
- Every apply is preceded by `--dry-run`, and the dry-run output is read before applying.
- `PLACEHOLDER` values are surfaced explicitly and resolved with the operator, never guessed.
- The applied state is verified with `check-target-repo.sh` rather than assumed.
- Anything that needs a manual, human-only step (a GitHub settings change, a sign-off) is named
  as such rather than attempted by the agent.

**Next:** see `jewell-ai-setup-example.md` and `maxxim-setup-example.md` for the same pattern
against two other repo types, and `../06-docs/how-to-apply-to-existing-repo.md` for the general
procedure.
