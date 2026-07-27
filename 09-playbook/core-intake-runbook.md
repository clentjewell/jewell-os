# CORE intake runbook

How a new client gets into the 3D Process, from first link to first artefact.
Written for Ronnie. Everything here happens in 2 places: the CORE page
(client-facing) and the Jewell Console (ours).

Status: live from 28 July 2026. The console side shipped in jewell-console
PR 59; the CORE page has been live on the Jewell AI site since mid July.

## The flow at a glance

1. Send the client the CORE link.
2. The client answers the 4 CORE questions (Customers, Offering, Rivals,
   Expression). Takes about 15 minutes.
3. Their finished sheet lands automatically; the console notices within
   5 minutes and puts them at the top of Today.
4. You press one button to file them into the 3D Studio.
5. In the Studio: pick the tier, add any extra inputs, generate.

## Step 1 — invite the client

Console → 3D Process tab. The invite block at the top holds the CORE link
with a Copy button:

`https://core-sheet-capture-jewell-ai.clent.workers.dev/core`

The page asks the client for an access code before it starts. The code is
managed on the Jewell AI site, not in the console — include the current
code when you send the link. If you do not have it, ask Clent.

Send link + code by email or WhatsApp. Nothing else to set up per client.

## Step 2 — the client answers

Nothing for you to do. The page walks them through Customers, Offering,
Rivals and Expression, and saves the finished sheet automatically. If a
client starts and abandons, they never appear on our side — only a
finished sheet raises a signal.

## Step 3 — they appear on Today

Open the console → Today → Step 4 · Act. A finished intake appears as a
signal labelled "New CORE intake", ranked at the top (score 95). The
feeds refresh every 5 minutes, so a client who finishes at 9:00 is on the
board by 9:05.

## Step 4 — file them, one press

Two cases:

**New client** — the signal shows one button, **File into 3D**. Press it.
This starts their engagement, files their answers as discovery input, and
they appear in the 3D Studio's client list.

**Looks like an existing client** — the intake page slugs from whatever
business name the client typed, so "Walter Wealth Advice" arrives as
`walter-wealth-advice` even though `walter-wealth` is already in the
Studio. When the console spots this, the signal says so and shows 2
buttons:

- **File into walter-wealth** — the primary button. Use this when it is
  the same client; their answers join the existing engagement.
- **File as new client** — only if it genuinely is a different business.

When unsure, check the sheet first (the signal names the client) and ask.
Filing into the wrong engagement mixes 2 clients' discovery material.

## Step 5 — run the 3D Process

3D Process tab → select the client. Pick the output tier (Gold, Platinum,
Jewell), add any extra inputs (notes, transcripts, files — everything
saved here feeds the generator), then draft artefacts phase by phase, or
generate the proposal once Discover has substance.

## If something looks wrong

- A client says they finished but nothing appears: wait 5 minutes, then
  check with Clent — the intake may be missing its summary file.
- The File button errors: the message says why. "No existing engagement
  at X" means the into-target was wrong — file as new or pick the right
  client.
- 3 intakes are already waiting as of 27 July: ihg-hotel-group-port-
  moresby-png and petzip file as new; walter-wealth-advice files into
  walter-wealth.

Next: send the first link.
