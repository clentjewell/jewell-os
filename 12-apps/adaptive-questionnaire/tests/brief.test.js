// Verification for the brief engine. Run with: npm test
//
// The engine is the part that can quietly go wrong: a limit that fails to apply
// is an activity we should not have offered. These cases pin the behaviour that
// matters clinically, not the wording.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  accommodationSpec,
  atAGlance,
  buildBrief,
  careRequirements,
  deriveProfile,
  filterActivities,
  submissionCode,
  toConfirm,
  toMarkdown,
} from '../public/assets/brief.js';
import { allQuestions, sections, visibleQuestions } from '../public/assets/schema.js';

const baseline = {
  destination: 'Andalusia',
  pace: 'balanced',
  companion: 'none',
  healthPurpose: ['none'],
  mobility: 'none',
  interests: ['culture', 'food', 'nature', 'water', 'wellness', 'sport', 'arts', 'walking', 'learning', 'faith', 'family', 'shopping'],
  sessionLength: '480',
};

const named = (list) => list.map((m) => m.activity.id);
const offered = (answers) => {
  const profile = deriveProfile(answers);
  const { fits, adjusted } = filterActivities(answers, profile);
  return [...named(fits), ...named(adjusted)];
};

/* ------------------------------------------------------------ the schema */

test('every question either branches, feeds the engine, or is read by the UI', () => {
  // A question that does none of those is a question the traveller answers for
  // nothing. This is the guard against them creeping back in.
  const brief = readFileSync(new URL('../public/assets/brief.js', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../public/assets/app.js', import.meta.url), 'utf8');
  const schema = readFileSync(new URL('../public/assets/schema.js', import.meta.url), 'utf8');
  const consumers = brief + app;
  const idle = [];
  for (const q of allQuestions) {
    const quoted = new RegExp(`'${q.id}'`);
    const dotted = new RegExp(`\\.${q.id}\\b`);
    const consumed = quoted.test(consumers) || dotted.test(consumers);
    // Declared once as `id: '...'`; any further mention in the schema is a branch.
    const branches = (schema.match(new RegExp(`\\b${q.id}\\b`, 'g')) || []).length > 1;
    if (!consumed && !branches) idle.push(q.id);
  }
  assert.deepEqual(idle, [], `questions nobody reads: ${idle.join(', ')}`);
});

test('an ordinary holiday sees far fewer questions than a complex trip', () => {
  const count = (a) => sections.reduce((n, s) => n + visibleQuestions(s, a).length, 0);
  const ordinary = count({ healthPurpose: ['none'], mobility: 'none', companion: 'none' });
  const complex = count({
    healthPurpose: ['treatment'], treatmentAtDestination: 'yes', mobility: 'wheelchairPart', companion: 'partner',
  });
  assert.ok(ordinary <= 26, `ordinary holiday sees ${ordinary}, should be about 25`);
  assert.equal(complex, allQuestions.length, 'the most complex trip sees every question, and none is irrelevant to it');
});

/* -------------------------------------------------------------- the limits */

test('a traveller with no health factor keeps the full range', () => {
  const profile = deriveProfile(baseline);
  assert.equal(profile.cap, 4, 'a balanced pace caps intensity at 4');
  assert.equal(profile.needsStepFree, false);
  const { fits, excluded } = filterActivities(baseline, profile);
  assert.ok(fits.length > 10, 'most of the catalogue should clear');
  assert.ok(!named(fits).includes('hillWalk'), 'intensity 4 at cap 4 carries a note, so it is not a clean fit');
  assert.ok(!excluded.some((m) => m.activity.id === 'gallery'), 'a gallery is not ruled out for a well traveller');
});

test('pace settles rest cadence and outings a day, so they are not asked', () => {
  assert.deepEqual(
    ['restful', 'balanced', 'full'].map((pace) => {
      const p = deriveProfile({ ...baseline, pace });
      return [p.restCadence, p.outingsPerDay];
    }),
    [['daily', 1], ['alternate', 2], ['none', 3]],
  );
  const restful = buildBrief({ ...baseline, pace: 'restful' });
  assert.ok(restful.rhythm.some((l) => /1 outing a day/.test(l)), 'the rhythm reads the derived count');
  assert.ok(restful.rhythm.some((l) => /rest every afternoon/.test(l)), 'and the derived rest');
});

test('walking distance caps intensity, because it is the strongest single predictor', () => {
  const short = deriveProfile({ ...baseline, pace: 'full', walkingDistance: '200' });
  assert.equal(short.cap, 2);
  assert.ok(short.capReasons.some((r) => /under 200 m/.test(r)), 'and says why');
  assert.equal(short.needsSeated, true, 'somewhere to sit is required');

  // Two answers that independently justify the same ceiling are both recorded,
  // and the rail names the one that set the final value.
  const both = deriveProfile({ ...baseline, mobility: 'wheelchairPart', pace: 'restful', walkingDistance: '200' });
  assert.equal(both.cap, 2);
  assert.ok(both.capReasons.some((r) => /restful pace/.test(r)));
  assert.ok(both.capReasons.some((r) => /under 200 m/.test(r)), 'the tie is recorded, not dropped');
  assert.match(both.bindingReason, /under 200 m/, 'the binding reason is the last at the final level');
  assert.doesNotMatch(both.bindingReason, /mobility/, 'mobility only capped it at 3, so it is not the binding reason');

  const chosen = deriveProfile({ ...baseline, pace: 'full', intensityCeiling: 1 });
  assert.equal(chosen.bindingReason, 'the ceiling you set yourself');

  const medium = deriveProfile({ ...baseline, pace: 'full', walkingDistance: '500' });
  assert.equal(medium.cap, 3);

  const far = deriveProfile({ ...baseline, pace: 'full', walkingDistance: '5000' });
  assert.equal(far.cap, 5, 'a long walker keeps the full range');
});

test('a full-time wheelchair user is never offered ground they cannot cross', () => {
  const answers = { ...baseline, healthPurpose: ['condition'], mobility: 'wheelchairFull', energy: 3 };
  const profile = deriveProfile(answers);
  assert.equal(profile.cap, 2);
  assert.equal(profile.needsStepFree, true);
  const list = offered(answers);
  assert.ok(!list.includes('hillWalk'));
  assert.ok(!list.includes('oldTownWalk'), 'cobbles and steps are ruled out');
  assert.ok(!list.includes('kayak'));
  assert.ok(list.includes('birdHide'), 'a level boardwalk still works');
  const { excluded } = filterActivities(answers, profile);
  const reason = excluded.find((m) => m.activity.id === 'oldTownWalk').reasons.join(' ');
  assert.match(reason, /step-free|ceiling/, 'every exclusion states a reason');
});

test('reduced immunity rules out crowds and open water', () => {
  const answers = { ...baseline, healthPurpose: ['condition'], conditions: ['immune'], infectionRisk: 'yes', energy: 4 };
  const profile = deriveProfile(answers);
  assert.equal(profile.avoidCrowds, true);
  assert.equal(profile.waterCaution, true);
  const list = offered(answers);
  assert.ok(!list.includes('marketWalk'), 'a crowded market is out');
  assert.ok(!list.includes('seaSwim'), 'open-water immersion is out');
  assert.ok(list.includes('spa') || list.includes('privateHeritage'));
});

test('heat that must be avoided removes every exposed activity', () => {
  const answers = { ...baseline, heatTolerance: 'avoid' };
  const { fits, adjusted } = filterActivities(answers, deriveProfile(answers));
  assert.ok([...fits, ...adjusted].every((m) => !m.activity.env.heat), 'nothing exposed to heat is offered');
});

test('a clinical limit cannot be raised by the traveller, only lowered', () => {
  const answers = { ...baseline, healthPurpose: ['recovery'], recentSurgery: 'yes', intensityCeiling: 5 };
  assert.equal(deriveProfile(answers).cap, 2, 'recent surgery holds the cap at 2');
  assert.equal(deriveProfile({ ...answers, intensityCeiling: 1 }).cap, 1, 'the traveller can still choose to go gentler');
});

test('physiotherapy in the treatment plan is scheduled even when it is not an interest', () => {
  const answers = {
    ...baseline, interests: ['culture'], healthPurpose: ['treatment'], treatmentAtDestination: 'yes', treatmentTypes: ['physio'],
  };
  assert.ok(offered(answers).includes('physio'), 'treatment is not filtered out by interests');
});

/* ----------------------------------------------------------- the outputs */

test('treatment and medication reach the accommodation specification', () => {
  const answers = {
    ...baseline,
    healthPurpose: ['treatment'], treatmentAtDestination: 'yes', treatmentTypes: ['dialysis'],
    treatmentFrequency: 'thrice', clinicTravelTime: '20', medStorage: ['refrigeration', 'sharps'],
    accessNeeds: ['stepFree', 'assistanceDog'],
  };
  const spec = accommodationSpec(answers, deriveProfile(answers)).map((s) => s.text).join(' | ');
  assert.match(spec, /within 20 minutes of the treatment provider/i);
  assert.match(spec, /fridge in the room/i);
  assert.match(spec, /sharps bin/i);
  assert.match(spec, /assistance dog accepted/i, 'the dog is an access need now, not a separate question');
});

test('one medication question covers every case the old two did', () => {
  const care = (medStorage) => careRequirements({ ...baseline, healthPurpose: ['condition'], medStorage }).join(' | ');
  assert.match(care(['refrigeration']), /Medication handling: refrigeration/);
  assert.match(care(['plain']), /nothing needs special handling/);
  assert.doesNotMatch(care(['noMeds']), /[Mm]edication/, 'no medication means no line');
  const flags = toConfirm({ ...baseline, healthPurpose: ['condition'] }).join(' | ');
  assert.match(flags, /Medication handling was left unanswered/, 'silence is outstanding, not a pass');
});

test('the emergency contact is one field and the note carries the overflow', () => {
  const care = careRequirements({
    ...baseline, healthPurpose: ['condition'],
    emergencyContact: 'Sam Okafor, brother, +61 400 000 000',
    healthNotes: 'Also has a mild shellfish allergy not listed above.',
  }).join(' | ');
  assert.match(care, /Emergency contact: Sam Okafor, brother, \+61 400 000 000\./);
  assert.match(care, /shellfish allergy/);
});

test('open risks are raised rather than buried', () => {
  const flags = toConfirm({
    ...baseline, healthPurpose: ['condition'], clinicianSignOff: 'no', insurance: 'undeclared',
    treatmentAtDestination: 'yes', treatmentBooked: 'help', medStorage: ['controlled'],
  }).join(' | ');
  assert.match(flags, /fitness to travel/i);
  assert.match(flags, /conditions are not declared/i);
  assert.match(flags, /provider still has to be found/i);
  assert.match(flags, /controlled drugs/i);
});

test('an unanswered safety question is treated as outstanding, not as a pass', () => {
  const flags = toConfirm({ ...baseline, healthPurpose: ['condition'] }).join(' | ');
  assert.match(flags, /fitness to travel was left unanswered/i);
  assert.match(flags, /insurance was left unanswered/i);
  assert.deepEqual(toConfirm(baseline), [], 'an ordinary holiday raises no flags at all — not even the emergency contact');
});

test('the brief opens with the one thing and the facts a coordinator reads first', () => {
  const answers = {
    ...baseline, reference: 'Ellis', when: 'early November, 12 nights', party: 'twoAdults',
    companion: 'partner', budgetBand: '5to10k', mustDo: 'Swim in the sea.',
  };
  const glance = atAGlance(answers);
  assert.deepEqual(glance.map((g) => g.label), ['When', 'Travelling', 'Support', 'Pace', 'Budget per person']);
  assert.equal(glance.find((g) => g.label === 'Pace').value, 'Balanced', 'the pace label is trimmed to its first word');

  const markdown = toMarkdown(buildBrief(answers));
  const top = markdown.slice(0, 700);
  assert.match(top, /\*\*The one thing that would make the trip:\*\* Swim in the sea\./);
  assert.match(top, /## At a glance/);
  assert.match(top, /When: early November, 12 nights/);
  assert.ok(markdown.indexOf('At a glance') < markdown.indexOf('Limits these answers set'), 'and it comes before the detail');
});

test('a brief always carries a code, so an unnamed one is still findable', () => {
  const code = submissionCode(new Date('2026-09-08T10:15:30Z'));
  assert.match(code, /^JP-260908-[0-9A-Z]{4}$/);
  const brief = buildBrief({});
  assert.equal(brief.reference, 'Unnamed traveller');
  assert.match(brief.code, /^JP-\d{6}-[0-9A-Z]{4}$/);
  assert.ok(toMarkdown(brief).includes(brief.code));
});

test('the brief renders as Markdown with the sections a coordinator needs', () => {
  const markdown = toMarkdown(buildBrief({
    ...baseline, reference: 'Ellis', healthPurpose: ['recovery'], mobility: 'stick', energy: 2,
    allergies: 'Peanuts, anaphylaxis',
  }));
  for (const heading of [
    '# Travel and health brief — Ellis',
    '## Limits these answers set',
    '## Care and treatment',
    '## Activities that fit',
    '## Answers, itemised',
  ]) {
    assert.ok(markdown.includes(heading), `missing: ${heading}`);
  }
  assert.match(markdown, /not clinical advice/i);
  assert.ok(markdown.trimEnd().endsWith('close the open items above first.'), 'ends on Next');
});

test('an empty questionnaire still produces a brief rather than throwing', () => {
  const brief = buildBrief({});
  assert.ok(brief.activities.fits.length > 0);
  assert.equal(typeof toMarkdown(brief), 'string');
});
