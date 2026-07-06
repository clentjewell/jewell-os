# Security review policy

When a security review runs, who signs off, and how severity is handled. Referenced by
`../02-starter-packs/security/README.md`. Full context in `../../OPERATING-SYSTEM.md` Section 11.

## When a review runs

- Any change to answering rules (Ask Jewell AI or a portal's source-only behaviour).
- Any change to a source set (what a connector or an Ask surface can read from).
- Any change to access (a new role, a widened scope, a new connector).
- Any change to a workflow that touches a client-facing surface.
- On a monthly cadence, regardless of whether a trigger above has fired.
- Before any new connector is wired into a Jewell or Maxxim repo.

## Who signs off

Clent. No review closes, and no finding is acted on, without Clent's sign-off.

## Severity handling

- A confirmed data leak (client data crossing a boundary it should not) or a confirmed
  hallucination presented as fact is a **stop-the-line** event: the affected surface is paused
  until Clent has reviewed it, not merely logged for the next cycle.
- Anything else is logged with a severity and picked up at the next scheduled review, unless Clent
  judges it urgent enough to act on sooner.

## Where this connects

See `../02-starter-packs/security/` for the CI workflows and repo templates that support this
policy, and `OPERATING-SYSTEM.md` Section 11 for the full audit, design-time rules, and cadence.

**Next:** run the checklist in `../02-starter-packs/security/templates/repo-security-baseline.md`
against any repo this policy applies to.
