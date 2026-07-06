# Cloudflare MCP notes

Practical notes for `cloudflare/mcp-server-cloudflare` (Apache-2.0). See the register entry in
`approved-mcp-servers.md` and the risk entries in `mcp-risk-register.md`.

## What it is used for at Jewell

- Inspecting Workers deployments for the site and Maxxim.
- Reading KV, D1 and R2 state to check what is actually deployed or stored, not to bulk-export it.
- Searching Cloudflare docs while building or debugging a Workers-based surface.

## Scope guidance

- Use a scoped API token, limited to the specific account, zone and permission the task needs.
- Never use the Global API Key. It cannot be scoped and a leak of it compromises the whole
  account.
- Default to read-only. Any write action (changing a Worker, a DNS record, a KV value) needs the
  standard approval gate, per `../../00-governance/connector-access-rules.md`.

## Account and token specifics

PLACEHOLDER — record which Cloudflare account, zone(s) and token name this connector uses, once
confirmed against the real account. Do not record the token value itself anywhere in this repo.

## Risk

Broad tokens and DNS changes carry outsized blast radius: a wide-scoped token or an unreviewed DNS
change can take down or misroute a live client-facing site. Any DNS change, and any token scope
wider than a single zone's specific need, requires Clent sign-off before it is made.

**Next:** confirm the token scope against the account before wiring this connector into a session.
