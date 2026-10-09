# Finance, Accounting & Bookkeeping Playbook — business half

This folder is the **business half** of Clent's finance function: Jewell Group Pty Ltd ATF
Jewell Group Trust, Maxxim, and JIG (Jewell Investment Group Pty Ltd, decided business). It
covers Xero, BAS and PAYG, company tax, ASIC, payables and the weekly payment run, the monthly
Wise run, receivables, Liz's handbook and the chart of accounts. It is governed by this
repo's `AGENTS.md` and constitution.

The **personal half** (personal accounts, the household obligations calendar, the family
cost-sharing ledger, net worth, runway, and the one FY27 workbook with its scripts) lives in
the private repo `clentjewell/clent-jewell-personal` at `11-finance/`. Split on Clent's call,
9 October 2026. Nothing from that half is read into any outward-facing output.

Start at **`CONTROLLER.md`** — the operating model: RACI, control rules, escalation matrix,
and the business obligations calendar.

**`state.json`** is the live, machine-readable business state (balances, obligations, people,
decisions). It **wins on facts** whenever a `.md` file's prose disagrees with it. The personal
half has its own `state.json`; a fact lives in exactly one of them.

**Runbooks, one per cadence:** `DAILY-PULSE.md` (weekday mornings, AEST; this repo alone) ·
`WEEKLY-UPDATE.md` (Wed 17:00 UTC; runs first, then the personal half's twin in the same
session) · `MONTHLY-CLOSE.md` (2nd of month; same pairing) · `QUARTERLY-BAS.md` (~early
Nov/Feb/May/Aug; this repo alone) · `ANNUAL-EOFY.md` (~8 July; same pairing). The paired
Routines must be scoped to both repos. This half never writes the workbook; it hands the
business figures to the personal half, which owns every workbook write.

**`LIZ-ONBOARDING.md`** is the human operator's handbook — Liz's guide to reconciliation,
payments, and escalation (also kept in the shared Google Drive finance folder; re-uploaded
whenever it changes).

**`CHART-OF-ACCOUNTS.md`** is the Xero chart-of-accounts review and migration plan.

This playbook **self-maintains**: the weekly run's "Playbook reconciliation" step syncs
real-world decisions and events back into these docs (see "How this playbook stays current"
in `CONTROLLER.md`). Git history is the changelog — every playbook change is committed with
its reasoning.

Next: read `CONTROLLER.md`, then `state.json`, then the runbook for the cadence you are running.
