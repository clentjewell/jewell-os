# Ronnie's runbook — switching on the Jewell OS

**For:** Ronnie. **From:** the OS build, 7 July 2026. **Approver above you:** Clent.
**How long:** about 2 hours across the day, one step at a time. You can stop after any step.

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

One rule above all: if anything in a step surprises you, stop and ask. A question is never the
wrong move.

---

## Step 1 — the Today door (the morning brief) — Tier 1

**What this does.** Every morning, one brief that answers: what matters today, which meetings need
prep, what is overdue, what is blocked, what needs Clent, what you can handle, and what changed
since yesterday. It reads the work calendar and Asana. It reads only — it changes nothing.

**Why it helps / time saved.** Clent stops assembling his day by hand from 4 tools. Proven live on
7 July against the real calendar and Asana: it caught a double-booking (an in-person appointment
sitting inside the quarterly planning block) and a same-day deadline. Estimate: 30 to 45 minutes
back per day, 3 to 5 hours per week.

**What it changes.** Nothing. Reads only. Personal calendars are excluded from the crawl by
design; at most a single "personal priority" reminder line appears, never the content.

**What you do.**
1. Open the Jewell OS project in Claude Teams.
2. Paste the Today door prompt from `jewell-os/starter-stack/02-starter-packs/operating-rhythm/today-door.md`.
3. Read the brief it returns. Check it against the real calendar for today.
4. Post it to the usual morning channel before the 9:00 Daily Catch-Up.

**How to check it worked.** The brief lists today's real meetings, real overdue items, and flags
any conflict. If it invents a meeting or misses one, stop and flag it — that is an eval failure we
want to know about.

**How to undo.** Stop running it. Nothing persists.

**Your OK to continue?** If the brief was right today, run it daily from tomorrow.

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

## Step 4 — separate personal and legal items out of shared Asana — **Tier 3: wait for Clent**

**What this does.** The 7 July audit found a small number of personal and legal items sitting in
the shared work Asana, visible beyond Clent and you. The itemised list is held privately by Clent
— it is deliberately not written in this document. This step moves those items into a private
project that only Clent and you can see.

**Why it helps.** This is the boundary the whole OS is built on: personal and legal content never
sits where the team or the machine can read it.

**What it changes.** Asana project membership and the location of the listed items. Nothing is
deleted. Fully reversible.

**What you do — only after Clent says go.**
1. Ask Clent for the private audit list.
2. Open the "Personal To do" project settings → members → restrict to Clent + you only.
3. Move each listed item into that private project.
4. Re-check "My Tasks" and the shared projects: nothing personal or legal remains team-visible.
5. Tell Clent it is done and what was moved (verbally or in the private channel — not in a shared
   space).

**How to check it worked.** A team member's view of Asana shows zero personal, legal, health or
family items. Clent confirms against his list.

**How to undo.** Move any item back; re-add members. Nothing was deleted.

**Your OK — and Clent's sign-off — to continue?**

---

## Step 5 — Asana hygiene: archive the graveyard — Tier 2

**What this does.** The audit found the task list is dominated by items dated 2023 to 2024, long
overdue and unowned in practice. This step produces an archive proposal — a list of stale tasks to
archive (never delete), so that due dates start meaning something again.

**Why it helps / time saved.** The Today door can only trust Asana if "overdue" means something.
This is what makes Step 1 compound. Estimate: 1 to 2 hours per week of scanning-and-ignoring
stopped, and a task list the whole team can trust.

**What it changes.** Nothing until Clent approves the list. Then: tasks are archived (recoverable),
not deleted.

**What you do.**
1. Ask the OS to list all incomplete tasks with due dates before 1 January 2026, grouped by
   project, as a proposal.
2. Skim it. Pull out anything that is genuinely still live and re-date it.
3. Send Clent the summary: "N tasks pre-2026 proposed for archive. Recommended: archive all except
   the M I have re-dated. Do it?"
4. On "do it": archive them. Keep the list so anything can be restored.

**How to check it worked.** Open "My Tasks" — what remains is current, owned and dated.

**How to undo.** Un-archive any task. The proposal list is the record.

**Your OK to continue?**

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
run the washback — the OS proposes what should become memory, SOP or playbook change. Proposals
stop at Clent. Nothing self-promotes.

**Why it helps / time saved.** The system starts learning weekly instead of never — without noise
overwriting strategy. Estimate: repeated questions and re-litigated decisions drop within a month.

**What you do.**
1. Friday afternoon: run the Friday close template
   (`starter-stack/02-starter-packs/operating-rhythm/friday-close.md`).
2. Then the washback template (`weekly-washback.md`): it drafts proposals with evidence and
   confidence.
3. Send Clent the proposals. He approves, corrects or rejects each.
4. Route approved items to the decision log or memory; log rejections with the reason.

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

**Next:** run Step 1 tomorrow morning, before the 9:00 catch-up.
