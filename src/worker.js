import { DECK_STYLE } from "./deck-style.js";

const TSUNG_PASSWORD = "jason2026";
const COOKIE_NAME = "jw_tsung_auth";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function page(title, bodyInner, extraStyle) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="A private, informal look at current work and how AI is used as an operating system." />
<meta name="robots" content="noindex, nofollow" />
<style>${DECK_STYLE}${extraStyle || ""}</style>
</head>
<body>
${bodyInner}
</body>
</html>`;
}

const PROJECTS = [
  {
    name: "Jewell — site rebuild", status: ["draft", "Draft"],
    what: "The core Jewell platform and front end, rebuilt from the ground up. It's the “operating system” idea made literal — a human-centred, AI-enabled site meant to tie the business together, not just describe it.",
    where: "Structure, design system and copy are in place. Still refining before anything here goes in front of customers.",
    links: [["jewell-ai.clent.workers.dev →", "https://jewell-ai.clent.workers.dev/"]],
  },
  {
    name: "Jewell tools — Ask &amp; Why", status: ["dev", "In development"],
    what: "AI surfaces built into the Jewell world. “Ask” answers questions in plain language from approved sources; “Why” makes the reasoning behind the work interactive.",
    where: "Working, but early. The interfaces are there; what they draw their answers from is still being tuned, so treat them as previews rather than finished tools.",
    links: [
      ["Ask →", "https://claude-jewell-reconciliation-phase-0-sv9gcl-jewell-ai.clent.workers.dev/ai-enabled"],
      ["Why →", "https://claude-jewell-reconciliation-phase-0-sv9gcl-jewell-ai.clent.workers.dev/why"],
    ],
  },
  {
    name: "Maxxim", status: ["draft", "Draft"],
    what: "The platform running alongside the live maxxim.ai site — the 3D Process productised into an engine that vetted operators can run for their own clients.",
    where: "Draft and actively evolving. The live site and admin already exist; this is the next iteration being built on top.",
    links: [["maxxim.ai →", "https://maxxim.ai/"]],
  },
  {
    name: "OTR Earthmover", status: ["dev", "Search in dev"],
    what: "A site for OTR Earthmover to browse and buy earthmover tyres online, with a live “Ask” surface answering from the business's own knowledge.",
    where: "Content and structure are drafted end to end. The product search — the part that actually helps someone find the right tyre — is still being built.",
    links: [["otr-earthmover-tyre.pages.dev →", "https://otr-earthmover-tyre.pages.dev/ask"]],
  },
  {
    name: "Jewell Tyres", status: ["dev", "Early build"],
    what: "The new Jewell Tyres build — a 53-year-old independent business repositioned around one line: 50 years, no fuss.",
    where: "Early stage. The brand is locked; the buying flow and product search are still in development.",
    links: [["jewelltyres.pages.dev →", "https://jewelltyres.pages.dev/"]],
  },
  {
    name: "Jewell Health", status: ["draft", "Staging"],
    what: "An early build for Jewell Health — the same approach extended into the health side of the business.",
    where: "Staged and early. Not yet public, and the least developed of everything here.",
    links: [["staging.jewell-health.pages.dev →", "https://staging.jewell-health.pages.dev/"]],
  },
  {
    name: "EstiTrade", status: ["dev", "Preview"],
    what: "An AI product built from nothing. It reads an architectural plan and returns a full bill of quantities in under a minute — quantities only, never pricing.",
    where: "A working preview. Proven on a real job (14 rooms, 868.8 m², 47 seconds at 94% confidence); now validating against more before wider release.",
    links: [["paint-estimator.pages.dev →", "https://paint-estimator.pages.dev/"]],
  },
  {
    name: "The 3D Process, end to end", status: ["live", "Reference"],
    what: "One brand's complete strategy on a single page — Discover, Design, Deploy, Deepen. The method that sits behind every build in this deck.",
    where: "A finished reference. Read it top to bottom; it is the whole thinking, not a summary.",
    links: [["lowe-alpine-3d-process.clent.workers.dev →", "https://lowe-alpine-3d-process.clent.workers.dev/"]],
  },
  {
    name: "Pottsville Acupuncture", status: ["live", "Launched"],
    what: "A client clinic built the same way as everything above — brand, website, bookings and CRM, plus its own AI copy editor and a strategy layer behind the scenes.",
    where: "Launched and live. The finished example of what the drafts on the previous pages are working toward. Bookings nearly doubled in the first retainer period.",
    links: [["pottsvilleacupuncture.com.au →", "https://pottsvilleacupuncture.com.au/"]],
  },
];

const OS_CARDS = [
  ["Build", "It writes and ships the work", "Every project on the previous pages is built and maintained with Claude Code, from first draft to deployed page.", "Across the work"],
  ["Method", "The same process every time", "Discover, Design, Deploy, with a Deepen loop that keeps feeding the next round. One method, applied to every brand above.", "3D Process"],
  ["Scale", "Operators, not only us", "The same engine lets vetted operators deliver this to their own clients. The work does not depend on one pair of hands.", "Maxxim"],
  ["Judgement", "A person still owns the number", "AI does the volume; a senior operator signs off on tone, judgement and risk before anything ships.", "Always"],
];

const TOTAL = PROJECTS.length + 5; // cover, callout, toc, projects, os, close

function slideNum(n) {
  const pad = String(n).padStart(2, "0");
  return `<div class="slide-num">${pad} / ${TOTAL}</div>`;
}

function renderToc() {
  const rows = PROJECTS.map((p, i) => `        <div class="toc-row">
          <span class="index">${String(i + 1).padStart(2, "0")}</span><span class="name">${p.name}</span>
          <span class="right"><span class="status ${p.status[0]}">${p.status[1]}</span></span>
        </div>`).join("\n");
  return `  <section class="slide">
    <div class="slide-inner">
      <div class="eyebrow">Currently in motion</div>
      <h2 style="font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);">What we're working on</h2>
      <p class="sig" style="max-width: 56ch;">${PROJECTS.length} things on the go right now. One page each follows, with what it is and where it's actually at.</p>
      <div class="toc-list">
