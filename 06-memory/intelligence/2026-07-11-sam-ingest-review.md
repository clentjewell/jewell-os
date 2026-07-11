---
date: 2026-07-11
source: ingest
kind: mixed
relates_to: work-os self-learning layer
verdict: mixed — per item below
confidence: high on capture-gap findings; medium on individual item value
---

# First sweep of #sam-ingest — what's in the channel and what it teaches

Reviewed ~6 weeks of the channel (C0ALAQQTC2K). Two findings about the *mechanism*, then the
items worth keeping.

## Mechanism finding 1 — the capture gap is a platform wall, not a tooling gap

The dominant failure: **Facebook and Instagram share-links are login-walled** — roughly a dozen
were dropped and none could be fetched by any automated reader; only screenshots and YouTube links
ever worked. No overnight system fixes this — Meta blocks unauthenticated access by design.
The working protocol: **screenshot the reel, or add one line saying what it is** — ten seconds at
capture time makes every item processable. YouTube, articles and X links ingest fine.

## Mechanism finding 2 — Sam's local intelligence artifacts must be rescued before decommission

Sam has been filing genuinely valuable capture into its LOCAL Mac Mini workspace:
`system/tech-intelligence-log.md`, `intelligence/seo-best-practices.md` (the GEO log),
`system/intelligence-bank-pipeline-brief.md`, and `meeting-notes/2026-07/…` (partner-dinner series).
Those files die with the gateway unless migrated. Added to the Sam retirement path as a required
step before decommission.

## Items brought in (work-relevant, evaluated)

| Item | What it is | Verdict |
| --- | --- | --- |
| **The intelligence-bank concept** (Omi wearable → classify → route → index → learn) | Clent named it "the critical success factor". Its 6-layer loop IS this OS's self-learning layer with a wearable capture lane added. The pipeline brief exists in Sam's workspace | **Trial** — rescue the brief; re-platform the loop onto this repo's intelligence inbox rather than ChromaDB-on-the-Mac-Mini; wearable lane is Clent's call on the device |
| **GEO (generative-engine optimisation)** | Getting client brands cited on sources AI answer engines trust; log already started | **Adopt as client service angle** — rescue the SEO log; fits Pottsville/Circl-class local clients; hand to Alex for positioning |
| **Sakana Fugu** (orchestration-as-a-model) | Single endpoint that routes across frontier LLMs; benchmarks near frontier | **Watch** — early signal of the orchestration-as-a-model direction; not actionable at our scale yet |
| **Z.AI / GLM family** (very cheap capable models) | GLM-4.7 at ~$0.60/$2.20 per MTok | **Watch** — reinforces the model-portability principle (AGENTS.md is written to hold across models); revisit at a monthly re-tier if Claude economics change |
| **McKinsey "Seven operating truths of AI-native companies"** | Agents as named teammates; build-vs-buy as a deliberate call | **Keep as validation** — Truth 1 is literally the Jewell/Sam/Claude model; useful pitch language for Maxxim |
| **Council / anti-anchoring technique** | Rotate which voice leads multi-agent review to avoid anchoring | **Already integrated** (Sam logged it); mirrors this OS's adversarial-verify pattern |
| **Rohrssen market framework** | McKinsey/BCG free reports for market sizing; customers × price > $1B test; advisory-board-before-build | **Keep** — directly useful for Maxxim GTM and the partner-led pitch |

## Boundary note (categorical)

The channel also carries personal items (property transaction correspondence, personal training
scheduling). Not summarised here; flagged so the channel's membership and the nightly sweep's
personal-exclusion rule are both checked — the sweep must skip personal content entirely.
