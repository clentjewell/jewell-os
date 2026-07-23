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

**`sops/`** is the click-level SOP library — the "how to click it"
procedures (Xero/NAB/Wise/Payoneer) that sit underneath the cadence
runbooks. Transcribed from the Nicole/NCP handover pack in the shared
Drive finance folder, with all credentials redacted. Start at
`sops/README.md`. A runbook says *pay the batch*; `sops/` says *which
buttons*.

This playbook **self-maintains**: the weekly run's "Playbook
reconciliation" step syncs real-world decisions and events back into
these docs (see "How this playbook stays current" in `CONTROLLER.md`).
Git history is the changelog — every playbook change is committed with
its reasoning.
