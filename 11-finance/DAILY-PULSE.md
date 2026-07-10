# Daily Pulse Runbook

This runbook is written for a **future Claude Code session with fresh
context**. It is fully self-contained. Read `CONTROLLER.md` first if you
have not already this session (people, RACI, control rules, escalation
matrix, obligations calendar) — this runbook assumes you know it. Then
read `state.json` for current balances/thresholds.

## Purpose

A weekday-morning **exception-only** check. This is deliberately the
lightest-weight cadence in the kit: pull a few live numbers, compare
against thresholds, and — critically — **stay quiet if nothing needs a
human**. This is not a mini weekly-brief; do not reproduce
`WEEKLY-UPDATE.md`'s full analysis here.

## Steps

1. **Load tools.** `ToolSearch
   "select:mcp__Xero__get_cash_position,mcp__Xero__get_contacts_and_receivables,mcp__Gmail__search_threads,mcp__Gmail__get_thread,mcp__Gmail__create_draft"`.

2. **Read `state.json`.** Note `last_run`, the `controller.thresholds`
   block (`business_cash_alert`: 5000, `business_cash_urgent`: 2000),
   and `obligations_calendar` (for near-term due dates worth mentioning
   if a Gmail search below turns up something related).

3. **Pull Xero cash position** (`get_cash_position`). Identify the
   **business** cash figure specifically — sum whichever accounts in the
   response correspond to the business entity (Jewell Group), not
   personal/JIG/investment accounts. Cross-check against
   `state.json`'s `nab_biz_trans` (+ related NAB business accounts) if
   the mapping is ambiguous.

4. **Compare against thresholds:**
   - Business cash **< $2,000** → **urgent**. This is an immediate
     escalation per `CONTROLLER.md`'s escalation matrix — don't just note
     it, treat it as the lead item.
   - Business cash **< $5,000** → **alert**. Worth a bullet, not a
     five-alarm response.
   - Otherwise → no cash exception.

5. **Check Gmail for new bills/invoices/payment-failed/overdue notices
   since `last_run`.** Search patterns (reuse `WEEKLY-UPDATE.md`'s
   precedence style — most-specific first):
   - `newer_than:1d (subject:invoice OR subject:bill OR subject:"payment failed" OR subject:overdue OR subject:"payment due")`
   - `newer_than:1d from:(twb.com.au OR asic.gov.au OR nab.com.au)`
   - `newer_than:1d (subject:"direct debit" OR subject:"card declined" OR subject:reminder)`

   If `last_run` in `state.json` is more recent than 1 day (e.g. this is
   a Monday catching up a weekend, or the routine ran twice in a day),
   widen the window to cover the actual gap rather than a fixed 1 day —
   use `newer_than:Xd` for the right X, or an explicit date range.

   Read any matching thread. Only treat it as an exception if it is
   genuinely new/actionable (a new bill, a failed payment, an overdue
   notice) — routine receipts/confirmations for already-known recurring
   items are noise, not exceptions.

6. **Check receivables for new overdue items**
   (`get_contacts_and_receivables`). Compare against what you'd expect
   from the last weekly brief (if you have context on it) — flag any
   invoice that has newly crossed into overdue territory. Do not attempt
   a full receivables audit; that belongs to the weekly "Receivables
   chase" section.

7. **Sweep Slack `#sam-financial-controller` for new questions from Liz.** This is
   the AI-as-coach half of Liz's Finance Hub (see `CONTROLLER.md`,
   "Liz's Finance Hub").
   - `ToolSearch "select:mcp__Slack__slack_search_channels,mcp__Slack__slack_read_channel,mcp__Slack__slack_send_message"`.
   - Find the channel by name (`slack_search_channels` for
     `finance-hub`). **If the channel doesn't exist yet, note "channel
     setup pending" and skip this step** — do not create the channel
     yourself.
   - Read messages since the last run (`slack_read_channel`, with
     `state.json`'s `last_run` / the previous pulse as the cutoff).
   - For each new question from Liz, **post a coaching answer** in the
     channel (`slack_send_message`): plain-English, step-by-step,
     patient tone — she's new to bookkeeping, so explain the *why*, not
     just the *what*, and point her at the matching section of
     `LIZ-ONBOARDING.md` where one exists.
   - **Do not guess.** Anything ambiguous, and anything touching
     approvals or money movement (new payee, changed bank details,
     "should I pay this?"), gets escalated to Clent instead of answered:
     say so in the channel ("good question — this one needs Clent, I've
     flagged it") and surface it as an exception in this pulse's output.
   - Routine coaching answers do **not** count as "exceptions" for the
     output rule below — a pulse that only answered Hub questions and
     found nothing else still outputs the all-clear one-liner, with a
     short tail: `(answered N questions in #sam-financial-controller)`.

8. **Doc-drift flag (cheap, flag-only).** If today's Gmail sweep (step
   5) surfaced anything that contradicts a documented fact — an
   obligations-calendar date or amount, a person's role, an account
   detail — e.g. an ATO/TWB/bank notice with a different due date than
   what `CONTROLLER.md`/`state.json` currently say, add one line to the
   pulse output: `PLAYBOOK DRIFT: <what> — weekly run to reconcile`. **Do
   not edit playbook files during the pulse** — this cadence only
   detects and flags; `WEEKLY-UPDATE.md`'s "Playbook reconciliation"
   step owns actually fixing the docs (see `CONTROLLER.md` "How this
   playbook stays current").

## Output rule — this is the whole point of this runbook

**If nothing crosses a threshold and nothing needs a human**, output
exactly **one line** and stop:

    Daily pulse: all clear, cash $<X>

Do not draft emails, do not send any notification beyond the routine's
own automatic completion notification, and do not pad the output with
routine detail. Silence (a one-liner) is success for this cadence.

**If exceptions exist**, output a short bullet list, **most urgent
first**:

    Daily Pulse -- <date> -- ACTION NEEDED

    - [URGENT] Business cash $<X> is below the $2,000 urgent threshold.
      <one line on why if known, e.g. large Wise run just went out>
    - [ALERT] Business cash $<X> is below the $5,000 alert threshold.
    - New bill from <sender>: <subject> -- $<amount>, due <date>.
      <NEEDS CLENT OK if new payee/>$1,000, otherwise note it'll be
      included in the next payment pack>
    - Payment failed: <what/who -- from the Gmail thread>. Drafted a
      note to <Liz-via-Clent / Damian> -- see Gmail drafts.
    - New overdue receivable: <contact> -- $<amount>, <N> days overdue.
    - PLAYBOOK DRIFT: <what -- e.g. "TWB notice gives a BAS due date that
      doesn't match the obligations calendar"> -- weekly run to
      reconcile.

   For anything requiring a reply, chase, or instruction, **draft it as
   a Gmail draft** (`create_draft`) rather than describing what someone
   else should write — a human sends it, but the draft should be ready
   to go. Apply the control rules from `CONTROLLER.md` (never draft a
   payment instruction for a new payee or >$1,000 item without marking
   it `NEEDS CLENT OK`; trace every payment claim to an invoice/ledger
   entry, never a raw email).

## What this runbook does NOT do

- No workbook edits, no `state.json` writes, no git commits — this is a
  read-and-report cadence only. (If you spot something that genuinely
  needs a balance update, e.g. a large unexpected movement, mention it
  in the output and let the next weekly run pick it up properly rather
  than doing a partial workbook edit here.)
- No full receivables/payables reconciliation — that's monthly/weekly.
- No BAS/compliance-calendar review — that's quarterly (though an
  urgent compliance item, like an ASIC notice just arriving, is still an
  exception worth a bullet here per the escalation matrix).
