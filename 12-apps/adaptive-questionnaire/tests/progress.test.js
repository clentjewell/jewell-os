// Verification for the progress bar. Run with: npm test
//
// The bar is a promise to the traveller about how much is left. These cases
// pin the two things that would break that promise: starting at zero (which
// reads as "not started") and reaching 100 before the brief.

import assert from 'node:assert/strict';
import test from 'node:test';

import { HEAD_START, progressPercent } from '../public/assets/progress.js';
import { sections } from '../public/assets/schema.js';

const REVIEW = sections.length;

test('it starts at the head start with nothing answered, not at zero', () => {
  assert.equal(HEAD_START, 20);
  assert.equal(progressPercent({}, 0, REVIEW), 20);
});

test('every answer moves it, not only crossing into the next section', () => {
  const a = { healthPurpose: ['none'], mobility: 'none', companion: 'none' };
  const before = progressPercent(a, 0, REVIEW);
  const after = progressPercent({ ...a, destination: 'Lisbon' }, 0, REVIEW);
  assert.ok(after > before, `answering one question moved it from ${before} to ${after}`);
  const more = progressPercent({ ...a, destination: 'Lisbon', pace: 'full', interests: ['food'] }, 0, REVIEW);
  assert.ok(more > after);
});

test('a pre-filled default the traveller never touched does not count', () => {
  // Carry-forward sets intensityCeiling and sessionLength on boot. With a
  // touched set supplied, they are not progress — so the page opens at 20.
  const answers = { intensityCeiling: 5, sessionLength: '240' };
  assert.equal(progressPercent(answers, 0, REVIEW, new Set()), 20, 'untouched defaults leave it at the head start');
  assert.ok(progressPercent(answers, 0, REVIEW) > 20, 'without a touched set, every non-empty answer counts');
  const touchedOne = progressPercent({ ...answers, destination: 'Lisbon' }, 0, REVIEW, new Set(['destination']));
  assert.ok(touchedOne > 20, 'an answer the traveller gave does count');
});

test('an empty answer does not count', () => {
  const base = progressPercent({}, 0, REVIEW);
  assert.equal(progressPercent({ destination: '   ', interests: [] }, 0, REVIEW), base);
});

test('it never reaches 100 before the brief, and is exactly 100 on it', () => {
  const everything = {};
  for (const s of sections) for (const q of s.questions) everything[q.id] = q.type === 'checkbox' ? ['x'] : 'x';
  assert.equal(progressPercent(everything, 3, REVIEW), 99, 'capped at 99 while still answering');
  assert.equal(progressPercent(everything, REVIEW, REVIEW), 100);
  assert.equal(progressPercent({}, REVIEW, REVIEW), 100, 'the brief is 100 regardless');
});

test('the share is measured against what the traveller can currently see', () => {
  // An ordinary holiday with every visible question answered sits at 99; the
  // same answers are a smaller share of a complex trip's larger visible set.
  const ordinary = { healthPurpose: ['none'], mobility: 'none', companion: 'none' };
  for (const s of sections) {
    for (const q of s.questions) {
      if (!q.visibleIf || q.visibleIf(ordinary)) ordinary[q.id] ??= q.type === 'checkbox' ? ['x'] : 'x';
    }
  }
  assert.equal(progressPercent(ordinary, 3, REVIEW), 99);
  const opened = { ...ordinary, healthPurpose: ['treatment'], treatmentAtDestination: 'yes' };
  assert.ok(progressPercent(opened, 3, REVIEW) < 99, 'opening a branch reveals more to do');
});
