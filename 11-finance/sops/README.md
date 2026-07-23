# Bookkeeping SOPs — operating procedures (Nicole/NCP handover)

Click-level standard operating procedures for the day-to-day bookkeeping
of **Jewell Group Pty Ltd** (Xero, AUD, AEST). These are the granular
"how to click it" procedures that sit **underneath** the cadence
runbooks in `11-finance/`. Where a runbook says *"pay the supplier
batch"* or *"reconcile the bank"*, the step-by-step is here.

**Source.** Transcribed from the finance/bookkeeping SOP pack that Nicole
(NCP Bookkeeping) and the `accounts@jewellprojects.com` team built during
the 2026 handover, held in the shared Google Drive finance folder
([`1kBwE8OwvO0X5RTRX8mY1TtN43Ad8SZIs`](https://drive.google.com/drive/folders/1kBwE8OwvO0X5RTRX8mY1TtN43Ad8SZIs)).
Drive remains the source of truth for the original documents and any
screenshots; this folder is the AI-readable mirror, kept in the repo so a
Claude Code session can reference the procedures without Drive access.

**Governance.** These SOPs are subordinate to `11-finance/CONTROLLER.md`
and this repo's `AGENTS.md`. The control rules always win: **AI prepares
→ Liz pays → Clent approves exceptions → TWB lodges.** No SOP here
authorises the AI to execute a payment, write to Xero, or lodge tax.
`state.json` wins on facts (balances, amounts, payees) whenever a step
below disagrees.

**No secrets.** Credentials are deliberately **not** in this repo. Logins
for NAB, Xero, Gmail, Wise, Payoneer, NordVPN and the TWB portal live in
**Dashlane** and in the Drive `Logins` document. See
[`credentials.md`](./credentials.md). Never paste a password into any
file here.

## The SOP library

| SOP file | Covers | Cadence / runbook |
|---|---|---|
| [`bank-reconciliation.md`](./bank-reconciliation.md) | Reconciling client payments received; supplier bill email→Xero→pay→reconcile; foreign-currency expenses; personal-utility coding split | Daily / `DAILY-PULSE.md` |
| [`supplier-bills-and-payments.md`](./supplier-bills-and-payments.md) | Processing supplier bills (single, bulk/batch); scheduling payment in Xero + NAB; supplier quotes | Daily–weekly / `WEEKLY-UPDATE.md` |
| [`contractor-and-payroll.md`](./contractor-and-payroll.md) | Monthly PO/invoice for PH contractors (Xero); monthly Wise run (Liz, Nicole, Ron); PO→bill payroll (Kelvin); Sue & Spencer weekly; Rao (Payoneer) | Weekly + monthly / `WEEKLY-UPDATE.md`, `MONTHLY-CLOSE.md` |
| [`ato-and-statutory.md`](./ato-and-statutory.md) | BAS lodgment & ATO payments (Jewell Group + Jewell Investment); paying BAS quarterly; ASIC annual | Quarterly / `QUARTERLY-BAS.md` |
| [`reporting.md`](./reporting.md) | Weekly cash-flow report (Monday); monthly P&L / business snapshot; costing & PL cashflow; downloading the bank statement | Weekly + monthly / `WEEKLY-UPDATE.md`, `MONTHLY-CLOSE.md` |
| [`personal-payments.md`](./personal-payments.md) | Child-support payments (Matina); personal utilities and expenses — **gated personal content** | As required |
| [`credentials.md`](./credentials.md) | Where every login lives (Dashlane / Drive). No secrets in-repo. | — |

## Source manifest (Drive file → SOP)

Original Drive documents, for audit and re-sync. IDs are stable; titles
may drift.

| Drive title | Type | Mapped into |
|---|---|---|
| Handover Task Tracker | Sheet | this README (task list below) |
| Logins | Doc | `credentials.md` (redacted — pointer only) |
| SOP – BAS Lodgment & ATO Payments (Jewell Group & Jewell Investment) | Doc | `ato-and-statutory.md` |
| Paying BAS payments quarterly | Sheet | `ato-and-statutory.md` |
| Processing ASIC pay (yearly) in NAB | Doc | `ato-and-statutory.md` |
| Reconciling & Processing Supplier Bills (Email → Xero → Payment → Bank Reconciliation) | Doc | `bank-reconciliation.md` + `supplier-bills-and-payments.md` |
| Reconciling a Client Payment (Received money from client) | Doc | `bank-reconciliation.md` |
| Reconciling different currency expenses | Sheet | `bank-reconciliation.md` |
| Coding Personal Utilities - Electricity, Gas | Sheet | `bank-reconciliation.md` + `personal-payments.md` |
| Processing Supplier Bills and Payment in Bulk | Doc | `supplier-bills-and-payments.md` |
| processing Bill in a schedule payment through Xero and NAB | Doc | `supplier-bills-and-payments.md` |
| Processing Quote from a Supplier | Doc | `supplier-bills-and-payments.md` |
| 01 Processing Monthly PO/invoice (Liz, Nic, Ron) via Xero (PH Team) | Doc | `contractor-and-payroll.md` |
| 02 Processing Monthly Payment (Liz, Nic, Ron) via Wise (PH Team) | Doc | `contractor-and-payroll.md` |
| PO/payroll - Xero&NAB.docx | Doc | `contractor-and-payroll.md` |
| PO/Payroll - WISE.xlsx | Sheet | `contractor-and-payroll.md` |
| wise.xlsx | Sheet | `contractor-and-payroll.md` |
| Processing PO/Pay for Sue and Spencer (usually weekly) | Sheet | `contractor-and-payroll.md` |
| Processing Pay for Rao (payoneer) | Doc | `contractor-and-payroll.md` |
| Weekly Cash Flow Reporting (Monday) | Doc | `reporting.md` |
| Monthly Reporting | Doc | `reporting.md` |
| Costing & PL - Cashflow | Doc | `reporting.md` |
| Downloading the Bank Statement | Doc | `reporting.md` |
| Child Support Payment.docx | Doc | `personal-payments.md` (gated) |

## Handover task tracker (from the Drive sheet)

The master list of recurring duties, as recorded in the handover.
Frequency in the middle column; the notes are the handover author's.

**Business**

| Task | Frequency | Note |
|---|---|---|
| Daily bank reconciliation — money received | Daily | See `bank-reconciliation.md` |
| Daily bank reconciliation — spend: process bills in Xero/Hubdoc | Daily | See `supplier-bills-and-payments.md` |
| Check and monitor the `accounts@` inbox | Daily | — |
| Process weekly pays for Sue and Spencer, if applicable | Weekly | See `contractor-and-payroll.md` |
| Weekly agenda for meeting | Weekly | Reuse the previous week's |
| Process supplier bills for payment | As required | Get Clent's approval first |
| Follow up overdue client invoices | As required | Xero automation at 3 and 7 days overdue, then email directly |
| Process monthly payments to Philippine contractors | Monthly | ~1st of month; see `contractor-and-payroll.md` |
| Process the monthly payment to Rao | Monthly | ~1st of month; Payoneer |
| Monthly review of the accounts | Monthly | See `MONTHLY-CLOSE.md` |
| Prepare and send the monthly P&L report | Monthly | See `reporting.md` |
| ATO obligations — Jewell Group and Jewell Investment | Ongoing | See `ato-and-statutory.md` |
| Send BAS for review to Damian | Quarterly | See `ato-and-statutory.md` |
| Process BAS payment to ATO (BPAY) | Quarterly | NAB BPAY |
| NAB payment — BPAY | As required | General procedure in `ato-and-statutory.md` |
| NAB payment — Pay Anyone | As required | General procedure in `contractor-and-payroll.md` |

**Personal (gated — see `personal-payments.md`)**

| Task | Note |
|---|---|
| Process pays for the kids | Uses the current spreadsheet |
| Process other personal payments and expenses as required | — |

## Keeping this current

Under the standing improvement directive, these SOPs may be updated as
the real process changes — logged in `06-memory/decision-log.md` and kept
reversible. When a step changes in practice, update the SOP here and, if
the original is still the operator's working copy, note it against the
Drive document too. Git history is the changelog.

Next: read `bank-reconciliation.md` for the daily reconcile loop.
