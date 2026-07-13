# Nightly staging links sync

The routine that keeps the staging links register accurate without Ronnie updating it by
hand. Runs nightly at 3:30am AEST (17:30 UTC; retime at the October DST review) as a Claude
Code Remote routine in a fresh session, after the 3:00am Life OS refresh.

Standing approval: Clent's instruction of 13 July 2026 to create the register and keep it up
to date on a nightly basis; recorded in the decision log the same day. Scope below; nothing
in this routine widens its own scope.

## Purpose

Keep the Asana project "Jewell — Staging Links & Access 2026" (gid `1216500980390480`,
Marketing team, private to Clent and Ronnie) current. One task per project; each task
description holds the latest staging link, the repo, and the password if there is one. This
register replaces the manually maintained list in the "Clent - 2026" overview.

## Source of truth

The Asana register is the single master for staging links. This repo holds only this
runbook. Passwords live in the Asana task descriptions only — they are never written into
this or any repo.

## Steps

1. **Read the register.** List every task in the project and read each description
   (links, passwords, repo, the Checked line).
2. **Verify each entry.** Check the named Cloudflare worker still exists and note its
   `modified_on` date (Cloudflare connector), and check the named GitHub repo exists and
   note its last push (GitHub connector). Direct HTTP checks of the staging URLs are not
   possible from the remote environment (egress policy); do not attempt to route around
   the proxy.
3. **Refresh the stamps.** Update each task description's "Checked <date>" line and the
   deploy or push dates. Preserve every link label and password exactly as found — this
   routine never adds, edits or removes a password.
4. **Flag drift, never replace.** If a base worker or repo has been deployed or pushed
   after the registered preview link was last confirmed, or a worker or repo named in a
   task no longer exists, comment on the task for Ronnie and leave the link untouched.
   Replacing a link is a human edit (or a proposed edit approved in chat).
5. **Catch new entries.** Compare the "Clent - 2026" overview against the register. If a
   new links block has appeared there, comment on the register's "How this register works"
   task listing what is new. Never edit the "Clent - 2026" overview (no connector tool can
   write a project's notes field).
6. **Boundary check.** If a private-layer link (personal, legal, health, finance detail)
   is found in the register, move it to "Clent - Personal" and flag to Clent the same day.
7. **Quiet night rule.** If nothing changed, refresh the Checked dates and stop. No Slack,
   no email. A quiet night is a valid result.

## Guardrails

- Fresh minimal-context session per fire; lightest capable model (Sonnet). Escalate to the
  orchestrator only on a contradiction the routine cannot resolve.
- Writes are limited to: task descriptions (Checked lines and deploy dates) and task
  comments within the register project, plus the boundary move in step 6. Nothing external,
  nothing on other boards, no password edits, no deletions.
- If the routine fails 2 nights running, it is flagged at the next Friday close — silent
  failure is the one unacceptable outcome.

## Arming status

Armed from the build session of 13 July 2026 (Claude Code Remote routine, cron
`30 17 * * *` UTC, fresh session per fire). If it is ever found disarmed, ask Claude in any
interactive session: "Create the nightly staging links sync routine per
`10-cadence/nightly-staging-links-sync.md`."

Next: the monthly scorecard decides whether this routine earns its keep.
