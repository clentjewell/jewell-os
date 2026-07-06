# Weekly washback

The ritual that turns a week of signals into proposed change, then stops until Clent approves.
Owner: Ronnie, with Clent approving proposals. See `OPERATING-SYSTEM.md` Section 8 (the washback
path) and Section 10 (memory rules).

The washback path is fixed and does not vary by pack or team:

```
Signal → weekly synthesis → proposed change → human approval → approved memory or playbook update
```

Nothing auto-promotes. A signal is never a strategy or memory change on its own, no matter how
often it repeats.

## The ritual

1. **Gather signals.** Pull from the week's Deepen notes, repeated questions (a question asked
   more than once is a memory gap, not a coincidence), and operational friction (anything that
   was harder than it should have been). Note the source and date for each signal.
2. **Synthesise into proposed changes.** Group related signals. For each proposed change, record:
   - **Kind** — memory, SOP, or strategy.
   - **Evidence** — the signals behind it, with source and date.
   - **Confidence** — fact or assumption. Never dress an assumption as a fact.
   - **Recommended tier** — the decision tier the change would sit at if approved (see
     `OPERATING-SYSTEM.md` Section 14 and the roles table).
3. **Stop.** Present the proposals to Clent. Do not act on any of them yet.
4. **Clent decides**, one proposal at a time: approve, reject, or park for more evidence.
5. **Route approved items.** An approved memory item goes to `06-memory` (jewell-os), through the
   correct layer (see the memory pack's `README.md`). An approved playbook change goes to the
   relevant `jewell-os` file, with Clent's sign-off recorded.
6. **Log rejected items with a reason.** A rejected proposal is not deleted; it is logged with why
   it was rejected, so the same idea is not re-proposed without new evidence.

Use `../memory/weekly-washback-template.md` as the fill-in form for this ritual.

## What this ritual is not

- It is not a chat where ideas get casually agreed. Every proposal needs evidence, a confidence
  level, and Clent's explicit approval.
- It is not a place for client-specific facts to become general Maxxim IP without review and
  sanitisation (`OPERATING-SYSTEM.md` Section 2).
- It is not where personal or legal matters are discussed. Those never enter this ritual.

## Filing

The completed washback (proposals, decisions, routing) files to `06-memory` for anything approved,
and a copy of the full washback note to the Drive mirror in `00_Operating`, per the source-of-truth
split in `OPERATING-SYSTEM.md` Section 7.

**Next:** run `monthly-os-scorecard.md` at month end to check the washback itself is earning its
keep — are proposals landing, are rejections falling, is the same question stopping repeats.
