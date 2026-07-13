---
date: 2026-07-13
source: manual
kind: tool
relates_to: Maxxim; agent memory/personalization architecture; client data-handling messaging
verdict: trial
confidence: medium
---

# Hosted agent-memory layer — Zep recommended over Honcho and Mem0

Clent asked whether to use honcho.dev (or something similar) for persistent agent memory beyond
this repo's git-native `06-memory` system. Evaluated three cloud memory-layer products against
the need: live conversational recall for agents (e.g. Sam-class Slack presence, Maxxim), cloud
hosting acceptable, but must support a clear client-facing data-handling explanation.

## Options considered

| Product | Model | Differentiator | Pricing | Fit |
| --- | --- | --- | --- | --- |
| **Honcho** | Peers/sessions + background "Dreaming" reasoning | Active synthesis over raw messages; claims 60–90% token savings | $2/M tokens ingestion + tiered reasoning-query fees | Newer, more experimental positioning; harder to explain to a client as "trust us" black-box reasoning |
| **Zep** | Temporal context graph ("Context Lake") | Every fact provenance-tracked to source, timestamped, invalidated (not silently overwritten) when contradicted; tested to 100M+ graphs, sub-200ms | Freemium + enterprise tier (undisclosed exact figures) | **Recommended** — provenance and change-tracking translate directly into a client-facing trust pitch |
| **Mem0** | Add/Learn/Retrieve compression | Self-hostable (Kubernetes, private cloud, air-gapped) alongside cloud | Usage-based, undisclosed on site | Fallback option — keep in reserve for any client whose data-residency policy later rules out cloud |

## Decision

**Adopt Zep as the default recommendation** for any build (starting with Maxxim) that needs
live, persistent agent memory beyond this repo's file-based system. Clent confirmed cloud
hosting is acceptable in principle but needs to be actively managed in client conversations, not
assumed. Standard framing to reuse: *"Your data lives in a managed cloud memory layer, every fact
is traceable to its source and timestamped, nothing is trained into a shared model, and you can
request export or deletion at any time."* This should become a standard clause in Maxxim's
data-handling section rather than being re-derived per client.

Mem0 stays noted as the self-hosted escape hatch if a specific client's policy requires it —
not a reason to delay adopting Zep now.

## Boundary note

This is a runtime/product memory-layer decision, separate from `06-memory` (this repo's own
git-native operating memory), which stays canonical and unaffected. Nothing here changes how
this OS's own memory works.

Next: washback to confirm before anyone wires Zep into a real build; Alex/dev to scope actual
integration cost once a build calls for it.
