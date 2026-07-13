const TSUNG_PASSWORD = "jason2026";
const COOKIE_NAME = "jw_tsung_auth";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

const STYLE = `
  :root {
    --bg: #F6F3EC;
    --surface: #FBFAF5;
    --ink: #14140F;
    --ink-soft: #3A382F;
    --muted: #948E80;
    --line: #DDD8CB;
    --accent: #1E3FE0;
    --accent-soft: #E7ECFC;
    --accent-ink: #0F2499;
    --error: #B0522C;
    --font-display: 'Poppins', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    color-scheme: light;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0E0E0C; --surface: #17170F; --ink: #F3F1E9; --ink-soft: #C9C4B4;
      --muted: #7A7566; --line: #2A2924; --accent: #7C97FF; --accent-soft: #1B2242;
      --accent-ink: #B7C4FF; --error: #E29874;
      color-scheme: dark;
    }
  }
  :root[data-theme="dark"] {
    --bg: #0E0E0C; --surface: #17170F; --ink: #F3F1E9; --ink-soft: #C9C4B4;
    --muted: #7A7566; --line: #2A2924; --accent: #7C97FF; --accent-soft: #1B2242;
    --accent-ink: #B7C4FF; --error: #E29874;
    color-scheme: dark;
  }
  :root[data-theme="light"] {
    --bg: #F6F3EC; --surface: #FBFAF5; --ink: #14140F; --ink-soft: #3A382F;
    --muted: #948E80; --line: #DDD8CB; --accent: #1E3FE0; --accent-soft: #E7ECFC;
    --accent-ink: #0F2499; --error: #B0522C;
    color-scheme: light;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font-family: var(--font-display); font-weight: 400; line-height: 1.6;
    font-size: 16px; -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); }
  a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  .wrap { max-width: 46rem; margin: 0 auto; padding: 0 1.5rem; }
`;

const RAIL = `
<div class="rail">
  <div class="rail-inner">
    <span class="rail-mark">Jewell &middot; How We Work</span>
    <nav class="rail-stages">
      <a href="#discover">Discover</a>
      <a href="#design">Design</a>
      <a href="#deploy">Deploy</a>
      <a href="#deepen">Deepen</a>
    </nav>
  </div>
</div>
<style>
  .rail {
    position: sticky; top: 0; z-index: 5;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(6px); border-bottom: 1px solid var(--line);
  }
  .rail-inner {
    max-width: 46rem; margin: 0 auto; padding: 0.7rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  }
  .rail-mark { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.08em; color: var(--muted); text-transform: uppercase; white-space: nowrap; }
  .rail-stages { display: flex; gap: 1.1rem; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.06em; text-transform: uppercase; }
  .rail-stages a { color: var(--muted); text-decoration: none; }
  .rail-stages a:hover { color: var(--accent-ink); }
  @media (max-width: 620px) { .rail-stages { display: none; } }
</style>
`;

