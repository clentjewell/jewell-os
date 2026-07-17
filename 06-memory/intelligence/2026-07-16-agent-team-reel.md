---
date: 2026-07-16
source: ingest
kind: technique
relates_to: OS design; Today door; content engine
verdict: adopt
confidence: high
---

# Instagram reel — "5 agents, one shared memory" (shared by Clent, 16 July)

Creator describes a 5-agent setup (CEO, CMO, sales rep, researcher, data analyst) over one
shared memory, positioning the shared memory as "the real unlock".

## Evaluation

The architecture maps almost 1:1 onto the existing OS — with GitHub as a stronger shared
memory (version-controlled, audited, portable) than the reel's likely notes doc. The CEO,
researcher and analyst agents correspond to the Today door, the nightly intelligence sweep
and the finance pulse respectively. The governance difference is kept deliberately: the
reel's agents assign work autonomously; this OS proposes and humans decide.

## Adopted (2 items, folded into the plan)

1. **Sales-attention lane**: a pipeline section added to the Today door prompt — inbound
   untouched, follow-ups due, proposals ageing past 7 days. Rides the Step 2 relight.
2. **CMO lane**: a draft-scripts step appended to the nightly intelligence sweep — 2–3
   content drafts from adopt/trial items and past winners, filed for human review, aligned
   with the canon's fortnightly proof-piece and LinkedIn 2–3x/week cadence. Starts with the
   Step 5 content work.

Not adopted: autonomous task assignment between agents — contradicts the constitution, and
the 14 July shutdown showed the cost of ungoverned automation.

Next: both lanes land through the activation runbook; nothing new to build.
