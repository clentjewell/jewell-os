# Roles and access

The full role-based access model lives in
[OPERATING-SYSTEM.md, Section 14](../OPERATING-SYSTEM.md#section-14-role-based-access-model).
Ask Jewell AI behaviour by user type lives in
[Section 9](../OPERATING-SYSTEM.md#section-9-ask-jewell-ai-and-client-portal-layer). This file is
the operational quick reference.

## Principle

Least privilege by default. Widening access always needs approval and is always logged.

## Roles

Clent/Admin, Ronnie/Ops, Team, Specialist Contractor, Existing Client, New Client, Partner,
Finance/Bookkeeping, Maxxim/Product, Personal/Private.

## The lines that must always hold

- Personal and legal content: Clent only, never reachable by any other role or the machine.
- One client never sees another client's data.
- Drafts are never client-visible.
- Finance detail is limited to Clent and Finance/Bookkeeping.
- Contractors see only their scoped materials.
- Any access change is approved by Clent and logged.

## On any personnel, agent, partner or contractor change

Revoke or rotate the same day. Update this reference and the decision log.
