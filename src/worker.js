const TSUNG_PASSWORD = "jason2026";
const COOKIE_NAME = "jw_tsung_auth";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

const FONTS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
`;

const STYLE = `
  :root {
    --font: 'Poppins', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-snap-type: y proximity; -webkit-text-size-adjust: 100%; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  body {
    margin: 0; font-family: var(--font); font-weight: 400; line-height: 1.6;
    background: #0F0F13; color: #F3F1E9; -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  a { color: inherit; }
  ::selection { background: rgba(120,140,255,0.35); }

  /* deck section shell */
  .section {
    position: relative; min-height: 100svh; display: flex; align-items: center;
    background: var(--bg); color: var(--ink); scroll-snap-align: start; overflow: hidden;
  }
  .inner { position: relative; z-index: 2; width: 100%; max-width: 66rem; margin: 0 auto; padding: 7rem 2rem; }
  .ghost {
    position: absolute; top: -3vh; right: -1vw; font-family: var(--font); font-weight: 700;
    font-size: clamp(12rem, 34vw, 30rem); line-height: 0.8; color: var(--ink); opacity: 0.06;
    pointer-events: none; user-select: none; z-index: 1; letter-spacing: -0.04em;
  }

  /* type */
  .eyebrow { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--label); margin: 0; display: inline-flex; align-items: center; gap: 0.6rem; }
  .eyebrow::before { content: ""; width: 1.6rem; height: 1px; background: currentColor; opacity: 0.7; }
  .counter { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--label); font-variant-numeric: tabular-nums; }
  .p-top { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
  .name { font-family: var(--font); font-weight: 600; font-size: clamp(2.7rem, 7vw, 5.1rem); line-height: 1.0; letter-spacing: -0.025em; margin: 1.3rem 0 0; text-wrap: balance; }
  .positioning { font-size: clamp(1.15rem, 2.3vw, 1.6rem); font-weight: 300; color: var(--ink-soft); margin: 1.1rem 0 0; max-width: 40rem; text-wrap: pretty; }
  .rule { height: 1px; background: color-mix(in srgb, var(--ink) 22%, transparent); margin: 2.4rem 0; }

  .p-lower { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.6rem; align-items: end; }
  .facts { display: grid; gap: 1.15rem; margin: 0; }
  .facts > div { display: grid; gap: 0.25rem; }
  .facts dt { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.09em; text-transform: uppercase; color: var(--label); }
  .facts dd { margin: 0; font-size: 1rem; color: var(--ink); line-height: 1.5; }
  .p-aside { display: flex; flex-direction: column; gap: 1.8rem; align-items: flex-start; }
  .stat-num { font-family: var(--font); font-weight: 600; font-size: clamp(2.4rem, 5vw, 3.4rem); color: var(--accent); line-height: 1; font-variant-numeric: tabular-nums; display: block; letter-spacing: -0.02em; }
  .stat-label { font-size: 0.9rem; color: var(--ink-soft); margin-top: 0.5rem; max-width: 15rem; display: block; }
  .cta {
    display: inline-flex; align-items: center; gap: 0.55rem; background: var(--btn-bg); color: var(--btn-ink);
    font-family: var(--font); font-weight: 500; font-size: 0.95rem; padding: 0.85rem 1.35rem;
    border-radius: 999px; text-decoration: none; transition: transform 0.16s ease, box-shadow 0.16s ease;
    box-shadow: 0 1px 0 color-mix(in srgb, var(--ink) 12%, transparent);
  }
  .cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--btn-bg) 70%, transparent); }
  .cta .arw { transition: transform 0.16s ease; }
  .cta:hover .arw { transform: translateX(3px); }

  /* hero + framing */
  .h-head { font-family: var(--font); font-weight: 600; font-size: clamp(2.7rem, 6.4vw, 4.8rem); line-height: 1.02; letter-spacing: -0.025em; margin: 1.5rem 0 0; text-wrap: balance; max-width: 20ch; }
  .h-lede { font-size: clamp(1.15rem, 2.2vw, 1.5rem); font-weight: 300; color: var(--ink-soft); margin: 1.6rem 0 0; max-width: 42rem; text-wrap: pretty; }
  .h-lede strong { color: var(--ink); font-weight: 500; }
  .cue { position: absolute; left: 2rem; bottom: 2rem; font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--label); display: flex; align-items: center; gap: 0.6rem; z-index: 2; }
  .cue span { width: 1px; height: 2rem; background: currentColor; opacity: 0.6; transform-origin: top; animation: cue 2.4s ease-in-out infinite; }
  @keyframes cue { 0%, 100% { transform: scaleY(0.3); opacity: 0.3; } 50% { transform: scaleY(1); opacity: 0.8; } }
  @media (prefers-reduced-motion: reduce) { .cue span { animation: none; } }

  .stages { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 2.6rem; background: color-mix(in srgb, var(--ink) 16%, transparent); border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent); }
  .stage { background: var(--bg); padding: 1.5rem 1.3rem; display: grid; gap: 0.5rem; align-content: start; }
  .stage .sn { font-family: var(--mono); font-size: 0.8rem; color: var(--accent); }
  .stage .st { font-family: var(--font); font-weight: 600; font-size: 1.15rem; letter-spacing: -0.01em; }
  .stage .sd { font-size: 0.9rem; color: var(--ink-soft); line-height: 1.5; }

  .proofs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.2rem; margin-top: 2.8rem; }
  .proof .pn { font-family: var(--font); font-weight: 600; font-size: clamp(2.6rem, 6vw, 3.8rem); color: var(--accent); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .proof .pl { font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.7rem; }

  .signoff { font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 300; color: var(--ink-soft); margin: 1.6rem 0 0; max-width: 38rem; }
  .signoff strong { color: var(--ink); font-weight: 500; }

  /* fixed chrome */
  .brandmark { position: fixed; top: 1.35rem; left: 1.6rem; font-family: var(--font); font-weight: 600; font-size: 1.02rem; letter-spacing: -0.01em; color: #fff; mix-blend-mode: difference; z-index: 40; text-decoration: none; }
  .tag { position: fixed; top: 1.5rem; right: 1.6rem; font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; mix-blend-mode: difference; z-index: 40; }
  .dots { position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 0.85rem; z-index: 40; mix-blend-mode: difference; }
  .dots a { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid #fff; display: block; transition: transform 0.2s ease, background 0.2s ease; }
  .dots a:hover { transform: scale(1.35); }
  .dots a.on { background: #fff; }
  @media (max-width: 780px) { .dots, .tag { display: none; } }

  .reveal > * { opacity: 0; transform: translateY(14px); transition: opacity 0.7s cubic-bezier(.2,.7,.2,1), transform 0.7s cubic-bezier(.2,.7,.2,1); }
  .reveal.in > * { opacity: 1; transform: none; }
  .reveal.in > *:nth-child(2) { transition-delay: 0.06s; }
  .reveal.in > *:nth-child(3) { transition-delay: 0.12s; }
  .reveal.in > *:nth-child(4) { transition-delay: 0.18s; }
  @media (prefers-reduced-motion: reduce) { .reveal > * { opacity: 1; transform: none; transition: none; } }

  @media (max-width: 760px) {
    .inner { padding: 6rem 1.4rem; }
    .p-lower { grid-template-columns: 1fr; gap: 1.9rem; align-items: start; }
    .stages { grid-template-columns: 1fr 1fr; }
    .proofs { grid-template-columns: 1fr; gap: 1.6rem; }
    .p-top { flex-direction: column; gap: 0.5rem; }
  }

  /* ---- section colour worlds ---- */
  .s-cover  { --bg: radial-gradient(120% 90% at 20% 0%, #191926 0%, #0F0F13 55%); --ink: #F4F2EA; --ink-soft: #B4B0A4; --label: #8891B4; --accent: #7E97FF; --btn-bg: #F4F2EA; --btn-ink: #14141A; }
  .s-method { --bg: linear-gradient(165deg, #F8F5EE, #EEE8DA); --ink: #14140F; --ink-soft: #55513f; --label: #948E7C; --accent: #1E3FE0; --btn-bg: #14140F; --btn-ink: #F8F5EE; }
  .s-pott   { --bg: linear-gradient(160deg, #23CBCC, #128E92); --ink: #052A2B; --ink-soft: #0C494B; --label: #0C494B; --accent: #052A2B; --btn-bg: #052A2B; --btn-ink: #6FE7E6; }
  .s-exemplar { --bg: linear-gradient(160deg, #12203C, #0A1120); --ink: #EAF0FF; --ink-soft: #9BB0DA; --label: #6E80AE; --accent: #86A0FF; --btn-bg: #1E3FE0; --btn-ink: #FFFFFF; }
  .s-tyres  { --bg: linear-gradient(160deg, #FEC916, #EDB100); --ink: #0B0B0B; --ink-soft: #38330E; --label: #6A5800; --accent: #0B0B0B; --btn-bg: #0B0B0B; --btn-ink: #FEC013; }
  .s-esti   { --bg: linear-gradient(160deg, #0C1E30, #06121E); --ink: #E9F3F6; --ink-soft: #93B3C1; --label: #5E8797; --accent: #4FE3C4; --btn-bg: #4FE3C4; --btn-ink: #05131C; }
  .s-jewell { --bg: linear-gradient(160deg, #F8F5EE, #ECE6D8); --ink: #14140F; --ink-soft: #55513f; --label: #948E7C; --accent: #1E3FE0; --btn-bg: #1E3FE0; --btn-ink: #FFFFFF; }
  .s-maxxim { --bg: linear-gradient(160deg, #0E0E16, #08080C); --ink: #F1EFF8; --ink-soft: #A6A1BC; --label: #6C6689; --accent: #8F7CFF; --btn-bg: #8F7CFF; --btn-ink: #0B0B12; }
  .s-proof  { --bg: #0F0F13; --ink: #F4F2EA; --ink-soft: #B4B0A4; --label: #8891B4; --accent: #7E97FF; }
  .s-next   { --bg: radial-gradient(120% 90% at 80% 100%, #191926 0%, #0F0F13 55%); --ink: #F4F2EA; --ink-soft: #B4B0A4; --label: #8891B4; --accent: #7E97FF; --btn-bg: #F4F2EA; --btn-ink: #14141A; }
`;

const PROJECTS = [
  {
    cls: "s-pott", id: "pottsville", n: "01", ghost: "01",
    sector: "Allied health &middot; launched",
    name: "Pottsville Acupuncture",
    positioning: "A practitioner-led clinic, taken to market and built to grow.",
    facts: [
      ["The brief", "A founder-dependent clinic, around 25 clients a week."],
      ["What we built", "Brand, website, bookings, CRM and content. The full stack, live."],
      ["The arc", "An 18-month plan from founder-dependent to sale-ready."],
    ],
    stat: ["~2&times;", "Bookings in the first retainer period"],
    href: "https://pottsvilleacupuncture.com.au/", cta: "See it live",
  },
  {
    cls: "s-exemplar", id: "exemplar", n: "02", ghost: "02",
    sector: "The method, in full",
    name: "A 3D Process, end to end",
    positioning: "One brand's complete strategy on a single page. Discover to Deepen.",
    facts: [
      ["Why it matters", "This is the depth behind every build in this deck."],
      ["What is inside", "Audience, competitors, positioning, personas, media plan."],
      ["How to read it", "Top to bottom. The whole thinking, not a summary."],
    ],
    stat: ["4", "Stages, one compounding system"],
    href: "https://lowe-alpine-3d-process.clent.workers.dev/", cta: "Read it",
  },
  {
    cls: "s-tyres", id: "tyres", n: "03", ghost: "03",
    sector: "Industrial &middot; turnaround",
    name: "Jewell Tyres",
    positioning: "50 years, no fuss. A 53-year-old business, given a second act.",
    facts: [
      ["The brief", "An independent tyre trader, challenged for the first time since 2005."],
      ["What we did", "A locked brand and a two-phase turnaround into a platform sister brand."],
      ["Why it counts", "Proof the method carries into hard, unglamorous sectors."],
    ],
    stat: ["53 yrs", "Of trade, repositioned for what is next"],
    href: "https://jewelltyres.pages.dev/", cta: "See it live",
  },
  {
    cls: "s-esti", id: "esti", n: "04", ghost: "04",
    sector: "AI product &middot; built from nothing",
    name: "EstiTrade",
    positioning: "Reads a plan. Returns a full bill of quantities in under a minute.",
    facts: [
      ["The problem", "A painter's estimate took two to three hours, or up to $1,900 outsourced."],
      ["What it does", "Identifies every room and surface from the plan. Quantities only."],
      ["The proof", "14 rooms, 42 line items, 868.8 m&sup2;, in 47 seconds at 94% confidence."],
    ],
    stat: ["&lt;60s", "For a job that used to take hours"],
    href: "https://paint-estimator.pages.dev/", cta: "See it live",
  },
  {
    cls: "s-jewell", id: "jewell", n: "05", ghost: "05",
    sector: "The platform &middot; the front door",
    name: "Jewell AI",
    positioning: "Where the method lives as a product.",
    facts: [
      ["What it is", "Strategy, brand and live assets, produced fast."],
      ["The principle", "AI does the volume. A senior operator owns the number."],
      ["Built on", "A modern stack on Cloudflare, with an assistant built in."],
    ],
    stat: ["25+", "Brands built, across sectors"],
    href: "https://jewell-ai.clent.workers.dev/", cta: "See it live",
  },
  {
    cls: "s-maxxim", id: "maxxim", n: "06", ghost: "06",
    sector: "The engine underneath",
    name: "Maxxim",
    positioning: "What makes the pace possible.",
    facts: [
      ["What it is", "The 3D Process, productised into an AI engine."],
      ["How it scales", "Vetted operators deliver the same method to their own clients."],
      ["The split", "AI does the production. The human owns trust, judgement and sign-off."],
    ],
    stat: null,
    href: "https://maxxim.ai/", cta: "See it live",
  },
];

function renderProject(p) {
  const facts = p.facts
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("\n          ");
  const stat = p.stat
    ? `<div class="stat"><span class="stat-num">${p.stat[0]}</span><span class="stat-label">${p.stat[1]}</span></div>`
    : "";
  return `
  <section class="section ${p.cls}" id="${p.id}">
    <span class="ghost" aria-hidden="true">${p.ghost}</span>
    <div class="inner reveal">
      <div class="p-top">
        <p class="eyebrow">${p.sector}</p>
        <span class="counter">${p.n} / 06</span>
      </div>
      <h2 class="name">${p.name}</h2>
      <p class="positioning">${p.positioning}</p>
      <div class="rule"></div>
      <div class="p-lower">
        <dl class="facts">
          ${facts}
        </dl>
        <div class="p-aside">
          ${stat}
          <a class="cta" href="${p.href}" target="_blank" rel="noopener">${p.cta} <span class="arw" aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>
  </section>`;
}

const NAV_ITEMS = [
  ["cover", "Cover"], ["method", "Method"], ["pottsville", "Pottsville"],
  ["exemplar", "3D Process"], ["tyres", "Jewell Tyres"], ["esti", "EstiTrade"],
  ["jewell", "Jewell AI"], ["maxxim", "Maxxim"], ["proof", "Proof"], ["next", "Next"],
];

function shell(title, inner, opts) {
  const o = opts || {};
  const chrome = o.chrome === false ? "" : `
<a class="brandmark" href="#cover">Jewell</a>
<span class="tag">For Jason &middot; private</span>
<nav class="dots" aria-label="Sections">
  ${NAV_ITEMS.map(([id, label]) => `<a href="#${id}" title="${label}" aria-label="${label}"></a>`).join("\n  ")}
</nav>`;
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="robots" content="noindex, nofollow">
${FONTS}
<style>${STYLE}${o.extraStyle || ""}</style>
</head>
<body>
${chrome}
${inner}
${o.script || ""}
</body>
</html>`;
}

function tsungPage() {
  const inner = `
<main>

  <section class="section s-cover" id="cover">
    <div class="inner reveal">
      <p class="eyebrow">For Dr Jason Tsung</p>
      <h1 class="h-head">A look at the work. And the engine underneath it.</h1>
      <p class="h-lede"><strong>Not a pitch.</strong> Six live builds, the method behind them, and how it moves this fast. Open anything you like.</p>
    </div>
    <div class="cue">Scroll <span></span></div>
  </section>

  <section class="section s-method" id="method">
    <div class="inner reveal">
      <p class="eyebrow">How every one was built</p>
      <h2 class="h-head">Discover. Design. Deploy. And a Deepen loop that never really stops.</h2>
      <div class="stages">
        <div class="stage"><span class="sn">01</span><span class="st">Discover</span><span class="sd">Understand before building. The why, the audience, the opportunity.</span></div>
        <div class="stage"><span class="sn">02</span><span class="st">Design</span><span class="sd">Strategy on the page. Business plan, brand, offer, activation.</span></div>
        <div class="stage"><span class="sn">03</span><span class="st">Deploy</span><span class="sd">Strategy into live assets. Identity, website, social, email, content.</span></div>
        <div class="stage"><span class="sn">04</span><span class="st">Deepen</span><span class="sd">Stay embedded. Measure, improve, scale. Every cycle feeds the next.</span></div>
      </div>
    </div>
  </section>

${PROJECTS.map(renderProject).join("\n")}

  <section class="section s-proof" id="proof">
    <div class="inner reveal">
      <p class="eyebrow">Not a one-off</p>
      <h2 class="h-head">25 plus brands, built to production, across sectors.</h2>
      <div class="proofs">
        <div class="proof"><div class="pn">+300%</div><div class="pl">Revenue growth, Hidrive</div></div>
        <div class="proof"><div class="pn">$35M</div><div class="pl">Assets under management in 90 days, Walter Wealth</div></div>
        <div class="proof"><div class="pn">25+</div><div class="pl">Brands built to production, across sectors</div></div>
      </div>
    </div>
  </section>

  <section class="section s-next" id="next">
    <div class="inner reveal">
      <p class="eyebrow">Where this goes</p>
      <h2 class="h-head">Next.</h2>
      <p class="signoff">This deck will not stay still. The engine keeps building, and this is just what it looked like today. If any of it raises a question, <strong>ask it.</strong></p>
    </div>
  </section>

</main>`;

  const script = `
<script>
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dots a'));

  var reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { threshold: 0.25 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          dots.forEach(function (d) { d.classList.toggle('on', d.getAttribute('href') === '#' + id); });
        }
      });
    }, { threshold: 0.55 });
    sections.forEach(function (s) { so.observe(s); });
  }
</script>`;

  return shell("Jewell &mdash; For Jason", inner, { script });
}

function loginPage(showError) {
  const inner = `
<main>
  <section class="section s-cover" id="cover" style="min-height:100svh;">
    <div class="inner reveal in" style="max-width:30rem;">
      <p class="eyebrow">Private link</p>
      <h1 class="h-head" style="font-size:clamp(2rem,5vw,2.8rem);">This one needs a password.</h1>
      <p class="h-lede" style="margin-top:1rem;">Ask Clent if you do not have it.</p>
      <form method="POST" class="login-form">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="current-password" autofocus required>
        <button type="submit">Enter <span aria-hidden="true">&rarr;</span></button>
      </form>
      ${showError ? '<p class="login-error">That password did not match. Try again.</p>' : ""}
    </div>
  </section>
</main>`;
  const extraStyle = `
  .login-form { display: grid; gap: 0.8rem; margin-top: 2rem; max-width: 22rem; }
  .login-form label { font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--label); }
  .login-form input { font: inherit; font-size: 1rem; padding: 0.8rem 0.95rem; border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent); border-radius: 8px; background: rgba(255,255,255,0.04); color: var(--ink); }
  .login-form input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .login-form button { font: inherit; font-weight: 500; font-size: 0.95rem; padding: 0.8rem 1.2rem; border: none; border-radius: 999px; background: var(--btn-bg); color: var(--btn-ink); cursor: pointer; width: fit-content; display: inline-flex; gap: 0.5rem; align-items: center; }
  .login-form button:hover { transform: translateY(-1px); }
  .login-error { color: #E29874; font-size: 0.92rem; margin-top: 1.1rem; }
`;
  return shell("Jewell &mdash; Private link", inner, { chrome: false, extraStyle });
}

function holdingPage() {
  const inner = `
<main>
  <section class="section s-cover" id="cover" style="min-height:100svh;">
    <div class="inner reveal in" style="max-width:30rem;">
      <p class="eyebrow">Jewell</p>
      <h1 class="h-head" style="font-size:clamp(2rem,5vw,2.8rem);">Nothing here yet.</h1>
      <p class="h-lede" style="margin-top:1rem;">If you were sent a link, use that one directly.</p>
    </div>
  </section>
</main>`;
  return shell("Jewell", inner, { chrome: false });
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
