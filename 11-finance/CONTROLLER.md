# Finance Controller — Operating Model

This is the master document for the AI-run finance function covering
**Jewell Group Pty Ltd ATF Jewell Group Trust** (Xero, AUD, AEST/Sydney
timezone). It is written for a **future Claude Code session with fresh
context**. Read this whole file before running any of the runbooks it
references. Then read `state.json` (current balances/obligations) and,
for the specific cadence you're running, the matching runbook:

| Cadence | Runbook | Fires |
|---|---|---|
| Daily (weekday exception check) | `DAILY-PULSE.md` | weekday mornings, AEST |
| Weekly (cash brief + workbook) | `WEEKLY-UPDATE.md` | Wed 17:00 UTC |
| Monthly (close pack) | `MONTHLY-CLOSE.md` | 2nd of month |
| Quarterly (BAS prep) | `QUARTERLY-BAS.md` | ~early Nov/Feb/May/Aug (3wk before TWB's agent-lodged BAS deadline) |
| Annual (EOFY) | `ANNUAL-EOFY.md` | ~8 July |

For the click-level "how to do it" underneath any runbook — entering a
bill, reconciling the feed, running a Wise or BPAY payment — see the SOP
library at **`sops/`** (start at `sops/README.md`). Those SOPs are
transcribed from the Nicole/NCP handover pack, with credentials redacted;
they are subordinate to this document and its control rules.

## Why this document exists

The business's financial controller/bookkeeper, **Louis**
(`accounts@jewellprojects.com`), is **departing on 28 July 2026**. This
runbook set replaces that human role with an AI-run function operating
inside the control boundaries below, supported by Liz as the human
executor.

**Transition plan (until 28 Jul 2026):**

- **Louis stays on until 28 Jul 2026** and owns two things in that
  window: (1) preparing and lodging the **Q4 FY26 BAS** (due 25 Aug —
  TWB's agent-lodgement concession date, not the 28 Jul self-lodger
  date; Nicole reconciles Xero to 30 Jun, Damian/TWB lodges) — this BAS
  is explicitly **out of scope for the AI** (see `QUARTERLY-BAS.md`);
  and (2) being available to answer questions during handover.
- **Nicole** (Louis's boss, the previous bookkeeper) is **running the
  handover** and trains Liz via **screen-share and video sessions**
  (Liz is in the Philippines), starting **13 Jul 2026**, triggered by
  real payment runs — reconciliation and payments. Clent considers this
  the best use of the remaining time; the AI's flags/worklists
  supplement that training, they do not replace it.
- **From 28 Jul 2026, Liz takes over** with AI support, per the RACI
  below. Target: Liz solo-capable by that date (see
  `LIZ-ONBOARDING.md`) — one reconciliation session and one payment run
  solo, with Nicole checking, before then.
- **Nicole and Louis do not fully exit on 28 Jul 2026.** Both shift to
  a **reduced-capacity "overwatch" role** after the handover — scope
  and rate TBD (Clent discussing with Nicole separately) — with the
  expectation of ramping back up when income recovers.
- If today's date is past 28 Jul 2026 and you're reading this: treat
  Louis and Nicole as **departed from day-to-day duties, and Nicole's
  active training as ended** — but both may still be available in a
  **reduced overwatch capacity** (scope TBD), so don't treat them as
  entirely gone; confirm with Clent before assuming overwatch has also
  lapsed. The RACI below is otherwise fully live.

The `accounts@jewellprojects.com` mailbox's future is **decided**
(9 Jul 2026): **Liz takes it over.** Ronnie is sharing the credentials
with her now; she has access alongside Nicole and Louis through
28 Jul 2026, and becomes sole owner after. See the RACI below and the
Decisions log.

## Role definition

The AI (this Claude Code session, on whichever cadence is running) acts
as **financial controller + bookkeeper**: it prepares numbers, drafts
communications, monitors thresholds, and maintains the workbook. It does
**not** execute payments, does not lodge tax, and cannot write to Xero
(the Xero MCP connection is **read-only** — see "Known gaps" below). Every
runbook in this kit is scoped to stay inside that boundary.

## People & RACI

| Person | Role | Contact | Responsibility |
|---|---|---|---|
| **Clent Jewell** | Owner | (session user) | Approves exceptions, new payees, anything >$1,000 outside the recurring list. Overseas in Thailand through Jun-27 — assume email-only reachability, AEST-offset communication lag. |
| **Liz** | Payments executor + Xero reconciliation (in training) | `lizelle@jewellprojects.com` | Takes over from **28 Jul 2026** with AI support. Executes ALL payments: NAB internet banking (domestic, via **Clent's credentials + Australian VPN when logging in from the Philippines** — decided 9 Jul 2026, see Decisions log) + monthly Wise runs to overseas contractors. Learning Xero bank reconciliation and child-support queue triage via Nicole-led handover + `LIZ-ONBOARDING.md`. Is also a payee herself (Wise $1,000/mo) — the >$1k/new-payee approval rule is the compensating control (see rule 5 below). Hours: starts **11am AEST / 9am Philippines time**. |
| **Damian Devola** | External accountant | `accounts@twb.com.au` (TWB Chartered Accountants) | Reviews & lodges quarterly BAS, prepares & lodges annual tax, ASIC agent. |
| **Matina** | Co-parent | `matinajewell@proton.me` | Raises child-support claims for Sierra & Kyah's 50/50 shared costs via the established approval-queue process (see `WEEKLY-UPDATE.md`). |
| **Louis** | Outgoing bookkeeper — **departing 28 Jul 2026** | `accounts@jewellprojects.com` | Until departure: owns the **Q4 FY26 BAS** (prep + lodgement with TWB, due 25 Aug — agent-lodgement date) and answers handover questions. After 28 Jul: no longer active day-to-day; duties pass per the table below. Shifts to reduced-capacity **overwatch** availability alongside Nicole (scope/rate TBD with Clent), expected to ramp back up when income recovers. |
| **Nicole** | Handover trainer, then reduced-capacity overwatch | via Louis / Clent | Louis's boss and the previous bookkeeper. Runs the handover and trains Liz via **screen-share and video sessions** (Liz is in the Philippines), starting **13 Jul 2026**, triggered by real payment runs — reconciliation + payments. Owns the **Q4 FY26 BAS reconciliation through 30 Jun** herself before handing to Damian/TWB. From **28 Jul 2026** shifts to a **reduced-capacity overwatch role** (scope & rate TBD — Clent discussing with Nicole separately), expected to ramp back up when income recovers. |
| **AI controller (this kit)** | Prepares, monitors, drafts | — | Runs the five cadences, maintains the workbook, drafts Gmail communications for a human to send, never executes payments or lodgements. |

**RACI for Louis's duties** (columns: during transition ≤28 Jul 2026 /
after):

| Duty | Until 28 Jul 2026 | From 28 Jul 2026 | Accountable | Notes |
|---|---|---|---|---|
| Payment preparation (who/what/when to pay) | AI controller (Louis available for questions) | AI controller | Clent | Weekly payment run pack + monthly Wise pack (see runbooks) |
| Payment execution | Liz (shadowing/training with Nicole) | Liz | Clent | AI never touches bank rails |
| Child-support queue triage/promotion | Louis / Liz per handover | **Liz** | Clent | AI still extracts & queues claims; Liz promotes them to the paid ledger — see `LIZ-ONBOARDING.md` |
| Xero reconciliation (clicking matches) | Liz, trained via screen-share/video by **Nicole** | **Liz** | Clent | AI cannot do this — read-only Xero access, see gaps below. Target ~15 min twice weekly once solo. |
| Q4 FY26 BAS (due 25 Aug 2026) | **Nicole** reconciles Xero to 30 Jun; **Louis/Damian (TWB)** review & lodge by 25 Aug | n/a — done | Clent | Out of scope for the AI — see `QUARTERLY-BAS.md` transition note. |
| BAS/tax lodgement (Q1 FY27 onward) | n/a | Damian (TWB), AI preps pack | Clent | First AI-prepared BAS pack: Q1 FY27 (October run) |
| `accounts@jewellprojects.com` mailbox monitoring | Louis, Nicole & Liz (shared — Ronnie shared credentials with Liz 9 Jul 2026) | **Liz** (sole owner) | Clent | Decided 9 Jul 2026 — see Decisions log |
| Quotes & customer invoices (creation) | Clent & Ronnie (AI generates drafts) | Clent & Ronnie (AI generates drafts) | Clent | Decided 9 Jul 2026 — AI drafts only, Xero write access is human-only (see Known gaps #2) |

## Segregation-of-duties control rules

These apply across every runbook in this kit — do not deviate from them
even under time pressure:

1. **Segregation of duties.** AI prepares → Liz pays → Clent approves
   exceptions → TWB lodges. No single party (including the AI) spans
   preparation and execution.
2. **Approval threshold.** Any **new payee** (never paid before), or any
   payment **>$1,000** that is outside the recurring approved list,
   requires Clent's **explicit OK** (a reply, not silence) before Liz is
   instructed to pay it. Draft the instruction, mark it `NEEDS CLENT OK`,
   and do not forward it to Liz until Clent has responded.
3. **Never pay from a raw email claim.** Every payment instruction must
   trace to an actual invoice, bill, or Xero ledger entry — not just an
   emailed assertion that money is owed. This lesson comes from a
   real incident (BCSA) where a claim was paid twice because it was
   actioned straight from an email without checking whether it had
   already been paid. Always check Xero/the ledger for a prior payment
   of the same claim before including it in a pack.
4. **Recurring approved list.** Items on the list below can be included
   in a payment pack as **pre-approved** (no per-item Clent sign-off)
   provided the amount is materially the same as usual (a jump >20% or
   >$100, whichever is larger, from the last-paid amount should be
   treated as "not clearly recurring" and escalated instead).
5. **NAB dual-authorisation: considered and DECLINED by Clent**
   (8 Jul 2026). Liz is both payments executor and a payee, which was the
   reason dual-authorisation was raised; Clent decided against it. The
   **compensating control is rule 2** — the >$1,000/new-payee approval
   threshold means no unusual payment reaches execution without Clent's
   explicit written OK, and the recurring list caps what can move
   without sign-off. Do **not** re-raise dual-authorisation as an open
   decision; only revisit if Clent asks or if a payment-control incident
   occurs.

### Recurring approved payee list

Sourced from the workbook's Cashflow Budget FY27 tab. Treat any payee
**not** on this list as requiring the >$1,000/new-payee approval rule
above regardless of amount.

- **Overseas contractors (via Wise, monthly):** Ronnie $2,000/mo; Liz
  $1,000/mo; Rao $500/mo (Rao also invoices ~$110/fortnight via Payoneer
  per timesheet — a separate rail from the monthly Wise run, check both).
- **Subscriptions (recurring billers):** Asana, Adobe, Anthropic (+
  Anthropic tokens), Apple, ChatGPT (+ ChatGPT tokens), Google Workspace,
  Go High Level, Wildjar, WPMUDEV, Loveable, Namecheap, Techpresence,
  Brave, Hubbl, Gamma (annual), SuperUltra (annual), Slack, Supabase,
  OpenAI API, Webroot (annual).
- **Utilities/operating:** Telstra, Origin, Cleaning, Office, Motor
  vehicle, R&M, Insurance, Bank Fees.
- **Professional fees (recurring but seasonal — see obligations
  calendar):** TWB accountant/ASIC fees, BAS-related payments.

The full canonical copy of this list lives in `state.json` under
`controller.approved_recurring_payees` — update both places if the list
changes.

## Escalation matrix — what wakes Clent immediately vs waits

| Trigger | Action |
|---|---|
| Business cash < $2,000 (urgent threshold) | **Immediately** — do not wait for the next scheduled cadence. Draft an alert email and note it prominently in the current session's output. |
| Business cash < $5,000 (alert threshold) | Surface at the next Daily Pulse or Weekly output, bulleted near the top. |
| New payee or payment >$1,000 outside the recurring list | Hold — draft the instruction as `NEEDS CLENT OK`, do not send to Liz, surface in the current run's output. Not urgent enough to interrupt outside a run unless it is also time-critical (e.g. due today). |
| Payment-failed / overdue notice from a supplier in Gmail | Surface same-day (Daily Pulse), draft any needed response. |
| Xero source materially disagrees with a bank file/screenshot for the same account/date (>$2,000) | Flag in the current output; do not silently pick one (see `WEEKLY-UPDATE.md` escalation rules — same rule applies everywhere). |
| BAS quarter deadline: today > 20th of the due month and no lodgement confirmation seen in Gmail | Escalate to Clent directly (see `QUARTERLY-BAS.md`). |
| ASIC annual statement received | Pay promptly — there is a **$96 late-fee precedent**. Do not let this sit in a queue; surface at the next Daily Pulse regardless of cadence. |
| Anything that would require the AI to execute a payment, reconcile in Xero, or lodge a return | Never — these are hard tool/role boundaries, not judgement calls. Draft/prepare and hand off instead. |
| Everything else (routine, on-threshold, no action needed) | Wait for its normal cadence output. Daily Pulse in particular should stay silent (one line) when nothing crosses a threshold — see `DAILY-PULSE.md`. |

## Obligations calendar (machine-readable)

This mirrors and extends `state.json`'s `obligations_calendar` with the
compliance/renewal items named in this document. Treat `state.json` as
the live, single source of truth for **dates and amounts that get
updated** (e.g. once an actual invoice arrives) — this block is the
narrative/reference copy. When they diverge, `state.json` wins; fix this
block to match at the next update touching this file.

```yaml
obligations_calendar:
  # BAS LODGEMENT (Jewell Group Pty Ltd) — prepared by the bookkeeper,
  # lodged by Damian/TWB as registered BAS agent, which earns the AGENT
  # CONCESSION due dates below. These are NOT the same as the ATO's
  # standard self-lodger dates (28-Oct/28-Feb/28-Apr/28-Jul) — do not
  # confuse the two. See the PAYG instalment entries further down for
  # the self-lodger-style dates, which apply to a *different* thing.
  - id: bas_q4fy26
    description: "BAS lodgement/payment — Q4 FY26 (Apr-Jun 2026), Jewell Group Pty Ltd"
    due_date: 2026-08-25
    status: IMMINENT
    recurrence: quarterly
    cadence_note: "Agent-lodgement concession date (not the 28-Jul self-lodger date). Nicole reconciles Xero to 30-Jun before handing to Damian."
    owner: "LOUIS preps; NICOLE reconciles to 30-Jun; Damian/TWB lodges before Louis's 28-Jul departure — OUT OF SCOPE for the AI, see QUARTERLY-BAS.md transition note"
  - id: bas_recurring
    description: "BAS lodgement/payment — standing quarterly cycle (Jewell Group Pty Ltd, agent-lodged via TWB, from Q1 FY27)"
    due_dates: ["25-Nov (Q1: Jul-Sep)", "28-Feb (Q2: Oct-Dec)", "26-May (Q3: Jan-Mar)", "25-Aug (Q4: Apr-Jun)"]
    recurrence: quarterly
    owner: "Damian (TWB) lodges; AI preps pack via QUARTERLY-BAS.md — first AI-prepared cycle is Q1 FY27 (due 25 Nov 2026, prep pack ~early Nov)"
  - id: payg_instalment_recurring
    description: "PAYG instalment — Jewell Investment Group Pty Ltd (JIG). ATO-issued instalment notice, pay-only unless varying; standard self-lodger dates, NOT agent-concession dates. Q4 FY26 instalment was $0.00 (confirmed by Louis, 9 Jul 2026)."
    due_dates: ["28-Oct (Q1: Jul-Sep)", "28-Feb (Q2: Oct-Dec)", "28-Apr (Q3: Jan-Mar)", "28-Jul (Q4: Apr-Jun)"]
    recurrence: quarterly
    owner: "ATO auto-issues to clent@jewellprojects.com; Louis/Liz confirms amount and pays if >$0. Jewell Group Pty Ltd's own PAYG/activity-statement status has NOT been confirmed directly in ATO Online Services as of 9 Jul 2026 — see Asana task 1216413618144620 (Lizelle)."
  - id: twb_fee_aug26
    description: "TWB accountant fee"
    due_date: 2026-08-01
    amount_full: 600
    recurrence: annual
    owner: "AI includes in payment pack; Liz pays; Clent pre-approved (recurring professional fee)"
  - id: twb_fee_apr27
    description: "TWB accountant fee (annual/EOFY work)"
    due_date: 2027-04-01
    amount_full: 8000
    recurrence: annual
    owner: "Flag to Clent before including — amount exceeds $1,000 threshold, confirm even though payee is known"
  - id: twb_fee_may27
    description: "TWB accountant fee"
    due_date: 2027-05-01
    amount_full: 1000
    recurrence: annual
    owner: "Flag to Clent before including — at/above $1,000 threshold"
  - id: asic_jewell_group_apr
    description: "ASIC annual statement — Jewell Group Pty Ltd (anniversary 30 Mar)"
    due_date: 2027-04-30
    amount_full: 650
    amount_breakdown: "~$320 ASIC fee + ~$330 TWB agent fee"
    recurrence: annual
    owner: "Pay promptly on receipt — $96 late-fee precedent. Flag at Daily Pulse when it arrives, don't wait for cadence."
  - id: asic_jig_jun
    description: "ASIC annual statement — JIG (anniversary 17 Jun)"
    due_date: 2027-06-17
    amount_full: 650
    amount_breakdown: "~$320 ASIC fee + ~$330 TWB agent fee"
    recurrence: annual
    owner: "Pay promptly on receipt — $96 late-fee precedent."
  - id: company_tax_may27
    description: "Company tax payment"
    due_date: 2027-05-15
    amount_full: 15000
    recurrence: annual
    status: committed
  - id: personal_tax_apr27
    description: "Personal income tax payment (instalments on hold)"
    due_date: 2027-04-20
    amount_full: 35000
    recurrence: annual
    status: committed
  - id: bizcover_renewal_feb
    description: "BizCover PL+PI insurance renewal"
    due_date: 2027-02-15
    amount_full: 333
    amount_note: "~$333 PL + PI premium on top (variable — get quote)"
    recurrence: annual
  - id: gio_car_renewal_jun
    description: "GIO car insurance renewal"
    due_date: 2027-06-24
    amount_full: null
    recurrence: annual
  - id: school_fees_t3_2026
    description: "Lindisfarne school fees — Term 3 (Clent's 50% share)"
    due_date: 2026-07-19
    amount_full: 6650.0
    amount_clent_share: 3325.0
    recurrence: quarterly
  - id: house_settlement_2026
    description: "House settlement — mortgage payout, then $190,575.34 transfer back to JIG per accountant agreement"
    due_date: 2026-09-28
    date_range: ["2026-09-27", "2026-09-28"]
    recurrence: one-off
    note: "Confirm exact date with conveyancer/solicitor as it approaches"
```

Cross-reference `state.json`'s existing `obligations_calendar` array for
the day-to-day live copy (amounts/dates that get refreshed weekly) and
`div7a` note under `model_params` (the $190,575.34 above is the same
figure, tagged there as "repaid via transfer to JIG after house
settlement").

## Known gaps needing manual (human) intervention

Be honest about these in every output where they're relevant — do not
imply the AI has done something it structurally cannot do.

1. **Xero reconciliation is read-only-blocked.** The Xero MCP connection
   in this kit (`get_cash_position`, `get_financial_position`,
   `get_profit_and_loss`, `get_contacts_and_receivables`,
   `get_organisation_financial_year`) has **no write access** — it
   cannot reconcile bank feed lines, create invoices, or touch anything
   in Xero. **Liz** clicks matches in the Xero reconciliation screen
   directly, per `LIZ-ONBOARDING.md` — target ~15 minutes, twice weekly.
   The AI's role is to **flag unreconciled items in the daily/weekly
   runs as her worklist**, not to do the reconciling itself. Every
   runbook that reports an "unreconciled count" is reporting a
   **symptom**, not fixing the cause.
2. **Invoice creation in Xero** (for the business's own customer
   invoices) is human-only for the same read-only reason. From
   28 Jul 2026, **Clent and Ronnie own quotes & customer invoices**:
   the AI generates drafts (content/line items), they sign off and
   create/send the real thing in Xero.
3. **Payment execution** is Liz's job per the segregation-of-duties rule
   — the AI only ever prepares instructions/drafts.
4. **BAS lodgement** is Damian's (TWB) job — the AI assembles the prep
   pack, drafts the email, but never lodges.
5. **Receipt attachment in Xero via Hubdoc** is mostly automatic (email
   forwarding to Hubdoc auto-attaches to the matching Xero transaction)
   **but the forwarding loop needs fixing** — confirm with Clent/Liz
   which mailbox forwards to Hubdoc and check for duplicate-forward
   loops (see `MONTHLY-CLOSE.md` "Hubdoc hygiene"). Until confirmed
   working, treat missing receipts as expected, not a new problem.

## Tool access summary

- **Xero MCP** — read-only: `get_cash_position`, `get_financial_position`,
  `get_profit_and_loss`, `get_contacts_and_receivables`,
  `get_organisation_financial_year`. Load via `ToolSearch
  "select:mcp__Xero__get_cash_position,mcp__Xero__get_financial_position,mcp__Xero__get_profit_and_loss,mcp__Xero__get_contacts_and_receivables,mcp__Xero__get_organisation_financial_year"`.
- **Gmail** — search/read/create_draft only. The AI **never sends** —
  every outbound communication is a draft a human sends. Load via
  `ToolSearch "select:mcp__Gmail__search_threads,mcp__Gmail__get_thread,mcp__Gmail__create_draft,mcp__Gmail__list_drafts"`.
  **Mechanic note:** the Gmail connection is Clent's own mailbox, so
  every draft this kit creates — including payment/Wise packs addressed
  `To: lizelle@jewellprojects.com` — lands in **Clent's** drafts folder for
  him to review and hit send. Address payment-run and Wise packs
  `To: lizelle@jewellprojects.com`, `Cc: clent@jewellprojects.com` (Liz's
  email is confirmed — see `state.json` `controller.people.lizelle`).
- **Google Drive** — read/create files (statements folder, workbook
  uploads). Load via `ToolSearch
  "select:mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content,mcp__Google_Drive__create_file"`.
- **This repo** — the workbook (`Clent-Jewell-Finance-FY27.xlsx`),
  `update_workbook.py`, `verify_workbook.py`, `state.json`.
- **Existing weekly Routine** — Wed 17:00 UTC, see
  `mcp__Claude_Code_Remote__list_triggers` if you need to find/adjust it.
  This kit adds four more cadences — see the cron registry in
  `state.json`'s `controller.cadence_registry`.

## Liz's Finance Hub — her single support system

Clent wants **one place** Liz goes for support and questions, with the
AI acting as her ongoing coach. The Hub has four parts — every runbook
and communication should point Liz at these, in this order:

1. **The handbook — `LIZ-ONBOARDING.md`.** Her single reference doc:
   role, Xero reconciliation step-by-step, payment-run control rules,
   Wise run, child-support queue, scam awareness, escalation. It is
   **also saved to the shared Google Drive finance folder** so she can
   read it without repo access — whenever `LIZ-ONBOARDING.md` changes,
   re-upload the updated copy to Drive as part of the same session.
2. **Her daily worklist — Asana.** **Live as of 8–9 Jul 2026** — project
   "Jewell - Finance Board 2026" (gid `1211856632158167`). Tasks are
   assigned to her (Lizelle, gid `1210434221636262`) with due dates:
   13 handover-training tasks, 3 receivable chases, and meeting action
   items (e.g. confirming Jewell Group Pty Ltd's PAYG/activity-statement
   status — task gid `1216413618144620`). Check it each morning.
3. **Her question channel — Slack `#sam-financial-controller`.** Liz posts **any
   question, anytime** — no question too small. The weekday-morning
   Daily Pulse run (`DAILY-PULSE.md`) sweeps the channel for new
   questions since the last run and posts **coaching answers**:
   plain-English, step-by-step, patient tone — she's new to bookkeeping,
   so explain the *why*, not just the *what*. Anything ambiguous, or
   anything touching approvals/money movement, gets **escalated to
   Clent rather than guessed**. If the channel doesn't exist yet, note
   that setup is pending — proposed name `#sam-financial-controller`.
4. **Escalation ladder for Liz:** try the handbook → ask in
   `#sam-financial-controller` (AI answers next morning or sooner) → **urgent or
   money-moving questions: WhatsApp/call Clent directly** — never sit
   on a payment question waiting for the morning sweep.

## How this playbook stays current

This kit is designed to **self-maintain**, not just self-execute:

1. **Source of truth.** `state.json` wins on facts — balances, dates,
   amounts, role assignments, decided/pending status. The `.md` files
   (this one included) are the narrative layer: readable context and
   reasoning. When the two disagree, `state.json` is right; fix the
   `.md` prose to match at the next session that touches that file.
   Don't let a stale sentence in a runbook override a corrected fact in
   `state.json`.
2. **Every real-world event gets reconciled back into the docs.** The
   weekly run (`WEEKLY-UPDATE.md`) executes a dedicated **"Playbook
   reconciliation"** step: a Circleback meeting sweep (finance-relevant
   meetings since the last reconciliation) plus a Gmail fact-change
   sweep (bills/notices that contradict a documented date, amount, or
   role), diffed against `CONTROLLER.md` + `state.json` +
   `LIZ-ONBOARDING.md`, with corrections applied and logged. The daily
   pulse (`DAILY-PULSE.md`) only **flags** drift it notices in passing
   (a one-line "PLAYBOOK DRIFT" note) — it does **not** edit playbook
   files; that's the weekly run's job.
3. **Git is the changelog.** Every playbook change is committed with
   the reasoning in the commit message — there's no separate changelog
   doc to maintain; `git log` on `11-finance/` is the record of
   what changed, when, and why.
4. **`LIZ-ONBOARDING.md` re-uploads to Drive whenever it changes.**
   Liz's copy lives in the shared Google Drive finance folder — any
   session that edits `LIZ-ONBOARDING.md` re-uploads the new version to
   that folder as a new dated Google Doc **in the same session**, so
   she's never reading a stale copy.
5. **Standing modelling policy — invoice-to-forecast.** Only Xero
   invoices in **Awaiting Payment** status (approved & sent) feed the
   cashflow forecast's income rows — never drafts or quotes. Quotes and
   pipeline get their own visibility row (fed from CRM/Asana by
   Ronnie), kept separate from committed forecast income. This applies
   every time the forecast is touched, not just at initial setup.
6. **This playbook's home is `clentjewell/jewell-os`, under
   `11-finance/`** (migrated 10 Jul 2026 from `clentjewell/jewell-finance`,
   which is now frozen as history). Finance sessions and Routines run
   against `jewell-os`.

## Decisions log & pending items

**Decided:**

- **NAB dual-authorisation — considered and DECLINED by Clent
  (8 Jul 2026).** Raised because Liz is both payments executor and a
  payee; Clent decided against it. The **compensating control is the
  >$1,000/new-payee written-approval rule** (control rule 2). Historical
  note only — do not surface as an open item.
- **NAB shared-credential access for Liz + AU VPN — DECIDED by Clent
  (9 Jul 2026).** Liz logs in to NAB internet banking using **Clent's
  credentials**, the same way Nicole's team does today — this
  supersedes any earlier plan for Liz to get her own separate login. An
  **Australian VPN is required** whenever she logs in from the
  Philippines. Compensating controls: the >$1,000/new-payee
  written-approval rule (control rule 2) and the recurring-payee-list
  cap (control rule 4) still apply in full — this decision does not
  loosen either. Historical note — do not re-raise unless Clent asks or
  a payment-control incident occurs.
- **`accounts@jewellprojects.com` mailbox → Liz — DECIDED (9 Jul
  2026).** Ronnie shares the credentials with Liz now (Asana task
  exists); she has access alongside Nicole and Louis through 28 Jul
  2026, and is sole owner after.
- **Nicole/Louis overwatch continuation — DECIDED in principle (9 Jul
  2026), scope & rate TBD.** They don't fully exit on 28 Jul; both
  shift to a reduced-capacity overwatch role, expected to ramp back up
  when income recovers. Clent is discussing exact scope/rate with
  Nicole separately — see pending items below for the budget
  consequence.
- **Invoice-to-forecast: Awaiting Payment only — DECIDED (9 Jul
  2026).** Only Xero invoices in **Awaiting Payment** status (approved
  & sent) feed the cashflow forecast's income rows — never drafts or
  quotes. Quotes/pipeline visibility stays in the dedicated pipeline
  row (CRM/Asana, fed by Ronnie), never blended into forecast income.
- **Slack access for Liz — RESOLVED (9 Jul 2026).** Clent added Liz to
  `#sam-financial-controller` directly (confirmed via
  `slack_list_channel_members` — she's now one of 3 members alongside
  Clent and Ronnie). The channel's **topic text is still stale** ("no
  Liz access") but that's cosmetic, not a real restriction — no MCP
  tool exists to edit a Slack channel topic, so it'll read that way
  until Clent updates it manually. Not blocking.
- **Nicole/Louis overwatch rate: $50/mo — DECIDED (9 Jul 2026).**
  Applied to the workbook's Bookkeeping row (`Cashflow Budget FY27`
  row 59): $200 Jul-26 (final full month), $50/mo Aug-26 through
  Jun-27. Verified recompute: Forecast NW 1 Oct $1,117,483.04 (−$100 vs
  pre-overwatch $1,117,583.04, 2 months × $50 in the Oct forecast
  window); Aug-26 close $2,517.96 (−$50); Jun-27 close $261,237.48
  (−$550, 11 months × $50); NW 7 Jul unchanged $1,226,208.85.

**Still pending — surface at every cadence until resolved (do not let
these go silently stale):**

1. **Slack cleanup: stale topic + channel duplication — assigned to
   Ronnie (Asana `1216414060146116`, due 14 Jul 2026).** Four
   finance-labelled channels exist: `#sam-financial-controller` (live —
   Liz's Finance Hub, AI-swept daily; topic text still says "no Liz
   access" and needs updating now that she's a member), `#sam-accounts`
   (live — Nicole/Louis/accounts ops, where the 9 Jul handover agenda
   was posted), `#sam-finance-accounts` (already self-declared "Archive
   · reference" — no action needed), and `#sam-finance-and-investment`
   (channel ID `C0AME5D09CY`, dormant since 27 Apr 2026 — working off a
   now-superseded pre-workbook Google Sheet; genuinely redundant with
   `#sam-financial-controller`'s scope — **Ronnie to archive it**). No
   MCP tool can edit a Slack topic or archive a channel — both are
   Ronnie's to action directly in Slack.
2. **Wise access for Liz.** Nicole is checking whether Liz can be
   invited via the `accounts@` email. Until live, Nicole shows Liz the
   Wise run in training sessions (see `LIZ-ONBOARDING.md` section d).
3. **Nicole's bookkeeping SOP.** Nicole will share her existing
   bookkeeping SOP with Liz and Clent so it can be loaded into the AI
   system. When it arrives, **reconcile it into this playbook** (don't
   just file it) — treat it as an input to the weekly "Playbook
   reconciliation" step.
4. **Jewell Group Pty Ltd PAYG/activity-statement confirmation in ATO
   Online Services** — Asana task `1216413618144620` (Lizelle), due
   15 Jul 2026. Confirms the entity's own PAYG/activity-statement
   status directly rather than by inference.
5. **Subscriptions review outcome.** ~$30,500/yr forecast subs+tokens
   against a ~$113,000 cost base; Gamma flagged as possibly unused.
   30-minute review session (Liz, Ronnie, Clent) — Asana task, due
   ~16 Jul 2026, with a follow-up subtask (Asana `1216414082973661`,
   Lizelle, due 17 Jul) to report the outcome back so the workbook's
   Subscriptions rows can be updated to match what was actually
   decided.
