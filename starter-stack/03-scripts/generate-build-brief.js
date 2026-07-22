#!/usr/bin/env node
/**
 * generate-build-brief.js
 * 
 * Generates a BUILD-BRIEF.md for a client build session by pulling
 * live data from jewell-brain (GitHub) and the 3D Process Discover artefacts.
 * 
 * Usage:
 *   node generate-build-brief.js <client-slug> [--output ./path/BUILD-BRIEF.md]
 * 
 * Examples:
 *   node generate-build-brief.js hiskins
 *   node generate-build-brief.js jewelltyres --output ../jewelltyres/BUILD-BRIEF.md
 * 
 * Requires: GITHUB_TOKEN env var (or gh CLI auth)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const BRAIN_REPO = 'clentjewell/jewell-brain';
const HOUSE_RULES = `- No em dashes (—) or en dashes (–). Use a comma, full stop, or rewrite.
- No AI-writing tells: no "seamless/leverage/unlock/robust/elevate/holistic".
- Australian English: tyre, organise, colour, behaviour, programme.
- Lead with the point. Short declarative sentences. No throat-clearing.
- Every page needs a Key Facts block near the top (answer-engine-liftable) + FAQPage JSON-LD.
- \`llms.txt\` at site root. \`robots.txt\` allows major AI crawlers.
- No em dashes in any copy, comments, or commit messages.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ghGet(apiPath) {
  try {
    const result = execSync(
      `gh api "${apiPath}" 2>/dev/null`,
      { timeout: 15000, encoding: 'utf8' }
    );
    return JSON.parse(result);
  } catch {
    return null;
  }
}

function ghContent(apiPath) {
  const data = ghGet(apiPath);
  if (!data || !data.content) return null;
  return Buffer.from(data.content, 'base64').toString('utf8');
}

function ghDir(apiPath) {
  const data = ghGet(apiPath);
  if (!Array.isArray(data)) return [];
  return data;
}

// Pull a field from 3d-registry items (if artefacts have been generated)
function registryField(items, slug, field) {
  const item = items && items[slug];
  if (!item) return null;
  return item[field] || null;
}

// Try to read an HTML artefact from memory/generated/discover/ in the client repo
function readArtefact(clientRepo, slug) {
  if (!clientRepo) return null;
  const content = ghContent(
    `repos/${clientRepo}/contents/memory/generated/discover/${slug}.html`
  );
  if (!content) return null;
  // Strip HTML tags, return first 500 chars of text
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (!args.length || args[0] === '--help') {
  console.log('Usage: node generate-build-brief.js <client-slug> [--output ./BUILD-BRIEF.md]');
  process.exit(0);
}

const clientSlug = args[0];
const outputIdx = args.indexOf('--output');
const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : `./BUILD-BRIEF.md`;

console.log(`\n⚡ Generating build brief for: ${clientSlug}`);
console.log(`   Source: ${BRAIN_REPO}/clients/${clientSlug}`);

// 1. Pull 3d-registry
const registryRaw = ghContent(`repos/${BRAIN_REPO}/contents/clients/${clientSlug}/3d-registry.json`);
if (!registryRaw) {
  console.error(`\n❌ Client "${clientSlug}" not found in jewell-brain.`);
  console.error(`   Available clients:`);
  const clients = ghDir(`repos/${BRAIN_REPO}/contents/clients`)
    .filter(f => f.type === 'dir' && f.name !== 'README.md' && f.name !== '_template')
    .map(f => `   - ${f.name}`);
  console.error(clients.join('\n'));
  process.exit(1);
}

const registry = JSON.parse(registryRaw);
const { client: clientName, slug, tier, reference_repo: clientRepo, items = {} } = registry;

console.log(`   Client: ${clientName} | Tier: ${tier} | Repo: ${clientRepo || 'not set'}`);

// 2. Pull inputs README (may contain build notes from Ronnie)
const inputsReadme = ghContent(`repos/${BRAIN_REPO}/contents/clients/${clientSlug}/inputs/README.md`);

// 3. Try to pull discover artefacts from the client repo (if they exist)
const audienceText   = readArtefact(clientRepo, 'audience-teardown');
const segmentsText   = readArtefact(clientRepo, 'customer-segments');
const painText       = readArtefact(clientRepo, 'customer-pain-points');
const triggersText   = readArtefact(clientRepo, 'buying-triggers-barriers');
const competitorText = readArtefact(clientRepo, 'competitor-analysis');
const offerText      = readArtefact(clientRepo, 'offer-worksheet');
const gapsText       = readArtefact(clientRepo, 'market-gaps');
const diffText       = readArtefact(clientRepo, 'differentiation-opportunities');
const summaryText    = readArtefact(clientRepo, 'discover-summary');

// 4. Pull existing CLAUDE.md from client repo for house rules context
const existingClaude = clientRepo
  ? ghContent(`repos/${clientRepo}/contents/CLAUDE.md`)
  : null;

// 5. Pull active branch from client repo
let activeBranch = 'main';
if (clientRepo) {
  try {
    const repoInfo = ghGet(`repos/${clientRepo}`);
    activeBranch = repoInfo?.default_branch || 'main';
    // Try to get the most recent non-main branch
    const branches = ghGet(`repos/${clientRepo}/branches?per_page=10`);
    if (Array.isArray(branches)) {
      const claudeBranch = branches.find(b => b.name.startsWith('claude/'));
      if (claudeBranch) activeBranch = claudeBranch.name;
    }
  } catch { /* use default */ }
}

