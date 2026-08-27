# Finance, Accounting & Bookkeeping Playbook

This playbook lives in `jewell-os` at `11-finance/`, and is governed by
this repo's `AGENTS.md` and constitution.

Start at **`CONTROLLER.md`** — the operating model: RACI, control
rules, escalation matrix, and the obligations calendar.

**`state.json`** is the live, machine-readable state (balances,
obligations, people, decisions). It **wins on facts** whenever a `.md`
file's prose disagrees with it.

**Runbooks, one per cadence:** `DAILY-PULSE.md` (weekday mornings,
AEST) · `WEEKLY-UPDATE.md` (Wed 17:00 UTC) · `MONTHLY-CLOSE.md` (2nd of
month) · `QUARTERLY-BAS.md` (~early Nov/Feb/May/Aug) ·
`ANNUAL-EOFY.md` (~8 July).

**`LIZ-ONBOARDING.md`** is the human operator's handbook — Liz's guide
to reconciliation, payments, and escalation (also kept in the shared
Google Drive finance folder; re-uploaded whenever it changes).

**`CHART-OF-ACCOUNTS.md`** is the Xero chart-of-accounts review and
migration plan.

**The FY27 workbook** is checked in as `Clent-Jewell-Finance-FY27.xlsx` —
a point-in-time copy of the live file in the shared Google Drive finance
folder. **Drive wins on facts**: the Drive copy is the working file; the
repo copy is refreshed from it (pull from Drive, run `verify_workbook.py`,
commit), so treat the repo copy as at-most-as-fresh as its last commit.

**Workbook scripts** operate on that workbook file.
`update_workbook.py` applies fresh balances and marks months as actual;
`verify_workbook.py` is the gate that must pass before any re-upload;
`add_operating_expenses.py` is the one-off v1.6 → v1.7 migration that rebuilt
the missing business operating-expense block from Xero.

This playbook **self-maintains**: the weekly run's "Playbook
reconciliation" step syncs real-world decisions and events back into
these docs (see "How this playbook stays current" in `CONTROLLER.md`).
Git history is the changelog — every playbook change is committed with
its reasoning.
