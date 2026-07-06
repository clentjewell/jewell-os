# Jewell 3D Deploy summary

Turn approved Design work into a deploy plan and proposed Asana delivery tasks.

## When to use

Once Design work for the engagement is approved and sits in `05_Approved`, and the engagement is
ready to move into live delivery.

## Inputs

- Approved Design outputs from `05_Approved` (strategy, messaging, site or campaign artifacts,
  measurement plan).

## Outputs

- A deploy plan, and a set of proposed Asana tasks covering the delivery checkpoints.

## Steps

1. Read the approved Design outputs only. Do not build a deploy plan from a draft.
2. Draft the deploy plan: what goes live, in what order, through which channel (site, campaign,
   portal, automation, reporting), and the delivery checkpoints.
3. Propose Asana tasks for each checkpoint, with a suggested owner and date.
4. **Approval gate.** The engagement owner reviews the deploy plan and the proposed tasks, and
   confirms them, before anything is scheduled to go live or becomes client-visible.

## Guardrails

- Must only draw from approved Design work in `05_Approved`, never a draft.
- Nothing goes live, and nothing becomes client-visible, without the engagement owner's sign-off.
- Deploy tasks are Tier 2 client-facing actions (they move work toward being client-visible).
  Confirmed by the engagement owner, and by Clent where the deploy touches scope, pricing or a
  client commitment.

## Where the output is filed

The deploy plan and its supporting assets go to `03_Deploy`. Delivery tasks go to Asana, in the
client's delivery project.

## Example

Acme Co's approved messaging and site content sit in `05_Approved`. The skill drafts a deploy
plan sequencing the homepage, then the campaign landing page, then the reporting dashboard, and
proposes three Asana tasks with suggested dates. The engagement owner confirms the sequence and
tasks before work begins.

## Success measure

A clean handover into delivery, with no confusion about what is approved, what is next, and who
owns each step.
