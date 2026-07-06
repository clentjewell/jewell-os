# AI authority matrix

What an AI agent may do alone, what it must propose and have a human approve, and what only a
human may do. The golden rule behind every row: **AI proposes, a human decides.** Full context in
`../../OPERATING-SYSTEM.md` Sections 2 and 11, and the gate list in
`../../00-governance/approval-points.md`.

## The matrix

| Action type | AI may do alone | AI proposes, human approves | Human only |
| --- | --- | --- | --- |
| Draft internal docs | Yes | — | — |
| Route files to their home | Yes | — | — |
| Create or edit Asana tasks | — | Yes (owner confirms) | — |
| Client-facing outputs | — | Yes (engagement owner approves) | — |
| Memory promotion | — | Yes (Clent approves) | — |
| Pricing, scope or commitments | — | — | Yes |
| Permissions, credentials or auth | — | — | Yes |
| Deletions | — | — | Yes (archive first) |
| Anything personal or legal | — | — | Yes (Clent only) |

## Reading the matrix

- "AI may do alone" still means the output goes to its one home per `systems-of-record.md`. Alone
  means no approval gate, not no rule.
- "Propose and approve" means the AI drafts, states the kind of claim it is making (fact,
  assumption, recommendation), and stops. Nothing is sent, published, or promoted until the named
  approver signs off.
- "Human only" means the AI must not even draft an implementation step that changes the thing
  itself. It may describe options for a human to choose between.

## When an action does not fit a row

Treat it as "AI proposes, human approves" by default, and ask which human should approve if that
is not obvious.

**Next:** see `connector-access-rules.md` for how this matrix applies to connector-driven access
and write actions specifically.
