# 06 — Digital estate register

Every live site, staging deployment, deck, portal and tool URL, captured from Clent's estate
dump of 16 July 2026. One row per asset. This file is the single register; a URL that is not
here does not exist as far as the OS is concerned. Update it in the same change that ships a
new deployment.

Access notes: several assets carry gate passwords. Passwords are never written in this repo —
they live with Clent and the approved secret store. All gate passwords shared in chat on
16 July 2026 are rotation candidates (see the security note at the end).

## Launched (production)

| Asset | URL | Notes |
| --- | --- | --- |
| Pottsville Acupuncture site | pottsvilleacupuncture.com.au | Live client site |
| Pottsville copy editor | /editor | Gated |
| Pottsville strategy page | /strategy/ | Gated |
| Pottsville asset page | /asset | Gated |
| Maxxim public site | maxxim.ai | Live |
| Maxxim admin | admin.maxxim.ai/admin | Raef's platform |
| Ultimate Labs | ultimatelabs.com.au | Preview-gated; Ronnie holds access |
| OTR Earthmover | otr-earthmover-tyre.pages.dev/ask | Ask tool live |

## Jewell (own brand)

| Asset | URL | Notes |
| --- | --- | --- |
| Site launch-readiness build | claude-site-launch-readiness-1rre39-jewell-ai.clent.workers.dev | Latest |
| Case-study page rework | improve-the-work-jewell-ai.clent.workers.dev/the-work | Filters added; flagship case in progress |
| Walter Wealth case study | claude-walter-wealth-case-study-0ygcni-jewell-ai.clent.workers.dev | Reviewed 16 Jul — 4 blockers before live (figure verification, testimonial versions, "Jewell Projects" naming, em dashes) |
| Core AI sheet capture | core-sheet-capture-jewell-ai.clent.workers.dev/core | Code-gated |
| Social media content generator | jewell-social-generator.almondine-flier.workers.dev | Tool |
| "Why" tool | claude-jewell-reconciliation-phase-0-sv9gcl-jewell-ai.clent.workers.dev/why | Neil's concept, credited |
| "Ask" (AI-enabled) | same host /ai-enabled | Tool |
| Jewell site rebuild (staging) | staging.jewell-health.pages.dev/#today | Note: hosted on the jewell-health project — re-home before launch |
| Jewell Health app (staging) | staging.jewell-health.pages.dev | Gated |
| Brent showcase | claude-brent-presentation-jewell-ai.clent.workers.dev | Gated deck |
| Partner meeting deck (3 Jul) | claude-partner-meeting-deck-8bdqzh-jewell-ai.clent.workers.dev/partner-meeting/ | Historical |

## Jewell × Maxxim strategy suite (one Worker, path-gated)

Base: claude-jewell-maxxim-strategy-g16kda-jewell-ai.clent.workers.dev

| Asset | Path | Notes |
| --- | --- | --- |
| Master plan (partner-safe draft) | /master-plan | Gated |
| Raef's build brief (page + raw md) | /master-plan/raef, /master-plan/raef-brief.md | Gated |
| Christy's proposal deck | /christy | Gated |
| Raef's proposal presentation | /raef | Gated |
| 1 personal-layer deck | — | Registered in the private repo's pointers, not here |
| Lowe Alpine 3D Process (exemplar) | lowe-alpine-3d-process.clent.workers.dev | No gate |

## Clients and prospects

| Asset | URL | Notes |
| --- | --- | --- |
| BTC summary | claude-btc-summary-document-a39ull-beyondtheclinic.clent.workers.dev/summary | Gated |
| BTC 3D Process | same host / | Gated; Clent updating — not yet synced to admin dashboard |
| BTC brand guidelines | claude-brand-guidelines-cloudflare-hk6arl-beyondtheclinic.clent.workers.dev | — |
| BTC information memorandum | beyondtheclinic.clent.workers.dev/deck/ | — |
| BTC showcase (Dr Jason Tsung) | jewell-os.clent.workers.dev/tsung | Gated; note: served from a worker named jewell-os — rename to avoid confusion with the repo |
| Neil Hazelman deck | claude-cloudflare-presentation-neil-hsgfih-jewell-ai.clent.workers.dev/neil | Gated |
| Jewell Tyres (latest branch) | claude-loving-dirac-zpzxu2.jewelltyres.pages.dev/buy-tyres | + /admin, gated |
| Jewell Tyres information memorandum | claude-exciting-mccarthy-7izptq-jewell-tyres-im.clent.workers.dev/deck/ | — |
| EstiTrade estimator | claude-cool-thompson-7h0vxn-paint-estimator.clent.workers.dev | — |
| Assurant proposal | claude-happy-hypatia-ujr63-assurant-presentation.clent.workers.dev | Parked to Jan 2027 |
| Ultimate Labs status check | claude-ultimate-labs-status-check-c11hy5-ultimate-access-portal.clent.workers.dev/check-in | — |

## Boards and finance

| Asset | Where | Notes |
| --- | --- | --- |
| Jewell CRM board | Asana project 1211572609818523 | Named CRM board — input to the Asana-vs-GoHighLevel decision |
| Jewell Finance workbook | Google Sheets (ID 18fdFXqxJRxQrcwjpFhso50HL1sgE3Ja8) | Alongside the FY27 budget sheet |

## Security note (16 July 2026)

Gate passwords for roughly 12 of these assets were shared in a chat on 16 July. They follow a
guessable pattern and several gate commercially sensitive decks. Treat all of them as rotation
candidates at the Step 1 safety pass; the personal-layer deck's gate rotates first. Staging
URLs on workers.dev are unlisted but public to anyone holding the link — nothing truly
sensitive should rely on the URL alone.

Next: keep this register current in the same change that ships any new deployment; the nightly
refresh checks it exists.
