# Ronnie's runbook — switching on the Jewell OS

**For:** Ronnie. **From:** the OS build, 7 July 2026. **Approver above you:** Clent.
**How long:** about 2 hours across the day, one step at a time. You can stop after any step.

> **Status.** The revised operating model is live (constitution rule 1): the OS executes approved
> routines, you review and are notified, humans check in the background. The Today door posts to
> Slack automatically, 7:00am NSW on weekdays (see Step 1 for the October DST caveat). The first
> Asana archive is done; a second, larger inventory proposal awaits Clent (Step 5). One membership
> click, only Clent's to make, is all that is left on Step 4. Full history: `06-memory/decision-log.md`.

## Step 0 — how this runbook works (read this first)

You are switching the operating system on, one step at a time. Nothing happens without your OK.
Every step below tells you, in plain words: what it does, why it helps, what it changes, exactly
what you do, how to check it worked, and how to undo it. At the end of each step you decide:
continue, or stop for today. Both are fine.

Three kinds of step, marked on each one:

- **Tier 1 — your call.** Internal, reversible, no client or legal exposure. You do it, then tell
  Clent after.
- **Tier 2 — propose and approve.** You set it up and show Clent the recommended default. He
  approves in one word or corrects. "Do it" means approved. Anything less means not yet.
- **Tier 3 — Clent only.** You do not start these until Clent has explicitly signed off. One step
  below is Tier 3. It waits for him, not for you.

The full gate list, with every action that always needs approval, lives in
`00-governance/approval-points.md` — the tiers above are the short version.

**Escalation.** Message Clent directly in Slack (or by phone if urgent) — #jewell-ops (create if
it does not exist — Tier 1). One channel, always the same.

One rule above all: if anything in a step surprises you, stop and ask. A question is never the
wrong move.

---

## Step 1 — the Today door (the morning brief) — Tier 1

**What this does.** Every morning, one brief that answers: what matters today, which meetings need
prep, what is overdue, what is blocked, what needs Clent, what you can handle, and what changed
since yesterday. It reads the work calendar and Asana. It reads only — it changes nothing. It now
posts to Slack automatically at 7:00am NSW on weekdays, under the standing approval recorded in
the constitution (rule 1). When daylight saving starts in October, the post shifts to 8:00am NSW
unless the cron is moved from 21:00 UTC to 20:00 UTC — this is on the October scorecard.

**Why it helps / time saved.** Clent stops assembling his day by hand from 4 tools. Proven live on
7 July against the real calendar and Asana: it caught a double-booking (an in-person appointment
sitting inside the quarterly planning block) and a same-day deadline. Estimate: 30 to 45 minutes
back per day, 3 to 5 hours per week.

**What it changes.** Nothing. Reads only. Personal calendars are excluded from the crawl by
design; at most a single "personal priority" reminder line appears, never the content.

**What you do.**
1. Open Slack. The brief is posted for you at 7:00am NSW on weekdays — no pasting, no posting.
2. Read it. Check it against the real calendar for today.
3. If it looks right, you are done before the 9:00 Daily Catch-Up.
4. If no brief has appeared by 7:15am NSW, tell Clent in the escalation channel and run the
   prompt manually from `starter-stack/02-starter-packs/operating-rhythm/today-door.md` as the
   fallback.

**How to check it worked.** The brief lists today's real meetings, real overdue items, and flags
any conflict. If it invents a meeting or misses one, stop and flag it to Clent. This is a manual
check for now — no evals run yet; the eval suite is parked until the Ask endpoint exists.

**How to undo.** Ask Clent to pause the schedule. Nothing persists.

**Your OK to continue?** It is already running; your job each morning is the check above.

---

## Step 2 — meeting-to-actions after the Daily Catch-Up — Tier 1

**What this does.** After the 9:00 catch-up, turns the meeting into owned, dated actions,
*proposed* for Asana — you confirm each one before it is created. The meeting note files to the
right Drive folder.

