# MCP risk register

The risks specific to wiring MCP connectors into Jewell and Maxxim repos, and how each is
mitigated. Sits alongside the general security posture in `../security/` and
`OPERATING-SYSTEM.md` Section 11. This register does not replace either — it names the risks that
are particular to connectors.

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Prompt injection via connector-returned content (an issue, file, page or webhook carrying a hidden instruction) | Medium | High | Treat all connector content as untrusted input (this pack's README); no action taken from embedded instructions without the standard approval gate; prompt-injection guardrails per `OPERATING-SYSTEM.md` Section 11, Part B | Clent |
| Over-broad token scope (a connector granted more than the task needs) | Medium | High | Least privilege and read-only first (`connector-access-rules.md`); scope reviewed at grant and at quarterly recertification | Clent |
| Cross-client data exposure through a shared connector (one client's content reachable through another's session) | Low | High | Role-based access per `OPERATING-SYSTEM.md` Section 14; approved-source-only answering; never wire a connector directly into a client-facing surface without a scoped, reviewed source set | Clent |
| Personal-calendar or personal-folder leakage into a work brief | Low | High | Personal and legal content is never in scope for a work connector, per Section 13 and `connector-access-rules.md`; confirmed at connector setup and at recertification | Clent |
| Stale credentials or scope after a personnel or agent change | Medium | Medium | Same-day revoke or rotate on any personnel, agent, partner or contractor change, per Section 11, Part C | Clent |

## How to use this register

- Add a row when a new connector or a new use of an existing connector introduces a risk not
  already listed.
- Every mitigation should point back to a named rule, not a promise. If there is no rule yet,
  propose one before adding the connector.
- Review this register at the monthly security review (`../../00-governance/security-review-policy.md`)
  and at the quarterly access recertification.

**Next:** see `../../00-governance/connector-access-rules.md` for the binding rules these
mitigations rely on.
