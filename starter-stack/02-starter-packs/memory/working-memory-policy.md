# Working memory policy

How the seventh memory layer, Active Context, is handled. It is not governed the same way as the
other six. See `OPERATING-SYSTEM.md` Section 10.

## What Active Context is

The near-term working state: what is live right now, which engagements are mid-stage, what was
just decided in the last few days, what is about to happen. It is the weather, not the climate.

## The rules

- **Volatile by design.** Active Context is expected to change often, sometimes daily. Treating it
  as stable is a mistake; treating it as unstable is correct.
- **Refreshed before high-stakes work.** Before a meeting, a client deliverable, or anything that
  matters, refresh Active Context from the real sources (Calendar, Asana, the decision log) rather
  than trusting a stale snapshot.
- **Expires unless promoted.** An item in Active Context does not become a Preference, an SOP, or
  a Lesson on its own. If it should persist beyond the near term, it goes through the same washback
  path as everything else in `memory-promotion-rules.md`. Otherwise, it ages out.
- **Never treated as identity.** Active Context describes what is happening, not who Jewell is or
  what Jewell believes. Constitution, People, Preferences and SOPs hold identity and standing
  rules. Active Context never overrides them, and nothing in Active Context is read as if it were
  Constitution-level truth.
- **Stale context is flagged with dates.** Every Active Context item carries the date it was last
  refreshed. When a routine or a person relies on it, check the date. A Today door or Ask answer
  that surfaces Active Context without its date is incomplete.

## Why this matters

The Today door and Ask Jewell AI both draw on Active Context constantly, because it is where "what
matters today" lives. Getting this layer wrong in either direction breaks something real: treat it
as stable and the system acts on last week's facts; treat it as identity and a one-off event
starts shaping standing judgement it was never meant to shape.

**Next:** see `approved-memory-policy.md` for the six layers that are not volatile in this way, and
how something moves from Active Context into one of them.
