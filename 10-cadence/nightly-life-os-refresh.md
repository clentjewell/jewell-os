# Nightly Life OS refresh

The routine that keeps `LIFE-OS.md` a living document. Runs nightly at 3:00am AEST
(17:00 UTC; retime at the October DST review) as a Claude Code Remote routine in a fresh
session, after the 2:00am rules-sync and 2:30am intelligence sweep have run.

Standing approval: recorded in the decision log, 11 July 2026, on Clent's written instruction
that the Life OS "continues to capture everything on at least a nightly basis". Scope below;
nothing in this routine widens its own scope.

## Purpose

Capture everything the system learnt in the last 24 hours into its right home, keep the
master index honest, and flag drift. Capture and file only — this routine never makes
strategy changes, never touches gated content outward, never sends anything external.

## Steps

1. **Sweep the day.** Read the last 24 hours of: new decision-log rows, new files in
   `06-memory/intelligence/`, commits to both Life OS repos, and the intelligence sweep's
   digest. Note anything that changes the map, the gaps list or the OKR movement.
2. **Promote what qualifies.** Under the standing improvement directive: file new lessons in
   `06-memory/lessons.md`, new preferences in `06-memory/preferences.md`, new people in
   `06-memory/people.md` — each with source and date. Strategy-level items are proposed for
   the Friday washback instead, never promoted directly.
3. **Refresh the index.** Update `LIFE-OS.md`: the "Last refreshed" stamp, the known-gaps
   list (close what closed, add what opened), the changelog (one line, only if something
   material changed), and any pointer that has drifted.
4. **Check the OKRs.** Note movement against `02-okrs/OKRS-2026-H2.md` in one line per
   objective where evidence exists. Do not change targets — that is the Friday close's job.
5. **Run the boundary check.** Confirm no personal-content patterns appear outside the gated
   paths in the day's commits. A hit is flagged to Clent the same day and blocks the refresh
   commit until resolved.
6. **Export the human edition.** Regenerate the human-readable Life OS page from
   `LIFE-OS.md` (categorical — it never includes gated content) and file the export copy to
   Drive `04 Intelligence / 06 Master Index & Navigation` as a generated, nobody-edits copy.
7. **Commit and report.** Commit to a branch, open or update the standing draft PR, and post
   a 5-line digest to the ops channel: captured, promoted, flagged, OKR movement, next.

## Guardrails

- Fresh minimal-context session per fire; lightest capable model (Sonnet); no mid-run model
  switch. Escalate to the orchestrator only if the refresh finds a contradiction it cannot
  resolve.
- Read-only outside the files named above.
- Nothing external is sent. The Slack digest is internal, categorical, and carries no gated
  content.
- If the routine finds nothing to change, it stamps the date and says so in one line. A quiet
  night is a valid result.
- If this routine fails 2 nights running, it is flagged at the next Friday close — silent
  failure is the one unacceptable outcome.

## Arming status

The routine definition is complete and approved in scope, but the scheduled trigger could not
be created from the build session (trigger creation needs an interactive approval that a
non-interactive session cannot grant). To arm it, ask Claude in any interactive session:
"Create the nightly Life OS refresh routine per `10-cadence/nightly-life-os-refresh.md`" —
cron `0 17 * * *` UTC (3:00am AEST), fresh session per fire, prompt from this SOP. Until it is
armed, any session asked to "run the nightly Life OS refresh" executes this SOP manually.

Next: the Friday washback reviews what the week of refreshes promoted.
