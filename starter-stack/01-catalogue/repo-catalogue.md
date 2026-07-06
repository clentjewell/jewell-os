# Repo catalogue — human view

`repo-catalogue.yml` in this folder is the authoritative, machine-readable source of truth.
`update-catalogue.sh` and `clone-third-party-tools.sh` (in `03-scripts/`) read the YAML, not this
file. This Markdown table exists so a person can scan the catalogue without opening YAML.

Reviewed July 2026. All 25 entries checked active, none archived. Statuses: **adopt-now** (10),
**template-only** (7), **park** (8), **reject** (0 — see `rejected.md`).

If this table and the YAML ever disagree, the YAML is right — raise it so the drift gets fixed.

---

## core-ai-workflow

| Name | Status | Purpose | Use as | Licence | Install by default |
| --- | --- | --- | --- | --- | --- |
| [anthropics/skills](https://github.com/anthropics/skills) | adopt-now | Official reference implementations/templates for Claude Code skills | reference | MIT | false |
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | adopt-now | GitHub Action running Claude Code in CI/CD | action | MIT | false |
| [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) | adopt-now | MCP server for Cloudflare account operations | MCP server | Apache-2.0 | false |
| [github/github-mcp-server](https://github.com/github/github-mcp-server) | adopt-now | Official MCP server for GitHub operations | MCP server | MIT | false |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | template-only | Browser-driving MCP server for automated QA | MCP server | Apache-2.0 | false |
| [ccusage/ccusage](https://github.com/ccusage/ccusage) | template-only | CLI reporting Claude Code token usage/cost | CLI | MIT | false |
| [ViperJuice/pmcp](https://github.com/ViperJuice/pmcp) | park | MCP gateway for progressive disclosure across servers | MCP server | MIT | false |

## security-ci

| Name | Status | Purpose | Use as | Licence | Install by default |
| --- | --- | --- | --- | --- | --- |
| [gitleaks/gitleaks](https://github.com/gitleaks/gitleaks) | adopt-now | Secret scanning in git history/diffs | action | MIT | **true** |
| [trufflesecurity/trufflehog](https://github.com/trufflesecurity/trufflehog) | adopt-now | Deep secret scanning with live credential verification | action | AGPL-3.0 | false |
| [zizmorcore/zizmor](https://github.com/zizmorcore/zizmor) | adopt-now | Static analysis of GitHub Actions workflows | action | MIT | false |
| [actions/dependency-review-action](https://github.com/actions/dependency-review-action) | adopt-now | Flags vulnerable/incompatible new dependencies on a PR | action | MIT | **true** |
| [ossf/scorecard](https://github.com/ossf/scorecard) | adopt-now | Supply-chain security posture scorecard | action | Apache-2.0 | false |
| [semgrep/semgrep](https://github.com/semgrep/semgrep) | template-only | Static analysis engine, many languages | action | LGPL-2.1 | false |
| [step-security/harden-runner](https://github.com/step-security/harden-runner) | template-only | Runner egress monitoring/restriction | template | Apache-2.0 | false |
| [github/safe-settings](https://github.com/github/safe-settings) | park | Policy-as-code for GitHub org/repo settings | template | ISC | false |
| [renovatebot/renovate](https://github.com/renovatebot/renovate) | park | Automated dependency-update bot | action | AGPL-3.0-only | false |

## evals

| Name | Status | Purpose | Use as | Licence | Install by default |
| --- | --- | --- | --- | --- | --- |
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | adopt-now | Eval/red-team CLI for LLM prompts and outputs | CLI | MIT | false |

## context-intelligence

| Name | Status | Purpose | Use as | Licence | Install by default |
| --- | --- | --- | --- | --- | --- |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | template-only | Reference catalogue of example MCP servers | reference | MIT | false |
| [yamadashy/repomix](https://github.com/yamadashy/repomix) | template-only | Packs a repo into a single AI-friendly context file | CLI | MIT | false |
| [upstash/context7](https://github.com/upstash/context7) | template-only | MCP server serving up-to-date library docs | MCP server | MIT | false |
| [oraios/serena](https://github.com/oraios/serena) | park | Semantic, symbol-level code-understanding MCP server | MCP server | MIT | false |

## memory-orchestration

| Name | Status | Purpose | Use as | Licence | Install by default |
| --- | --- | --- | --- | --- | --- |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | park | Compresses/persists Claude Code session history | CLI | Apache-2.0 | false |
| [getzep/graphiti](https://github.com/getzep/graphiti) | park | Temporal knowledge-graph library for agent memory | reference | Apache-2.0 | false |
| [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) | park | Task-breakdown/orchestration CLI for AI coding agents | CLI | MIT + Commons Clause | false |
| [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) | park | Terminal UI for managing concurrent Claude Code sessions | CLI | AGPL-3.0 | false |

---

See also: `adopt-now.md`, `template-only.md`, `parked.md`, `rejected.md` in this same folder for
the fuller per-status write-ups (why we care, security notes, token-usage notes, and how to switch
each one on or the condition that would un-park it).
