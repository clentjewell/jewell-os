# Meeting sweep

The daily sweep of the day's meetings, turned into proposed Asana tasks for a human to create.
Owner: system generates, Ronnie reviews; task creation needs a human word. See
`OPERATING-SYSTEM.md` Section 12 (daily rhythm) and
`../skills/jewell-meeting-to-actions/SKILL.md` for the skill it calls per meeting.

## Purpose

Remove the manual relay of "watch for today's meetings, remember to run the actions skill on
each one." The sweep does that watching and running; a human still decides which proposed task
becomes real.

## When it runs

Weekdays, 4:00pm Sydney time. In UTC that is 06:00 in winter (AEST, UTC+10) and 05:00 in summer
(AEDT, UTC+11). Set the cron for the current Sydney offset and flag the switch at the relevant
monthly review, the same pattern used for the Today door in `today-door.md`.

This runs under the standing-approval carve-out (constitution rule 1) once Clent approves the
routine itself: it executes on schedule and Ronnie reviews the output rather than re-approving it
each day. The carve-out covers the sweep running and posting its proposal. It does not cover task
creation — the sweep only ever proposes; a human word still creates each Asana task, per
`jewell-meeting-to-actions/SKILL.md`.

## Generator prompt

```
You are running the daily meeting sweep.

Read-only against Circleback. Propose, never create.

1. Search Circleback for today's meetings (SearchMeetings, scoped to today's date).
2. If there are no meetings today, post nothing. Stop here. Staying silent is the correct
   outcome, not a failure.
3. For each meeting found, run the jewell-meeting-to-actions skill against it: pull the
   transcript via the connector, draft the meeting note, and draft proposed Asana tasks (owner,
   date, one line each), following that skill's guardrails in full.
4. Before posting, confirm the ops Slack channel exists and is reachable. If it is missing, say
   so in this run's output and stop. Do not post elsewhere and do not create anything as a
   substitute.
5. Combine every meeting's proposed tasks into a single Slack post to the ops channel: one list,
   grouped by meeting, each task shown as owner, due date, and one line describing the action.
   Mark the whole post PROPOSED.
6. Create nothing. No Asana task is created by this routine. Each listed task waits for a human
   "create" before it becomes real, per the approval gate in
   jewell-meeting-to-actions/SKILL.md.
7. Do not write a meeting note to Drive from this routine directly — that filing step belongs to
   the meeting-to-actions skill run per meeting, with its own Drive-folder-exists check.
```

## Guardrails

- Circleback is read-only here, as everywhere it is used (see `04-mcp/README.md`).
- One post per day, even when there are several meetings. No per-meeting spam to the ops channel.
- If no meetings ran through Circleback today, the sweep posts nothing and stays silent. Silence
  is the expected, correct behaviour on a meeting-free day.
- If the ops channel cannot be found, the sweep says so in its own output and stops. It never
  falls back to another channel or to email.
- The sweep creates nothing. Every proposed task listed in the Slack post needs its own human
  "create" before it becomes a live Asana task, exactly as in
  `jewell-meeting-to-actions/SKILL.md`.
- Inherits every guardrail in `jewell-meeting-to-actions/SKILL.md` for each meeting it processes:
  never invents an attendee, a commitment, or a date; confirms a Drive folder exists before
  filing; Tier 1 and Tier 2 confirmation rules apply per meeting.

## Definition of done

The sweep is earning its keep when: it runs unattended on schedule; every real meeting from the
day appears in the post with correctly attributed owners and dates; nothing is invented; the ops
channel receives exactly one post (or none, on a meeting-free day); and no task becomes a live
Asana task without a human confirming it. Pilot for 2 weeks per `definitions-of-done.md` before
treating it as standard.

**Next:** once a task in the sweep's post is confirmed, it follows the same approval gate as
`jewell-meeting-to-actions/SKILL.md`. See `today-door.md` for the equivalent daily-entry pattern
this routine follows.
