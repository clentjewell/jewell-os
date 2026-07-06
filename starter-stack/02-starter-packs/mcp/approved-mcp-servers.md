# Approved MCP servers

The register of MCP servers approved for use against Jewell and Maxxim repos. Add a server here
only after it is classified in `../../01-catalogue/` and approved by Clent. Scope columns marked
`PLACEHOLDER` are not yet filled in from a real access review — do not treat a placeholder as a
granted scope.

| Server | What it reaches | Scope granted | Read/write | Layer | Approval owner |
| --- | --- | --- | --- | --- | --- |
| `github/github-mcp-server` (MIT) | GitHub repos, issues, PRs, Actions | PLACEHOLDER — scope to named repos only | Read/write (write gated) | Both | Clent |
| `cloudflare/mcp-server-cloudflare` (Apache-2.0) | Cloudflare account: Workers, KV/D1/R2, DNS, docs search | PLACEHOLDER — scoped API token, never Global API Key | Read/write (write gated) | Maxxim | Clent |
| `microsoft/playwright-mcp` (Apache-2.0) | A browser session driving a built site or portal, template-only | PLACEHOLDER — no live credentials in scope | Read (browser QA, no production writes) | Both | Clent |
| Google Drive (claude.ai connector) | The connected Google Drive | PLACEHOLDER — fill from the access review | Read/write (write gated) | Both | Clent |
| Google Calendar (claude.ai connector) | The connected Google Calendar | PLACEHOLDER — fill from the access review | Read/write (write gated) | Both | Clent |
| Gmail (claude.ai connector) | The connected Gmail account | PLACEHOLDER — fill from the access review | Read/write (write gated) | Jewell | Clent |
| Asana (claude.ai connector) | The connected Asana workspace | PLACEHOLDER — fill from the access review | Read/write (write gated) | Both | Clent |
| Slack (claude.ai connector) | The connected Slack workspace | PLACEHOLDER — fill from the access review | Read/write (write gated) | Both | Clent |
| Xero (claude.ai connector) | The connected Xero organisation | PLACEHOLDER — fill from the access review | Read-only | Jewell | Clent |

## Reading the columns

- **What it reaches** — the real-world system the connector can touch, not the tool's marketing
  description.
- **Scope granted** — the actual permission set. Every row starts `PLACEHOLDER` until the access
  review (`OPERATING-SYSTEM.md` Section 11, Part A) confirms and records the real scope.
- **Read/write** — read-only is the default. Write is only ever "gated", meaning a proposed
  change still needs the standard approval gate in `../../00-governance/connector-access-rules.md`.
- **Layer** — which side of the Jewell × Maxxim model the connector primarily serves. "Both" means
  it is read for the Today door or a shared workflow.
- **Approval owner** — who signs off adding, widening or removing the server. This is Clent for
  every row; the column exists so a new row cannot be added without naming the owner.

## Before adding a row

Confirm the server is classified in `../../01-catalogue/adopt-now.md` (or the relevant class
file), then add the row here with scope marked `PLACEHOLDER` until the real access review fills it
in. Never fill in a scope column from memory or assumption.

**Next:** see `mcp-risk-register.md` for the risks this register is designed against.
