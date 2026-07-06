# Today door

The single daily entry point. First thing opened each morning, last thing checked at end of day.
It reads from the real tools. It is not a new place to maintain by hand. See `OPERATING-SYSTEM.md`
Section 5 for the target model this template implements.

**Proven live.** The Today door has been proven live against real Calendar and Asana data,
read-only. It assembles correctly from the real tools. Wiring it into a routine that runs on a
schedule is a separate, later step.

**It is generated, read-only, and proposes rather than acts.** The Today door reads Calendar,
Asana, the decision log and alerts. It writes nothing back on its own. Every action it suggests
needs the tier-appropriate confirmation in `OPERATING-SYSTEM.md` Section 5 and the decision-tier
rules in Section 14. It never sends, never files, never changes a permission, and never
auto-promotes anything to memory.

## Inputs

- **Google Calendar** — work calendars only. Personal calendars are explicitly excluded from the
  crawl. The Today door never opens, reads or infers content from a personal calendar.
- **Asana** — tasks, owners, due dates, project status.
- **The decision log** (`06-memory/decision-log.md`) — what has already been decided, so nothing
  gets re-litigated.
- **Alerts** — security, finance and delivery alerts already routed to the team.

## The 13 questions the Today door answers

1. What matters today.
2. What meetings need preparation.
3. What decisions are waiting.
4. What actions are overdue.
5. What client work is at risk.
6. What is a personal priority today — surfaced as a single private reminder line only, never
   the content behind it. See `OPERATING-SYSTEM.md` Section 13.
7. What needs Clent's attention.
8. What Ronnie or the team can handle.
9. What AI or automation can handle.
10. What should not be touched.
11. What needs approval.
12. What is blocked.
13. What has changed since yesterday.

## The 11-step daily flow

1. **Morning brief** — assemble the day from Calendar, Asana, the decision log and alerts.
2. **Calendar review** — meetings, prep needed, gaps.
3. **Priority review** — the few things that matter today.
4. **Meeting preparation** — the brief for each meeting that needs one.
5. **Task review** — what is due, what is overdue, what is mine.
6. **Waiting-on review** — what is blocked on someone else.
7. **Client delivery review** — what is at risk, what is at a gate.
8. **Alerts and risks** — security, finance, delivery.
9. **Personal priority check** — a private reminder line only; content stays in the personal
   space.
10. **Decision capture** — anything decided today goes to the decision log.
11. **End-of-day or end-of-week washback** — what changed, what mattered, what can be retired.

## Generator prompt

Use this prompt as the basis for a Today door generator skill or routine. Adapt tool names to
whatever is actually wired.

```
You are assembling the Today door, the single daily entry point.

Read-only. Propose, never act. Personal calendars are out of scope entirely — do not query them.

1. Read today's and tomorrow's events from the work Calendar only.
2. Read open Asana tasks: overdue, due today, due this week, and anything blocked or waiting on
   someone else.
3. Read the decision log for anything logged in the last 7 days, and anything still marked open
   or awaiting a decision.
4. Read any routed alerts (security, finance, delivery) from the last 24 hours.
5. Do not read, query or infer anything from a personal calendar, personal Drive space, or any
   Clent-only or legal source.
6. Render the brief under the 13 questions above, in that order.
7. For the personal priority line, surface only that a personal priority exists today, worded
   generically (for example "one personal priority today"). Never name or describe it.
8. Mark every proposed action with its decision tier (Tier 1, 2 or 3, per Section 14) and who
   would need to confirm it.
9. Do not write anything back to Calendar, Asana or the decision log. Output the brief only.
10. If a source cannot be read (for example a broken connector), say so plainly rather than
    guessing at its contents.
```

## Worked example (placeholder data)

```
TODAY DOOR — Thursday, 6 March

1. What matters today
   - Finalise the Acme Co Design-stage deck ahead of Friday's review call.
   - Confirm the Beacon Retail onboarding kicks off Monday.

2. Meetings needing prep
   - 11:00 Acme Co Design review — prep: the draft deck (02_Design, not yet approved), open
     questions on the messaging pillar.
   - 15:30 Internal weekly sync — prep: Friday close draft, one open decision to confirm.

3. Decisions waiting
   - Beacon Retail: confirm scope for the second workshop. Waiting on Clent.

4. Overdue
   - Acme Co invoice reminder, 2 days overdue. Owner: Ronnie.

5. Client work at risk
   - Beacon Retail Discover pack is one day from its gate with two open inputs still missing.

6. Personal priority today
   - One personal priority today. (Content stays in the personal space.)

7. Needs Clent
   - Approve the Beacon Retail second-workshop scope (Tier 2 — recommended default: proceed
     with the workshop as scoped, awaiting one-word confirm).

8. Ronnie or team can handle
   - Chase the two missing Beacon Retail Discover inputs.
   - Send the Acme Co invoice reminder.

9. AI or automation can handle
   - Draft the Friday close template ready for Ronnie to fill in.
   - Draft the Acme Co deck's next-section outline for review.

10. Do not touch
    - The signed Acme Co Design draft. It is with the client for internal sign-off; do not send a
      revised version until they respond.

11. Needs approval
    - The Beacon Retail workshop scope (see 7).

12. Blocked
    - Beacon Retail Discover pack, blocked on client-supplied brand assets.

13. Changed since yesterday
    - Acme Co moved their review call from Wednesday to today at 11:00.
    - The Beacon Retail onboarding date was confirmed for Monday (was tentative).
```

This example uses placeholder clients ("Acme Co", "Beacon Retail"). No real client names or
client data belong in this pack.

**Next:** run the flow for two weeks before treating it as standard. See `definitions-of-done.md`
for what "used and earning its keep" means for a routine.
