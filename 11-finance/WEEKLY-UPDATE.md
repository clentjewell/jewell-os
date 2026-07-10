# Weekly Finance Update Runbook

This runbook is written for a **future Claude Code session with fresh
context** (no memory of prior conversations). It is fully self-contained:
follow it top to bottom and you will have everything needed to run
Clent Jewell's weekly finance update without asking the user anything
except for information genuinely only they have (e.g. a pasted screenshot,
or a confirmation of an ambiguous figure).

If you are that future session: read this entire file before doing
anything else. Then read `state.json` in this same directory to get the
current known state.

## Purpose

Keep the Google Sheet **"Clent Jewell — Cashflow Budget FY27, Net Worth &
Situation Summary"** current, and produce a weekly cash brief for Clent.
The workbook (source of truth, edited locally then re-uploaded) lives at:

    11-finance/Clent-Jewell-Finance-FY27.xlsx

The sheet's live Google Drive URL is recorded in `state.json` under
`sheet_url` (it is a placeholder until the first real upload has happened
-- see "Orchestrator fill-ins" at the bottom of this file if it still says
`TODO_ORCHESTRATOR_FILL_IN`).

## Data sources & how to pull each

There are three tiers of data, in strict precedence order (highest wins):

1. **User-pasted screenshots (ad-hoc, highest precedence).** If the user
   pastes a bank/investment screenshot into the conversation, treat the
   numbers in it as the live, current-moment balance for that account --
   it overrides everything else, including a same-day Xero or file
   export figure. Record the as-at date as *today*, source `"screenshot"`.

2. **Google Drive statements folder (semi-automatic).**
   Folder ID: `1qBGsBBCZjSPVgErPDfhM-xwK1JBObEKt`

   - First call `ToolSearch` with `"select:mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content"`
     to load those tools.
   - Search with a query like `parentId = '1qBGsBBCZjSPVgErPDfhM-xwK1JBObEKt'`,
     and filter/sort by modified time. Compare each file's modified time
     against `state.json`'s `last_run` -- only new files since then are
     relevant (but if `last_run` is `null`, treat every file as new).
   - Read any new exports: NAB CSVs, Hub24 PDFs, Macquarie CSVs. Extract
     the latest closing balance and its statement date from each. Record
     source `"file:<filename>"`.

