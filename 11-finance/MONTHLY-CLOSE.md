# Monthly Close Runbook

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix). Then read `state.json` for current balances/obligations.

## Purpose

Run on the **2nd of each month** (see cron in `state.json`
`controller.cadence_registry.monthly` — fires 06:00 AEST on the 2nd).
Close out the prior calendar month: actuals into the workbook, a balance
sheet snapshot, a contractor Wise pack for Liz, a reconciliation-status
check, Hubdoc hygiene, and variance commentary. Ends with a workbook
update + commit, and a final "Monthly Close Pack" message.

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

4. **Write actuals into the workbook's "Forecast vs Actual FY27" tab**,
   following the exact conventions already established in
   `WEEKLY-UPDATE.md`'s "Forecast vs Actual tab" section:
   - Map Xero P&L → Business Income / Contractors / Subscriptions /
     Operating / Business Tax rows, NET BUSINESS = income − expenses −
     tax.
   - Personal Actual rows stay blank unless Clent has supplied
     categorised personal actuals — never write a false zero.
   - Do not touch the Variance formulas.
   - Turn the month header green once filled (same mechanism as the
     weekly runbook: `update_workbook.py --mark-actual YYYY-MM`, then
     the manual/semi-automatic value replacement it reminds you to do).
   - Run `python3 verify_workbook.py` after — must print `OVERALL: PASS`
     before you re-upload or commit anything.

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

8. **Month-end variance commentary.** From the Forecast vs Actual tab
   you just populated, identify the **top 5 variances** (by absolute
   dollar size, forecast vs actual) for the closed month and write one
   line each on *why* (e.g. "Contractors $340 over — Rao's fortnightly
   Payoneer invoices ran three cycles this month instead of two",
   "Business Income $1,200 under — Potsville retainer invoice not yet
   raised"). If you can't determine a cause from available data, say so
   rather than guessing.

9. **Re-upload the workbook** to Google Drive (same method as
   `WEEKLY-UPDATE.md` step 6 — base64-encode and `create_file`, doing the
   encode/upload in a subagent if your output budget is tight) and
   **update `state.json`**: bump `last_run`/`version_stamp`, and add/update
   a `controller.last_monthly_close` field with the closed month and
   today's date.

10. **Commit.** Commit the updated workbook + `state.json` to branch
    `claude/personal-financial-dashboard-qbhmr2` (same branch as the
    weekly runbook — do not create a new branch). Do not push; the
    orchestrator handles that.

## Output

The session's final message must be headed:

    Monthly Close Pack -- <Month> <Year>

with sections for: P&L vs budget summary, balance sheet snapshot,
Wise contractor pack status (drafted/link), reconciliation status
(mismatch count + reminder of the manual-effort gap), Hubdoc hygiene
note, and the top-5 variance commentary. Keep it tight — this is a
management pack, not a data dump; put exact figures in the workbook, put
the *story* in this message.

## Escalation

Apply `CONTROLLER.md`'s escalation matrix throughout. In particular: if
the P&L shows business cash trending toward the $5,000/$2,000 thresholds
for the *next* month, say so explicitly here — don't wait for a Daily
Pulse to catch it after the fact.