**Why it helps / time saved.** No decision or action gets lost between the call and the tools.
Estimate: 2 to 3 hours per week across the team, and fewer "what did we agree?" repeats.

**What it changes.** Creates Asana tasks — but only the ones you confirm, one by one. Reversible:
any task can be deleted or reassigned immediately.

**What you do.**
1. After the catch-up, open the Jewell OS project and use the meeting-to-actions skill
   (`jewell-os/starter-stack/02-starter-packs/skills/jewell-meeting-to-actions/SKILL.md`).
2. Give it the meeting notes or transcript.
3. It proposes actions: owner, due date, project. Confirm, edit or reject each.
4. Confirmed actions go to Asana; the note files to `02_Internal` or the client folder.

**How to check it worked.** Every action from today's meeting is in Asana with an owner and a
date, and nothing was created that you did not confirm.

**How to undo.** Delete any wrongly created task. The skill never edits or deletes existing tasks.

**Your OK to continue?**

---

## Step 3 — connector check — Tier 1

**What this does.** Confirms which connectors the Jewell OS can read, and that each is scoped to
work only. Today's audit confirmed Google Calendar, Asana and Google Drive are live and working.

**Why it helps.** The Today door and the skills are only as good as what they can read. Least
privilege keeps them safe.

**What it changes.** Nothing, unless a connector is missing — then you authorise it yourself, so
you know exactly what access was granted.

**What you do.**
1. In the Jewell OS project, check the connectors list: Google Calendar, Asana, Google Drive,
   Gmail, Slack, Xero, GitHub.
2. For any that is missing and needed, authorise it via the connector settings — read-only where
   the option exists.
3. Confirm the personal spaces are not in scope: personal calendars and the personal Drive area
   must never feed work briefs. If you ever see personal content in a work brief, stop and tell
   Clent the same day.

**How to check it worked.** Run the Today door again — it reads calendar and tasks without error,
and contains nothing personal.

**How to undo.** Any connector can be disconnected in settings at any time.

**Your OK to continue?**

---

## Step 4 — verify the private boundary in Asana — Tier 3 for the one remaining click

**What this does.** The private consolidation is completed and verified; detail held privately.
The structure is now simple: "Clent - 2026" is the single work board, and "Clent — Private" is
the sole separate exception. Your job on this step is verification, not execution.

**Why it helps.** This is the boundary the whole OS is built on: personal and legal content never
sits where the team or the machine can read it.

**What is outstanding.** One membership correction, and only Clent can click it: "Clent — Private"
→ Share → remove the one work-only member → add Ronnie. The AI cannot change project membership.
Until that click, nothing is exposed further — the correction just completes the access model.

**What you do.**
1. Remind Clent of the one click above if it is still pending.
2. Once done, check a team member's view of Asana: nothing private should be team-visible.
3. Confirm with Clent that the result matches his private list. The list itself stays with him —
   it is deliberately not written in this document.

**How to check it worked.** A team member's view of Asana shows nothing that belongs in the
private layer, and "Clent — Private" is visible to Clent and you only.

**How to undo.** Membership can be changed back at any time. Nothing was deleted.

**Your OK to continue?** The click is Clent's; the check is yours.

---

## Step 5 — Asana hygiene: verify the archive, then the project inventory — Tier 2

**What this does.** The first archive is executed: ~470 stale pre-2026 tasks archived, all
restorable, with anything still live rescued and re-dated. Your job now is to verify it looks
right. Then comes the second, larger clean-up: a project-inventory proposal that is with Clent,
awaiting his one word.

**Why it helps / time saved.** The Today door can only trust Asana if "overdue" means something.
This is what makes Step 1 compound. Estimate: 1 to 2 hours per week of scanning-and-ignoring
stopped, and a task list the whole team can trust.

**What it changes.** The archive is done (recoverable, not deleted). The project inventory
changes nothing until Clent approves it.

**What you do.**
1. Open "My Tasks" and "Clent - 2026" (the single work board). What remains should be current,
   owned and dated. If something live was archived, restore it and tell Clent.
