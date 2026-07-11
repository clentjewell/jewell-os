---
date: 2026-07-11
source: manual
kind: risk
relates_to: Life OS build; Drive 04 Intelligence; security
verdict: adopt
confidence: high
---

# Drive `04 Intelligence` full sweep — findings for the Life OS build

Orchestrated sweep of the whole `04 Intelligence` tree (all folders, ~150 documents read or
indexed; personal, legal and health items listed by title only, never read). Run as part of
establishing the Life OS, 11 July 2026.

## Escalations (flagged to Clent same day — no action taken, per the rules)

1. **Live secrets in Drive.** Plaintext API keys are hardcoded inside old n8n workflow JSON
   exports in `02 AI & Systems / 03 AI Agents` — at least a Tavily bearer token (AI Mate.json,
   Linkedin Post generation.json) and an OpenAI key (Linkedin Post generation.json). These sit
   in a shared, machine-crawled folder. Recommended: rotate both keys, then move credentials
   into the n8n credential store. Key values were not copied anywhere.
2. **Personal and legal references in shared, crawled Drive docs.** The Jewell Drive Master
   Index, the Sam Operations Manual and the "Stuart Carlaw" strategy doc each carry personal,
   legal or health references inside shared folders. Moving them is Clent's call, Tier 3.

## Structural findings (feed the weekly washback)

- **Versioning sprawl**: 10 variants of the Sam Operations Manual across 2 folders; the
  Master Index doc contains its own content 3 times over (a write bug); MASTER 3D OS and
  JEWELL-SYSTEM-SOPS each exist as identical doc + markdown pairs; the Sam Data Centre holds
  3 generations of folder structure including 7 completely empty duplicate shells.
- **Superseded strategy documents**: Vision Statement v1.03 ("Catalyst Culture") conflicts
  with Positioning Confirmation v01 (June 2026); the March 2026 opportunities ranking parked
  Jewell Tyres and PetZip, both since reactivated; 3 automation generations (n8n 2025,
  OpenClaw/Sam, Claude/Maxxim) coexist in the tree.
- **Incomplete pack**: the "Ask Jewell Team — Knowledge Pack" Drive folder holds only the
  README; its 5 knowledge files live in this repo at `06-memory/team-knowledge/` — the Drive
  side should be a pointer, not a second copy.
- **Meeting-note corpus is rich and current**: ~95 meeting notes June–July 2026 confirm the
  live commercial picture already captured in this repo's memory. Client-specific notes
  should route to client folders per the meeting-notes README; several currently sit in the
  weekly-strategy folder.

## What the sweep confirmed for the Life OS

The Drive tree and this repo agree on the operating model: 3D Process as the spine, OKF
Drive structure, Sam-to-Claude migration, Maxxim as the platform play, and the six-layer
memory design. The Life OS master index (`LIFE-OS.md`) now points at the canonical copy of
each and marks the Drive duplicates as generated or superseded.

Next: Clent's word on the 2 escalations; duplication cleanup proposals go to the Friday
washback.
