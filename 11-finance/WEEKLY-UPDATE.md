# Weekly Finance Update Runbook — business half

This runbook is written for a **future Claude Code session with fresh
context** (no memory of prior conversations). It is fully self-contained:
follow it top to bottom and you will have everything needed to run the
business half of Clent Jewell's weekly finance update without asking the
user anything except for information genuinely only they have (e.g. a
pasted screenshot, or a confirmation of an ambiguous figure).

If you are that future session: read `CONTROLLER.md` first, then this
entire file, then `state.json` in this same directory for the current
known business state.

**This half runs first.** The Wednesday 17:00 UTC Routine is scoped to
both repos; after this runbook, run the personal half's
`WEEKLY-UPDATE.md` in `clentjewell/clent-jewell-personal` at
`11-finance/`. That half owns the FY27 workbook and every write to it,
the private-layer queue, and the weekly cash brief. **This runbook never
writes the workbook.** It refreshes the business state, prepares the
payment-run pack and the receivables chase, reconciles the playbook, and
hands the personal half the business figures it needs.

## Purpose

Keep the business state current (`state.json`), prepare the week's
payables and receivables work for Liz and Clent, keep these docs true, and
produce the business figures the workbook step consumes.

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
   - Read any new exports for the **business accounts only**: NAB CSVs
     for the business transaction, Maxxim, petty cash and business
     credit card accounts; Macquarie CSVs and Hub24 PDFs for the JIG
     accounts. Extract the latest closing balance and its statement date
     from each. Record source `"file:<filename>"`. Personal-account
     statements in the same folder are the personal half's to read;
     leave them.

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
     "unreconciled delta" -- flag it explicitly in the hand-off and in the
     brief (see "Xero unreconciled count" below), do not just quietly pick
     one.

**Rule: never silently keep a stale number.** Every balance in
`state.json` carries an `as_at` date. If a source did not refresh a given
account this week, its `as_at` date stays old on purpose -- that
staleness is itself a signal (">14 days old" gets flagged).

## Update procedure

Run these steps in order.

1. **Read `state.json`** in this directory. Note `last_run`, every
   account's current `balance`/`as_at`/`source`, the
   `obligations_calendar`, `model_params` and the `controller` block.

2. **Pull sources**, in the precedence order above (screenshots, if any
   were pasted this session > Drive file exports newer than `last_run` >
   Xero). For every business account in `state.json`, decide: does it
   have a fresher value this week, and from which source?

3. **Compute the business actuals for the workbook.** For any FY27 month
   that has now fully closed since the last run, map Xero's P&L for that
   month to the workbook's rows: Business Income → total income;
   Contractors / Subscriptions / Operating → the matching expense-account
   groups; Business Tax → tax paid that month; NET BUSINESS = income −
   expenses − tax. Do not write these anywhere except the hand-off block
   below; the personal half writes the tab. **Forecast income rule
   (standing policy, decided 9 Jul 2026):** only Xero invoices in
   **Awaiting Payment** status (approved & sent) feed forecast income --
   never drafts or quotes. Quotes and pipeline value get their own
   visibility row (fed from CRM/Asana by Ronnie); don't blend the two.
   See `CONTROLLER.md` "How this playbook stays current" and
   `state.json` `forecast_vs_actual.invoice_status_rule`.

4. **Payment run pack** -- see the section below.

5. **Receivables chase** -- see the section below.

