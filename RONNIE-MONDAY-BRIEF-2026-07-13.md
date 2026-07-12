# Ronnie — Monday brief

**For:** Ronnie. **From:** the OS. **As at:** 8:00am NSW, Monday 13 July 2026.
**Approver above you:** Clent. **Full history:** `06-memory/decision-log.md`.

One page to start the week. What is going on, what is done, what you and Clent need to do,
in the order to do it. Read this, then check the 7:00am Today door in Slack.

---

## The situation, in 3 lines

- The operating system is built and largely running. Nightly sweeps, the daily brief and the
  finance cadence are live. The machine is working; the backlog is human sign-offs, not code.
- We have too many threads open at once. This brief groups them and sets one sequence, so we
  do the most important thing first and the next thing after it.
- The goal this week is plain: remove live risk, then get on with income. Everything below
  serves that.

## The constraint that shapes today

Fable credits are spent on the current plan. The team plan is only 7% used, and the usable
Fable window closes after 3:00pm NSW today. So Fable and Opus orchestrate only the few tasks
that truly need top-model reasoning before 3:00pm; Sonnet and Haiku carry the mechanical work.
Spend the morning window on items 1, 3 and 4 below. Do not burn it on tidy-up.

---

## Do-first sequence — start at the top, work down

The single most important thing is item 1. Do not skip ahead.

1. **Close the 2 live security exposures (minutes, highest value).**
   - Plaintext link and password sitting in the "Clent - 2026" Asana board notes field, visible
     to every work-board member. Remove it — the AI cannot write to a notes field, only you can.
     *Ronnie, Tier 1, now.*
   - 2 live API keys (Tavily bearer, OpenAI) found in the Drive n8n workflow exports. These
     need rotating at source. *Clent, Tier 3 — flag to him first thing.*

2. **Keep the finance handover on rails.** Louis departs 28 July; Liz runs finance solo from
   then; Nicole's training of Liz starts today, 13 July. Confirm the Wise-access question for Liz
   is resolved and the subscriptions review lands by 16 July. Continuity here is time-critical.
   *Ronnie + Clent.*

3. **Get Clent's one-word go on the Work OS Plan.** The minimum-viable-system build is written
   and waiting on him (`WORK-OS-PLAN.md`). One word unblocks the whole rebuild. Put it in front
   of him this morning. *Clent, Tier 2.*

4. **Move on income.** These are the point of everything else.
   - Sign 2 of the 3 warm ~$5K projects — Adam Hall, Meridian, Ultimate Nutrition (KR1.2).
     *Clent + Ronnie.*
   - Lock Jewell Tyres capital-raise terms before Christy's July visit (KR1.3). *Clent.*
   - Decide the Jewell Tyres pre-sell ad pilot as the first vibe-marketing test. It is blocked
     on the Meta Ads connector and your pilot pick. *Clent.*

5. **Activate the housekeeping that makes the OS trustworthy** (after the morning window):
   - PR #2 (open draft) — add its 2 repo secrets (`ASANA_TOKEN`, `REGISTRY_GH_TOKEN`), then run
     its registry-sync workflow once. Turns on nightly project-registry sync. *Ronnie, Tier 1.*
   - Arm the nightly Life OS refresh — it is defined and approved but needs one interactive click
     to start firing. *Ronnie, Tier 1.*
   - Slack tidy due 14 July (tomorrow): fix the stale finance-channel topic, archive the dormant
     `#sam-finance-and-investment`. *Ronnie.*

Everything past this line is context. Act on the 5 above first.

---

## Waiting on Clent (Tier 3 — his call, no automation)

- Rotate the 2 exposed API keys (see item 1).
- Approve n8n Cloud (about €20–24/mo) as the glue layer and the move to right-sized models.
- Approve the Meta Ads connector and pick the vibe-marketing pilot.
- Decide the personal/legal/health references found in 3 shared Drive docs — move or leave.
- Confirm the private-repo structure before any health, legal or personal-finance content moves
  into git.
