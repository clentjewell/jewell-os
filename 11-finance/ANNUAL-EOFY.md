# Annual EOFY Runbook — business half

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix, obligations calendar). Then read `state.json` for current
balances/obligations.

**This half runs first.** The Routine is scoped to both repos; after this
runbook, run the personal half's `ANNUAL-EOFY.md` in
`clentjewell/clent-jewell-personal` at `11-finance/`. That half rolls the
FY27 workbook forward, refreshes the net worth statement and archives the
closed year with a git tag. **This runbook never writes the workbook.**

## Purpose

Run **~8 July** each year (see cron in `state.json`
`controller.cadence_registry.annual`), shortly after FY close (Jewell
Group's FY runs 1 Jul – 30 Jun). Produce the full-year picture, an EOFY
pack for TWB, a subscription audit, an insurance-renewal check, and the
business budget lines the personal half carries into the next-FY
workbook.

## Steps

1. **Load tools.** `ToolSearch
   "select:mcp__Xero__get_profit_and_loss,mcp__Xero__get_financial_position,mcp__Xero__get_cash_position,mcp__Xero__get_organisation_financial_year,mcp__Xero__get_contacts_and_receivables,mcp__Gmail__create_draft,mcp__Google_Drive__search_files,mcp__Google_Drive__create_file"`.

2. **Confirm FY boundaries.** `get_organisation_financial_year`. The
   just-closed year is the one that ended 30 June this calendar year.

3. **Full FY P&L + balance sheet vs budget.**
   - Pull `get_profit_and_loss` for the full FY (accrual basis — this is
     the annual accrual view, distinct from the quarterly cash-basis
     BAS pull).
   - Pull `get_financial_position` as at 30 June.
   - Compare against the workbook's Cashflow Budget tab full-year totals
     (sum the 12 monthly forecast columns) and the Forecast vs Actual
     tab's cumulative actuals if fully populated; ask the personal half
     to read the tab back if you do not have it. Report the full-year
     variance, not just the last month's.

4. **EOFY pack checklist for TWB** — assemble a list of what Damian
   needs (do not attempt to gather documents you don't have access to;
   list what's needed and who has it):
   - Full-year P&L and balance sheet (from step 3 — attach/summarise).
   - Bank statements for all business and JIG accounts (NAB business
     transaction, Maxxim, petty cash, business credit card; Macquarie
     CMA and Accelerator; Hub24 JIG portfolio) for the full FY (source:
     the Google Drive statements folder,
     `1qBGsBBCZjSPVgErPDfhM-xwK1JBObEKt` — check what's there for the
     year and note any missing months).
   - Confirmation of the four BAS lodgements for the year (cross-check
     against Gmail threads with `accounts@twb.com.au` from each
     `QUARTERLY-BAS.md` run).
   - Div 7A note: the JIG loan to Clent (`state.json` `model_params.div7a`)
     — accountant-agreed treatment; ask TWB to confirm the minimum
     yearly repayment is booked correctly. The funding side is confirmed
     by the personal half and handed to you as one line if anything does
     not match.
   - Any new contracts, asset purchases, or one-off large transactions
     from the year (pull from the large/unusual transaction lists
     assembled in each quarter's BAS pack, if available in prior
     session notes/Gmail — otherwise scan the full-year P&L for
     anomalies).
   - Contractor payment summary (Ronnie/Liz/Rao Wise runs + Rao's
     Payoneer invoices) for any contractor-payments-summary schedule
     TWB needs.

5. **Subscription audit.** List every recurring subscription from the
   workbook's Cashflow Budget tab "Subscriptions" section (Asana, Adobe,
   Anthropic + tokens, Apple, ChatGPT + tokens, Google Workspace, Go High
   Level, Wildjar, WPMUDEV, Loveable, Namecheap, Techpresence, Brave,
   Hubbl, Gamma (annual), SuperUltra (annual), Slack, Supabase, OpenAI
   API, Webroot (annual)) with each one's **annualised cost** (monthly ×
   12, or the annual figure directly for the annual-billed ones). Cross-
   check against the FY P&L expense lines pulled in step 3 for actual
   spend per subscription where Xero's coding allows it. **Flag any
   subscription that looks unused** — you cannot directly observe usage,
   so flag based on proxies: a subscription with no matching activity
   elsewhere in the business's tooling references, or one Clent has
   mentioned deprecating in past sessions, or simply list all of them
   with a note asking Clent to confirm which are still in active use as
   part of the EOFY pack — do not assume unused without a real signal,
   just surface the full list for a human decision.

6. **Insurance renewal calendar check.** Pull the insurance-related
   entries from `CONTROLLER.md`'s obligations calendar (BizCover PL+PI
   ~Feb, GIO car ~24 Jun) and confirm both are represented in
   `state.json`'s `obligations_calendar` for the *new* FY with correct
   due dates. If GIO car renewal (~24 Jun) just passed or is imminent
   relative to today's ~8 Jul run date, check Gmail for a renewal
   confirmation/receipt and flag if none found.

7. **Business budget lines for the next FY.** List every recurring
   business line (contractors, subscriptions, utilities, professional
   fees, compliance) with the monthly amount to carry forward, flagging
   any known step-change (a subscription price increase seen in Gmail,
   the overwatch rate, a contractor change) rather than carrying a stale
   number. Hand this list to the personal half, which copies the
   Cashflow Budget tab forward. Also set the new FY's business
   obligations in `state.json` here (BAS cycle, JIG PAYG dates, ASIC
   anniversaries, TWB fees, company tax, insurance renewals).

8. **Update `state.json`**: bump `last_run`/`version_stamp`, set
   `controller.last_eofy_close` to this year's date, and the new-FY
   obligations from step 7.

9. **Commit and push** to a branch in this repo and update the standing
   draft PR. Never push to `main`.

10. **Draft the EOFY pack email** to `accounts@twb.com.au`, cc Clent,
    summarising the checklist from step 4 and asking Damian to confirm
    what's still needed from Clent's/Liz's side.

11. **Hand off and continue.** Output the block below, then run the
    personal half's `ANNUAL-EOFY.md`.

## Hand-off to the personal half

    Business half -- EOFY FY<N>

    Full-year P&L vs budget: <summary>
    Balance sheet as at 30 Jun: <summary>
    Business balances refreshed: <key=value@as_at (source)> ... (or none)
    Next-FY business budget lines: <line: monthly amount; step-changes flagged> ...
    Div 7A: <what TWB was asked to confirm>

## Output

    Annual EOFY Pack -- FY<N> close (produced <date>)

    Full-year P&L vs budget: <summary>
    Balance sheet as at 30 Jun: <summary>
    EOFY pack for TWB: <checklist + draft sent>
    Subscription audit: <N subscriptions, $<total>/yr, flagged for review: ...>
    Insurance renewals: <status>
    Next-FY business budget: <lines handed to the personal half>

The personal half appends its `Personal half` section (net worth
snapshot, next-FY workbook, archive tag).

## Escalation

Apply `CONTROLLER.md`'s escalation matrix. In particular: a full-year
variance >10% on any major P&L line should be called out prominently
rather than buried in the summary numbers.

Next: run the personal half's `ANNUAL-EOFY.md`.