// 6. Tier label
const tierLabels = { gold: 'Gold — core scope', platinum: 'Platinum — working set', jewell: 'Jewell — full scope (house standard)' };
const tierLabel = tierLabels[tier] || tier;

// 7. Assess what's been done (which artefact groups exist)
const artefactStatus = [];
if (audienceText || segmentsText || painText) artefactStatus.push('✅ Audience & Market (Discover)');
else artefactStatus.push('⬜ Audience & Market — not yet generated');
if (competitorText || gapsText) artefactStatus.push('✅ Category & Competitors (Discover)');
else artefactStatus.push('⬜ Category & Competitors — not yet generated');
if (offerText) artefactStatus.push('✅ Offer & Commercial Diagnosis (Discover)');
else artefactStatus.push('⬜ Offer & Commercial Diagnosis — not yet generated');
if (summaryText) artefactStatus.push('✅ Discovery Output / Gate 1 summary');
else artefactStatus.push('⬜ Discovery Output — not yet generated');

const hasDiscoverData = audienceText || painText || offerText || competitorText;

// 8. Build the brief
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

const brief = `# BUILD-BRIEF.md — ${clientName}
<!-- Generated by Sam (generate-build-brief.js) from jewell-brain -->
<!-- Client: ${clientName} | Tier: ${tierLabel} | Generated: ${now} -->
<!-- Regenerate: node generate-build-brief.js ${clientSlug} -->

---

## Purpose

Drop this file into Claude Code at the start of every build session.
It gives Claude the full 3D Process context so Ronnie doesn't have to re-brief each time.
Claude reads this file, applies the house rules, and builds — no separate briefing needed.

---

## Client
| Field | Value |
|---|---|
| Name | ${clientName} |
| Slug | \`${slug}\` |
| Engagement tier | ${tierLabel} |
| GitHub repo | \`${clientRepo || `clentjewell/${slug}`}\` |
| Deploy target | Cloudflare Pages / Workers |
| Active branch | \`${activeBranch}\` |
| Brief source | \`jewell-brain/clients/${clientSlug}/3d-registry.json\` |

---

## Discover phase status
${artefactStatus.join('\n')}

${!hasDiscoverData ? `> ⚠️ No Discover artefacts generated yet. Fill in the sections below manually before briefing Claude Code, or run the Discover phase first via the Jewell Console.` : `> Discover data pulled live from \`${clientRepo}\`. Sections below reflect current artefacts.`}

---

## Audience

