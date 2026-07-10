# Chart of Accounts — Review, Redesign & Implementation Guide

**Prepared for:** Liz (who will click the buttons in Xero)
**Reviewed by:** AI assistant (read-only Xero access — cannot make the
changes itself)
**Needs sign-off before FY27 recoding starts:** Clent, then Damian/TWB
**Status as at 8 July 2026:** Draft — awaiting Clent's decisions on the
open questions in Part 5, then Damian's structural sign-off, before Liz
starts Part 4.

---

## 0. Why this document exists

Louis (outgoing financial controller, departing 28 Jul 2026) sent a
"Chart of Accounts Review" email on 21 June 2026 flagging ~12 groups of
duplicate/dead accounts he wanted merged or archived. Clent's reply
deferred the decisions to the Thursday finance-review meeting — but that
meeting (25 June) ran out of time and covered cash flow/receivables
instead. **The chart-of-accounts cleanup was never actually decided or
executed.** Louis leaves in three weeks. This document finishes the job:
it reconstructs what's actually in Xero today, folds in Louis's
questions, applies small-business best practice, and turns it into exact
click-by-click steps Liz can follow herself.

It is written to be saved as the working reference doc for this project
— tick items off as they're done.

---

## Part 1 — What Louis actually proposed, and where it came from

**Source:** Email thread "Chart of Accounts Review – Items for
Confirmation," accounts@jewellprojects.com (Louis) → clent@jewellprojects.com,
cc ronnie@jewellprojects.com, **21 June 2026**. Clent's reply (23 June)
said: *"let's review together at our Thursday meeting and make a call on
each of these, together."* The Thursday meeting (25 June, Fireflies
transcript `01KVPP5X31Q6S5863S0617WD19`) covered cash flow and
receivables only — Chart of Accounts does not appear anywhere in that
transcript. **No decision was ever recorded.**

**Important finding: there is no full "new chart of accounts" document.**
Louis's email is not a redesigned structure — it's a list of 12
merge/archive **questions** about the *existing* (messy) chart, each
illustrated with an inline screenshot embedded in the email (not a
Drive link, not an attachment we could open as data — just `cid:`
images in the HTML body). We could read Louis's descriptive text for
each item but not the screenshots themselves. Where the account names
in his text are unambiguous we've resolved them against the live Xero
P&L and an earlier full COA export (Google Sheet "Chart Of Account",
owned by Clent, dated Jul 2024) found in Drive. Louis's 12 items:

1. **Merge** "Project Management Admin Fees" (acct 291) into
   "Administration Fee 5%" — same thing, two accounts.
2. **Digital Marketing vs Digital Advertising** — asked whether these
   are the same. *(They are not, economically — see Part 5, open
   question.)*
3. **Google / AdWords / Google Business Profile** — two empty accounts
   duplicate live account 228 (Google Business Profile). Archive the
   two empties.
4. **Social Media vs Paid Media** — one is empty, archive it, keep the
   one with a balance.
5. **Media Production** (two accounts) — merge, archive the empty one.
6. **Calls Inbound/Outbound** (incl. accounts 255 & 256) — asks whether
   these need to be tracked separately; proposes one combined account.
7. **IT Services** (two accounts) — both relate to IT services, proposed
   merge.
8. **Software** — proposed folding into "219 IT – Automation and
   Systems Integration."
9. **"Owner withdrawals" — two similar-looking accounts, proposed
   merge.** *(This is the one item we are actively overriding — see
   Part 5. These are Drawings and Funds Introduced, which must stay
   separate.)*
10. **Account 413 into 439** — Professional & Consulting into PA -
    Professional Services.
11. **Client Subscription** — no entries, archive.
12. **For Clent/Damian to confirm:** Inventory, Due from owner, Security
    Deposit – The Good Guy, Withholding receivable — Louis flagged these
    as possibly redundant but wasn't comfortable deciding without
    guidance.

