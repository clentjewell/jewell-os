# Operating rhythm pack

The templates for the daily-to-annual cadence in the operating manual. Part of the Jewell ×
Maxxim starter kit. This is a starter kit, not a production app.

Governance is set elsewhere and is not restated here. AI proposes, a human decides. Nothing
auto-promotes. See the manual at `../../../OPERATING-SYSTEM.md` (Sections 5, 10 and 12) for the
target model, the memory layers and the full cadence table.

## What this pack is

Templates the daily and weekly routines fill in. The cadence definitions themselves (purpose,
inputs, outputs, owner, approval, filed-where, what to automate, what stays human-led) live in
`OPERATING-SYSTEM.md` Section 12 and in `jewell-os/10-cadence/`. This pack does not redefine the
cadence. It gives a routine something concrete to produce.

| File | Cadence | Owner | Files to |
| --- | --- | --- | --- |
| `today-door.md` | Daily | System generates, Ronnie reviews, Clent reads | Ephemeral; decisions to the log, actions to Asana |
| `meeting-sweep.md` | Daily (weekdays) | System generates, Ronnie reviews; task creation needs a human word | Single Slack post to the ops channel; proposed tasks to Asana on confirmation |
| `friday-close.md` | Weekly | Ronnie | `02_Internal` |
| `weekly-washback.md` | Weekly | Ronnie, Clent approves | `06-memory` (proposals), Drive mirror |
| `monthly-os-scorecard.md` | Monthly | Clent and Ronnie | `00_Operating` |
| `definitions-of-done.md` | Reference, all cadences | Clent | `00-governance` |

## Where outputs go

Every template in this pack produces an output that files somewhere real: Drive, Asana, or
`06-memory`. This pack holds the template and the definition of what a good output looks like.
It never becomes a second store of the output itself. See the source-of-truth map in
`OPERATING-SYSTEM.md` Section 3.

## The retirement rule

If a routine does not earn its keep, retire it. A routine earns its keep when it is used, when
it changes a decision or an action, and when someone would notice its absence. A routine that
nobody reads, or that duplicates what another routine already answers, is a candidate for
retirement at the next weekly or monthly review. Retiring a routine is itself logged: what it
was, why it stopped earning its keep, and the date it was retired.

## How to apply this pack

1. Read this file and the one template you need. Do not read the whole pack up front.
2. Copy the template into the place it will actually be used (a Claude Code prompt, an Asana
   template task, a Drive doc) and adapt the placeholders to the target repo or team.
3. Pilot it for 2 weeks before treating it as standard. See `definitions-of-done.md` for what
   "earning its keep" means for a routine.

**Next:** start with `today-door.md`, the single daily entry point, then `friday-close.md` and
`weekly-washback.md` for the weekly reset.
