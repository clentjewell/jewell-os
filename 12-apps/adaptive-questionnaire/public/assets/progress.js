// Progress, as a pure function of the answers.
//
// Two deliberate choices. First, it starts at 20% before anything is answered.
// People finish what they have visibly begun: a bar that starts at zero reads as
// a task not started, and one that starts part-way reads as a task under way
// (the endowed-progress effect). Second, the remaining 80% is spread across the
// questions the traveller can currently see, so every answer moves it — not
// only crossing into the next section.
//
// It is capped at 99 until the brief, so 100 means exactly one thing.

import { sections, visibleQuestions } from './schema.js';

export const HEAD_START = 20;

const answered = (value) => (Array.isArray(value)
  ? value.length > 0
  : value !== undefined && value !== null && String(value).trim() !== '');

/**
 * Percentage complete for these answers at this step.
 *
 * Visibility is judged on every answer, because branches open on pre-filled
 * defaults too. But only answers the traveller actually gave are counted as
 * progress: carry-forward defaults are a convenience, not work done, and
 * counting them would open the page above the head start.
 *
 * @param {object} answers     the traveller's answers so far
 * @param {number} step        the current step index
 * @param {number} reviewStep  the index of the brief step
 * @param {Set<string>=} touched  ids the traveller set themselves; omit to count all
 */
export function progressPercent(answers, step, reviewStep, touched) {
  if (step >= reviewStep) return 100;
  const visible = sections.flatMap((s) => visibleQuestions(s, answers));
  const counts = (q) => (!touched || touched.has(q.id)) && answered(answers[q.id]);
  const done = visible.filter(counts).length;
  const share = visible.length ? done / visible.length : 0;
  return Math.min(99, Math.round(HEAD_START + (100 - HEAD_START) * share));
}
