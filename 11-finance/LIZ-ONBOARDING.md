# Welcome to Finance — Liz's Onboarding Guide

Hi Liz — this is your guide to the finance side of your role at Jewell
Group. It's written for you (not for a computer this time), so it's
plain-English and step-by-step. Take your time with it; nobody expects
you to be a bookkeeper overnight — and you won't be learning alone:
**Nicole** (the previous bookkeeper, and Louis's boss) is running your
handover and will **train you over screen-share and video calls**
(starting Monday 13 July) on reconciliation and payments, and **Louis
is still around until 28 July 2026** to answer questions before he
moves on. This guide backs up that training; it
doesn't replace it. If anything here doesn't make sense, see "Where to
get help" below — asking is always the right move.

A quick heads-up on how this fits together: Clent now has an AI
assistant that handles a lot of the finance admin — pulling numbers from
Xero, drafting emails, keeping the budget spreadsheet up to date. But
there are things only a human can and should do: actually paying money,
clicking "match" in the bank reconciliation screen, and deciding what's
okay to approve. That's you. This guide covers those parts.

---

## a. Your role, in one paragraph

You're now the person who **actually moves money** for the business
(NAB banking and the monthly Wise payments to Ronnie, yourself, and
Rao), and you're learning to keep **Xero's bank reconciliation** tidy
(a small, regular task — more on that below). You're also the one who
checks and promotes child-support claims from Matina once they've been
reviewed. Here's how the four of you fit together — this is called a
RACI, just a fancy way of saying "who does what":

- **The AI assistant** prepares — it pulls the numbers, drafts the
  emails, tells you what's due and when.
- **You (Liz)** pay — you execute the actual payments once you've
  checked them, and you keep Xero reconciled.
- **Clent** approves exceptions — anything new or unusual needs his
  sign-off before you pay it (see the control rules below — this is the
  one part of this guide that really matters).
- **TWB (the accountants)** lodge — quarterly BAS and annual tax returns
  go through Damian at TWB, not through you.

(During the handover — until 28 July 2026 — two more people are in the
picture: **Nicole**, who is training you via screen-share and video
calls, and **Louis**, who is finishing up and lodging the final BAS of
FY26 himself before he goes. After the 28th, it's the four parties
above.)

## b. Xero bank reconciliation — step by step

This is the one genuinely new skill here, so let's go slowly. "Reconciling"
just means matching what's shown in your bank account to what Xero has
recorded, so the books actually reflect reality. It sounds bigger than
it is.

**Logging in:** Go to `login.xero.com` and sign in with the login Clent
sets you up with (see the first-two-weeks checklist below — getting this
access sorted is step one). You'll land on the Xero dashboard for
Jewell Group.

**Finding the Reconcile screen:** From the dashboard, click
**Accounting → Bank accounts** (or click directly on a bank account tile
on the dashboard). Each bank account (NAB Business Transaction, NAB
Business Credit Card, etc.) has its own **Reconcile [N] items** button —
click it for the account you want to work on.

**What you'll see:** Two columns. On the left, a bank transaction that's
come in via the live bank feed. On the right, Xero's best guess at what
it matches to (if it has one) — shown in green with a tick if it's
confident.

**Matching, three ways:**
- **Match** — if Xero shows a green suggested match and it's correct
  (right amount, right date, obviously the same transaction), click
  **OK**. This is the fast path and covers most day-to-day transactions
  like a subscription direct debit or a contractor payment you already
  entered.
- **Create** — if there's no suggested match (a brand new transaction
  Xero hasn't seen before, e.g. a one-off expense), you'll need to
  create it: pick the right **account code** (see the cheat sheet
  below), a short description, and confirm. This is how a bank line
  becomes a properly coded transaction in the books.
- **Transfer** — if the transaction is money moving *between* the
  business's own accounts (e.g. from the NAB Business Transaction
  account to a savings/offset account), use **Transfer** instead of
  Match or Create — it tells Xero this isn't income or an expense, just
  money moving internally.

**Coding basics — which account code for what:** You won't need to
memorise all of Xero's account codes. Here's the cheat sheet for the
spends that come up again and again (pulled from the business's actual
budget categories):

