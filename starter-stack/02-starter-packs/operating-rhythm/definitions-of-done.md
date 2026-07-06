# Definitions of done

What "done" means for the things this pack produces or touches. Use this to check a routine,
not to gate-keep it further than it needs. See `OPERATING-SYSTEM.md` Sections 12 and 15.

## A meeting

Done when: every action has an owner and a date, and a note exists filed to its one home (client
folder or `02_Internal`, per `OPERATING-SYSTEM.md` Section 6). Not done if an action is written
down with no owner, no date, or the note is stranded in the capture tool.

## A decision

Done when: it is logged in the decision log with the reason it was made. Not done if it was
decided in a meeting or a chat and never reached the log; that decision does not yet count as
settled and can still be re-litigated, which is exactly what the log exists to prevent.

## A client deliverable

Done when: it is approved by the engagement owner (and Clent where the deliverable touches
scope, pricing or a commitment), it sits in `05_Approved`, and it is portal-served if the client
has a portal. Not done if it is still in a draft-stage folder, or if it is shown to the client
before it reaches `05_Approved`.

## A memory update

Done when: Clent has approved it through the weekly washback path (`weekly-washback.md`,
`../memory/memory-promotion-rules.md`) and it has been written into the correct layer in
`06-memory`. Not done if it is still a proposal, however strong the evidence, or if it was written
directly into memory without going through approval.

## A routine

Done, in the sense of "proven", when: it has been used for 2 weeks and it is earning its keep —
someone would notice if it stopped, it has changed at least one decision or action, and it has
not been quietly skipped. Not done if it exists only as a template nobody has run, or if it has
been used but ignored.

## A security fix

Done when: the fix has been verified (the finding no longer reproduces) and it is logged in the
security review record with the date and who verified it. Not done if the fix has been applied
but not checked, or checked but not written down.

## A skill

Done when: it runs end to end on a real or realistic input and it passes its eval in `05-evals`.
Not done if it runs but has no eval, or if the eval exists but has not been run against this
version of the skill.

**Next:** use these definitions when filling in `friday-close.md` and `monthly-os-scorecard.md`,
so "shipped" and "done" mean the same thing every time they are used.
