# Approved MCP servers

The register of MCP servers approved for use against Jewell and Maxxim repos. Add a server here
only after it is classified in `../../01-catalogue/` and approved by Clent. Scope columns marked
`PLACEHOLDER` are not yet filled in from a real access review — do not treat a placeholder as a
granted scope.

| Server | What it reaches | Scope granted | Read/write | Layer | Approval owner |
| --- | --- | --- | --- | --- | --- |
| `github/github-mcp-server` (MIT) | GitHub repos, issues, PRs, Actions | PLACEHOLDER (pending live review) — scope to named repos only | Read-only | Both | Clent |
| `cloudflare/mcp-server-cloudflare` (Apache-2.0) | Cloudflare account: Workers, KV/D1/R2, DNS, docs search | PLACEHOLDER (pending live review) — scoped API token, never Global API Key | Read-only | Maxxim | Clent |
| `microsoft/playwright-mcp` (Apache-2.0) | A browser session driving a built site or portal, template-only | PLACEHOLDER (pending live review) — no live credentials in scope | Read (browser QA, no production writes) | Both | Clent |
| Google Drive (claude.ai connector) | The connected Google Drive | PLACEHOLDER (pending live review) — fill from the access review | Read-only | Both | Clent |
| Google Calendar (claude.ai connector) | The connected Google Calendar | PLACEHOLDER (pending live review) — fill from the access review | Read-only | Both | Clent |
| Gmail (claude.ai connector) | The connected Gmail account | PLACEHOLDER (pending live review) — fill from the access review | Read-only | Jewell | Clent |
| Asana (claude.ai connector) | The connected Asana workspace | PLACEHOLDER (pending live review) — fill from the access review | Read-only | Both | Clent |
| Slack (claude.ai connector) | The connected Slack workspace | PLACEHOLDER (pending live review) — fill from the access review | Read/write (write gated) — recorded write need: daily Today door post, see `06-memory/decision-log.md`, 2026-07-08 | Both | Clent |
| Xero (claude.ai connector) | The connected Xero organisation | PLACEHOLDER (pending live review) — fill from the access review | Read-only | Jewell | Clent |

## Reading the columns

- **What it reaches** — the real-world system the connector can touch, not the tool's marketing
  description.
- **Scope granted** — the actual permission set. Every row starts `PLACEHOLDER` until the access
  review (`OPERATING-SYSTEM.md` Section 11, Part A) confirms and records the real scope.
- **Read/write** — read-only is the default for every row until a named, approved write need is
  recorded against it. Where a write need is recorded, it is only ever "gated", meaning a proposed
  change still needs the standard approval gate in `../../00-governance/connector-access-rules.md`.
- **Layer** — which side of the Jewell × Maxxim model the connector primarily serves. "Both" means
  it is read for the Today door or a shared workflow.
- **Approval owner** — who signs off adding, widening or removing the server. This is Clent for
  every row; the column exists so a new row cannot be added without naming the owner.

## Before adding a row

Confirm the server is classified in `../../01-catalogue/adopt-now.md` (or the relevant class
file), then add the row here with scope marked `PLACEHOLDER (pending live review)` until the real
access review fills it in. Never fill in a scope column from memory or assumption. A placeholder
scope must be resolved before the connector goes live — this is checked at the monthly scorecard.

**Next:** see `mcp-risk-register.md` for the risks this register is designed against.