| What it is | Code it as |
|---|---|
| Ronnie / Liz / Rao Wise payments | Contractors (overseas) |
| Rao's fortnightly Payoneer invoices | Contractors (overseas) |
| Asana, Adobe, Anthropic, Apple, ChatGPT, Google Workspace, Go High Level, Wildjar, WPMUDEV, Loveable, Namecheap, Techpresence, Brave, Hubbl, Gamma, SuperUltra, Slack, Supabase, OpenAI API, Webroot | Subscriptions |
| Telstra | Telstra (its own line — don't lump into general subscriptions) |
| Origin | Origin (energy — its own line) |
| Bank fees / account fees | Bank Fees |
| Anything clearly personal (Clent's own spending run through a business account by mistake, etc.) | Drawings — flag it to Clent too, don't just code it silently |

**When you're not sure:** Leave it unreconciled and make a quick note
(a comment on the transaction in Xero works fine, or just remember it —
the weekly AI-run finance check looks at what's still sitting
unreconciled and will flag it for you as part of its own worklist).
**Never force a match just to clear it** — an incorrect match is worse
than an unreconciled item, because it quietly makes the books wrong.
When genuinely stuck: during the handover, ask Nicole (that's exactly
what her training sessions are for); after that, post it in
`#sam-financial-controller` (see "Where to get help" below).

**How often:** Aim for **about 15 minutes, twice a week** (e.g. Monday
and Thursday mornings with a coffee). Little and often is much easier
than letting weeks of transactions pile up — that turns a 15-minute job
into a multi-hour one.

**Official reference:** Xero has a proper tutorial with screenshots and
video if you want a second explanation alongside this one — search
"Xero Central bank reconciliation" or go to
`central.xero.com` and search "Reconcile bank transactions".

## c. The weekly payment run

Each week you'll get an email (from Clent, forwarded from the finance
assistant) with a payment pack — a table like this:

| Payee | Amount | Account/Reference | Due date | Approval status |
|---|---|---|---|---|
| Telstra | $120 | ref TEL-0725 | 12 Jul | Auto-approved (recurring) |
| New Supplier Pty Ltd | $2,400 | INV-0091 | 14 Jul | **NEEDS CLENT OK** |

**The control rules you must never break, even under time pressure:**

1. **Never pay a NEW payee, or anything over $1,000 that isn't on the
   recurring list, without Clent's written OK.** "Written" means an
   actual reply from Clent (email, message — something you can point
   back to), not an assumption that it's probably fine. If a line says
   `NEEDS CLENT OK` and you don't see his sign-off, don't pay it yet —
   flag it back and wait.
2. **Never pay from a raw email request.** If someone emails asking to
   be paid, that's not enough on its own — it has to trace back to an
   actual invoice or a line in the payment pack. This isn't a
   hypothetical rule: a co-parent claim once nearly got paid twice
   because someone actioned an email reminder without checking whether
   it had already been paid. Always check the pack/ledger first.
3. **Check payee bank details against the payment pack, not against an
   email.** Scammers sometimes send a very convincing "updated bank
   details" email pretending to be a real supplier. The pack is your
   source of truth for account numbers — if an email tries to change
   payment details, treat it as suspicious by default (see the scam
   note below) and confirm with Clent before using new details.

Anything auto-approved (recurring), you can just go ahead and pay via
NAB internet banking as normal. Anything marked `NEEDS CLENT OK`, hold
until you see his sign-off.

## d. The monthly Wise contractor run

Once a month you'll get a Wise payment pack for the three overseas
contractors. (Your own Wise access is being set up — Nicole is checking
whether you can be invited via the `accounts@` email; until it's live,
Nicole will show you the run in your training sessions.)

| Payee | Amount | Notes |
|---|---|---|
| Ronnie | $2,000 | Monthly, standing amount |
| Liz (you) | $1,000 | Monthly, standing amount |
| Rao | $500 | Monthly, standing amount — **plus** his separate fortnightly Payoneer invoices (~$110 each, per his timesheet) which are a different payment rail, not part of the Wise run |

Use a clear reference on each Wise transfer, e.g. "Ronnie — Jul 2026
contractor payment" — this makes it much easier for reconciliation later
(including your own Xero reconciliation work above). After sending,
keep the Wise confirmation/receipt — forward it to Hubdoc if that's set
up for you by then, or just keep it findable, so the payment can be
matched in Xero.

**Confirming receipt:** for Ronnie and Rao especially (overseas,
sometimes slower banking rails), it's worth a quick "got it, thanks"
follow-up email once they confirm the funds landed — that closes the
loop and gives you something to point to if a payment is ever queried.

## e. Child-support queue (Matina's claims)

The workbook has a tab called **"Child Support — S&K"**. There's a
section on it called the **INBOX — TO APPROVE queue** (columns W
onwards, starting around row 28) — this is where the AI assistant drops
new claims it's picked up from Matina's emails after checking them
against the existing ledger.

Your job, roughly weekly:

1. Open the tab, look at the INBOX — TO APPROVE queue.
2. For each new item, **check it against the paid ledger** (the main
   rows further up the tab) to make sure it isn't something that's
   already been paid — Matina sometimes re-sends a reminder for
   something that was settled weeks ago. The AI assistant does a first
   pass at this and flags likely duplicates, but a second pair of eyes
   from you is the real check.
3. If it looks right and isn't a duplicate, **promote it** — move the
   entry from the queue into the main ledger with Clent's share
   calculated (usually 50%, but check the tab's convention).
4. **Only mark an item "Settled" once the actual bank transfer has been
   done** — not when you've merely approved it. "Approved" and "Paid"
   are two different states; keep them separate so the ledger stays
   trustworthy.

## f. Scam awareness

Please be alert to fake invoices that look official. There's a real
precedent for this: in June 2026 the ACCC warned businesses about scam
invoices that impersonate ASIC (the corporate regulator), asking for
payment of a fake "annual review fee" or similar. These can look very
convincing.

**Before paying anything that claims to be from a government body (ASIC,
ATO, etc.) or that you weren't expecting:**
- Check it against the compliance calendar in `CONTROLLER.md` (the
  obligations calendar section) — a genuine ASIC fee will line up with
  the known due dates and amounts listed there (~$320 ASIC fee, ~$330
  TWB agent fee, once a year per company).
- If it doesn't match, or you're not sure, **don't pay it — ask Clent
  first.** It costs nothing to check and a scam payment is very hard to
  claw back.
- Genuine ASIC correspondence should be paid **promptly** once verified
  — there's a history of a $96 late fee when this slipped, so "verify
  then pay quickly" beats "sit on it."

## g. Where to get help — your Finance Hub

You have one support system, and it's built so you never have to wonder
who to ask. Five parts:

1. **This handbook.** It's your single reference doc — it lives in the
   shared Google Drive finance folder, so you can always open the
   latest copy there. Most "how do I…?" questions are answered in the
   sections above; a quick skim of the relevant section is usually
   faster than waiting for an answer.

2. **Your daily worklist — Asana.** **Live now** — your tasks are in
   Asana, in the **"Jewell - Finance Board 2026"** project, assigned to
   you with due dates — check it each morning. That's where your
   handover-training tasks, receivable chases, and any meeting
   follow-ups will show up.

3. **Your question channel — Slack `#sam-financial-controller`.** Post **any
   question, anytime** — genuinely, no question is too small or too
   silly. "Which code do I use for this weird transaction?", "Is this
   invoice real?", "What does 'accrual' mean?" — all fair game. The AI
   assistant sweeps the channel every weekday morning and posts a
   plain-English, step-by-step answer. Think of it as your patient
   coach: it will explain the *why*, not just the *what*, and it will
   never make you feel daft for asking. One honest limit: if your
   question touches an approval or moving money, it won't guess — it
   will flag it to Clent and tell you it's done so. **Honest heads-up:**
   if you can't see or post in the channel yet, tell Clent — access is
   being fixed.

4. **Urgent or money-moving questions — go straight to Clent.**
   WhatsApp or call him directly. Never sit on a payment question
   waiting for the morning sweep, and never pay something you're unsure
   about just because you couldn't reach anyone.

5. **The accounts WhatsApp group.** Ronnie is adding you to the
   accounts WhatsApp channel — handy for quick day-to-day coordination
   with the team. It doesn't replace the ladder below: payment
   questions and anything approval-related still go handbook → Slack →
   Clent, not a group-chat message that might get missed.

So the ladder is: **handbook → `#sam-financial-controller` (answer next morning or
sooner) → urgent/money-moving: WhatsApp/call Clent.**

## h. Escalation — what to ping Clent about immediately vs note for later

**Ping Clent immediately (don't wait for the weekly review):**
- Anything in the payment pack marked `NEEDS CLENT OK` where you need
  the payment to go out soon and haven't heard back.
- Any request to change bank/payment details for an existing payee.
- Anything that smells like a scam invoice (see above).
- A payment that failed, bounced, or a bank error you don't understand.
- If you notice business bank balances looking unusually low — trust
  your instinct here, better a false alarm than a missed one.

**Fine to note and raise later (in `#sam-financial-controller`, or at the weekly
review):**
- Small discrepancies in Xero reconciliation you're not sure how to
  code (leave unreconciled, it'll show up in the AI assistant's
  worklist anyway).
- Routine child-support queue items that aren't disputed.
- General questions about how something works (like this guide!).

## i. Your handover with Nicole — checklist

The goal: **you're solo-capable by 28 July 2026**, when Louis finishes
up. Nicole is running your handover and training you over **screen-share
and video calls** (she's remote too, so this is how it works best) —
that dedicated one-on-one time is the core of your onboarding, and the
best use of the weeks while Louis is still contactable. The AI
assistant's flags and worklists **supplement** that training (they give
you real transactions to practise on) — they don't replace it.

- [ ] Get set up with **NAB internet banking access** — this works by
      logging in with **Clent's own credentials**, the same way
      Nicole's team does it today (that's the agreed setup, not a
      temporary workaround). Get the login details from Clent or Ronnie
      **securely** — a phone call or a password-manager share, never
      plain email — and **always connect through the Australian VPN
      before logging in from the Philippines** (ask Ronnie to help get
      the VPN set up on your machine; sort this before your first
      login, not after).
- [ ] Get your Xero login sorted (Nicole or Clent can confirm you've
      been added as a user with the right permissions).
- [ ] Read this whole guide once, then skim it again before your first
      session with Nicole — it'll make more sense with her walking you
      through the screens on the call.
- [ ] **Sit in on your first reconciliation session with Nicole (over
      screen-share/video)** — **first session Monday 13 July** — she'll
      show you Match/Create/Transfer on real transactions. Use the
      unreconciled-items list the AI assistant flags each week as your
      practice worklist in those sessions.
- [ ] **Shadow Nicole (or Louis) on a payment run** — see the whole
      flow once end to end before you run one solo: pack arrives, check
      approval statuses, pay via NAB/Wise, keep the receipts.
- [ ] **Write down your questions as you go and ask Nicole during your
      sessions** while you have her — and anything about how *this
      specific business's* books have been kept (odd account codes,
      historical quirks), ask while Louis is still around to answer.
      After 28 July that institutional knowledge walks out the door.
- [ ] Do at least one reconciliation session and one payment run
      **solo, with Nicole checking your work afterwards**, before the
      28th — that's the real test of solo-capable.
- [ ] From 28 July: you're running the weekly payment pack and the
      twice-weekly reconciliation sessions on your own — with the
      Finance Hub (section g) as your ongoing support and Clent as your
      backstop for anything marked `NEEDS CLENT OK` or anything that
      just feels off.

## j. Managing the accounts@jewellprojects.com mailbox

This inbox is yours from now — Ronnie is sharing the credentials with
you (you'll share it with Nicole and Louis until 28 July, then it's
yours alone). It's the business's finance front door: supplier invoices
arrive here, Xero sends its notifications here, and it feeds receipts
to Hubdoc (the app that files them into Xero).

Your daily triage (5 minutes, with your morning coffee):
1. **Supplier invoice arrives** → check it's expected (is the supplier
   on the recurring list, or does it match something we ordered?). If
   yes: forward ONCE to the Hubdoc address (it's in the mailbox's
   contacts as "Hubdoc") and file the email. If it's unexpected or
   looks odd → ask in the Slack channel before doing anything.
