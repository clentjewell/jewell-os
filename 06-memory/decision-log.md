# Decision log

Every binding call, dated, with the reason. The source of truth for decisions. Mirrored to Drive
for human reading. Add newest at the top.

Format: **Date — Decision — Reason — Decided by — Kind.**

| Date | Decision | Reason | Decided by | Kind |
| --- | --- | --- | --- | --- |
| 2026-07-08 | Asana single-source-of-truth confirmed: "Clent - 2026" (gid 1209934477999663) is the one board for Clent's work tasks; no further work boards are to be created per person/client/year. "Clent — Private" (gid 1216350939776284) remains the sole exception, kept separate because "Clent - 2026" has team/contractor members — moving personal/legal/health content there would re-expose it. | Clent's instruction to consolidate, reconciled against the boundary model approved 8 Jul; Clent confirmed the private board stays separate. | Clent | Decision |
| 2026-07-08 | Decision-log hygiene: earlier rows in this log were redacted to remove private-layer specifics (content categories and descriptions). The facts of completion stand; the detail is held privately. Where the boundary rule is breached, redaction outranks the append-only rule. | The boundary rule is absolute: found private-layer content is removed, not propagated, including from this log. | OS, under the boundary rule; for Clent's review | Decision |
| 2026-07-08 | Project inventory: 231 active projects; ~100 stale year-boards, 23 empty, 32 duplicates across 9 clusters, 83 ownerless, 18 departed-staff containers holding ~240 orphaned tasks. Bulk project archive and orphan reassignment proposed as Tier 2; the one-board-per-client structural shift parked for the quarterly review. Restricted-cluster memberships verified private. | Deep-check findings; project archiving needs manual clicks (not in the connector) so it routes to Ronnie once approved. | Proposed, awaiting Clent | Recommendation |
| 2026-07-08 | Orchestrated Asana deep-check (2 Sonnet auditors + 1 Opus boundary sweep). A historic boundary exposure on a legacy board was closed in full; the board is now empty. Two task titles carrying sensitive content were remediated. Detail held privately. | Boundary breach found in history, not just live items; acted under the standing privacy approval. | Clent (standing approval) | Decision |
| 2026-07-08 | The 26 legacy recurring tasks (2023 routine set and old personal-ops sprint) deleted with Clent's explicit approval, ending the respawn loop. | Completing them spawned new copies; Clent approved deletion. | Clent | Decision |
| 2026-07-08 | Today door retimed: weekdays only, 7:00am NSW (cron 21:00 UTC Sun–Thu). Note: when daylight saving starts in October, the post shifts to 8:00am NSW unless the cron moves to 20:00 UTC — flagged for the October monthly review. | Clent's directive; UTC cron cannot track NSW DST automatically. | Clent | Decision |
| 2026-07-08 | Archive executed: ~470 stale pre-2026 tasks marked complete (restorable); rescues kept open. The private consolidation was completed; detail held privately. "Clent - 2026" confirmed as the operational board. | Clent's "Archive it" and the board correction; boundary closed without widening exposure. | Clent | Decision |
| 2026-07-08 | ~26 recurring legacy tasks (2023 routines that respawn on completion) held open pending Clent's approval to delete the recurrences; deletion needs explicit approval per the constitution. | Completing them spawns new copies; only deletion stops the loop. | Proposed, awaiting Clent | Recommendation |
| 2026-07-08 | Operating model revised: AI executes the approved routines and fixes; Ronnie reviews and is notified; humans check in the background. | Clent's answers to the four switch-on approvals. | Clent | Decision |
| 2026-07-08 | Daily Today door automated at 8:30am AEST, posting to Slack; read-only, personal calendars excluded. | Approval 1; routine created same day. | Clent | Decision |
| 2026-07-08 | Private consolidation approved for AI execution; queued behind a membership correction that only Clent can click, so exposure is not widened in the interim. | Approval 2; a membership correction was identified, detail held privately. | Clent (execution queued) | Decision |
| 2026-07-08 | Stale pre-2026 Asana archive list (~200 tasks) prepared; archiving awaits Clent's one-word "do it" on the list, per the stated gate. | Approval 3 kept the list gate. | Clent (gate pending) | Decision |
| 2026-07-08 | Drive one-source-of-truth headers: paste-ready lines delivered to Ronnie for the 6 OS docs; the connector cannot edit Doc content directly. | Approval 4; tooling limit named honestly. | Clent | Decision |
| 2026-07-07 | The orchestrated OS build runs today with a 4pm AEST high-confidence target; Fable orchestrates, Sonnet builds, Opus verifies. | Clent directed the run to start now, in this session. | Clent | Decision |
| 2026-07-07 | The Today door is proven live against real Calendar and Asana, read-only; it becomes runbook Step 1. | Working value demonstrated before wiring anything. | Clent (approved the read-only run) | Decision |
| 2026-07-07 | Content belonging to the private layer, found in shared Asana, will be separated into the private space; the itemised list is held privately by Clent, never in this repo. | Boundary rule; Tier 3, awaiting Clent's go for execution. | Proposed, awaiting Clent | Recommendation |
| 2026-07-07 | Drive context docs and `jewell-os` reconcile to one authority split: GitHub holds rules, Drive holds current context and summaries. | Two masters of the same rules will drift. | Proposed, awaiting Clent | Recommendation |
| 2026-07-06 | The Jewell × Maxxim Operating System is drafted in `jewell-os` as `OPERATING-SYSTEM.md` plus this scaffold, for approval. | One canonical operating manual and one repo home, per the brief. | Proposed, awaiting Clent | Recommendation |

## How to use

- Log a decision the moment it is made. Do not re-decide settled calls in chat.
- If a decision is reversed, add a new row that supersedes it. Do not edit history.
- One exception outranks the append-only rule: if a row carries private-layer content
  (personal, legal, health, family, financial detail, or descriptions of any of these),
  redact the row and add a row recording the redaction. The boundary rule is absolute.
- Mark the kind: a recommendation is not a decision until a human approves it.
