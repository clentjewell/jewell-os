# SOP — Contractor payments and payroll

Monthly runs for the Philippine team, weekly pays for Sue and Spencer,
Kelvin's recurring payroll, and Rao via Payoneer. Covers the two rails:
**Wise** (overseas) and **NAB Pay Anyone** (domestic).

**Boundary.** Liz executes all payments; the AI prepares the pack and
drafts the approval message. Any new payee, or a payment >$1,000 outside
the recurring approved list, needs Clent's explicit OK first
(`CONTROLLER.md`, control rule 2). Note Liz is herself a Wise payee — the
approval rule is the compensating control.

---

## A. Monthly PO / invoice for PH contractors (Xero)

We prepare the Purchase Order ourselves each month — we do **not** wait
for contractor invoices. Payees: Liz, Nicole, Ron (and similar).

1. **Xero → Business → Purchases → Purchase Orders**, open the **All**
   tab.
2. Find the contractor's most recent PO. **Click the three dots →
   Duplicate → Duplicate** (keeps coding consistent).
3. Update the details:
   - **Date raised** — last day of the month being paid (e.g. 31 July
     2026 for July's work).
   - **Delivery date** — same as date raised.
   - **Reference** — the month being paid (e.g. "July 2026").
   - **Branding theme** — should default to **RCTI Contractors**;
     confirm.
4. **Line item** — description = the month (e.g. "July 2026"). For a
   fixed monthly fee: Qty 1, Unit price 1,000, Total 1,000. Add a
   separate line for any adjustment (additional work, bonus, deduction).
5. **Account code** — confirm: Liz and Roni → **439 Professional Service
   Contractors**; bookkeeping contractors (e.g. Nicole) → the designated
   bookkeeping expense account. Duplicating should carry the right code;
   review before approving.
6. **Tax rate** — PH contractors are always **GST Free**. Confirm.
7. **Verify the total** — standard monthly is **AUD 1,000**; if adjusted,
   check the final total matches the agreed amount.
8. **Approve.**
9. **Email** the PO: template **RCTI**, "attach PDF" ticked, do **not**
   tick the option that sends a copy to the Accounts address, no need to
   CC Clent. Click **Send Email**. The contractor receives the PO
   confirming the month's amount.

---

## B. Monthly payment via Wise (PH team)

Payees: Ronnie, Liz, Nicole. Processed on the **first day of the month**;
may be released earlier if Clent approves.

1. **Draft the approval message** for Clent, e.g.:
   > Hi Clent, for approval of monthly payments to be paid today:
   > • Liz – $1,000  • Ronnie – $2,000  • Nicole – $200
2. **Wait for Clent's confirmation** via WhatsApp before processing. Only
   proceed once approval is received.
3. **Transfer funds NAB → Wise.** NAB → **Transfer & Pay → Pay Anyone** →
   Business account → payee **Wise**. Enter the amount, reference "Team
   PH". **Next → Confirm Payment**.
4. **Process in Wise.** Log in, select the recipient (Ronnie / Liz /
   Nicole), enter the amount, **Continue**, add the reference (invoice
   number), **Send**.
5. **Send remittance** to each recipient and **CC Clent**.

Quick Wise recipient steps (from the Wise worksheet): click the recipient
→ amount → Continue → reference → Send. For a new Wise payee funded from
an external transfer: click "I've made my bank transfer" / "Add money",
then Send → name → amount → Continue → reference → Confirm and Send.

---

## C. PO → bill payroll via Xero + NAB (recurring, e.g. Kelvin)

1. In Xero, create a **Purchase Order** for the recurring weekly payee
   (e.g. Kelvin) — correct dates and reference.
2. **Options → Copy to Bills** (always check the updated date). This
   payee is paid via **Wise** in the source note; use the rail that
   applies to the payee.
3. In Xero: **Business → Bills to pay → Awaiting Payment**. Open the
   payee's bill → **Bill Options → Edit** → update the **date**, set the
   **project (PL)** accordingly → **Update**.
4. **Pay in NAB:** **Transfer & Pay → Pay Anyone** → **B1 Biz** → choose
   the payee → amount → reference → **Pay Now**.
   - If only one person is being paid, no batch is needed — go straight
     to NAB.
5. In Xero, **record the payment**. **Send the remittance and CC Clent.**

---

## D. Sue and Spencer — weekly PO/pay

1. On WhatsApp, check with **Sue and Spencer**. If they/Clent have not
   sent anything payable by **Friday 3pm**, send a reminder on WhatsApp.
2. **Xero → Purchases → Purchase Orders.** Search **Sue** → open the most
   recent PO → **three dots → Duplicate** → change **description** and
   **reference** → **Create Bill**.
3. Check details: **reference = the date of work**; **description = date
   of work / day / hours**. Change the **Qty**; rate is always **$40 per
   hour**.
4. Approve and **email to Sue** — template **RCTI**, attach PDF, untick
   "send myself", **Send Email**.
5. Go to **Bills** and confirm the info matches the PO.
6. **NAB → Transfer & Pay → Pay Anyone** → From **B1 Biz** → To saved
   payee **Sue Beamish** → **Next** and pay.
7. In Xero, **Record Payment** (the green button).
8. Once paid, update Sue and **send the remittance — CC Clent**.

---

## E. Rao — Payoneer

1. Create a PO (copy the latest one). Should always be **$1,800 per
   month**.
2. **Clent approves** the payment.
3. Pay via **Payoneer**.
4. When reconciling Rao's payment, the amount is usually **not exactly
   $1,800** — Payoneer fees must be accounted for. Reconcile to the
   actual debited amount and code the fee difference.

---

## Rails at a glance

| Payee | Rail | Amount | Frequency |
|---|---|---|---|
| Liz, Nicole, Ronnie (PH team) | Wise (funded via NAB Pay Anyone) | Liz $1,000 · Ronnie $2,000 · Nicole $200 (confirm each run) | Monthly, ~1st |
| Kelvin | Xero bill → Wise / NAB | per PO | Weekly recurring |
| Sue, Spencer | NAB Pay Anyone | hours × $40 | Weekly |
| Rao | Payoneer | $1,800 (fees on top) | Monthly |

Amounts here are the handover-noted figures. `state.json` wins if it
disagrees; confirm against the current approval message each run.

---

Next: `ato-and-statutory.md` for BAS, ATO and ASIC.
