# Credentials — where logins live (NO secrets in this repo)

**Rule.** No password, PIN, recovery key or token is ever stored in this
repository (`AGENTS.md` Security; `CLAUDE.md`). The Drive finance folder
contains a `Logins` document with live credentials — that document is the
source, and it must **not** be copied here. This file only records
*where* each login lives, so an operator knows where to look.

If you ever find a secret committed anywhere in this repo, **stop and
escalate to Clent** — do not "fix" it by rotating quietly; it must be
treated as an exposure.

## Where each login lives

| System | Purpose | Where the login is held |
|---|---|---|
| **NAB Internet Banking** | Domestic payments (Pay Anyone, BPAY) | Dashlane / Drive `Logins` |
| **NordVPN** | Australian VPN for NAB access from the Philippines | Dashlane / Drive `Logins` |
| **Xero** | Bookkeeping ledger (`accounts@jewellprojects.com`) | Dashlane / Drive `Logins` |
| **Gmail** (`accounts@jewellprojects.com`) | Accounts inbox | Dashlane / Drive `Logins` |
| **Dashlane** | Password manager (the vault itself) | Held by Clent; recovery via the team's records |
| **Wise** | Overseas contractor payments | Dashlane / Drive `Logins` |
| **Payoneer** | Rao's payment | Dashlane / Drive `Logins` |
| **TWB portal** (`portal.hownowhq.com`) | ATO documents from Damian (login `clent@jewellprojects.com`) | Dashlane / Drive `Logins` |

## Handling notes

- Access is **least-privilege**. Liz holds the credentials she needs to
  execute payments; the AI never receives or requests them.
- When logging in to NAB from the Philippines, connect the **Australian
  VPN first** (decided 9 Jul 2026 — see the Decisions log and
  `CONTROLLER.md`).
- Never place a credential in Asana, Slack, GitHub, Google Docs, or any
  prompt. Never print or copy a secret value.
- Changing any credential, scope or access needs human sign-off — Tier 3.

Next: back to [`README.md`](./README.md).