2. **"We've changed our bank details" emails** → NEVER act on these
   from email alone. Call the supplier on the number you already have
   (not one from the email) and verify by voice. This is the single
   most common way businesses get scammed.
3. **ASIC-lookalike invoices** → we get fake "annual review" scam
   invoices (it's happened). Real ASIC fees come via TWB (Damian's
   office) in April and June only — check the compliance calendar in
   CONTROLLER.md; when in doubt, ask.
4. **Xero notifications** → mostly informational; anything about failed
   bank feeds or unreconciled piles, mention in Slack.

**Known issue you'll inherit:** the mailbox has a runaway auto-forward
loop (the same ~10 items re-forwarded hundreds of times in Jun–Jul).
Fixing it is on your checklist — look in Settings → Filters and
Forwarding for a rule that forwards to Hubdoc and check it isn't
re-forwarding its own forwards ("Fwd: Fwd: Fwd:" chains). If stuck, ask
in Slack and we'll walk through it together.

## k. Receipts to Hubdoc — the automatic route

Goal: every invoice/receipt ends up in Hubdoc (and from there in Xero)
without anyone doing it by hand.

- **accounts@ mailbox**: has forwarding rules already (see the loop fix
  above). Once fixed, confirm: one new supplier invoice in → exactly one
  copy lands in Hubdoc.
- **Clent's own inbox (clent@)**: receipts that arrive to Clent
  directly (Anthropic, Apple, travel bookings etc.) need a one-time
  Gmail filter — this needs doing manually in Gmail (Settings → Filters):
  *Matches: subject:(receipt OR invoice OR "tax invoice") has:attachment*
  → *Forward to: the Hubdoc address*. (Gmail will ask to verify the
  forwarding address first — Hubdoc emails a confirmation code to the
  mailbox, which you'll see in accounts@.) This is on the setup list —
  do it with Clent in your first week, since it needs his inbox.
- **Paper/phone receipts**: the Hubdoc mobile app — photograph and it
  files itself. Worth installing in week one.
