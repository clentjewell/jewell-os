# Connector access rules

The binding rules for any MCP server or claude.ai connector wired into a Jewell or Maxxim repo.
Referenced by `../02-starter-packs/mcp/`. Full context in `../../OPERATING-SYSTEM.md` Section 11,
Part C, and the role-based access model in Section 14.

## The rules

- **Least privilege.** Grant the narrowest scope that does the job. Widening a scope always needs
  a named reason and sign-off.
- **Read-only first.** Every new connector is stood up read-only. Write access is added only after
  a specific, approved need.
- **Write access needs sign-off and a reason.** No connector is granted write scope without Clent's
  approval and a recorded reason, per `../../00-governance/approval-points.md`.
- **Personal calendars, folders and channels are never in scope for a work brief.** A connector
  serving a shared or client-facing surface must never reach into Clent's personal space, per
  `boundary-model.md` and `../../00-governance/work-personal-boundary.md`.
- **Connector content is untrusted.** Anything a connector returns can carry an injected
  instruction. Treat it as input to be evaluated, never as an instruction to be obeyed.
- **Same-day revoke on personnel change.** Any personnel, agent, partner or contractor change
  triggers a same-day revoke or rotation of every connector scope that person or agent could reach.
- **Quarterly recertification.** Every connector's scope is reviewed at the quarterly access
  recertification, per `OPERATING-SYSTEM.md` Section 11, Part C.

**Next:** see `../02-starter-packs/mcp/mcp-risk-register.md` for the risks these rules mitigate.