**What we did with this:** treated it as a useful "what looks broken"
list from someone who was in the data every day, cross-checked every
item against the live P&L (which shows the real account names and
balances), and folded it into a complete redesign below — agreeing with
most of it, correcting item 9, and going considerably further because
the live chart has **128 profit & loss accounts** for a business with 8
real service lines (most of that 128 sit at a $0 balance — dead
duplicates from at least three past "clean-up" attempts: Diana in 2024,
Nicole through 2025, Louis's partial merge in June 2026).

---

## Part 2 — Current state (what we could verify directly from Xero)

Pulled live from Xero (read-only), FY26 (1 Jul 2025 – 30 Jun 2026),
accrual basis:

- **Income accounts:** 47 in the chart, only **13 have a non-zero FY26
  balance.**
- **COGS/Direct Cost accounts:** 20 in the chart, only **8 non-zero.**
- **Opex accounts:** 61 in the chart, only **~30 non-zero,** and several
  of those are trivial ($20–$200/yr) duplicates of a bigger line.
- **Total: 128 P&L accounts, ~51 actually used.** That's the core
  problem this cleanup needs to fix — not any single Louis question.
- **FY26 result:** Income $454,209 · COGS $296,943 · Gross profit
  $157,266 (34.6% margin) · Opex $141,584 · **Net profit $15,682** (3.5%
  margin — thin, consistent with the "cash-tight" framing in the June
  Fireflies notes).
- **AI tooling spend:** Subscription–Anthropic $10,232 + Subscription–
  OpenAI $2,205 = **$12,437/yr** booked directly to AI-specific accounts
  in FY26 (the ~$14k figure referenced elsewhere likely also includes
  AI-adjacent spend sitting inside the general "Subscriptions" $24,535
  line — worth pulling out once reconciled). Either way, this is
  ~9% of total opex and growing — it earns its own visibility.
- Today (8 Jul 2026) is 8 days into FY27 — structure changes now touch
  8 days of transactions to re-map, not 12 months.

We also located the last full COA export with account **codes**
(Google Drive, "Chart Of Account," Jul 2024 — pre-dates Nicole and
Louis, from Diana's tenure) — this is what let us confirm codes 204
(Professional Services income), 228 (Google Business Profile), 413
(Professional & Consulting), 439 (PA - Professional Services), 611 (Due
from owner), 640 (Withholding tax receivable), 880 (Drawings — Clent
Jewell), 881 (Owner A Funds Introduced), 820 (GST), 825/826 (PAYG/Super
payable). Some codes have shifted since (e.g. account 218, 255, 256,
291 aren't in the 2024 export — created later) — where we can't verify
a code, the table below says so and Liz should read the name off the
live "Chart of accounts" screen rather than hunting for a number.

---

## Part 3 — The improved chart (target end state)

Design principles applied (per Clent's brief):
- **Income accounts = the 8 things Jewell Group actually sells.** Every
  income line should have a matching direct-cost line so gross margin
  per service is visible on the P&L without extra work.
- **Contractor costs split**: client-billable delivery work stays in
  COGS; internal ops/admin contractor work (PM, social media ops, VA
  work) moves to Opex — mixing the two currently hides true gross
  margin.
- **AI/SaaS gets its own line**, not buried in general Subscriptions.
- **Consolidate hard.** Dozens of $0 accounts get archived, not
  "merged" (merging implies moving balances — most of these never had
  one).
- **Tracking, not new accounts, for client/brand-level detail.** If
  Clent ever wants "margin by client" or "margin by brand" reporting,
  that's a Xero **Tracking Category** (e.g. "Client"), not 40 more
  account codes. Not building this now — flagged as a future option in
  Part 5.
- **Don't touch system accounts** (GST, PAYG, Super, Wages, Uncategorized
  Expenses, bank accounts) even if their FY26 balance is $0 — they're
  either Xero-linked (payroll, GST) or the bank-feed fallback account.
- **Drawings and Funds Introduced stay separate, always** — this is the
  Div7A/trust-loan tracking, and merging opposite-direction equity
  movements would corrupt it. This directly overrides Louis's item 9.

Suggested codes below are **starting points, not mandatory.** If a
suggested code is already taken in Xero when Liz gets there, she should
just use the next free number in the same hundred-block (e.g. any free
number in 200–269 for income) — the *block* (which hundred it's in)
matters for reporting; the exact digit doesn't.

### 3a. Income

| Code | Name | Type | GST | Description / when to use | Maps from (old) |
|---|---|---|---|---|---|
| 200 | Professional Services | Revenue | GST on Income | Default/general consulting, strategy, marketing-planning income not covered by a more specific line below. This is currently a $285k catch-all (63% of revenue) — flag for Nicole/Louis to sanity-check nothing that *should* have its own line (e.g. BTC success fee → see open question in Part 5) is sitting here by default. | 204 Professional Services |
| 202 | Website Design & Development | Revenue | GST on Income | One-off website build/redesign projects. | Website Design & Development |
| 203 | 3D Process | Revenue | GST on Income | The productized "3D Process" service (Jewell Tyres, Beyond The Clinic, Pottsville) — keep as its own line, it's a named, growing product. | 3D Process (already exists — created per the June action item, keep as-is) |
| 205 | Website Services & Hosting | Revenue | GST on Income | Recurring/retainer website-adjacent income: hosting, SLA, care plan, call tracking. Consolidating 4 near-empty accounts into one recurring-revenue line. | Domains & Hosting, Website SLA, Website Care Plan, Call Tracking |
| 207 | Paid Media Mgmt Fee | Revenue | GST on Income | Client paid-media management fee (Google/Meta/LinkedIn ad management). | Paid Media Mgmt Fee, Adwords Management Fee (archive, $0), Social Media Management Fee (archive, $0) |
| 210 | SEO | Revenue | GST on Income | SEO retainers/projects. Consider folding Google Business Profile in here too (see open question, Part 5) — left separate for now. | SEO |
| 212 | Graphic Design & Creative Production | Revenue | GST on Income | Graphic design plus the small/dormant creative lines — video production, copywriting, photography — folded in rather than kept as separate near-empty accounts. | Graphic Design, Video Production & Editing, Copy Writing (archive, $0), Photography (archive, $0) |
| 214 | PR & Publicity | Revenue | GST on Income | As-is, real balance, keep. | PR & Publicity |
| 216 | Brand & Marketing Strategy | Revenue | GST on Income | As-is, real balance, keep. | Brand and Marketing Strategy |
| 228 | Google Business Profile | Revenue | GST on Income | Real balance ($4k FY26) — kept separate for now pending Clent's call on whether it folds into SEO (Part 5). | 228 Google Business Profile (confirmed code) |
| 292 | Administration Fee | Revenue | GST on Income | The 5% admin/markup fee — **this is the merge target for Louis item 1.** | 291 Project Mgmt Admin Fees/5% Fee (archive, merge balance here), 292 Administration fee, Project Management & Admin Fee (NLE), Project Management & Administration Fee (dup, archive) |
| 260 | Other Revenue | Revenue | GST on Income | Small/one-off income that genuinely doesn't fit elsewhere. Catch-all, keep small. | Other Revenue |
| 270 | Interest Income | Revenue | GST Free Income | Bank interest — dormant, keep (will populate automatically from bank feed). | Interest Income |
| — | **Archive (no balance, no future use identified):** | | | Digital Set-up Fees, Google Business Management Fee, Data Enrichment, Printing, CRM, Data Cleansing Revenue, IT Project Services: Automation & Systems Integration, CRO, Rebates & Commissions, Hubspot – Client, Event Equipment, Campaigns, Media, Media – Production, Call Centre Inbound, Call Centre Outbound Marketing, Ai Outbound Calls, Merchandise, Software Development, IT Support, Sales, "Professional Service" (typo duplicate) | |

### 3b. COGS / Direct Costs

| Code | Name | Type | GST | Description / when to use | Maps from (old) |
|---|---|---|---|---|---|
| 300 | Contractors – Client Delivery | Direct Costs | GST on Expenses | Billable contractor work performed *for a specific client engagement* (design, dev, paid media execution, etc.). **Does not include** overhead/ops contractor work — see new Opex line 442. This split needs a human pass over FY26 transactions currently sitting in "Professional Services - Contractors" ($193k) to re-tag anything that was really overhead. | Professional Services - Contractors (portion) |
| 302 | Digital Advertising (Media Spend) | Direct Costs | GST on Expenses | Client ad spend passed through — Google/Meta/LinkedIn media buys. | Digital Advertising |
| 304 | Professional Services – Supplier | Direct Costs | GST on Expenses | Sub-contracted specialist suppliers (non-controlled), e.g. Big Bang Design, Tropixel. | Professional Services - Supplier |
| 306 | Web Development Expense | Direct Costs | GST on Expenses | Direct cost of Website Design & Development income. | Web Development Expense |
| 308 | Graphic Design & Creative Production Expense | Direct Costs | GST on Expenses | Direct cost mirror of income line 212 — folds in the small video/copy/photography cost accounts. | Graphic Design Expense, Video Production & Editing Expenses, Copy Writing Exp, Photography Exp |
| 310 | Website Services & Hosting Expense | Direct Costs | GST on Expenses | Direct cost mirror of income line 205. | Hosting Expense, Domain Client Hosting |
| 312 | 3D Process – Production Costs | Direct Costs | GST on Expenses | Cost of 3D renders/production — direct cost of the 3D Process income line. Keep this pairing; it's the clearest margin story in the business right now. | Rendering |
| 314 | SEO Expense | Direct Costs | GST on Expenses | Merge on-page + off-page — the split added complexity with no reporting benefit at this size. | SEO Expense - Onpage, SEO - Offpage |
| 316 | Brand Strategy Expense | Direct Costs | GST on Expenses | Direct cost mirror of income line 216. | Brand Strategy Expense |
| — | **Archive:** | | | Merchandise Trading Expense, Professional Services - JP, Transcription Services, Cost of Goods Sold (generic default, unused), Project Management | |
| — | **Flag, don't move yet — Digital Marketing ($4,227 FY26):** | | | See open question in Part 5 before deciding whether this merges into 302 or moves to Opex Subscriptions. | Digital Marketing |

### 3c. Operating Expenses

| Code | Name | Type | GST | Description / when to use | Maps from (old) |
|---|---|---|---|---|---|
| 442 | Contractors – Team & Overhead | Expense | GST on Expenses | **New account.** Non-billable contractor/ops work: project management, internal social/admin support, VA work — i.e. Ronnie/Liz/Rao time *not* tied to a specific billable client deliverable. This is the other half of the COGS/Opex contractor split above. | Portion of Professional Services - Contractors |
| 412 | Accounting Fees | Expense | GST on Expenses | TWB compliance work. Fold in ASIC agent fee here too (small, compliance-adjacent) rather than a separate line. | Accounting fees |
| 438 | Bookkeeping Fees | Expense | GST on Expenses | Nicole/Louis (and successor) monthly bookkeeping engagement. | Bookkeeping fees |
| 413 | Advisory & Consulting | Expense | GST on Expenses | **Merge target for Louis item 10** — general professional/advisory costs (e.g. Savill Johnson). | Advisory Fee, Professional & Consulting (413), PA - Professional Services (439) |
| 415 | AI Tools & Subscriptions | Expense | GST on Expenses | **New, elevated line** — Anthropic, OpenAI, and any other AI/LLM subscription or API spend, consolidated into one line (vendor detail can sit in the transaction description, doesn't need its own account). This is the ~$12–14k/yr line Clent specifically wants visible. | Subscription - Anthropic, Subscription - OpenAi |
| 485 | Subscriptions (Software, non-AI) | Expense | GST on Expenses | General SaaS: Adobe, Asana, Zapier, Go High Level, Slack, Supabase, Gamma, etc. | Subscriptions, Software Expenses, Software Development (if any non-AI dev tool spend) |
| 493 | Travel – National | Expense | GST on Expenses | As-is — real, material ($24.7k FY26). See open question in Part 5 (this + International together are 30% of opex). | Travel - National |
| 494 | Travel – International | Expense | GST Free Expenses | As-is — real, material ($18.4k FY26). | Travel - International |
| 408 | Cleaning | Expense | GST on Expenses | As-is. | Cleaning |
| 473 | Repairs & Maintenance | Expense | GST on Expenses | As-is. | Repairs and Maintenance |
| 453 | Office Expenses | Expense | GST on Expenses | As-is. | Office Expenses |
| 449 | Motor Vehicle Expenses | Expense | GST on Expenses | Folds in Fuel and Roadside Assistance (both $0, immaterial standalone). | Motor Vehicle Expenses, Fuel, Roadside Assistance |
| 420 | Entertainment | Expense | GST Free Expenses | As-is. | Entertainment |
| 489 | Telephone & Internet | Expense | GST on Expenses | As-is — per the existing Liz cheat sheet, **Telstra and Origin stay their own recognisable lines within this / a Utilities account**, not folded into a generic bucket, so Liz can code them fast. | Telephone & Internet |
| 433 | Insurance | Expense | GST on Expenses | As-is. | Insurance |
| 404 | Bank Fees | Expense | GST Free Expenses | Folds in GoCardless fees and (if ever used) Stripe/merchant fees — keep Stripe Fees dormant separately only if Stripe volume becomes material. | Bank Fees, GoCardLess - Fees |
| 445 | Utilities (Power/Gas/Water) | Expense | GST on Expenses | Folds Electricity and Utilities: Gas (both $0) into the existing Light/Power/Heating line. | Light, Power, Heating, Electricity, Utilities: Gas |
| 441 | Legal Expenses | Expense | GST on Expenses | As-is, dormant. | Legal expenses |
| 429 | General Expenses | Expense | GST on Expenses | Small catch-all — keep tiny by design; if a category recurs 2+ times, give it its own line instead of leaving it here. | General Expenses, Printing & Stationery, Postage Freight & Courier, Client Gifts, Filling Fees, Donation |
| 416 | Depreciation | Expense | BAS Excluded | Dormant, system-adjacent (fixed assets) — keep, don't archive. | Depreciation |
| 477 | Wages and Salaries | Expense | BAS Excluded | Dormant — **do not archive**, this is payroll-system-linked and needed the moment Jewell Group has its first actual employee (as opposed to contractor). | Wages and Salaries |
| 478 | Superannuation | Expense | BAS Excluded | Same as above — dormant, payroll-linked, do not archive. | Superannuation |
| 505 | Income Tax Expense | Expense | BAS Excluded | Dormant, needed for company tax entries. Keep. | Income Tax Expense |
| — | Uncategorized Expenses | Expense | (system) | **DO NOT TOUCH** — this is Xero's bank-rule fallback account. Archiving it can break bank feed matching. | — |
| — | **Archive:** | | | Unrealised Currency Gains* (*keep if FX-exposed — check with Damian, else archive), Advertising (ambiguous — see Part 5), Training, Data Cleansing, Data Enrichment Expense, BizxDesign, Fines and Penalties, Competitor Samples, IT & Website Expenses, Merchant Fees, Rent (no leased premises per current records), Client Subscriptions, Studio Expenses, Gifts (dup of Client Gifts), Foreign Currency Translation*, ASIC Fees (folded into Accounting Fees above), Delivery Fees, Bank Revaluations* (*keep if the bank account is genuinely foreign-currency, else archive) | |

### 3d. Key balance sheet accounts (not a full redesign — just the items that matter here)

| Code | Name | Type | GST | Description / when to use | Notes |
|---|---|---|---|---|---|
| 610 | Accounts Receivable | Accounts Receivable | BAS Excluded | System control account. | Do not touch. |
| 800 | Accounts Payable | Accounts Payable | BAS Excluded | System control account. | Do not touch. |
| 611 | Loan Account – C Jewell (rename from "Due from owner") | Current Asset | BAS Excluded | Tracks amounts owed **to** the trust **by** Clent (director/beneficiary loan) — this is the Div7A-relevant account given the trust structure. Renaming for clarity only, no balance movement. | **Confirm with Damian before renaming** — if TWB's workpapers reference the old name "Due from owner," coordinate the rename with them so FY27 workpapers aren't confused. |
| 880 | Drawings – Clent Jewell | Current Liability | BAS Excluded | Withdrawals by the owner. **Never merge with 881** — opposite economic direction (this reduces what's owed to Clent / increases what he owes; 881 is the reverse). This overrides Louis's item 9. | Keep separate, permanently. |
| 881 | Owner Funds Introduced | Current Liability | BAS Excluded | Capital Clent has put into the business. **Never merge with 880.** | Keep separate, permanently. |
| 820 | GST | GST | BAS Excluded | System control account — the only GST account Xero needs. | Do not touch, do not duplicate. |
| 825 | PAYG Withholdings Payable | Current Liability | BAS Excluded | Payroll-system-linked. | Dormant is fine, do not archive. |
| 826 | Superannuation Payable | Current Liability | BAS Excluded | Payroll-system-linked. | Dormant is fine, do not archive. |
| 830 | Income Tax Payable | Current Liability | BAS Excluded | As-is. | Keep. |
| 620 | Prepayments | Current Asset | BAS Excluded | As-is. | Keep. |
| 640 | Withholding Tax Receivable | Current Asset | BAS Excluded | Louis flagged this as possibly redundant. | **Confirm with Damian before archiving** — could relate to interest withholding; TWB will know if it's ever populated. |
| 630 | Inventory | Inventory | BAS Excluded | Louis flagged this. Jewell Group doesn't appear to sell physical goods (services business) — likely a legacy leftover. | **Confirm with Damian before archiving.** |
| — | Security Deposit – The Good Guy | Current Asset | BAS Excluded | Louis flagged this — looks like an old lease/equipment bond. | **Confirm with Damian** whether the deposit still exists / is refundable before archiving. |
| — | Trust Distribution Payable (beneficiaries) | Current Liability | BAS Excluded | **Check whether this already exists under a different name before creating it.** Given the trust structure and the FY26 trust-distribution paperwork already seen (2026 Trust distribution minute – Jewell Group Trust), there should be a clean, dedicated account tracking *declared but unpaid* distributions to beneficiaries, separate from account 611 (which tracks money *owed back to* the trust by Clent). If it doesn't exist, this is a genuine gap — flag to Damian. | New/confirm with Damian. |

---

## Part 4 — Liz's step-by-step implementation guide

Read this whole section once before starting. **Do the three phases in
order — never archive before recoding.** Archiving an account that
still has a transaction coded to it, or archiving before you've moved
the future coding habit over, creates a mess that's much harder to fix
than the one we're solving.

### Before you start

- [ ] Get **Clent's written sign-off** on Part 5 (open questions) —
      specifically items 1, 2, 3 and 5. Don't start Phase A until you
      have his answers; a couple of these change which accounts you're
      creating.
- [ ] Get **Damian's sign-off** on the overall structure (share this
      doc) — he needs to be comfortable before the FY27 recoding starts,
      not after. Structure changes 8 days into FY27 are cheap; the same
      changes discovered at year-end are expensive (workpaper confusion,
      BAS categorisation risk, prior-year comparison broken).
- [ ] Do a full backup point: **Xero → Accounting → Reports → Trial
      Balance**, run for FY26 and FYTD FY27, export to PDF, save to the
      Drive finance folder dated today. This is your "if something goes
      wrong, here's what it looked like before" reference — five
      minutes now, cheap insurance.
- [ ] Block out a proper session for this (not 15 minutes between other
      things) — Phase A/B together is realistically 2–3 hours the first
      time.

### Phase A — Add the new/consolidated accounts

For each **new** account name in the Part 3 tables (i.e. anything in
the "Name" column that doesn't already exist as-is in Xero — mostly the
consolidated income/COGS/opex lines and the two new Opex accounts):

1. Go to **Accounting → Chart of accounts** (or **Accounting →
   Advanced → Chart of accounts** depending on your Xero menu layout).
2. Click **Add Account** (top right).
3. **Account Type:** pick from the dropdown to match the "Type" column
   in the table exactly (e.g. "Revenue," "Direct Costs," "Expense,"
   "Current Asset," "Current Liability"). This matters — it controls
   which report section the account shows up in.
4. **Code:** use the suggested code from the table. If Xero says it's
   taken, use the next free number in the same hundred-block (e.g. any
   free number 200–269 for an income account) — don't jump blocks.
5. **Name:** copy exactly from the "Name" column — consistent naming
   matters for anyone reading the P&L later.
6. **Tax:** set to match the "GST" column exactly (e.g. "GST on
   Income," "GST on Expenses," "GST Free Expenses," "BAS Excluded").
   Getting this wrong doesn't just look untidy — it feeds the wrong
   number into the BAS.
7. Leave **"Show on Dashboard Watchlist"** off unless Clent specifically
   asks for one (keep the dashboard uncluttered).
8. Click **Save**.
9. Repeat for every new account. Tick each one off in the table as you
   go (print or duplicate this doc and mark it up).

### Phase B — Recode existing transactions onto the new accounts

This is the part that actually fixes the P&L — adding accounts alone
does nothing if old transactions stay on the old codes.

**For accounts being merged (old account still has transactions on
it):**

1. Go to **Accounting → Reports → Account Transactions** (or run a
   search filtered to the old account code) for the financial year(s)
   with a balance.
2. For each transaction, open it and change the **account code** field
   from the old account to the new consolidated account. In the bank
   reconciliation screen this is the same "account code" dropdown Liz
   already uses day-to-day per `LIZ-ONBOARDING.md`.
3. Do this for **every transaction** on the old account until its
   balance is zero for the period — you can sanity-check this by
   re-running the P&L or Account Transactions report for that account;
   it should show no line items once you're done (see "How to test"
   below).
4. Repeat per old account being merged in.

**Specific known recodes to action (from the prior meeting action
items, still outstanding):**
- [ ] Confirm the "3D Process" income account already exists (it does,
      per the live P&L — $5,000 FY26) and that the transaction
      previously miscoded to Website Design was actually moved. If not
      yet done, do it now as part of this pass.
- [ ] **Recode Paul Clancy from supplier to contractor** — check his
      transaction history and move any coded to a "Supplier" bucket
      onto the new Contractors – Client Delivery / Team & Overhead
      split (whichever matches the actual work he did).
- [ ] **Code the BTC success fee to account 204/200 (Professional
      Services)** — confirm this was done; if not, locate the
      transaction and recode.
- [ ] Split historical "Professional Services - Contractors"
      transactions between the new 300 (Client Delivery) and 442 (Team
      & Overhead) accounts — this is the biggest single recode (FY26
      balance $193k) and the one that will take the most judgement.
      When in doubt on a specific transaction, leave it on 300 and flag
      it to Clent/Nicole rather than guessing — see "when you're not
      sure" note in `LIZ-ONBOARDING.md`.

### Phase C — Archive the dead accounts

Only after Phase B is complete and confirmed (zero balance on every
account being retired):

1. Go to **Accounting → Chart of accounts**.
2. Find the account. **Check its balance column first** — if it shows
   anything other than $0.00 for all periods, **stop** — it still has
   transactions on it; go back to Phase B.
3. Click the account, then **Archive** (in the account detail screen,
   or via the "..." menu next to the account in the list view,
   depending on your Xero version).
4. Xero will warn if the account is in use anywhere (recurring
   invoices, bank rules, budgets) — **read that warning**, don't click
   through it. Fix the dependency first (e.g. update a bank rule to
   point at the new account) rather than force-archiving.
5. Repeat down the "Archive" list in Part 3.

**The DO-NOT list — never archive these, regardless of balance:**
- Any **system control account**: Accounts Receivable (610), Accounts
  Payable (800), GST (820), PAYG Withholdings Payable (825),
  Superannuation Payable (826), Wages Payable (804), Rounding (860),
  Tracking Transfers (877), Historical Adjustment (840), Unpaid Expense
  Claims (801).
- **Uncategorized Expenses** — the bank-feed fallback account.
- **Any account with a non-zero balance in any period**, even if it
  looks obviously dead — that balance has to land somewhere first.
- **Wages and Salaries / Superannuation** (opex) — dormant now, but
  needed the day Jewell Group has its first payroll employee.
- **Drawings – Clent Jewell (880) and Owner Funds Introduced (881)** —
  not because they're at risk of being wrongly archived, but as a
  standing reminder: **never merge these two into each other**, in this
  pass or any future one.
- Anything in the balance-sheet table (Part 3d) marked "confirm with
  Damian before archiving" — don't archive until that confirmation is
  in writing (an email reply is fine).

### How to test you got it right

After each phase:
1. **Run the P&L** (Accounting → Reports → Profit and Loss) for FY26
   and FYTD FY27. Check: does every account you expect to see have a
   sensible balance? Does anything you archived still show a balance
   (it shouldn't — if it does, you archived too early, un-archive it
   and finish Phase B first)?
2. **Run the Balance Sheet** and confirm total assets/liabilities/equity
   still balance to the same net position as your Phase-0 backup trial
   balance — a recode should never change net profit or net equity,
   only which line item the number sits on. If the total moved, you've
   made a coding error (e.g. an income account got coded as an expense),
   not a legitimate recode — find it and fix it before continuing.
3. **Check nothing is sitting in an archived code** — archived accounts
   drop off the "Add Account" picker but old transactions can still
   reference them; the Account Transactions report is the way to check
   this, not just eyeballing the P&L.
4. Send a short "before vs after" summary to Clent — total account
   count before/after, net profit unchanged, list of anything you
   weren't sure about.

---

## Part 5 — Open questions for Clent / Damian (resolve before Phase A)

1. **Digital Marketing vs Digital Advertising** (Louis's item 2): are
   these the same thing? The live P&L shows them as materially
   different sizes — Digital Advertising $47,202 FY26 (looks like
   client ad-spend pass-through) vs Digital Marketing $4,227 (looks
   more like internal marketing/tooling cost). **If it's ad spend →
   merge into Digital Advertising (COGS). If it's tools/software →
   move to Opex Subscriptions.** Needs Clent or Nicole to confirm what
   these transactions actually were before Liz recodes them.
2. **Account 218** — a prior meeting action item said "archive account
   code 218," but we could not identify what account 218 currently is
   from the sources available (it doesn't appear in the Jul 2024 COA
   export, so it was created after that). **Louis or Nicole needs to
   confirm the account name before this gets actioned** — don't archive
   a code blind.
3. **"Advertising" (Opex, $0 FY26)** — ambiguous whether this was meant
   for Jewell Group's *own* brand marketing (as opposed to client ad
   spend, which sits in COGS Digital Advertising). If Jewell Group ever
   runs its own paid marketing, this is a legitimate account to keep
   rather than archive — Clent's call.
4. **Should Google Business Profile fold into SEO?** We left it
   separate in Part 3 (both are real, both are "local search" adjacent)
   — reasonable to combine if Clent wants one fewer income line; not
   forced either way.
5. **The Contractors – Client Delivery / Team & Overhead split (COGS
   300 vs Opex 442)** is the single highest-value structural change in
   this whole redesign — it's what finally makes gross margin per
   service line trustworthy. But it requires someone who actually knows
   what each contractor was doing on each invoice (Ronnie, Rao, and
   others) to re-tag FY26 history. **This needs Clent or Nicole's
   judgement, transaction by transaction, or a documented rule (e.g.
   "Ronnie's PM hours = overhead, Ronnie's build hours = client
   delivery")** — Liz shouldn't be asked to make that call alone.
6. **Trust Distribution Payable** — flagged in Part 3d as possibly
   missing from the chart entirely, given the trust structure and known
   Div7A history. Damian should confirm whether this already exists
   under another name or genuinely needs adding.
7. **Travel spend** ($43k combined FY26, ~30% of opex) isn't a
   chart-of-accounts problem, but it surfaced while reviewing this data
   and is large enough for a "cash-tight" business that it's worth
   Clent flagging for his own attention separately from this project.

---

## Part 6 — Governance note

Damian (TWB) should review and approve this structure **before** Phase
A starts — not as a courtesy, but because a chart-of-accounts change
touches how BAS categorisation and year-end workpapers get built, and
TWB is the one who has to make FY27 reconcile against FY26 at tax time.
Nicole, as part of her handover training sessions with Liz, should
sanity-check Liz's actual clicks (especially the Phase B recoding
judgement calls) — this is exactly the kind of task that benefits from
a second pair of eyes the first time through, per the existing handover
model in `LIZ-ONBOARDING.md`.

Once approved and implemented, this document should be updated to
reflect the *actual* live codes (Xero may not honour every suggested
code number) and kept as the reference chart going forward — update it
any time a new account is genuinely needed, and treat "do we really
need a new account, or does this fit an existing one" as the default
question before adding anything.
