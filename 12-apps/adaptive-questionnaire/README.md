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
- **Type.** Poppins throughout: 700 for titles, 400 for body, 500 for the small labels and
  controls where 400 reads weak. Those are the only three weights self-hosted in
  `public/assets/fonts/` — 23 KB for the set — so nothing in the CSS may ask for another. A weight
  that is not loaded gets faked by the browser and the whole page loses its edge; `npm run check`
  is not wired up for this, but the browser script asserts it. Poppins ships as static weights,
  not a variable font, so each weight is its own file. Google Fonts, Open Font License.
- **Poppins tuning.** Bold Poppins sets wide, so headings carry `-0.022em` tracking; uppercase
  labels need `0.2em` to stay legible; body line-height goes to 1.68. The furniture follows the
  type — Poppins is geometric and circular, so radii are generous, buttons are pills and the
  1-to-5 scale is round.
- **Controls.** Radio and checkbox marks are drawn in CSS — a tick from two borders, a dot for
  radios — with the native input kept in the accessibility tree and its keyboard behaviour intact.
  Targets are at least 3.25rem tall, and focus rings sit on the whole option, not the hidden input.
- **Layout.** A left rail holds the step list and a live panel; the questions sit beside it. On a
  phone the order becomes progress, questions, panel, so the questions are never pushed below the
  fold by the rail.
- **The brief opens with what a coordinator reads first.** The one thing that would make the
  trip, then an at-a-glance block — when, who is travelling, support, pace, budget — then the
  detail. Every brief carries a code (`JP-YYMMDD-XXXX`) so an unnamed one is still findable in an
  inbox; it becomes the email subject when no name was given.
- **Progress is pinned to the top of the screen** on every width and never scrolls away. It opens
  at 20% before a single answer — people finish what they have visibly begun, and a bar that starts
  at zero reads as a task not started — then the remaining 80% is spread across the questions the
  traveller can currently see, so every answer moves it, capped at 99 until the brief. Only answers
  the traveller gave themselves count; carry-forward defaults do not. It never moves backwards, even
  when a branch opens more questions. `public/assets/progress.js` is the pure calculation, tested
  in `tests/progress.test.js`.
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

## How many questions

43 in total, down from 57, and every one of them is only shown to a traveller it applies to. An
ordinary holiday with no health factor sees 25. The reduction cost no derived output: dates and
party size became one question each, medication became one question instead of a yes/no gate
plus a follow-up, the emergency contact became one field, and rest cadence and outings-per-day
are derived from pace rather than asked. Anything that produced nothing but a line in the
itemised dump was cut. `tests/brief.test.js` carries a guard that fails if a question nobody
reads ever comes back.

Two questions were wired in rather than cut: walking distance now caps activity intensity — it is
the strongest single predictor and was being thrown away — and "the one thing that would make
the trip" now heads the brief instead of sitting at the bottom of the dump.

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

## Sending a brief

The brief can be emailed to `clent@jewellprojects.com`. That is the only thing on the site that
puts health information on the network, so it is built to be refusable:

- **Consent is explicit.** The send button stays disabled until the traveller ticks a box that
  names what is being sent and to whom. It is never pre-ticked, and copy, download and print all
  work without sending anything.
- **The recipient is fixed in server code** (`functions/api/submit.js`). Nothing in a request can
  redirect where the mail goes, so the endpoint cannot be used to send to anyone else.
- **Plain text only**, assembled from validated fields. No caller-supplied HTML is ever rendered,
  and control characters are stripped from anything reaching a mail header.
- **Minimal payload.** Only the reference, the destination and the rendered brief are sent. The
  raw answers object is not — the brief already itemises every answer.
- **The API key never leaves Cloudflare.** It is a `secret_text` environment variable on the Pages
  project, read only inside the Function, and it appears nowhere in this repository.

Configuration, all on the Pages project:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key. Without it the endpoint returns 503 and tells the traveller to copy or download instead. |
| `SUBMIT_FROM` | no | Sender address. Defaults to `onboarding@resend.dev`, which Resend will only deliver to the account owner. Set it to an address on a domain verified in Resend to send from your own name. |

`nodejs_compat` is required in `wrangler.jsonc`: wrangler's own Functions bundler emits a wrapper
that references node built-ins, even though the handler imports nothing.

### The endpoint is public and unthrottled

Anyone who finds the URL can POST to it, and each POST sends an email. There is no rate limit,
because `*.pages.dev` is not a zone you control and WAF rate-limiting rules need one. Two ways to
close it: put Cloudflare Access in front of the whole site, which is needed anyway before real
traveller data, or move it to a custom domain and add a rate-limiting rule on `/api/submit`.

## Privacy posture

Health answers are the most sensitive thing a form can hold, so the form holds them and, until the
traveller consents to send, nothing else does.

- No analytics. No fonts, scripts or styles from anywhere else. The only back end is the
  submission endpoint, and it runs only when the traveller asks it to.
- `connect-src 'self'` in the Content-Security-Policy, set both in `public/_headers` and in a
  meta tag. The page can reach its own submission endpoint and no other destination, so answers
  cannot be exfiltrated to a third party even if code were added that tried to. This was
  `'none'` until sending was added; that is the one guarantee the feature cost.
- Nothing is written to the device unless the traveller ticks the save box, which is off by
  default. Untick it and the stored answers are deleted. Nothing is sent anywhere unless they
  tick the separate consent box and press send.
- The traveller decides what leaves: copy as text, download a JSON copy, or print to PDF.
- Answers are rendered with `createElement` and `textContent`, never `innerHTML`, so free text is
  never parsed as markup.

Two traps worth knowing about Cloudflare Pages. Without a `404.html` in the output, **any unknown
path returns 200 with the homepage**, which quietly masks a broken asset reference — there is one
now, so a missing path 404s properly. And if you edit `public/_headers`: Cloudflare Pages **merges** every matching
rule rather than letting the most specific one win. Two overlapping patterns that both set
`Cache-Control` produce a contradictory header, so it is set per path group and never on `/*`.

Email is not encrypted end to end, and an inbox is not a clinical record system. That is a
deliberate, recorded trade-off, not an oversight — the alternative considered was storing
submissions in Cloudflare D1 and emailing only an alert, which keeps health detail off email
entirely and remains the better option if this ever carries volume.

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
