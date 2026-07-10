# Approved memory policy

What counts as approved memory, where it lives, how often it is reviewed, and what must never
enter it. See `OPERATING-SYSTEM.md` Section 10 and Section 7.

## What approved memory is

Under the standing improvement directive (Clent, 10 July 2026), an item becomes memory when it is
promoted and logged — per-item sign-off is no longer required. The directive replaces the old
gate: anything that improves the system may enter memory directly, provided it is logged in the
decision log and reversible. Clent can veto or unwind any entry, and the veto is logged. The one
exception: long-term strategy changes still require Clent's approval through the washback path in
`memory-promotion-rules.md`. The exclusions below are unchanged and absolute.

## Where it lives

- **`06-memory/`** is the authoritative, machine-readable store. This is the one place
  the system reads from when it needs approved memory.
- **A Drive mirror** holds a human-facing copy for reading, per the authority split in
  `OPERATING-SYSTEM.md` Section 7. The Drive mirror is for people to read; `06-memory` is the
  source of truth. A rule is written once, in `06-memory`, and never duplicated in full on Drive.

## Review cadence

- **Weekly:** proposals are reviewed and approved or rejected at weekly washback.
- **Quarterly:** a retire pass. Anything in approved memory that no longer holds true, no longer
  applies, or has been superseded is retired with a note, per `OPERATING-SYSTEM.md` Section 12
  (quarterly rhythm).

## What may never enter approved memory

- Secrets and credentials, in any form.
- Personal, legal or family matters.
- Un-sanitised client data (client facts stay with that client; only sanitised patterns can ever
  reach Maxxim-level memory, and only after review).
- Anything marked Clent-only.
- Unapproved guesses, however plausible. A guess is a guess until it is checked and approved; it
  does not earn approved-memory status by being written down confidently.

**Next:** see `memory-promotion-rules.md` for how a proposal reaches the point of approval, and
`weekly-washback-template.md` for the form the weekly review actually uses.