- Confirm the draft OKR targets in `02-okrs/OKRS-2026-H2.md`.
- Open Maxxim questions: repo visibility, integration depth, and the partner model.

## On Ronnie's desk (Tier 1 / Tier 2)

- Verify "Clent - Personal" Asana membership is exactly Clent, Ronnie, Liz — no drift.
- Rescue Sam's local intelligence artifacts before the Mac Mini is decommissioned — tech-intel
  log, GEO/SEO log, intelligence-bank brief, meeting notes (with Raef, KR3.3). Risk of permanent
  loss; escalate anything personal to Clent.
- Retire the 2 duplicate Sam-side briefs (8:30am prep note, 7:00am Xero brief).
- Work the Asana backlog clicks: 23 empty, 32 duplicate, 83 ownerless projects, ~240 orphaned
  tasks. The monthly routine proposes; the project-level clicks are yours.
- Own KR1.1 (Pottsville flagship), KR3.1 (run daily ops through the runbook), co-own KR3.3
  (Sam migration, decommission the gateway safely with Raef).

---

## What is live and running (the machine is working)

- Today door daily brief — weekdays 7:00am NSW, Slack, read-only, with a runway line.
- Nightly intelligence sweep — 2:30am, `#sam-ingest` and followed sources into `06-memory/`.
- Nightly Drive rules-summary sync — 2:00am.
- Circleback meeting sweep — 4:00pm daily, proposal-only.
- Finance cadence — Daily Pulse weekday mornings, Weekly Update Wednesday, Monthly Close on the 2nd.
- Liz's Finance Hub — Asana board plus `#sam-financial-controller`, live.
- Monthly Asana hygiene from 1 August; monthly security review on the 15th.
- Intelligence pipeline following TJ Digital as the first auto-follow.

## Projects in flight

| Project | Status |
| --- | --- |
| Jewell Life OS (work + personal) | Live, established 11 July |
| Work OS Plan (capstone rebuild) | Proposed — awaiting Clent's go |
| Finance handover (Louis → Liz via Nicole) | In progress — target 28 July |
| Intelligence inbox / thought-leader pipeline | Live |
| Vibe-marketing / Jewell Tyres ad pilot | Blocked — connector + Clent's pick |
| Sam migration / Mac Mini retirement | In progress — blocked on residual list |
| Warm ~$5K pipeline (3 projects) | In progress |
| Jewell Tyres capital raise | Blocked — terms before Christy's visit |
| Pottsville flagship retainer | Live — gates in progress |
| Maxxim platform (founding cohort) | Live / proposed |
| Personal repo build-out | Scaffolded — deepening gated to Clent |
| Repo guardrails (branch protection, gitleaks) | Parked — owner Raef |

## This week's dates

- 13 Jul — Nicole starts training Liz.
- 14 Jul — Slack cleanup due; PAYG confirmation due 15 Jul.
- 16–17 Jul — subscriptions review outcome and follow-up.
- 19 Jul — Term 3 school fees due (personal; amount held in `11-finance/`).
- 28 Jul — Louis departs; Liz solo; TWB fee $600 due 1 Aug.
- 25 Aug — Q4 FY26 BAS lodgement.
- October — daylight saving: retime the AEST-anchored crons.

## Finance watch

Xero is read-only; the AI drafts, Liz executes from 28 July, Clent approves anything over
$1,000 or any new payee. Open: Wise access for Liz, Nicole's SOP not yet reconciled, Hubdoc
receipt loop unconfirmed, subscriptions review (~$30,500/yr) pending. Q4 BAS stays with
Louis, Nicole and Damian — out of scope for the AI.

## Parked on purpose (do not churn on these)

Eval CI gate and the Ask Jewell AI endpoint; portals and role-based answering; one-board-per-client
Asana shift; Drive duplication cleanup; agent-memory platforms (rejected); NAB dual-authorisation
(declined by Clent, do not re-raise).

---

**Next:** Ronnie clears item 1 before the 9:00 catch-up, then puts items 3 and 4 in front of
Clent while the Fable window is open. Everything else follows in the order above.
