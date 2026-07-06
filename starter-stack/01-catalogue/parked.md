# Parked

Eight tools reviewed and consciously not adopted yet. Each has a stated condition that would
prompt re-review. Full metadata for each lives in `repo-catalogue.yml`.

---

## oraios/serena
**What:** Semantic, symbol-level code-understanding MCP server.
**Un-park when:** a project's codebase is large/complex enough that file-based search is
noticeably slower or costlier than symbol-level navigation would be.

## github/safe-settings
**What:** Policy-as-code tool for enforcing consistent GitHub org/repo settings.
**Un-park when:** Jewell manages three or more repos under one GitHub org that need shared,
enforced settings (branch protection, required checks, etc).

## renovatebot/renovate
**What:** Automated dependency-update bot that opens PRs for outdated packages.
**Un-park when:** there are enough actively maintained repos that manual dependency bumps are
falling behind, and the team is ready to triage a steady stream of update PRs. Usage is fine under
AGPL-3.0-only; do not fork the project.

## ViperJuice/pmcp
**What:** MCP gateway managing progressive disclosure/routing across multiple MCP servers.
**Un-park when:** the number of MCP servers connected in a single session grows large enough that
tool-list size/token overhead becomes a real problem.

## thedotmack/claude-mem
**What:** Compresses and persists Claude Code session history into reusable memory.
**Un-park when:** a concrete workflow needs session continuity beyond a single conversation and
manual notes/CLAUDE.md updates are no longer enough.

## getzep/graphiti
**What:** Temporal knowledge-graph library for building an evolving memory layer for agents.
**Un-park when:** Jewell has a specific long-term-memory use case (e.g. tracking evolving client
relationships over time) that justifies standing up a graph database.

## eyaltoledano/claude-task-master
**What:** Task-breakdown and orchestration CLI for AI coding agents.
**Un-park when:** internal task-breakdown needs outgrow manual planning — noting the MIT + Commons
Clause licence means it can be used internally but never sold or hosted as a service.

## smtg-ai/claude-squad
**What:** Terminal UI for managing multiple concurrent Claude Code agent sessions.
**Un-park when:** a person is regularly running enough parallel Claude Code sessions that a
dedicated terminal UI would save real time. AGPL-3.0 — fine to run locally, do not fork/embed.

---

Clone any of these individually with `03-scripts/clone-third-party-tools.sh --group <mcp|security|memory>`
(see each entry's `clone_group` in `repo-catalogue.yml`).