const PAGE_STYLE_BODY = `
  .hero { padding: 4.2rem 0 3rem; }
  .eyebrow {
    font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--accent-ink); margin: 0 0 1.1rem;
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .eyebrow::before { content: ""; width: 1.4rem; height: 1px; background: var(--accent); display: inline-block; }
  h1 {
    font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em;
    font-size: clamp(2.1rem, 5vw, 3.1rem); line-height: 1.08; margin: 0 0 1.1rem;
    text-wrap: balance;
  }
  .lede { font-size: 1.14rem; color: var(--ink-soft); max-width: 40rem; margin: 0; text-wrap: pretty; }
  .lede strong { color: var(--ink); font-weight: 500; }
  section { padding: 3rem 0; border-top: 1px solid var(--line); }
  .hero { border-top: none; }
  h2 {
    font-family: var(--font-display); font-weight: 600; font-size: clamp(1.5rem, 3vw, 1.85rem);
    line-height: 1.2; margin: 0 0 0.9rem; letter-spacing: -0.005em; text-wrap: balance;
  }
  p { margin: 0 0 1rem; color: var(--ink-soft); max-width: 40rem; }
  p:last-child { margin-bottom: 0; }
  .section-head { margin-bottom: 1.8rem; }

  .ledger { margin-top: 1.6rem; border-top: 1px solid var(--line); }
  .ledger-row { display: grid; grid-template-columns: 3rem 7rem 1fr; gap: 1.2rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); align-items: baseline; }
  .ledger-row .idx { font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted); }
  .ledger-row .stage { font-family: var(--font-display); font-weight: 500; font-size: 1rem; color: var(--ink); }
  .ledger-row .desc { font-size: 0.94rem; color: var(--ink-soft); margin: 0; max-width: none; }
  @media (max-width: 640px) {
    .ledger-row { grid-template-columns: 2rem 1fr; gap: 0.6rem 0.8rem; }
    .ledger-row .desc { grid-column: 1 / -1; }
  }

  .engine { background: var(--surface); border: 1px solid var(--line); padding: 2.4rem clamp(1.4rem, 4vw, 2.6rem); margin-top: 1.4rem; }
  .quote {
    font-family: var(--font-display); font-weight: 500; font-size: clamp(1.25rem, 2.6vw, 1.55rem);
    line-height: 1.35; color: var(--ink); margin: 0 0 1.2rem; text-wrap: balance;
  }
  .engine p { max-width: none; }

  .proof-strip { margin-top: 1.6rem; display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--line); }
  .proof-cell { padding: 1.4rem 1.3rem; border-right: 1px solid var(--line); }
  .proof-cell:last-child { border-right: none; }
  .proof-num { font-family: var(--font-mono); font-size: 1.5rem; color: var(--accent-ink); font-variant-numeric: tabular-nums; display: block; margin-bottom: 0.3rem; }
  .proof-label { font-size: 0.84rem; color: var(--ink-soft); }
  @media (max-width: 640px) {
    .proof-strip { grid-template-columns: 1fr; }
    .proof-cell { border-right: none; border-bottom: 1px solid var(--line); }
    .proof-cell:last-child { border-bottom: none; }
  }

  .signoff { font-size: 1.03rem; color: var(--ink); max-width: 38rem; margin-top: 1rem; }
  footer { padding: 2.5rem 0 4rem; }
  footer .foot-mark { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }

  .reveal { opacity: 0; transform: translateY(10px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
`;