${audienceText
  ? `From \`audience-teardown.html\`:\n> ${audienceText.slice(0, 400)}...`
  : `**Primary persona:** [Who is the ideal customer — age, role, situation]

**Core pain:** [What keeps them up at night / what problem brings them here]

**Buying trigger:** [What event or feeling makes them search for a solution now]`}

${painText ? `\n**Top pains (from discover):**\n> ${painText.slice(0, 300)}...` : ''}

---

## Offer

${offerText
  ? `From \`offer-worksheet.html\`:\n> ${offerText.slice(0, 400)}...`
  : `**What we're selling:** [Product or service — plain description]

**Key differentiator:** [What makes this genuinely different from alternatives]

**Proof / evidence:** [Social proof, results, credentials, years in business]

**CTA:** [What we want the visitor to do — book, call, buy, enquire]`}

---

## Competitors

${competitorText
  ? `From \`competitor-analysis.html\`:\n> ${competitorText.slice(0, 400)}...`
  : `**Main competitors:** [Name 2-3 — who shows up when the customer searches]

**What they do well:** [Don't replicate — find our own angle]

**Where they're weak:** [Our opening — what they miss or do badly]`}

${gapsText ? `\n**Market gaps (from discover):**\n> ${gapsText.slice(0, 300)}...` : ''}
${diffText ? `\n**Differentiation opportunities:**\n> ${diffText.slice(0, 300)}...` : ''}

---

## What we're building

**Site / product goal:** [What must this site or feature accomplish commercially]

**One thing a visitor must feel or do:** [The single most important outcome]

**Pages / sections in scope:**
- [ ] Home
- [ ] [Add pages here]
- [ ] [Add pages here]

**What's already done:**
${artefactStatus.filter(s => s.startsWith('✅')).join('\n') || '- Nothing yet — greenfield build'}

**What's NOT in scope for this session:**
- [List anything to skip or defer]

---

## Design direction

**Tone:** [e.g. Trade-direct and knowledgeable / Warm and clinical / Bold and premium]

**Style references:** [URLs of 2-3 sites with the right feel]

**Brand assets:** \`memory/brand/\` in this repo (logos, colours, fonts)

**Colour palette:** [Primary / secondary / accent — hex values if known]

**Typography:** [Font stack if specified]

---

## House rules — apply to every file, every session

${HOUSE_RULES}

${existingClaude ? `\nFull house rules also in \`CLAUDE.md\` in this repo — read it first.` : `\nNo CLAUDE.md found yet in this repo — these rules ARE the house rules until one is added.`}

---

## What Claude Code must NOT do

- Do not send, publish, or deploy anything without Ronnie's explicit OK.
- Do not invent pricing, timelines, proof, or client facts not in this brief.
- Do not use this client's data in reusable templates or other client repos.
- Do not commit directly to \`main\` — work on the active branch above.
- Do not add dependencies without confirming with Ronnie first.
- Do not add em dashes anywhere — not in copy, comments, or commit messages.

---

## Inputs from Ronnie
${inputsReadme
  ? `\`jewell-brain/clients/${clientSlug}/inputs/README.md\`:\n\n${inputsReadme.slice(0, 800)}`
  : `No inputs file found. Ronnie: add context to \`jewell-brain/clients/${clientSlug}/inputs/README.md\` before the next session.`}

---

## Deploy checklist
See \`DEPLOY_CHECKLIST.md\` in this repo. Run through it before every Cloudflare deploy.

---

*Generated: ${now}*
*Regenerate: \`node generate-build-brief.js ${clientSlug} --output ./BUILD-BRIEF.md\`*
*Source: jewell-brain + ${clientRepo || 'client repo not set in 3d-registry'}*
`;

// 9. Write output
const resolvedOutput = path.resolve(outputPath);
fs.writeFileSync(resolvedOutput, brief, 'utf8');

console.log(`\n✅ Brief written to: ${resolvedOutput}`);
console.log(`   Artefact status:`);
artefactStatus.forEach(s => console.log(`   ${s}`));
console.log(`\n   Drop BUILD-BRIEF.md into Claude Code to start the session.\n`);
