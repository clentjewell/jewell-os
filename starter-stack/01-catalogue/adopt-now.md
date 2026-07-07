# Adopt now

Ten tools cleared for active use at Jewell. Full metadata for each lives in `repo-catalogue.yml`;
this file is the practical "what is it, how do we use it, how do we switch it on" reference.

---

## 1. anthropics/skills
**What:** Official reference implementations and templates for building Claude Code skills.
**How used:** reference — copy relevant SKILL.md patterns into Jewell's own skills pack rather than
depending on the repo directly.
**Switch on:** browse `.vendor/anthropics/skills/` (after cloning) and copy the closest
template into `02-starter-packs/skills/new-skill-template/`.

## 2. anthropics/claude-code-action
**What:** GitHub Action that runs Claude Code inside CI/CD workflows (PR review, issue triage,
automation).
**How used:** action, in `.github/workflows/`.
**Switch on:** add a workflow file that invokes `anthropics/claude-code-action@<pinned-sha>`; scope
its `GITHUB_TOKEN` permissions to the minimum the workflow needs.

## 3. cloudflare/mcp-server-cloudflare
**What:** MCP server exposing Cloudflare account operations (Workers, DNS, R2, KV) to Claude.
**How used:** MCP server, added via `claude mcp add` (or the client's MCP config) pointed at a
scoped Cloudflare API token.
**Switch on:** only when a project's infra actually sits on Cloudflare — register it in the
project's MCP config, not globally.

## 4. github/github-mcp-server
**What:** Official MCP server for GitHub — issues, PRs, actions, code search, repo management.
**How used:** MCP server, connected with a GitHub App install or PAT scoped to the repos Claude
needs.
**Switch on:** register in the session/project MCP config; keep the token scope to only the repos
in play.

## 5. promptfoo/promptfoo
**What:** CLI/framework for evaluating and red-teaming LLM prompts and outputs against test cases.
**How used:** CLI, run against golden test questions.
**Switch on:** copy `02-starter-packs/evals/promptfoo/promptfooconfig.example.yaml` and the
`golden-test-questions/` folder into a project, then run `promptfoo eval` in CI or locally.

## 6. gitleaks/gitleaks
**What:** Secret-scanning CLI/Action that detects hard-coded credentials in git history and diffs.
**How used:** action, on every push/PR. Install-by-default: **true**.
**Switch on:** copy `02-starter-packs/security/workflows/gitleaks.yml` into the target repo's
`.github/workflows/`.

## 7. trufflesecurity/trufflehog
**What:** Deep secret-scanning tool with credential verification against live services.
**How used:** action, run on a schedule (not every push, to control noise/cost) — AGPL-3.0 licence
means CI-action usage only, never vendor or embed its source.
**Switch on:** copy `02-starter-packs/security/workflows/trufflehog-quarterly.yml` into
`.github/workflows/` and adjust the cadence if needed.

## 8. zizmorcore/zizmor
**What:** Static analysis tool for GitHub Actions workflow files, flagging injection and permission
risks.
**How used:** action, run against `.github/workflows/` on every workflow change.
**Switch on:** copy `02-starter-packs/security/workflows/zizmor.yml` into `.github/workflows/`.

## 9. actions/dependency-review-action
**What:** GitHub Action that flags newly introduced vulnerable or licence-incompatible dependencies
on a PR.
**How used:** action, on pull requests. Install-by-default: **true**. Full vulnerability-database
features need GitHub Advanced Security on private repos.
**Switch on:** copy `02-starter-packs/security/workflows/dependency-review.yml` into
`.github/workflows/`.

## 10. ossf/scorecard
**What:** Action that scores a repo's supply-chain security posture (branch protection, pinned
dependencies, etc).
**How used:** action, run on a schedule and published to a badge/report.
**Switch on:** copy `02-starter-packs/security/workflows/scorecard.yml` into `.github/workflows/`.

---

Clone all ten in one pass with `03-scripts/clone-third-party-tools.sh adopt-now` (reads the
`clone_group: adopt-now` entries in `repo-catalogue.yml`).
