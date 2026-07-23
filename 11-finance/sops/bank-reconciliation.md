# SOP — Bank reconciliation (daily)

Reconciling the bank feed in Xero: money in from clients, money out to
suppliers, foreign-currency expenses, and the personal-utility split.
This is the daily reconcile loop that `DAILY-PULSE.md` monitors.

**Boundary.** The AI cannot click matches in Xero — Xero access is
read-only. Liz reconciles; the AI flags exceptions. Everything below is
Liz's procedure, kept here so the AI can prepare accurate worklists.

---

## 1. Money received — reconciling a client payment

When a payment lands in the bank feed, Xero usually finds the matching
unpaid sales invoice and shows it in green on the right.

Worked example: $385 received from McKay Malcolm David.

1. Xero looks for an invoice with the same **customer**, **amount** and
   **reference**. If it finds one, it shows the suggested match in green.
2. Confirm the outstanding invoice at **Sales → Invoices → Awaiting
   Payment**. Here: Dr McKay / McKay Malcolm David, invoice 23916, $385.
3. Because both sides are $385, Xero suggests the match. Note: if the
   amounts differ (client paid $400 against a $385 invoice) the green
   match may not appear — match it manually.
4. Before clicking, compare both sides:
   - **Left (bank):** payer/description, amount received, bank reference.
   - **Right (Xero):** client name, invoice number, invoice amount.
5. Confirm client, invoice number and amount agree, then click **OK** to
   reconcile. The item leaves the Reconcile tab and appears under
   **Account Transactions**.

### Send the client a receipt

1. Go to **Account Transactions** and open the reconciled Received Money
   transaction.
2. Click **Send Receipt**.
3. Check the client's email is correct, add a comma, and **add Clent's
   email** so he is copied.
4. Send.

---

## 2. Money out — reconciling a supplier bill

When a supplier payment clears (usually the next day) it appears in the
feed. Because the payment equals the bill, Xero suggests the matching
bill in green.

1. Before clicking OK, confirm **supplier name**, **invoice reference**
   and **payment amount**. Example: 3P Digital, invoice 0139, $5,170.
2. If everything matches, click **OK**.
3. After reconciliation: the transaction moves to **Account
   Transactions**, the bill leaves **Awaiting Payment**, and the bill
   status changes to **Paid**.

The full bill-entry-through-payment procedure is in
[`supplier-bills-and-payments.md`](./supplier-bills-and-payments.md);
this section is only the final reconcile step.

---

## 3. Foreign-currency expenses

Some expenses are billed in another currency and paid by credit card
(for example **Semrush**, paid by card).

- Reconcile against the **converted AUD amount shown in the bank feed**,
  not the foreign-currency figure on the invoice.
- The bank feed's AUD value is the truth for the ledger; any small
  difference from the invoice's converted figure is exchange/fees.

---

## 4. Coding personal utilities — business/personal split

Some of Clent's personal utilities are paid from the business and must be
apportioned.

- Split personal utilities **20% business / 80% personal**.
- Applies to: **Tweed Council**, **internet**, **electricity**,
  **Origin**.

This is a personal-layer coding rule; the personal side is gated — see
[`personal-payments.md`](./personal-payments.md).

---

Next: `supplier-bills-and-payments.md` for entering and paying bills.
