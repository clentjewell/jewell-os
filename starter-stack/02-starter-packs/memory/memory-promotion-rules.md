# Memory promotion rules

The rules that govern what can enter memory, and how. See `OPERATING-SYSTEM.md` Section 10.

## The rules

1. **Nothing enters memory without human approval.** A signal, however strong or repeated, is a
   candidate for review, never a change on its own. Approval happens at weekly washback
   (`../operating-rhythm/weekly-washback.md`), and only Clent approves.
2. **Source attribution is mandatory.** Every memory item records where it came from: which
   meeting, which signal, which decision, and the date. An item with no traceable source is not
   ready for promotion.
3. **Confidence is marked.** Every item is fact, assumption, or guess. Never dress a guess as a
   fact, and never let an assumption sit unmarked once it has been treated as settled.
4. **Contradiction is flagged, never silently overwritten.** When new information conflicts with
   an existing memory item, both are kept visible and the conflict is flagged for human review.
   The old item is not quietly replaced.
5. **Retired assumptions are noted.** When an assumption is disproved, it is retired with a note
   of what replaced it and why, not deleted without a trace.
6. **Client memory is separate from business memory.** A client's facts live with that client.
   They are never merged into the general business memory layers.
7. **Work is separate from personal.** Personal content never enters shared memory, under any
   confidence level, for any reason. See `OPERATING-SYSTEM.md` Section 13.
8. **Patterns can improve Maxxim; client data cannot.** A pattern observed across client work can
   become reusable Maxxim IP, but only after review and sanitisation. The client's actual data,
   names, pricing or specifics never travel with it.

## What this means in practice

- A proposal arriving at weekly washback must already carry its source, its confidence level, and
  its recommended tier. If any of these is missing, it is not ready to propose.
- A rejected proposal is logged with the reason for rejection, not discarded. See
  `../operating-rhythm/weekly-washback.md`.
- If two memory items disagree, that is a finding to raise at the next washback, not something to
  resolve by picking one and deleting the other.

**Next:** see `approved-memory-policy.md` for where an approved item actually lives, and
`working-memory-policy.md` for the one layer these promotion rules do not gate in the same way.
