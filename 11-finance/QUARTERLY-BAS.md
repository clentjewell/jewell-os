# Quarterly BAS Prep Runbook

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix, obligations calendar). Then read `state.json` for current
balances/obligations.

## Purpose

Run **~early Nov/Feb/May/Aug** (see cron in `state.json`
`controller.cadence_registry.quarterly`), i.e. after the quarter has
just closed and there's ~3 weeks before the BAS due date. **Damian/TWB
lodges as a registered BAS agent, which earns the agent-concession due
dates — 25 Nov / 28 Feb / 26 May / 25 Aug — not the ATO's standard
self-lodger dates (28 Oct / 28 Feb / 28 Apr / 28 Jul).** Do not confuse
the two; the self-lodger dates are what JIG's separate PAYG instalment
notices use (see `CONTROLLER.md` obligations calendar). Assemble a BAS
prep pack for Damian Devola at TWB Chartered Accountants and get it in
front of him with enough runway to lodge by the deadline. **The AI
never lodges BAS** — TWB does. This runbook prepares and drafts only.

## Transition note — Q4 FY26 is NOT this runbook's job

The **Q4 FY26 BAS (due 25 Aug 2026 — agent-lodgement date)** is owned,
prepared, and lodged by **Louis** (the outgoing bookkeeper,
`accounts@jewellprojects.com`, with Damian/TWB as usual) **before his
departure on 28 Jul 2026**. Nicole reconciles Xero to 30 Jun herself
before handing to Damian. It is explicitly **OUT OF SCOPE for the AI**
— do not assemble a pack for it, do not draft a TWB email for it, and
do not chase its deadline beyond noting, if relevant, that it's
Louis's/Nicole's to land. See `CONTROLLER.md`'s transition plan.

**The first AI-prepared BAS is Q1 FY27 — the ~early-November 2026 run**
(quarter Jul–Sep 2026, due 25 Nov 2026 — agent-lodgement date).
Everything below applies from that run onward.

## Steps

1. **Load tools.** `ToolSearch
   "select:mcp__Xero__get_profit_and_loss,mcp__Xero__get_contacts_and_receivables,mcp__Xero__get_organisation_financial_year,mcp__Gmail__create_draft,mcp__Gmail__search_threads,mcp__Gmail__get_thread"`.

2. **Identify the quarter just closed.** BAS quarters run calendar-
   quarter-aligned in Australia. **Agent-lodgement due dates (TWB
   lodges — these apply here):** Q4 FY (Apr-Jun) due 25 Aug; Q1 FY
   (Jul-Sep) due 25 Nov; Q2 FY (Oct-Dec) due 28 Feb; Q3 FY (Jan-Mar) due
   26 May. (The ATO's standard self-lodger dates — 28 Jul/28 Oct/28
   Feb/28 Apr — are a month or so earlier and do NOT apply here; don't
   use them by mistake. Those dates belong to JIG's separate PAYG
   instalment notices, a different obligation on a different entity —
   see `CONTROLLER.md`.) Confirm against `get_organisation_financial_year`
   if the entity's FY start differs from the calendar (Jewell Group's FY
   starts 1 Jul per the workbook naming "FY27" beginning Jul 2026).

3. **Pull the cash-basis GST summary.** Call `get_profit_and_loss` for
   the closed quarter's date range with `accounting_basis=CASH` (this
   matters — BAS is prepared on a cash basis for GST purposes even
   though the monthly close/EOFY runbooks use accrual). If the tool
   doesn't expose an explicit cash/accrual parameter, note that
   explicitly in your output as a limitation rather than silently
   reporting accrual figures as if they were cash-basis.

4. **Receivables/payables snapshot** — `get_contacts_and_receivables` for
   the quarter-end date. Include this in the pack; TWB will want to see
   it alongside the P&L.

5. **Flag anything that would distort the BAS:**
   - Uncoded or clearly-miscategorised transactions visible in the P&L
     pull (e.g. large "uncategorised" or suspense-looking line items).
   - The unreconciled-accounts signal from the same check described in
     `MONTHLY-CLOSE.md` step 6 (Xero feed balance vs bank-reported
     balance mismatch) — an unreconciled account can mean GST on
     transactions Xero hasn't actually captured cleanly yet. Re-run that
     comparison for the quarter, don't assume the monthly runs already
     caught everything.
   - **List every large or unusual transaction** for the quarter (a
     reasonable bar: anything >$2,000 that isn't one of the known
     recurring items in `state.json` `controller.approved_recurring_payees`,
     or anything recurring-looking but at an unusual amount) — TWB
     needs to see these explicitly, not buried in a P&L total.

6. **Fold in compliance-calendar items falling in this quarter.** Pull
   `CONTROLLER.md`'s obligations calendar YAML block and `state.json`'s
   `obligations_calendar`; list any ASIC annual statement, insurance
   renewal, or other compliance date that falls within the *next* three
   months (i.e. relevant to plan for even if not due this exact
   quarter) as reminders in the same pack — Damian handles ASIC agent
   duties and may want advance notice.

7. **Draft the Gmail message.** `create_draft` to `accounts@twb.com.au`,
   **cc Clent** (session user's own address). Subject:
   `BAS prep pack — Q<N> <FY> — for review/lodgement by <Due Date>`
   (use the agent-lodgement date from step 2 — 25 Nov/28 Feb/26 May/25
   Aug — not the 28th-of-month self-lodger date). Body: a plain-text
   summary of the cash-basis GST figures, the
   receivables/payables snapshot headline numbers, the flagged
   uncoded/unreconciled items, the large/unusual transaction list, and
   the compliance-calendar reminders from step 6. Ask Damian to review
   and lodge by the due date, and to flag back anything he needs from
   Clent or Liz to do so.

8. **Track the deadline.** Search Gmail
   (`ToolSearch "select:mcp__Gmail__search_threads"` already loaded) for
   any reply from `twb.com.au` in this thread or a new one confirming
   lodgement. **If today's date is past the 20th of the due month and
   there is no lodgement confirmation in Gmail**, escalate directly to
   Clent in this session's output — bold, at the top — per
   `CONTROLLER.md`'s escalation matrix. Don't just note it quietly among
   routine commentary.

## Output

    BAS Prep Pack -- Q<N> <FY> (due <Day> <Month> <Year> -- agent-lodgement date)

    Cash-basis GST summary: <headline figures>
    Receivables/payables snapshot: <headline>
    Flagged for Damian's attention: <uncoded/unreconciled/large-unusual items>
    Compliance reminders this quarter: <ASIC/insurance/etc from the calendar>
    Draft sent: <link/description of the Gmail draft to accounts@twb.com.au, cc Clent>
    Deadline tracking: <on track / ESCALATED -- no lodgement confirmation past the 20th>

No workbook edits or git commits are required for this runbook unless
you also happen to be updating balances you already have fresh data
for — if so, follow the same procedure as `WEEKLY-UPDATE.md` for that
part, but it's not this runbook's primary job.

## Escalation

- Past-20th-with-no-confirmation → escalate per step 8, above.
- Large/unusual transaction that looks like it could be an error or a
  duplicate (see the BCSA lesson in `CONTROLLER.md` rule 3 — a claim
  paid twice because it wasn't traced to an invoice) → flag distinctly,
  don't just list it neutrally alongside legitimate large transactions.
- Any ASIC/compliance item in this quarter that's already overdue or
  due within 7 days → surface at the very top of this pack's output,
  above the BAS content itself.
