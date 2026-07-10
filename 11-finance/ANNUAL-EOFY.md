# Annual EOFY Runbook

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix, obligations calendar). Then read `state.json` for current
balances/obligations.

## Purpose

Run **~8 July** each year (see cron in `state.json`
`controller.cadence_registry.annual`), shortly after FY close (Jewell
Group's FY runs 1 Jul – 30 Jun). Produce the full-year picture, an EOFY
pack for TWB, a subscription audit, an insurance-renewal check, next-FY
budget build instructions, a personal net worth refresh, and archive the
closed FY workbook with a git tag.

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
     tab's cumulative actuals if fully populated. Report the full-year
     variance, not just the last month's.

4. **EOFY pack checklist for TWB** — assemble a list of what Damian
   needs (do not attempt to gather documents you don't have access to;
   list what's needed and who has it):
   - Full-year P&L and balance sheet (from step 3 — attach/summarise).
   - Bank statements for all NAB/Macquarie accounts for the full FY
     (source: the Google Drive statements folder,
     `1qBGsBBCZjSPVgErPDfhM-xwK1JBObEKt` — check what's there for the
     year and note any missing months).
   - Confirmation of the four BAS lodgements for the year (cross-check
     against Gmail threads with `accounts@twb.com.au` from each
     `QUARTERLY-BAS.md` run).
   - Div 7A note: the $190,575.34 repayment via house-settlement
     transfer to JIG (see `state.json` `model_params.div7a`) —
     accountant-agreed treatment, flag for TWB to confirm it's booked
     correctly.
   - Any new contracts, asset purchases, or one-off large transactions
     from the year (pull from the large/unusual transaction lists
     assembled in each quarter's BAS pack, if available in prior
     session notes/Gmail — otherwise scan the full-year P&L for
     anomalies).
   - Contractor payment summary (Ronnie/Liz/Rao Wise runs +Rao's
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

7. **Next-FY budget build — roll the workbook forward.**
   - Copy the Cashflow Budget FY(N) tab to a new Cashflow Budget FY(N+1)
     tab (openpyxl: copy the worksheet, rename it).
   - Carry every recurring line (contractors, subscriptions, utilities,
     professional fees) forward at the same monthly amount unless
     `state.json` or a Clent instruction says otherwise; flag any known
     step-change (e.g. a subscription price increase mentioned in Gmail
     correspondence) rather than silently carrying a stale number.
   - Create a new Forecast vs Actual FY(N+1) tab, structurally identical
     to the current one, with all Actual rows blank/reset.
   - Update `state.json`'s `workbook_tabs` list and any FY-specific
     references (this doc, `WEEKLY-UPDATE.md`, `MONTHLY-CLOSE.md`, etc.
     reference "FY27" by name in places — a full rename across the kit
     is a bigger job than this runbook should do unattended; note it as
     a flag for Clent rather than doing a blanket find/replace that
     could silently break something).
   - Run `verify_workbook.py` — must print `OVERALL: PASS`.

8. **Annual personal net worth statement refresh.** Using the "Net
   Worth" tabs' existing structure and the freshest balances in
   `state.json`, produce an updated net worth snapshot as at ~30 June /
   today. Follow the same precedence-of-sources rule as
   `WEEKLY-UPDATE.md` (screenshot > Drive file > Xero). Write it into a
   new dated Net Worth tab (following the existing tab-naming pattern,
   e.g. `Net Worth <Month> <Year>`) rather than overwriting the current
   one — keep the history.

9. **Archive the closed FY workbook version — git tag.** Before making
   the FY(N+1) roll-forward changes permanent in the working copy,
   commit the closed-FY state of the workbook as-is and tag it, e.g.:

       git tag -a fy26-close -m "Archive: FY26 closed workbook, EOFY <date>"

   (adjust the tag name to the actual FY that just closed). Do not push
   the tag — the orchestrator handles git operations; just create it
   locally as part of your commit sequence, and mention in your output
   that a tag was created so the orchestrator/user knows to push it.

10. **Re-upload the rolled-forward workbook** to Google Drive (same
    method as other runbooks) and **commit** everything (workbook, tag,
    `state.json` updates: bump `last_run`/`version_stamp`, add/update
    `controller.last_eofy_close` with this year's date) to branch
    `claude/personal-financial-dashboard-qbhmr2`.

11. **Draft the EOFY pack email** to `accounts@twb.com.au`, cc Clent,
    summarising the checklist from step 4 and asking Damian to confirm
    what's still needed from Clent's/Liz's side.

## Output

    Annual EOFY Pack -- FY<N> close (produced <date>)

    Full-year P&L vs budget: <summary>
    Balance sheet as at 30 Jun: <summary>
    EOFY pack for TWB: <checklist + draft sent>
    Subscription audit: <N subscriptions, $<total>/yr, flagged for review: ...>
    Insurance renewals: <status>
    Next-FY workbook: rolled forward, tabs added, verify PASS
    Net worth snapshot: <headline number, tab name>
    Archived: git tag <tag-name> created (not yet pushed)

## Escalation

Apply `CONTROLLER.md`'s escalation matrix. In particular: a full-year
variance >10% on any major P&L line, or a net worth movement that looks
like a data error rather than a real change, should be called out
prominently rather than buried in the summary numbers.
