# Finance — moved

The finance, accounting and bookkeeping playbook no longer lives here. On 9 October 2026 the
whole kit (`CONTROLLER.md`, the five cadence runbooks, `LIZ-ONBOARDING.md`,
`CHART-OF-ACCOUNTS.md`, `state.json`, the two workbook scripts) moved, with its git history,
to the private repo:

`clentjewell/clent-jewell-personal` → `11-finance/`

Why: the kit models Clent's whole position in one workbook, business and personal together,
and cannot be split without splitting the workbook. Clent's call on 9 October 2026 was to
separate personal from work at repo level so this repo reads as a clean work context.

What this means for sessions and Routines:

- Finance sessions and the Daily Pulse, Weekly Update, Monthly Close, Quarterly BAS and
  Annual EOFY Routines run against `clent-jewell-personal`, not this repo. Their session
  scope must include that repo.
- Nothing finance-related is read from this folder. Business finance records stay in Xero and
  Drive; the playbook that prepares them is in the private repo.
- The private audience is unchanged: Clent, Ronnie, Liz.

Next: open `11-finance/CONTROLLER.md` in `clent-jewell-personal`.