function page(title, bodyHtml, extraStyle) {
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex, nofollow">
<style>${STYLE}${extraStyle || ""}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

function tsungPage() {
  const body = `
${RAIL}
<main class="wrap">

  <section class="hero">
    <p class="eyebrow">For Jason Tsung</p>
    <h1>An AI-powered commercialisation engine, run by people.</h1>
    <p class="lede">A short look at how Jewell works, what it has built, and the engine underneath it. <strong>Not a pitch.</strong> Just a look under the bonnet.</p>
  </section>

  <section class="reveal" id="discover-anchor">
    <div class="section-head">
      <p class="eyebrow" id="discover">How it works</p>
      <h2>Discover, Design, Deploy &mdash; with a Deepen loop that never really stops.</h2>
      <p>Every brand run on this engine follows the same method, the 3D Process&trade;. Four stages, one compounding system.</p>
    </div>
    <div class="ledger">
      <div class="ledger-row" id="design">
        <span class="idx">01</span>
        <span class="stage">Discover</span>
        <p class="desc">Understand before building. The why, the audience, the competitors, the opportunity map.</p>
      </div>
      <div class="ledger-row">
        <span class="idx">02</span>
        <span class="stage">Design</span>
        <p class="desc">Strategy on the page. Business plan, brand strategy, offer design, activation strategy.</p>
      </div>
      <div class="ledger-row" id="deploy">
        <span class="idx">03</span>
        <span class="stage">Deploy</span>
        <p class="desc">Translate strategy into live assets. Identity, website, social, paid, email, SEO, content.</p>
      </div>
      <div class="ledger-row" id="deepen">
        <span class="idx">04</span>
        <span class="stage">Deepen</span>
        <p class="desc">Stay embedded. Measure, improve, scale. Every cycle feeds the next.</p>
      </div>
    </div>
  </section>

  <section class="reveal" id="engine">
    <div class="section-head">
      <p class="eyebrow">What makes it move fast</p>
      <h2>AI does the volume. A senior operator owns the number.</h2>
    </div>
    <div class="engine">
      <p class="quote">Every brand strategy, identity system and set of live assets on this engine is produced the same way, by Maxxim, the AI layer running underneath Jewell's work.</p>
      <p>It is not a tool anyone logs into. It does the production work at a pace no studio could match by hand, while a senior operator still signs off on judgement, tone and risk before anything ships.</p>
      <p>It is why builds move in weeks, not quarters. And why the same engine can carry the same rigour into any brand led by someone who wants to move at that pace.</p>
    </div>
  </section>

  <section class="reveal" id="proof">
    <div class="section-head">
      <p class="eyebrow">Not a one-off</p>
      <h2>25 plus brands, built to production, across sectors.</h2>
    </div>
    <div class="proof-strip">
      <div class="proof-cell">
        <span class="proof-num">+300%</span>
        <span class="proof-label">Revenue growth, Hidrive</span>
      </div>
      <div class="proof-cell">
        <span class="proof-num">$35M</span>
        <span class="proof-label">AUM raised in 90 days, Walter Wealth</span>
      </div>
      <div class="proof-cell">
        <span class="proof-num">25+</span>
        <span class="proof-label">Brands built to production, across sectors</span>
      </div>
    </div>
  </section>

  <section class="reveal" id="next">
    <div class="section-head">
      <p class="eyebrow">Where this goes</p>
      <h2>Next.</h2>
    </div>
    <p class="signoff">This page will not stay static. The engine keeps building, and this is just what it looked like today. If any of this raises a question, ask it.</p>
  </section>

  <footer>
    <span class="foot-mark">Jewell &middot; private link, not for wider circulation</span>
  </footer>

</main>
<script>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
</script>
`;
  return page("Jewell &mdash; For Jason", body, PAGE_STYLE_BODY);
}

function loginPage(showError) {
  const body = `
<main class="wrap login-wrap">
  <p class="eyebrow">Private link</p>
  <h1>This page needs a password.</h1>
  <p class="lede">Ask Clent if you don't have it.</p>
  <form method="POST" class="login-form">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" autocomplete="current-password" autofocus required>
    <button type="submit">Enter</button>
  </form>
  ${showError ? '<p class="login-error">That password did not match. Try again.</p>' : ""}
</main>
`;
  const extra = `
  .login-wrap { padding: 5rem 0; max-width: 26rem; }
  .login-wrap .eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-ink); margin: 0 0 1rem; }
  .login-wrap .eyebrow::before { content: ""; width: 1.4rem; height: 1px; background: var(--accent); display: inline-block; }
  .login-wrap h1 { font-family: var(--font-display); font-weight: 600; font-size: 1.9rem; line-height: 1.15; margin: 0 0 0.6rem; }
  .login-wrap .lede { color: var(--ink-soft); margin: 0 0 1.8rem; }
  .login-form { display: grid; gap: 0.8rem; }
  .login-form label { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
  .login-form input {
    font: inherit; font-size: 1rem; padding: 0.7rem 0.85rem; border: 1px solid var(--line);
    border-radius: 2px; background: var(--surface); color: var(--ink);
  }
  .login-form button {
    font: inherit; font-weight: 500; font-size: 0.95rem; padding: 0.75rem 1rem; border: none;
    border-radius: 2px; background: var(--accent); color: var(--bg); cursor: pointer; width: fit-content;
  }
  .login-form button:hover { opacity: 0.9; }
  .login-error { color: var(--error); font-size: 0.92rem; margin-top: 1rem; }
`;
  return page("Jewell &mdash; Private link", body, extra);
}

function holdingPage() {
  const body = `
<main class="wrap login-wrap">
  <p class="eyebrow">Jewell</p>
  <h1>Nothing here yet.</h1>
  <p class="lede">If you were sent a link, use that one directly.</p>
</main>
`;
  const extra = `
  .login-wrap { padding: 6rem 0; max-width: 26rem; }
  .login-wrap .eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-ink); margin: 0 0 1rem; }
  .login-wrap .eyebrow::before { content: ""; width: 1.4rem; height: 1px; background: var(--accent); display: inline-block; }
  .login-wrap h1 { font-family: var(--font-display); font-weight: 600; font-size: 1.9rem; margin: 0 0 0.6rem; }
  .login-wrap .lede { color: var(--ink-soft); margin: 0; }
`;
  return page("Jewell", body, extra);
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
    return new Response(tsungPage(), {
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