6. **Playbook reconciliation (keep the docs true).** This step keeps
   `CONTROLLER.md`, `state.json`, and `LIZ-ONBOARDING.md` synced with
   real-world decisions and events. See `CONTROLLER.md`'s "How this
   playbook stays current" for the policy this step implements.

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
      now resolved. Anything personal-layer that surfaces (a household
      matter, the family ledger) is handed to the personal half, never
      written here.
   4. **Apply corrections** with label-anchored edits (match on unique
      existing text, not line numbers) to whichever files are stale. Add
      newly-decided items to `CONTROLLER.md`'s Decisions log; open new
      pending items or close resolved ones.
   5. Also **sweep this week's Gmail hits** (already gathered in the
      payment-run and receivables steps) for documented-fact changes — a
      due date, an amount, a person's role or access, an account detail —
      that contradict what the docs currently say (e.g. an ATO/TWB/bank
      notice with a different due date than the obligations calendar).
   6. If `LIZ-ONBOARDING.md` changed in this step, **re-upload it to the
      Drive finance folder** (folder id
      `1M26jT3U13N9v0v9k5J56KX-Aw0PTjPys`) as a new dated Google Doc
      titled `Liz Onboarding Guide — Finance (<D Mon YYYY>)` — same
      session, don't defer it.
   7. Update `state.json`'s `controller.playbook_reconciliation
      .last_reconciled` (today's date) and `.last_meeting_ids` (the ids
      you just processed).
   8. Note the reasoning for every correction you made — it feeds
      directly into the commit message in step 8 below.

   **Hard rule: never auto-apply a change that contradicts an explicit
   Clent decision already recorded in the Decisions log.** If a meeting
   or email seems to contradict a logged decision, flag it to Clent
   instead of overwriting the decision — decisions log entries are
   deliberate and sticky, not just the most-recent fact.

7. **Update `state.json`**: for every business account you refreshed,
   write its new `balance`, `as_at`, and `source`. Set `last_run` to
   today's date/time and bump `version_stamp` by 1. Roll any obligation
   whose date has passed (confirm the outcome first; never delete).

8. **Commit & push** `state.json` and any `CONTROLLER.md` /
   `LIZ-ONBOARDING.md` / `README.md` changes from step 6 to a branch in
   this repo, then open or update the standing draft PR. Never push to
   `main`. Write the commit message with the **reasoning** for each
   playbook correction (not just "updated docs") -- the git log is this
   playbook's changelog.

9. **Hand off to the personal half** -- see the block below -- then run
   the personal half's `WEEKLY-UPDATE.md` in the same session.

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
   a payment prompted only by a raw email claim (see the double-payment
   lesson in `CONTROLLER.md` rule 3).
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
4. Report a summary in the hand-off: total receivables overdue ($ and
   count), how many chase drafts were created this week, and any
   invoice overdue **>30 days** flagged for the top of the brief
   (persistent non-payment is worth Clent's attention even though it's
   not one of the hard escalation triggers).

## Hand-off to the personal half

End this half's work with this block in your output. The personal half
reads it and the updated `state.json`:

    Business half -- week of <date>

    Business balances refreshed: <key=value@as_at (source)> ...
    Business cash (nab_biz_trans + nab_maxxim + nab_petty_cash): $<X> as at <date>
    Business actuals for closed months: <YYYY-MM: Income / Contractors /
      Subscriptions / Operating / Tax / NET> ... (or "none closed")
    Business obligations due within 14 days: <date: item -- $amount> ...
    Business base burn: $<model_params.base_burns.business_monthly_avg>/mo
    Payment pack: <N lines, M NEEDS CLENT OK; draft subject>
    Receivables: $<total> overdue across <N> invoices; <K> chase drafts; >30 days: <list or none>
    Xero unreconciled count: <N accounts where Xero disagrees with the
      freshest bank source, or "0 -- clean">
    Playbook reconciliation: <corrections made, or "no drift">

## Escalation rules

- **Business cash below the thresholds** in `state.json`
  `controller.thresholds`: apply `CONTROLLER.md`'s escalation matrix
  (urgent below $2,000; alert below $5,000).
- **If any source (Xero, a bank file, a screenshot) contradicts the
  current state by more than $2,000 for the same account/date**: flag it
  clearly in the hand-off and in your own notes. Do **not** silently
  overwrite the number without noting the discrepancy -- ask the user
  which figure to trust if it isn't obvious (an unreconciled Xero feed vs
  a screenshot is usually the screenshot, but a stale screenshot vs a
  same-day bank CSV export is usually the CSV).
- **Holistic runway** (business plus personal cash against the SE Asia
  burn) is computed in the personal half's brief, not here.

## Orchestrator fill-ins still required

- `state.json` obligation `div7a_min_repayment`: due date and amount are
  `TBC` -- get the exact figure and date from Damian/TWB.
- `state.json` `model_params.base_burns.business_monthly_avg` is the FY27
  conservative base -- refresh it when the Cashflow tab changes.
- Obligations whose dates have passed (`bas_q4fy26`, `payg_instalment_jul26`,
  `dtv_funding_aug26`) need their outcomes confirmed and rolled forward
  at the next run.

Next: run the personal half's `WEEKLY-UPDATE.md`.
