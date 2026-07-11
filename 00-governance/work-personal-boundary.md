# Work and personal boundary

**Amended by Clent, 10 July 2026.** Personal content may live inside this repo — decided so that
decisions can be made holistically, with work and personal context in one place — but only behind
the gate defined here. The old rule ("personal never enters the work repo") is superseded; the
gate replaces the wall.

## The gate, in one line

Personal, legal, family, health and personal-financial content lives only in the designated gated
areas of this private repo and the private spaces (Drive `05 Personal`, the private Asana board,
the private Slack channels) — and it never flows outward: not into team-visible tools, not into
client or partner surfaces, not into AI answer source sets, and not into any derived output
(digests, summaries, packs, the Drive rules file, Sam's context bundle).

## The gated areas register

Every path holding personal content is listed here. If a new area is added, it is added to this
list in the same commit.

| Gated path | What it holds | Why it is here |
| --- | --- | --- |
| `11-finance/` (personal elements) | Mixed business and personal finance: personal account balances, the family cost-sharing ledger, personal obligations | Holistic cashflow and obligation decisions need both halves in one place (Clent, 10 July 2026) |

## The rules that make the gate hold

1. **Repo access equals the private audience.** While gated content is present, this repo's
   collaborators can only ever be the private audience: Clent, Ronnie as his operational back-up,
   and Liz as Ronnie's back-up (decided 10 July 2026). No build collaborators, no partners, no
   contractors — they receive exported artifacts, packs or portals, never repo access. Widening
   access requires Clent to either empty the gated areas first or explicitly accept the exposure,
   logged.
2. **Nothing flows out of a gated area.** Routines, digests, summaries, Ask source sets, the
   nightly Drive rules file, client packs and partner materials must never read from or quote a
   gated path. Sessions working inside gated areas for Clent are fine — that is the point — but
   their outward-facing outputs stay categorical.
3. **Outside the gate, the old rule still holds in full.** Personal, legal, family, health and
   personal-financial content never appears in shared Drive, team-visible Slack, the work Asana
   board, any prompt for a shared surface, or any ungated file in this repo — including the
   decision log, which stays categorical.
4. **The scan enforces the gate.** The standing boundary scan now checks that personal-content
   patterns appear only inside gated paths. A hit outside a gated path blocks the commit until
   resolved. The monthly security review verifies the gate: gated-path containment, collaborator
   set, and derived-surface cleanliness.
5. **Found outside the gate: flag it.** Personal content discovered outside a gated area is
   flagged to Clent the same day. Moving it is Clent's call — Tier 3, always.

## The private audience (decided 10 July 2026)

Clent, and Ronnie as his operational back-up, and Liz as Ronnie's back-up — so the private layer
is never a single point of failure if Ronnie is on leave, sick, or unavailable. This is the full
private-layer audience everywhere in this OS: Slack channels, the private Asana board, this
repo's gated areas, and the `clent-jewell-personal` repo. It is not "everyone on the team" — it
is these three, named, and no one else, unless Clent explicitly widens it.
