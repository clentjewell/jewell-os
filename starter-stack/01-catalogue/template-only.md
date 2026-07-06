# Template only

Seven tools worth knowing about and reaching for when a specific need arises, but not switched on
by default. Full metadata for each lives in `repo-catalogue.yml`.

---

## modelcontextprotocol/servers
**When to reach for it:** when building or evaluating a new MCP server and wanting a working
pattern to start from.
**Why not by default:** it is a monorepo of many unrelated example servers — adopting it wholesale
would mean auditing far more code than any one project needs. Pull the one relevant example instead.

## microsoft/playwright-mcp
**When to reach for it:** a project needs automated browser-based QA or UI verification driven by
Claude.
**Why not by default:** adds a browser runtime dependency and a live automation surface (it can
visit arbitrary URLs); only worth the setup and sandboxing when a project actually has browser-QA
work.

## semgrep/semgrep
**When to reach for it:** a project wants deeper static-analysis coverage than zizmor/gitleaks give
(broader language support, custom rule authoring).
**Why not by default:** the registry rules and the hosted tier carry their own terms, and the local
CLI still needs rule curation per project — not a zero-config drop-in like gitleaks.

## step-security/harden-runner
**When to reach for it:** a workflow handles sensitive secrets or publishes artefacts, and the team
wants runner egress monitored/restricted.
**Why not by default:** most Jewell workflows are low-risk internal automation; the added
monitoring step is worth it only on the sensitive minority. Reviewed here as an example workflow.

## yamadashy/repomix
**When to reach for it:** a one-off need to hand an entire repo's context to a model or reviewer in
a single file.
**Why not by default:** deliberately token-heavy — using it routinely would bloat context for no
benefit over targeted file reads.

## upstash/context7
**When to reach for it:** working against a fast-moving library/framework where docs drift from
training data.
**Why not by default:** adds an external MCP dependency and a live network call per docs lookup;
only worth it when a specific library's freshness actually matters to the task.

## ccusage/ccusage
**When to reach for it:** checking Claude Code token usage/cost on demand, e.g. before a client
billing conversation.
**Why not by default:** a monitoring CLI to run when needed, not a service the agent needs running
continuously.

---

Clone any of these individually with `03-scripts/clone-third-party-tools.sh --group <context|mcp|security>`
(see each entry's `clone_group` in `repo-catalogue.yml`).
