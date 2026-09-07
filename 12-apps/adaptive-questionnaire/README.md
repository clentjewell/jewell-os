# Adaptive travel and health questionnaire

A single-page questionnaire that turns a traveller's health, treatment, accommodation and
activity needs into a brief someone can book from. It runs as a static site on Cloudflare Pages.

**Live: https://jp-adaptive-questionnaire.pages.dev** — deployed by direct upload, so it is not
Git-connected: a change here does not publish itself. Run `npm run deploy` to push a new version.
The URL is public and is not yet behind Cloudflare Access.

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

## Design

Direction: **convalescent modernism** — the visual world of early-20th-century health resorts.
Daylight, still water, linen, planting. It suits a form about recovery without reaching for
medical stock imagery, and it stays quiet enough that the questions remain the subject.

- **Palette.** Cool mineral ground (`#EEF1ED`), pine ink (`#16211E`), sea green (`#1F5C50`), sage
  and sand. Deliberately cool rather than the warm-cream-and-terracotta that generated design
  tends toward. Jewell Yellow appears exactly once, as the focus ring, where its contrast earns
  its place. Full light and dark palettes, both defined at token level.
- **Type.** Newsreader carries the voice, IBM Plex Sans carries the form. Both are variable fonts,
  self-hosted in `public/assets/fonts/` — one file each, 180 KB for the pair — so the page makes
  no third-party request and the CSP stays `font-src 'self'`. Google Fonts, Open Font License.
- **Layout.** A left rail holds the step list and a live panel; the questions sit beside it. On a
  phone the order becomes progress, questions, panel, so the questions are never pushed below the
  fold by the rail.
- **The live panel** is the point. As answers land it shows the activity ceiling with a meter, the
  longest outing, how many accommodation requirements have been captured, and how many items are
  outstanding. The traveller watches the trip narrow rather than meeting the result cold at the
  end, and it makes the adaptive machinery visible instead of hidden.

### Imagery

Five images in `public/assets/img/`, generated with Higgsfield (`recraft_v4_1`), resized and
converted to WebP — 172 KB for the set. One hero and one banner per section: shutters and morning
light for the trip, ripples in a stone bath for health, folded linen for where you stay, a level
path through planting for activities.

No people, no clinics, no medical equipment. That is a deliberate constraint, not a style
preference: a form about someone's illness should not put a stranger's face or a stock hospital
scene in front of them, and AI-generated people in a health context misrepresent by implication.
The images are decorative and carry `alt=""`, so a screen reader passes over them.

Note for reuse: the OTR / Jewell Tyres brand lock forbids stock and AI imagery. These assets are
scoped to this tool and do not transfer to that brand.

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

Next: put Cloudflare Access in front of the URL, then walk one real traveller through it before
it goes near a client.
