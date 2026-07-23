# SOP — Supplier bills, payments and quotes

Entering supplier bills into Xero, coding them, scheduling and making
payment through NAB, and handling supplier quotes. The daily "spend" side
of the reconcile loop.

**Boundary.** Every supplier payment needs Clent's approval before it is
paid, and must trace to a real invoice or Xero ledger entry — never pay
from a bare email claim (control rules 2 and 3 in `CONTROLLER.md`). The
AI prepares the pack; Liz pays; Clent approves.

---

## A. Single supplier bill — email → Xero → payment → reconcile

### Step 1 — Receive the invoice
Most supplier invoices arrive at `accounts@jewellprojects.com`, usually
with us CC'd. Decide whether the supplier is requesting payment.

### Step 2 — Get Clent's approval
Before processing, confirm with Clent that the invoice is approved to
pay. If he is not on the email or has not approved, message him, e.g.:

> Hi Clent, we've received the attached supplier invoice. Happy for us to
> process and pay this?

He may approve by Teams, email, or verbally in a meeting. Only proceed
once approval is received.

### Step 3 — Upload into Xero
For Jewell Projects we generally **do not** use Hubdoc. Forward the
supplier email to the **Xero Bills email address**. Xero imports it to
**Business → Bills → Draft** with the PDF attached automatically.

### Step 4 — Complete the draft bill
Open the draft and set:
- **Supplier** — the correct contact (e.g. 3P Digital, Paul, Kelv).
- **Invoice date** — as shown on the invoice.
- **Due date** — the supplier's stated date, or calculate from terms (7 /
  14 / 30 days).
- **Reference** — the supplier invoice number, exactly (e.g. Invoice
  0139).
- **Attachment** — confirm the forwarded PDF is linked.

### Step 5 — Code the expense
- Copy the supplier's description into the bill (e.g. "Website Development
  – Business Growth & Marketing"). Enter quantity as shown.
- **Account code** — choose the matching expense account. Reminder:
  200-series are income; **300-series and above are expenses**. A
  supplier bill normally codes to 300+.
- **GST** — if the invoice charges Australian GST (10%), use **GST on
  Expenses**; if the supplier is overseas with no GST, use **GST Free**.
- **Tracking / project** — assign the project if the expense belongs to
  one (e.g. Evolve With Us).

### Step 6 — Verify totals
Compare Xero against the invoice: **GST total** and **total amount** must
match (e.g. GST $470, total $5,170). If they disagree, investigate before
approving.

### Step 7 — Schedule the payment
The approved bill sits in **Business → Bills → Awaiting Payment**. Clent
prefers to pay **one day before the due date** (due 1 May → pay 30 Apr).
Add the planned payment date to keep track.

### Step 8 — Make the payment
Pay through NAB internet banking (Pay Anyone or BPAY as appropriate — see
`contractor-and-payroll.md` for Pay Anyone and `ato-and-statutory.md` for
BPAY). In Xero, record the payment on the bill.

### Step 9 — Reconcile
When the payment clears, reconcile it against the bill — see
[`bank-reconciliation.md`](./bank-reconciliation.md) §2.

---

## B. Bulk / batch supplier payments

For paying several approved bills at once.

1. Get Clent's approval that the payments are approved to be paid.
2. Once approved, forward the bills into Xero.
3. In **Xero → Bills → Draft**, process and approve each invoice. For
   every major supplier bill, **assign it to its project**. Set
   **Reference = invoice # + project**, **Description = as per invoice**,
   **Due date = as per invoice**.
4. Once all invoices are approved, tick them to get the **total**.
5. In **NAB**, enter the combined total, put **all invoice numbers in the
   reference**, and pay.
6. In Xero, create a **batch payment** — click **Make Payment**.
7. Send the remittance and **CC Clent**.

### Which proof of payment to send
- **Personal expenses** (e.g. Mattina, legal fees): staff send a
  **screenshot of the bank receipt** as proof.
- **Business expenses**: always use the **official Xero remittance** —
  mark the invoice paid, send to the supplier and CC Clent.

---

## C. Scheduling a bill payment in Xero + NAB

- Always schedule to pay the **day before the due date**.
- Add a **planned date** on the bill in Xero.
- Confirm the scheduled payment is set — the Xero indicator shows it, or
  check the **NAB scheduled/future payments list**.

---

## D. Supplier quotes → client quotes

When a supplier quote comes in (Tropixel, 3P, etc.), raise the matching
client quote.

1. **Get Clent's approval.** Forward the email with the quote attached,
   e.g. "Hi Clent, confirming +30% and 5% admin fee?"
2. **Create the client quote in Xero.** Description matches the supplier
   quote exactly. Attach the supplier's quote PDF (do **not** tick the
   attachment box). Address it to the correct client (Hidrive, Circl,
   etc.).
3. **Add to Asana for monitoring.** In the "Invoices – for monitoring"
   project, under the client, create a task with the Xero quote link and
   status "Quote for approval".
4. **Send for approval.** Reply in the same email thread; send Clent the
   Xero quote link and the Asana link.
5. **Track.** Include it in the weekly agenda under "Quotes for approval"
   and monitor until the client accepts.
6. **Once accepted**, create the invoice in Xero.

---

Next: `contractor-and-payroll.md` for the monthly contractor runs.