2. Know what the second proposal covers, so you can answer for it: 231 active projects, of which
   ~100 are stale year-boards, 23 empty, 32 duplicates, 83 ownerless, and 18 are containers left
   by departed staff. The recommendation is to archive the stale and empty ones and reassign the
   orphans.
3. When Clent says "do it", the OS executes; project archiving needs some manual clicks, which
   route to you with instructions.

**How to check it worked.** The task list reads as current, and the project list stops being a
graveyard. Anything archived can be restored from the kept list.

**How to undo.** Un-archive any task or project. The proposal list is the record.

**Your OK to continue?** The archive check is yours today; the inventory waits on Clent.

---

## Step 6 — one source of truth: reconcile the Drive context docs — Tier 2

**What this does.** The audit found operating-system context documents growing in Drive (context
packs, master index, registers) while the canonical rules live in the `jewell-os` repo. Two
masters of the same rules will drift. This step marks the split: GitHub holds the rules; Drive
holds the live current-context and human summaries.

**Why it helps.** One question — "where is the truth for this?" — always has one answer.

**What it changes.** Adds one header line to each Drive OS doc. Moves nothing, deletes nothing.

**What you do.**
1. List the OS/context docs in Drive (the OS bundle, master index, context packs, registers).
2. Propose the tag for each: *rule → belongs to jewell-os* or *current context / summary → stays
   in Drive*. Send Clent the one-page list: "Recommended split attached. Do it?"
3. On approval, add the header line to each doc: *"Canonical operating rules live in jewell-os.
   This doc is current context / a summary."*
4. Point the daily context pack at the repo instead of restating rules.

**How to check it worked.** Every OS doc in Drive says what it is and where the rules live. No doc
claims to be both.

**How to undo.** Remove the header lines.

**Your OK to continue?**

---

## Step 7 — Friday close and weekly washback — Tier 1 to run, Tier 2 to apply

**What this does.** Friday, 30 minutes: close the week (wins, slips, waiting-on, decisions), then
run the washback — the OS proposes what should become memory, SOP or playbook change. The revised
operating model applies here: the OS drafts both the Friday close and the washback; you review
and approve before anything is filed. Proposals stop at Clent. Nothing self-promotes.

**Why it helps / time saved.** The system starts learning weekly instead of never — without noise
overwriting strategy. Estimate: repeated questions and re-litigated decisions drop within a month.

**What you do.**
1. Friday afternoon: the OS drafts the Friday close
   (`jewell-os/starter-stack/02-starter-packs/operating-rhythm/friday-close.md`). Review it,
   correct it, then file it.
2. Then the washback (`weekly-washback.md`): the OS drafts proposals with evidence and
   confidence. Review them before they go anywhere.
3. Send Clent the proposals. He approves, corrects or rejects each.
4. Route approved items to the decision log or memory; log rejections with the reason. Nothing
   is filed or promoted without your review and the right approval.

**How to check it worked.** Monday's reset starts from the close, not from memory. The decision
log has this week's calls in it.

**How to undo.** It is a ritual — stop doing it. Approved memory changes can be retired at review.

**Your OK to continue?**

---

## What is now live, what it saves, what is parked

| State | Item | Time back |
| --- | --- | --- |
| **Live once you finish Steps 1–3** | Today door daily; meeting-to-actions; connectors verified | 5 to 8 hrs/week |
| **Live after Clent's sign-offs (4–6)** | Clean boundary in Asana; trustworthy task list; one source of truth | 1 to 2 hrs/week + risk removed |
| **Live from Friday (7)** | Weekly close + governed washback | compounds weekly |
| **Parked, deliberately** | Ask Jewell AI evals running green (needs the live endpoint wired); portal role-based answering; Maxxim output library | next build phase |

**If anything felt wrong at any step:** stop, note what happened, tell Clent. The system proposes;
humans decide. That includes you.

**Next:** check this morning's 7:00am brief in Slack (Step 1), then remind Clent of his one
membership click on "Clent — Private" (Step 4).
