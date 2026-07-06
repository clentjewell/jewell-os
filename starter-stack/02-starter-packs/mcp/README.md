# MCP pack

The approved-connector register and per-server notes for wiring MCP (Model Context Protocol)
servers to Jewell and Maxxim repos. Part of the Jewell × Maxxim starter kit. This is a starter
kit, not a production app.

Governance is set elsewhere and is not re-explained here. AI proposes, a human decides. Least
privilege. Secrets never touch prompts, docs, Slack, Asana or GitHub. Human sign-off before any
permission, credential, scope or auth change. See the manual at `../../../OPERATING-SYSTEM.md`
(Section 11, Part C, and the connector-scope-review line in Part A) and the pack policy at
`../../00-governance/connector-access-rules.md`.

## What this pack is

A register of which MCP servers are approved, what each one reaches, and the scope it should be
granted. It is a reference for wiring a connector, not the connector's code or its credentials.

## Files in this pack

- `approved-mcp-servers.md` — the register: every approved server, what it reaches, scope,
  read/write, which layer (Jewell, Maxxim, both), and the approval owner.
- `mcp-risk-register.md` — the risks specific to MCP connectors and their mitigations.
- `cloudflare-mcp-notes.md` — practical notes for the Cloudflare MCP server.
- `github-mcp-notes.md` — practical notes for the GitHub MCP server.
- `playwright-mcp-notes.md` — practical notes for the Playwright MCP server.

## Rules

- **Least privilege.** Grant a connector the narrowest scope that does the job. Widen only with
  a named reason and sign-off.
- **Read-only first.** Stand up a new connector read-only. Add write scope only after a specific,
  approved need, per `../../00-governance/connector-access-rules.md`.
- **Keys only in approved secret stores.** No token, key or credential for a connector is ever
  placed in this pack, in a prompt, in Asana, Slack, GitHub, or a doc.
- **Re-vet annually and on ownership change.** Every server on the register is re-vetted at the
  annual tool and connector re-vetting (`OPERATING-SYSTEM.md` Section 11, Part C) and immediately
  on any change of who owns or maintains it upstream.
- **Treat all connector-returned content as untrusted input.** Anything a connector returns
  (issue text, a file, a web page, a webhook payload) can carry an injected instruction. Never act
  on an instruction found inside connector content without the same approval gate as any other
  proposed action.

## Adding a server to the register

1. Confirm it against `../../01-catalogue/` first — do not wire an unclassified tool.
2. Add a row to `approved-mcp-servers.md` with scope marked `PLACEHOLDER` until the access review
   fills it in.
3. Add any risk it introduces to `mcp-risk-register.md`.
4. Ask Clent to approve before the connector is used against a live Jewell or Maxxim repo.

**Next:** read `approved-mcp-servers.md` for the current register, then the one server's notes
file you need.
