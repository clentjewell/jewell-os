# Tool ownership and retirement

Every tool in use has one named owner, and every tool earns its keep or is retired. Full context
in `../../OPERATING-SYSTEM.md` Section 17 (the OS scorecard) and Section 4 (the current-state
map).

## Ownership

Every tool, pack and connector adopted from this kit has exactly one named owner. The owner is
accountable for its scope, its findings at each security or access review, and its entry in
`../01-catalogue/` staying current.

## The monthly scorecard drives one decision per tool

At the monthly review (`OPERATING-SYSTEM.md` Section 12), each tool is scored against the OS
scorecard (Section 17) and lands on exactly one of:

- **Keep** — it is working as intended, no change needed.
- **Improve** — it is worth keeping but needs a specific fix.
- **Simplify** — it is doing more than it needs to; cut it back.
- **Automate** — a manual step around it can now run itself, with the approval gate intact.
- **Delegate** — a human step around it can move to someone better placed to own it.
- **Retire** — it is not earning its keep.

## Retirement

A tool that does not earn its keep is retired at the quarterly review (`OPERATING-SYSTEM.md`
Section 12). Retirement means, in order:

1. Archive its access (do not delete records; archive first, per `../../00-governance/approval-points.md`).
2. Revoke its tokens and credentials.
3. Record the retirement, the reason, and the date in the decision log.

No tool is retired mid-cycle without Clent's approval, even if the monthly scorecard flags it
early.

**Next:** see `../../00-governance/approval-points.md` for the approval this retirement path
depends on.