${rows}
      </div>
    </div>
    ${slideNum(3)}
  </section>`;
}

function renderProject(p, i) {
  const links = p.links
    .map(([label, href]) => `        <a href="${href}" target="_blank" rel="noopener">${label}</a>`)
    .join("\n");
  const fieldNum = String(i + 1).padStart(2, "0");
  const total = String(PROJECTS.length).padStart(2, "0");
  return `  <section class="slide">
    <div class="slide-inner">
      <div class="project-head">
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div class="eyebrow">Project ${fieldNum} of ${total}</div>
          <h2>${p.name}</h2>
        </div>
        <span class="status ${p.status[0]}">${p.status[1]}</span>
      </div>
      <div class="project-fields">
        <div class="field">
          <div class="field-label">What it is</div>
          <p>${p.what}</p>
        </div>
        <div class="field">
          <div class="field-label">Where it's at</div>
          <p>${p.where}</p>
        </div>
      </div>
      <div class="project-links">
${links}
      </div>
    </div>
    ${slideNum(4 + i)}
  </section>`;
}

function renderOs() {
  const n = 4 + PROJECTS.length;
  const cards = OS_CARDS.map(([tag, h3, p, split]) => `        <div class="os-card">
          <div class="tag">${tag}</div>
          <h3>${h3}</h3>
          <p>${p}</p>
          <div class="os-split"><span>${split}</span></div>
        </div>`).join("\n\n");
  return `  <section class="slide">
    <div class="slide-inner">
      <div class="eyebrow">The bit underneath all of it</div>
      <h2 style="font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);">AI as an operating system</h2>
      <p class="sig" style="max-width: 62ch;">Not a single app. More like the layer everything else runs on — the same handful of habits, used to build every project above.</p>

      <div class="os-grid">
