# Own Projects & Products (Jewell-owned IP)

These live in Drive under **06 Own Projects** and in private GitHub repos.
They are Jewell's own ventures, distinct from client work.

## Maxxim ("Max") — the platform

**What it is**: the scalable productisation of the 3D Process. An AI agent
platform that lets vetted human **Client Partners** (agencies/consultants)
deliver commercialisation to their own clients — AI does the production work,
the human partner owns trust, judgment, and final sign-off.

**Architecture** (four layers, per the Website Factory briefs to Raef):
1. **Maxxim Plugin** — "the Brain": 25 skills, 42 specialists (24 makers + 18
   advisors), 3 slash commands; distributed via private GitHub.
2. **Maxxim Google Drive** — "the Data": per-client folders
   (`preconsult/USER.md`, `MEMORY.md`, `uploads/`, `digests/`, `generated/`,
   `website/`).
3. **Proxy MCP** — "the Platform": Rails app on Railway + Postgres (verify_token,
   generate_image, deploy/promote/rollback).
4. **Partner Cowork** — "the Compute": Cowork on partner laptops with synced
   Drive + plugin.

**First commercial product — Maxxim Website Factory**: cold-outreach pipeline
that pulls contacts from a Firmable database, filters to small trade businesses,
builds free preview websites via Claude, offers a 7-day pay-to-claim ($99
activation), then $25–$80/month hosting tiers with an upsell ladder (SEO,
social, ads, email).

**Status**: active build. **PetZip is the live pilot client** running through
Maxxim's Discover phase, surfacing platform gaps (no partner-added clients,
manual sync, no version control). Governance note on record: the 3D Process
(with CP1/CP2 checkpoints) is the core narrative; Cowork is execution plumbing,
not the story. Tech Lead: **Raef (raef@slay.com.au)**. Distribution partner:
**Alex Frew (3P Digital)**. Repos: `maxxim`, `maxxim-positioning` (the
positioning repo is internal-only, not for partner sharing).

## PetZip (+ Pet Treatery)

An own-brand **pet health & wellness authority** — nutraceuticals, supplements,
shampoos, flea/worming (APVMA-registered products). White space: no Australian
player is both independent and commercially complete. Related entity **Pet
Treatery** is an open pet-product marketplace being relaunched for the
Australian market (legacy WooCommerce site was NZ-configured). PetZip is the
live Maxxim pilot: Discover phase complete and synced June 2026, Design phase
next. Repo: `petzip`.

## Jewell Tyres + OTR Earthmover

A 53-year-old independent OTR (off-the-road) tyre trading business owned by
**David Jewell**. Peak (2018): $15M turnover, exclusive global agency with
Newcrest; now structurally challenged (OEMs and importers selling direct) and
loss-making for the first time since 2005.

Two-phase strategy: Phase 1 refreshes **Jewell Tyres** (operator-led trading,
capture David's 50 years of tacit knowledge as content); Phase 2 (post Gate 2)
builds **OTR Earthmover Tyres** as a platform sister brand targeting service/
repair, wheels/rims, recycling, training, and distressed-inventory dispersal.
Explicitly a methodology pilot: does the 3D Process transfer from consumer
healthcare (Pottsville) to declining B2B industrial?

Brand locked (Master Strategy v2.3): essence Reliability; tagline **"50 YEARS.
NO FUSS."**; Jewell Yellow #FEC013 / Jewell Black #0B0B0B / Earth Rich #5C3D22;
Helvetica Neue only; no stock or AI imagery. An investor-raise folder exists
(capital event is revenue priority #4). Detailed competitor intelligence on OTR
Tyres, Wheels & Axles is on file. Repos: `jewelltyres`, `jewelltyres-stitch`
(Astro rebuild), `jewell-tyres-im` (information memorandum deck); live at
jewell-tyres.pages.dev. Slack `#jewell-tyres`.

**Jakes Tyres** — separate folder/venture, early-stage or dormant (empty shell).

## All Coast Painting — AI Estimator ("estipaint.ai")

An AI tool that reads architectural plans and finish schedules, identifies rooms
and surfaces, and outputs a structured Bill of Quantities for painting
contractors — quantities only, never pricing. Cuts a 2–3 hour (or $500–$1,900
outsourced) estimate to under 60 seconds; proof-of-concept ran 14 rooms /
42 line items / 868.8 m² in 47 seconds at 94% confidence. Pitch deck exists
(March 2026); next step is validation against ~10 past jobs. Live pipeline item.
Repo: `paint-estimator`; live at paint-estimator.pages.dev.

## Memoir Maker ("Legacy Builder")

A productised ghostwriting framework (currently a Custom GPT) that turns
interviews, transcripts, and photos into a structured memoir manuscript via
slash commands (`/intake`, `/timeline`, `/chapter X`, `/revise`, `/export`).
Being generalised into a reusable product with an ethical-use clause (no
publishing without family consent, no fabrication). The originating source
material is personal family content and stays private.

## Virtual Marketing Team (VMT)

Not a product — Jewell's service-delivery brand/pitch framework. The VMT
Welcome Pack (v1.03) is the client-onboarding deck for retainer-style
embedded-marketing-team engagements ("Beyond a Traditional Agency… your
strategic partner in growth"), run on the 3D Process with Asana-backed project
management. The folder is template-only; substantive content lives with clients.

## The Jewell platform itself (`jewell-ai` repo)

The main website/platform: Astro 5 + Tailwind v4 + TypeScript, static output on
Cloudflare Workers (jewell-ai.clent.workers.dev), with Workers/Pages Functions
for contact, waitlist, and the **Jewell Intelligence** assistant (LLM-proxied
server-side; rule-based fallback). Case studies are markdown content
collections; design tokens live in one `@theme` block; OG images generated at
build. Integration seams ready for Supabase (portal auth), Stripe (add-ons),
Resend (email), HubSpot (forms). See the repo README for how to add case
studies and insights.

## Side concepts (incubator shelf)

In 04 Intelligence → Knowledge Base → Concepts + Ideas: e.g. "Boozebakery"
(a "Japanese Moonshine" spirits category concept with a "Balanced Boozer"
wellness-drinking manifesto). Ideas only — not active ventures.
