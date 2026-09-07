# Adaptive travel and health questionnaire

A single-page questionnaire that turns a traveller's health, treatment, accommodation and
activity needs into a brief someone can book from. It runs as a static site on Cloudflare Pages.

Built as a Discover-phase instrument for the 3D Process: it collects the itemised intake, and it
outputs a specification rather than a pile of form fields.

## What it does

Four sections and a brief.

1. **Trip basics** — destination, dates, party, who is travelling to support the traveller, pace.
2. **Health and treatment** — what part health plays in the trip, conditions, fitness to travel,
   treatment needed at the destination and how often, mobility, energy, rest, medication
   handling, diet, heat, altitude, infection risk, insurance, emergency contact.
3. **Where you stay** — property type, catering, access requirements, room requirements,
   location priorities, on-site support, budget, dealbreakers.
4. **What you want to do** — interests, intensity ceiling, session length, what to rule out.

Then it builds a brief: the limits the answers set, the care and treatment requirements, an
accommodation specification in booking language, a filtered activity shortlist, and a list of
what a human has to settle before anything is booked.

## What makes it adaptive

Three mechanisms, all in the open.

- **Branching.** A question appears only when its `visibleIf` predicate passes. Say treatment is
  needed at the destination and the treatment block opens. Say the trip carries no health factor
  and the whole clinical branch stays shut.
- **Carry-forward.** Answers pre-fill later questions the traveller has not touched. A full-time
  wheelchair user arrives at the accommodation section with step-free access, a lift, a roll-in
  shower and wide doorways already ticked. Refrigerated medication pre-ticks the room fridge.
  Anything the traveller sets themselves is never overwritten.
- **Derived limits.** Mobility, energy, recent surgery, cardiac and respiratory conditions, pace
  and rest requirements each cap the activity intensity. The traveller can lower that ceiling but
  not raise it above the clinical cap. Every activity ruled out is shown with the reason it was
  ruled out, so nothing is filtered silently.

## Privacy posture

Health answers are the most sensitive thing a form can hold, so this one holds them and nothing
else does.

- No back end. No analytics. No fonts, scripts or styles from anywhere else.
- `connect-src 'none'` in the Content-Security-Policy, set both in `public/_headers` and in a
  meta tag, so the page cannot make a network request even if code were added that tried to.
- Nothing is written to the device unless the traveller ticks the save box, which is off by
  default. Untick it and the stored answers are deleted.
- The traveller decides what leaves: copy as text, download a JSON copy, or print to PDF.
- Answers are rendered with `createElement` and `textContent`, never `innerHTML`, so free text is
  never parsed as markup.

If a future version needs to submit answers to a service, that is a different design with a
different review. It is not a small change to this one.

## Run it locally

```sh
npm run dev     # serves public/ on http://127.0.0.1:8788
npm test        # verifies the brief engine
```

`npm test` covers the part that can go quietly wrong: whether a clinical limit actually removes
the activity it should remove.

## Deploy to Cloudflare Pages

There is no build step. `public/` is the site.

**Direct upload**, from this directory:

```sh
npx wrangler login
npm run deploy
```

That creates or updates the `jp-adaptive-questionnaire` project and returns the
`*.pages.dev` link.

**Git-connected**, in the Cloudflare dashboard: create a Pages project from this repository, set
the root directory to `12-apps/adaptive-questionnaire`, the build output directory to `public`,
and leave the build command empty.

The site is set to `noindex` in both a meta tag and `robots.txt`. Put Cloudflare Access in front
of it before it carries anyone's real answers.

## Change the questions

- `public/assets/schema.js` — the sections and questions. Add a question by adding an object to
  a section's `questions` array. Give it a `visibleIf` predicate to make it conditional. The
  brief, the validation and the itemised answer list all follow automatically.
- `public/assets/activities.js` — the activity catalogue. Each entry states its intensity,
  duration, the conditions it exposes you to, and the access it assumes. Facts only, so the
  filter can reason about it.
- `public/assets/brief.js` — the derivation and filtering rules, and the Markdown output.
- `public/assets/app.js` — rendering, validation, carry-forward defaults, export.

Add a rule to `brief.js` and add a case to `tests/brief.test.js` in the same change.

## Limits

This is a planning tool. It does not give clinical advice, it does not assess fitness to travel,
and it does not replace a clinician or an insurer. The activity catalogue is generic and holds no
operators, prices or destination detail; a human chooses those. Nothing here is a booking.

Next: deploy it to a Pages preview, put Access in front of it, and walk one real traveller
through it before it goes near a client.