${cards}
      </div>
    </div>
    ${slideNum(n)}
  </section>`;
}

function tsungDeck() {
  const projectSlides = PROJECTS.map((p, i) => renderProject(p, i)).join("\n\n");
  const closeNum = TOTAL;
  const inner = `<div class="deck">

  <section class="slide cover">
    <div class="slide-inner">
      <div class="wordmark">Jewell — private draft</div>
      <h1>What we're building, and how AI runs underneath it.</h1>
      <p class="lede">A quick, informal look for you, Jason — not a client deck. Where things are up to, and how the work actually gets made.</p>
      <div class="meta-row">
        <span>Prepared by Clent</span>
        <span>·</span>
        <span>July 2026</span>
        <span>·</span>
        <span>For Jason</span>
      </div>
    </div>
    ${slideNum(1)}
  </section>

  <section class="slide">
    <div class="slide-inner">
      <div class="eyebrow">Before you look</div>
      <h2 style="font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);">Most of this is a working draft.</h2>
      <div class="callout">
        <div class="dot"></div>
        <p>Nothing here is a pitch, and some of it is still mid-build — a couple of the tools ahead (Ask, and search on OTR Earthmover and Jewell Tyres) are previews, not finished products. <strong>You're seeing the work as it actually is.</strong> Happy to walk you through any of it in person.</p>
      </div>
    </div>
    ${slideNum(2)}
  </section>

${renderToc()}

${projectSlides}

${renderOs()}

  <section class="slide" style="border-bottom: none;">
    <div class="slide-inner">
      <div class="eyebrow">Next</div>
      <h2 style="font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);">Happy to walk you through any of it.</h2>
      <p style="max-width: 56ch; color: color-mix(in srgb, var(--black) 78%, transparent);">Everything above is live, in build, or a working draft. Some of it is rough on purpose — you're seeing it as it really is. Good to talk any of it through in person, any time.</p>
      <p class="sig">— Clent</p>
    </div>
    ${slideNum(closeNum)}
  </section>

</div>`;
  return page("For Jason — what we're building", inner);
}

const LOGIN_STYLE = `
  .gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .gate form { display: flex; flex-direction: column; gap: 14px; width: min(360px, 88vw); padding: 32px; border: 1px solid var(--line); border-radius: 12px; background: var(--card); }
  .gate h1 { font-size: 1.2rem; font-weight: 500; }
  .gate input { font: inherit; font-size: 1rem; padding: 10px 12px; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--black) 25%, transparent); background: transparent; color: inherit; }
  .gate button { font: inherit; font-size: 0.95rem; padding: 10px 12px; border-radius: 8px; border: none; background: var(--signal); color: #fff; cursor: pointer; font-weight: 500; }
  .gate .err { color: #d94f4f; font-size: 0.85rem; }
  .gate .hint { font-size: 0.82rem; color: color-mix(in srgb, var(--black) 55%, transparent); }
`;

function loginPage(showError) {
  const inner = `<div class="gate">
  <form method="POST">
    <div class="eyebrow">Private link</div>
    <h1>This is for Jason. Enter the password to continue.</h1>
    <input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus required />
    ${showError ? '<div class="err">That password did not match. Try again.</div>' : '<div class="hint">Ask Clent if you don\'t have it.</div>'}
    <button type="submit">View</button>
  </form>
</div>`;
  return page("Private draft — password required", inner, LOGIN_STYLE);
}

function holdingPage() {
  const inner = `<div class="gate">
  <div style="text-align:left; width:min(360px,88vw);">
    <div class="eyebrow">Jewell</div>
    <h1 style="font-weight:500; font-size:1.3rem; margin-top:10px;">Nothing here yet.</h1>
    <p style="margin-top:8px; color: color-mix(in srgb, var(--black) 65%, transparent);">If you were sent a link, use that one directly.</p>
  </div>
</div>`;
  return page("Jewell", inner, LOGIN_STYLE);
}

function hasValidCookie(request) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.split(";").some((c) => c.trim() === `${COOKIE_NAME}=ok`);
}

function setAuthCookie() {
  return `${COOKIE_NAME}=ok; Max-Age=${COOKIE_MAX_AGE}; Path=/tsung; HttpOnly; Secure; SameSite=Lax`;
}

async function handleTsung(request) {
  if (request.method === "POST") {
    const form = await request.formData();
    const submitted = (form.get("password") || "").toString();
    if (submitted === TSUNG_PASSWORD) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/tsung", "Set-Cookie": setAuthCookie() },
      });
    }
    return new Response(loginPage(true), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  }

  if (hasValidCookie(request)) {
    return new Response(tsungDeck(), {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  }
  return new Response(loginPage(false), {
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/tsung") {
      return handleTsung(request);
    }

    return new Response(holdingPage(), {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  },
};
