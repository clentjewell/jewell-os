// Verification for the brief engine. Run with: npm test
//
// The engine is the part that can quietly go wrong: a limit that fails to apply
// is an activity we should not have offered. These cases pin the behaviour that
// matters clinically, not the wording.

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  accommodationSpec,
  buildBrief,
  deriveProfile,
  filterActivities,
  toConfirm,
  toMarkdown,
} from '../public/assets/brief.js';

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

test('a traveller with no health factor keeps the full range', () => {
  const profile = deriveProfile(baseline);
  assert.equal(profile.cap, 4, 'a balanced pace caps intensity at 4');
  assert.equal(profile.needsStepFree, false);
  const { fits, excluded } = filterActivities(baseline, profile);
  assert.ok(fits.length > 10, 'most of the catalogue should clear');
  assert.ok(!named(fits).includes('hillWalk'), 'intensity 4 at cap 4 carries a note, so it is not a clean fit');
  assert.ok(!excluded.some((m) => m.activity.id === 'gallery'), 'a gallery is not ruled out for a well traveller');
});

test('a full-time wheelchair user is never offered ground they cannot cross', () => {
  const answers = {
    ...baseline,
    healthPurpose: ['condition'],
    mobility: 'wheelchairFull',
    energy: 3,
  };
  const profile = deriveProfile(answers);
  assert.equal(profile.cap, 2);
  assert.equal(profile.needsStepFree, true);
  const { fits, adjusted, excluded } = filterActivities(answers, profile);
  const offered = [...named(fits), ...named(adjusted)];
  assert.ok(!offered.includes('hillWalk'));
  assert.ok(!offered.includes('oldTownWalk'), 'cobbles and steps are ruled out');
  assert.ok(!offered.includes('kayak'));
  assert.ok(offered.includes('birdHide'), 'a level boardwalk still works');
  const reason = excluded.find((m) => m.activity.id === 'oldTownWalk').reasons.join(' ');
  assert.match(reason, /step-free|ceiling/, 'every exclusion states a reason');
});

test('reduced immunity rules out crowds and open water', () => {
  const answers = {
    ...baseline,
    healthPurpose: ['condition'],
    conditions: ['immune'],
    infectionRisk: 'yes',
    energy: 4,
  };
  const profile = deriveProfile(answers);
  assert.equal(profile.avoidCrowds, true);
  assert.equal(profile.waterCaution, true);
  const offered = [...named(filterActivities(answers, profile).fits), ...named(filterActivities(answers, profile).adjusted)];
  assert.ok(!offered.includes('marketWalk'), 'a crowded market is out');
  assert.ok(!offered.includes('seaSwim'), 'open-water immersion is out');
  assert.ok(offered.includes('spa') || offered.includes('privateHeritage'));
});

test('heat that must be avoided removes every exposed activity', () => {
  const answers = { ...baseline, heatTolerance: 'avoid' };
  const profile = deriveProfile(answers);
  const { fits, adjusted } = filterActivities(answers, profile);
  const offered = [...fits, ...adjusted];
  assert.ok(offered.every((m) => !m.activity.env.heat), 'nothing exposed to heat is offered');
});

test('a clinical limit cannot be raised by the traveller, only lowered', () => {
  const answers = { ...baseline, healthPurpose: ['recovery'], recentSurgery: 'yes', intensityCeiling: 5 };
  assert.equal(deriveProfile(answers).cap, 2, 'recent surgery holds the cap at 2');
  const lowered = deriveProfile({ ...answers, intensityCeiling: 1 });
  assert.equal(lowered.cap, 1, 'the traveller can still choose to go gentler');
});

test('treatment reaches the accommodation specification', () => {
  const answers = {
    ...baseline,
    healthPurpose: ['treatment'],
    treatmentAtDestination: 'yes',
    treatmentTypes: ['dialysis'],
    treatmentFrequency: 'thrice',
    clinicTravelTime: '20',
    medications: 'yes',
    medStorage: ['refrigeration', 'sharps'],
  };
  const spec = accommodationSpec(answers, deriveProfile(answers)).map((s) => s.text).join(' | ');
  assert.match(spec, /within 20 minutes of the treatment provider/i);
  assert.match(spec, /fridge in the room/i);
  assert.match(spec, /sharps bin/i);
});

test('physiotherapy in the treatment plan is scheduled even when it is not an interest', () => {
  const answers = {
    ...baseline,
    interests: ['culture'],
    healthPurpose: ['treatment'],
    treatmentAtDestination: 'yes',
    treatmentTypes: ['physio'],
  };
  const profile = deriveProfile(answers);
  const offered = [...named(filterActivities(answers, profile).fits), ...named(filterActivities(answers, profile).adjusted)];
  assert.ok(offered.includes('physio'), 'treatment is not filtered out by interests');
});

test('open risks are raised rather than buried', () => {
  const flags = toConfirm({
    ...baseline,
    healthPurpose: ['condition'],
    clinicianSignOff: 'no',
    insurance: 'undeclared',
    treatmentAtDestination: 'yes',
    treatmentBooked: 'help',
    medStorage: ['controlled'],
  }).join(' | ');
  assert.match(flags, /fitness to travel/i);
  assert.match(flags, /conditions are not declared/i);
  assert.match(flags, /provider still has to be found/i);
  assert.match(flags, /controlled drugs/i);
});

test('the brief renders as Markdown with the sections a coordinator needs', () => {
  const markdown = toMarkdown(buildBrief({
    ...baseline,
    reference: 'Ellis',
    healthPurpose: ['recovery'],
    mobility: 'stick',
    energy: 2,
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
  assert.equal(brief.reference, 'Unnamed traveller');
  assert.ok(brief.activities.fits.length > 0);
  assert.equal(typeof toMarkdown(brief), 'string');
});

test('an unanswered safety question is treated as outstanding, not as a pass', () => {
  const flags = toConfirm({ ...baseline, healthPurpose: ['condition'] }).join(' | ');
  assert.match(flags, /fitness to travel was left unanswered/i);
  assert.match(flags, /insurance was left unanswered/i);
  const quiet = toConfirm(baseline).join(' | ');
  assert.doesNotMatch(quiet, /left unanswered/i, 'an ordinary holiday raises no clinical flags');
});
