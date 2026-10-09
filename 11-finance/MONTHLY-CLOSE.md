# Monthly Close Runbook — business half

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix). Then read `state.json` for current balances/obligations.

**This half runs first.** The Routine is scoped to both repos; after this
runbook, run the personal half's `MONTHLY-CLOSE.md` in
`clentjewell/clent-jewell-personal` at `11-finance/`. That half owns the
FY27 workbook and writes the closed month's actuals into it from the
figures you hand over. **This runbook never writes the workbook.**

## Purpose

Run on the **2nd of each month** (see cron in `state.json`
`controller.cadence_registry.monthly` — fires 06:00 AEST on the 2nd).
Close out the prior calendar month on the business side: the closed
month's actuals computed for the workbook, a balance sheet snapshot, a
contractor Wise pack for Liz, a reconciliation-status check, Hubdoc
hygiene, and variance commentary. Ends with a `state.json` update +
commit, and a "Monthly Close Pack" message that the personal half
appends to.

## Steps

1. **Load tools.** `ToolSearch
   "select:mcp__Xero__get_profit_and_loss,mcp__Xero__get_financial_position,mcp__Xero__get_cash_position,mcp__Xero__get_contacts_and_receivables,mcp__Gmail__create_draft,mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content"`.

2. **Identify the closed month.** If today is the 2nd of, say, August,
   the closed month is **July**. Use `get_organisation_financial_year`
   if you need to confirm Xero's FY boundaries.

3. **Pull Xero P&L for the closed month** (`get_profit_and_loss`,
   scoped to that calendar month, accrual basis — this is different
   from the cash-basis pull `QUARTERLY-BAS.md` does for GST). Pull
   **balance sheet** too (`get_financial_position`) as at month-end.

4. **Compute the closed month's business actuals for the workbook**,
   following the conventions in `WEEKLY-UPDATE.md` step 3: map Xero P&L
   → Business Income / Contractors / Subscriptions / Operating /
   Business Tax, NET BUSINESS = income − expenses − tax. Put the figures
   in the hand-off block below. The personal half writes them into the
   "Forecast vs Actual FY27" tab, marks the month header green and runs
   the verify script; do not do any of that here.

5. **Contractor Wise run pack for Liz.** Build the monthly overseas
   contractor payment list from the recurring approved list in
   `state.json` (`controller.approved_recurring_payees`) cross-checked
   against Xero payables/bills for the month if visible:

   | Payee | Amount | Currency | Reference |
   |---|---|---|---|
   | Ronnie | $2,000 | AUD→THB or per Wise default | e.g. "Ronnie — <Month> contractor payment" |
   | Liz | $1,000 | AUD→THB or per Wise default | "Liz — <Month> contractor payment" |
   | Rao | $500 (+ any fortnightly Payoneer invoices ~$110 each, tally separately) | AUD | "Rao — <Month> contractor payment" |

   These three are on the recurring approved list — no per-item Clent
   sign-off needed **provided amounts match the usual figures** (flag
   any that don't per `CONTROLLER.md` rule 4). Draft this pack as a
   **Gmail draft** (`create_draft`), `To: lizelle@jewellprojects.com`,
   `Cc: clent@jewellprojects.com` — remember the draft itself lands in
   Clent's Gmail drafts folder (the AI's Gmail connection is his
   mailbox), so he reviews and sends it on to Liz in one motion.
   Subject line: `Wise contractor run — <Month> <Year> — for Liz`.

6. **Reconciliation status check.** This cannot be done directly (Xero
   MCP is read-only — see `CONTROLLER.md` gaps list). Instead:
   - Compare Xero's reported statement/bank-feed balances
     (`get_cash_position`) against the freshest bank-reported balance you
     have (a Drive file export or a recent screenshot recorded in
     `state.json`) for the same account/date.
   - Where they disagree by a material amount, that's a signal of
     unreconciled items — count how many accounts show a disagreement
     and report that count. You cannot get an exact unreconciled
     *transaction* count without write/reconciliation-screen access, so
     don't fabricate precision — report what you can observe (dashboard
     signals) and say so plainly: "N accounts show a feed/reported-balance
     mismatch — human reconciliation in Xero required (~2-4 hrs/month
     per `CONTROLLER.md`)."

7. **Hubdoc hygiene.** Search Gmail for signs of a duplicate-forward
   loop: `ToolSearch "select:mcp__Gmail__search_threads"` already loaded
   above. Search something like `from:hubdoc.com OR subject:hubdoc` over
   the closed month; look for repeated auto-replies/bounces suggesting
   receipts are looping rather than attaching cleanly to Xero
   transactions. This is a **known unresolved issue** (per
   `CONTROLLER.md`) — report what you observe, don't assume it's fixed
   just because you don't find an obvious loop this month; note if the
   volume of Hubdoc mail looks anomalously high/low vs a typical month.

8. **Month-end variance commentary.** From the closed month's actuals
   against the Cashflow Budget forecast for that month (the personal
   half can read the tab back to you if you need the forecast column),
   identify the **top 5 variances** (by absolute dollar size, forecast
   vs actual) and write one line each on *why* (e.g. "Contractors $340
   over — Rao's fortnightly Payoneer invoices ran three cycles this
   month instead of two", "Business Income $1,200 under — Potsville
   retainer invoice not yet raised"). If you can't determine a cause
   from available data, say so rather than guessing.

9. **Update `state.json`**: refreshed business balances if any, bump
   `last_run`/`version_stamp`, and set `controller.last_monthly_close`
   to the closed month and today's date.

10. **Commit and push** `state.json` and any doc changes to a branch in
    this repo and update the standing draft PR. Never push to `main`.

11. **Hand off and continue.** Output the block below, then run the
    personal half's `MONTHLY-CLOSE.md`.

## Hand-off to the personal half

    Business half -- monthly close <Month> <Year>

    Closed-month actuals: Income $<a> / Contractors $<b> / Subscriptions $<c>
      / Operating $<d> / Business Tax $<e> / NET BUSINESS $<f>
    Balance sheet as at <month-end>: <headline>
    Business balances refreshed: <key=value@as_at (source)> ... (or none)
    Wise pack: drafted (<subject>)
    Reconciliation: <N> accounts show a feed/reported-balance mismatch
    Hubdoc: <observation>

## Output

The session's final message must be headed:

    Monthly Close Pack -- <Month> <Year>

with sections for: P&L vs budget summary, balance sheet snapshot,
Wise contractor pack status (drafted/link), reconciliation status
(mismatch count + reminder of the manual-effort gap), Hubdoc hygiene
note, and the top-5 variance commentary. The personal half appends its
`Personal half` section (workbook status, personal reading). Keep it
tight — this is a management pack, not a data dump; put exact figures in
the workbook (via the personal half), put the *story* in this message.

## Escalation

Apply `CONTROLLER.md`'s escalation matrix throughout. In particular: if
the P&L shows business cash trending toward the $5,000/$2,000 thresholds
for the *next* month, say so explicitly here — don't wait for a Daily
Pulse to catch it after the fact.

Next: run the personal half's `MONTHLY-CLOSE.md`.