3. **Xero (live, automatic, lowest precedence of the three -- but always
   pull it, it's the backbone of the P&L/BAS picture).**
   - First call `ToolSearch` with
     `"select:mcp__Xero__get_cash_position,mcp__Xero__get_financial_position,mcp__Xero__get_profit_and_loss"`
     to load those tools.
   - Pull cash position (bank balances including the NAB feeds -- this is
     the de facto "bank data" source when no fresher file/screenshot
     exists), the balance sheet (`get_financial_position`), and P&L
     month-to-date (`get_profit_and_loss`).
   - **Caveat:** a Xero statement balance is only as good as how well the
     account is reconciled. If Xero's bank feed balance disagrees with a
     file export or screenshot for the same account/date, that is an
     "unreconciled delta" -- flag it explicitly in the weekly brief
     (see "Xero unreconciled count" below), do not just quietly pick one.

**Rule: never silently keep a stale number.** Every balance in
`state.json` and in the workbook carries an `as_at` date. If a source
did not refresh a given account this week, its `as_at` date stays old on
purpose -- that staleness is itself a signal (see escalation rules below,
">14 days old" gets flagged in the brief).

## Update procedure

Run these steps in order.

1. **Read `state.json`** in this directory. Note `last_run`,
   every account's current `balance`/`as_at`/`source`, the
   `obligations_calendar`, and `model_params`.

2. **Pull sources**, in the precedence order above (screenshots, if any
   were pasted this session > Drive file exports newer than `last_run` >
   Xero). For every account in `state.json`, decide: does it have a
   fresher value this week, and from which source?

3. **Run `update_workbook.py`** with every balance that changed. Example:

       python3 11-finance/update_workbook.py \
         --set 'nab_offset=52922.84@2026-07-07' \
         --set 'nab_biz_cc=-8917.86@2026-07-07' \
         --set 'hub24_super=406323.88@2026-07-06'

   Run with `--dry-run` first if you want to preview the cell writes
   before committing them. See the script's own docstring
   (`python3 11-finance/update_workbook.py --help`) for the full
   CLI. Note: `CELL_MAP` inside that script currently has TODO
   placeholders for the real cell addresses -- see "Orchestrator
   fill-ins" below. Do not attempt to run it for real until those are
   filled in; if you are a future session and they are still TODO, stop
   and tell the user the workbook cell mapping needs to be completed
   first (a one-time task, ideally done by opening the workbook and
   noting each account row's cell reference).

4. **Roll actuals.** For any FY27 month that has now fully closed since
   the last run, replace that month's *forecast* values on the Cashflow
   tab with the *actual* figures from Xero's P&L for that month. Keep a
   clear visual distinction between forecast and actual months: mark an
   actual month by turning its column header green
   (`update_workbook.py --mark-actual YYYY-MM` does this, plus reminds
   you to also replace the forecast cell values themselves -- that value
   replacement is a manual/semi-automatic step, not automated by that
   flag). Document in your own working notes which columns are
   forecast vs actual so the next session doesn't have to re-derive it.

5. **Verify** with `verify_workbook.py`:

       python3 11-finance/verify_workbook.py

   This scans every sheet for `#REF`/other Excel error tokens, and
   recomputes the personal cash subtotal, total assets, net worth, and
   the cashflow closing-cash chain against the workbook's own totals.
   It must print `OVERALL: PASS` before you proceed. If it prints FAIL,
   fix the underlying issue (bad cell reference, broken formula, mistyped
   --set) and re-run steps 3-5 -- do not re-upload a failing workbook.

6. **Re-upload to Google Drive** as a new version, titled with the date,
   e.g. `Clent Jewell - Cashflow Budget FY27 - 2026-07-07.xlsx`.
   Method: read the local xlsx file's bytes, base64-encode them, then
   call `mcp__Google_Drive__create_file` with that base64 content and
   the appropriate MIME type
   (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)
   targeting the same Drive folder (or update-in-place if the Drive tool
   set in use supports versioning an existing file -- check what's
   available via `ToolSearch` before assuming). **If your remaining
   output budget for this turn is tight, do the base64 encode + upload
   inside a subagent** (spawn one via the `Agent` tool) rather than
   inlining a large base64 blob into your own context/response -- base64
   of a multi-hundred-KB xlsx can be very large as text and will eat a
   disproportionate amount of your budget if done inline.

7. **Update `state.json`**: for every account you refreshed, write its
   new `balance`, `as_at`, and `source`. Also set `last_run` to today's
   date/time, bump `version_stamp` by 1, and set `sheet_url` to the URL
   of the file (or folder) you just uploaded in step 6, if it changed.

8. **Playbook reconciliation (keep the docs true).** This step keeps
   `CONTROLLER.md`, `state.json`, and `LIZ-ONBOARDING.md` synced with
   real-world decisions and events, the same way steps 1-7 keep the
   workbook synced with real-world balances. See `CONTROLLER.md`'s "How
   this playbook stays current" for the policy this step implements.

   1. Load the Circleback tools: `ToolSearch
      "select:mcp__Circleback__SearchMeetings,mcp__Circleback__ReadMeetings"`.
      **Input quirks (don't skip these, they're not optional convenience
      params):** `SearchMeetings` requires **both** `intent` (string) and
      `pageIndex` (number, 0-based) or it fails input validation.
      `ReadMeetings` requires `intent` (string) and `meetingIds` as an
      **array of strings** — numeric meeting ids must be quoted (e.g.
      `"10288694"`, not `10288694`).
   2. Call `SearchMeetings` with `intent: "finance, budget, BAS,
      bookkeeping, handover meetings since <last_reconciled>"` (pull
      `<last_reconciled>` from `state.json`
      `controller.playbook_reconciliation.last_reconciled`) and
      `pageIndex: 0`.
   3. For each finance-relevant meeting **newer than** `last_reconciled`:
      call `ReadMeetings` with that meeting's id as a **string** in
      `meetingIds`. Meeting notes come back in the `notes` field, action
      items in `actionItems`. Extract decisions and action items, then
      **diff** them against `CONTROLLER.md` + `state.json` +
      `LIZ-ONBOARDING.md` — what's changed, what's newly decided, what's
      now resolved.
   4. **Apply corrections** with label-anchored edits (match on unique
      existing text, not line numbers) to whichever files are stale. Add
      newly-decided items to `CONTROLLER.md`'s Decisions log; open new
      pending items or close resolved ones.
   5. Also **sweep this week's Gmail hits** (already gathered earlier in
      this run, e.g. from the payment-run/receivables/child-support
      steps) for documented-fact changes — a due date, an amount, a
      person's role or access, an account detail — that contradict what
      the docs currently say (e.g. an ATO/TWB/bank notice with a
      different due date than the obligations calendar).
   6. If `LIZ-ONBOARDING.md` changed in this step, **re-upload it to the
      Drive finance folder** (folder id
      `1M26jT3U13N9v0v9k5J56KX-Aw0PTjPys`) as a new dated Google Doc
      titled `Liz Onboarding Guide — Finance (<D Mon YYYY>)` — same
      session, don't defer it.
   7. Update `state.json`'s `controller.playbook_reconciliation
      .last_reconciled` (today's date) and `.last_meeting_ids` (the ids
      you just processed).
   8. Note the reasoning for every correction you made — it feeds
      directly into the commit message in step 9 below (this step does
      not commit on its own; step 9's commit covers the workbook,
      `state.json`, and every doc change from this step together).

   **Hard rule: never auto-apply a change that contradicts an explicit
   Clent decision already recorded in the Decisions log.** If a meeting
   or email seems to contradict a logged decision, flag it to Clent
   instead of overwriting the decision — decisions log entries are
   deliberate and sticky, not just the most-recent fact.
9. **Commit & push** the updated `Clent-Jewell-Finance-FY27.xlsx`,
   `state.json`, and any `CONTROLLER.md` / `LIZ-ONBOARDING.md` /
   `README.md` changes from step 8, to branch
   `claude/personal-financial-dashboard-qbhmr2`. Do not push to any
   other branch. Write the commit message with the **reasoning** for
   each playbook correction (not just "updated docs") -- the git log is
   this playbook's changelog (see `CONTROLLER.md` "How this playbook
   stays current").

## Forecast vs Actual tab — populate business actuals (weekly)

The workbook has a **"Forecast vs Actual FY27"** tab. Each category has a
Forecast row (auto-linked from the Cashflow tab — do not touch) and an
**Actual** row (blank grey — you fill it). After pulling Xero:

- For each **closed or in-progress month** of FY27, write the **business**
  Actual rows from Xero `get_profit_and_loss` for that month, mapped:
  Business Income → total income; Contractors / Subscriptions / Operating →
  the matching expense-account groups; Business Tax → tax paid that month;
  NET BUSINESS = income − expenses − tax.
- **Personal** Actual rows have **no clean Xero feed** — leave them blank
  unless Clent provides categorised personal actuals. Never write a false
  zero (a blank Actual keeps the Variance blank, which is correct).
- The Variance cells are formulas (positive = favourable) — do not edit
  them; they compute once an Actual exists.
- Turn the month-header cell green for any month whose actuals you've
  filled, so it's visually clear which months are actual vs forecast.
- **Forecast income rule (standing policy, decided 9 Jul 2026):** the
  Cashflow tab's forecast income is built only from Xero invoices in
  **Awaiting Payment** status (approved & sent) — never drafts or
  quotes. Quotes and pipeline value get their own visibility row (fed
  from CRM/Asana by Ronnie), kept separate from committed forecast
  income — don't blend the two when populating either the Forecast or
  Actual income rows. See `CONTROLLER.md` "How this playbook stays
  current" and `state.json` `forecast_vs_actual.invoice_status_rule`.

## Child Support ledger — ingest Matina's emails (weekly)

The **"Child Support — S&K"** tab tracks Sierra & Kyah's 50/50 shared
costs. **Liz** (`lizelle@jewellprojects.com`) is the operator who promotes
approved claims to the paid ledger — this duty belonged to Louis
(`accounts@jewellprojects.com`), who departs 28 Jul 2026 (during the
handover window either may action it; from 28 Jul it is Liz's alone);
see `CONTROLLER.md` for the full RACI and transition plan. The
co-parent is
**matinajewell@proton.me**. Ledger was reconciled to $0 on 16 Jun 2026;
current net ≈ $258 owed to Matina (see `state.json` `child_support`).

Each week:
1. `ToolSearch "select:mcp__Gmail__search_threads,mcp__Gmail__get_thread"`.
2. Search `from:matinajewell@proton.me` newer than `last_run`. Her emails
   are free-text (inconsistent subjects, photo receipts), so **LLM-extract**
   each claim: child, category, total cost, rebate, and her stated/implied
   Clent 50%.
3. **Reconcile before posting.** For every extracted claim, check it isn't
   already in the ledger (rows 11+) — she frequently re-sends reminders for
   items already paid (e.g. the Dr Tovey $336.50 she chased twice after it
   was paid 7 May). Flag likely duplicates.
4. **Append new/unmatched claims to the INBOX — TO APPROVE queue** (cols W+,
   rows 28+) — Date received / From / Subject / Extracted item / Amount /
   Suggested Clent 50% / Matched? Do **NOT** write them into the paid
   ledger or mark anything settled — **Liz** approves and promotes them
   (see `LIZ-ONBOARDING.md`).
5. Surface the queue count + any duplicate flags in the weekly brief.

## Payment run pack (weekly)

Read `CONTROLLER.md` first if you haven't this session — this section
applies its control rules, it doesn't restate them in full.

1. `ToolSearch "select:mcp__Xero__get_contacts_and_receivables,mcp__Gmail__create_draft"`
   (in addition to whatever you've already loaded).
2. Pull payables due **within the next 7 days** from
   `get_contacts_and_receivables` (bills/payables side of the response).
3. Combine with anything from `state.json`'s
   `controller.approved_recurring_payees` that's due this week (the
   Wise contractor run is monthly and handled by `MONTHLY-CLOSE.md` —
   don't duplicate it here unless a recurring item is specifically
   weekly, e.g. a weekly-billed subscription).
4. Build a table:

   | Payee | Amount | Account/Reference | Due date | Approval status |
   |---|---|---|---|---|

   Approval status is one of:
   - `Auto-approved (recurring)` — payee + amount matches
     `controller.approved_recurring_payees` within the tolerance in
     `CONTROLLER.md` rule 4 (>20% or >$100 jump, whichever is larger,
     from the usual amount escalates instead).
   - `NEEDS CLENT OK` — new payee, or amount >`controller.thresholds.approval_threshold`
     ($1,000) and not clearly recurring. Do not include these as if
     already approved.

   **Trace every line to an invoice/bill/ledger entry** — never include
   a payment prompted only by a raw email claim (see the BCSA lesson in
   `CONTROLLER.md` rule 3).
5. Draft the pack as a **Gmail draft** (`create_draft`),
   `To: lizelle@jewellprojects.com`, `Cc: clent@jewellprojects.com`.
   Reminder: the AI's Gmail connection is Clent's own mailbox, so this
   draft lands in **his** drafts folder — he reviews (especially any
   `NEEDS CLENT OK` line) and sends it on. Subject:
   `Payment run — week of <date> — for Liz`.
6. If every payable this week is `NEEDS CLENT OK` (e.g. nothing on the
   recurring list is due), still draft the pack, clearly headed as
   pending Clent's approval rather than ready-to-pay.

## Receivables chase

1. Pull `get_contacts_and_receivables` (receivables/invoices-owed-to-us
   side).
2. List every invoice that is **overdue** (past its due date, not yet
   paid). For each, compute days overdue.
3. For anything **>14 days overdue**, draft a polite chase email as a
   **Gmail draft** — since these go to the business's customers/clients,
   not Liz, address each `create_draft` to the actual customer contact
   (from the Xero contact record if the email is available) rather than
   routing through Liz or Clent; keep tone professional and brief, note
   the invoice number/amount/original due date, and ask for a payment
   date or to flag any dispute.
4. Report a summary in the weekly brief: total receivables overdue
   ($ and count), how many chase drafts were created this week, and any
   invoice overdue **>30 days** flagged as a bullet near the top of the
   brief (persistent non-payment is worth Clent's attention even though
   it's not one of the hard escalation triggers).

## Weekly cash brief template

Send the user a brief with this shape (fill in the blanks from the data
you just gathered):

    Weekly Cash Brief -- <date>

    Closing cash: $<X> vs forecast $<Y> (delta $<Z>, <up/down>)
    Why: <one or two lines -- what drove the delta this week>

    Next 14 days' obligations:
      - <date>: <description> -- $<amount> (full) / $<amount> (Clent's share)
      - ... (auto-list every entry in state.json's obligations_calendar
        whose due_date falls within the next 14 days; for calendar
        entries with amount TBC, say so explicitly rather than omitting
        them)

    Runway status: <GREEN | AMBER | RED> -- <days of cover> days at
      current burn (lean $2,300/mo or comfortable $4,000/mo SEA burn,
      per model_params in state.json)

    Stale balances (>14 days old): <list any account whose as_at is more
      than 14 days before today, or "none">

    Xero unreconciled count: <N accounts/transactions where Xero's
      balance disagrees with the freshest bank source, or "0 -- clean">

## Escalation rules

- **If projected cash is < $10,000 within the next 30 days**: lead the
  brief with this, in bold, above everything else, and include concrete
  bridge options (e.g. draw down offset, delay a discretionary outflow,
  pull from Hub24, etc.) -- don't bury it under routine commentary.
- **If any source (Xero, a bank file, a screenshot) contradicts the
  current model by more than $2,000 for the same account/date**: flag it
  clearly in the brief and in your own notes. Do **not** silently
  overwrite the model's number without noting the discrepancy -- ask the
  user which figure to trust if it isn't obvious (e.g. an unreconciled
  Xero feed vs. a screenshot is usually the screenshot, but a stale
  screenshot vs. a same-day bank CSV export is usually the CSV).

## Orchestrator fill-ins still required

These are known gaps this runbook and its scripts are built to work
*around* today, but which must be completed before the automation is
fully load-bearing:

- `state.json`: `sheet_url` is a placeholder until the workbook's first
  real Google Drive upload has happened.
- `update_workbook.py`: the `CELL_MAP` dict (and `MONTH_COLUMN_MAP` /
  `ACTUAL_HEADER_ROW`) contain `TODO` placeholders for every cell
  address -- these must be filled in against the actual workbook layout
  once `Clent-Jewell-Finance-FY27.xlsx` exists.
- `verify_workbook.py`: similarly has `TODO` placeholders for the
  leaf-cell lists and subtotal/total cell references, and for the
  Cashflow tab's row numbers and month columns. Until filled in, the
  corresponding checks report `SKIPPED (not configured)` rather than a
  false PASS.
- `state.json` `model_params.base_burns`: personal/business monthly base
  burn figures are not yet populated (`null`) -- pull these from the
  workbook's Cashflow tab once it exists, or ask the user.
- `state.json` obligation `div7a_min_repayment`: due date and amount are
  `TBC` -- get the exact figure and date from Clent's accountant.
