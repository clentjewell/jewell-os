// The questionnaire UI.
//
// One section per step, a review step at the end. The DOM is built with
// createElement rather than innerHTML, so no answer text is ever parsed as
// markup. Nothing is sent anywhere: there is no fetch in this file, and the
// Content-Security-Policy blocks one.

import { sections, visibleQuestions } from './schema.js';
import { accommodationSpec, buildBrief, deriveProfile, toConfirm, toMarkdown } from './brief.js';

const STORE_KEY = 'jp-atq-answers-v1';
const CONSENT_KEY = 'jp-atq-save-v1';

const state = {
  step: 0,
  answers: {},
  touched: new Set(),
  errors: {},
  saving: false,
};

const root = document.getElementById('step-root');
const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const stepList = document.getElementById('step-list');
const signalsRoot = document.getElementById('signals-root');
const saveToggle = document.getElementById('save-toggle');
const reviewStep = sections.length;

/* ------------------------------------------------------------------ helpers */

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === false || value === null) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key.startsWith('data-') || key.startsWith('aria-')) node.setAttribute(key, value);
    else node[key] = value;
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

const asArray = (value) => (Array.isArray(value) ? value : []);

function setAnswer(id, value) {
  state.answers[id] = value;
  state.touched.add(id);
  delete state.errors[id];
  applyDerivedDefaults();
  persist();
}

/**
 * Carry answers forward into later questions the traveller has not touched yet.
 * This is what makes later sections feel pre-filled rather than repetitive. A
 * value the traveller has set is never overwritten.
 */
function applyDerivedDefaults() {
  const a = state.answers;
  const preset = (id, value) => {
    if (!state.touched.has(id)) a[id] = value;
  };

  const accessFromMobility = {
    stick: ['grabRails', 'showerSeat'],
    wheelchairPart: ['stepFree', 'lift', 'grabRails'],
    wheelchairFull: ['stepFree', 'lift', 'rollInShower', 'wideDoors', 'grabRails'],
    hoist: ['stepFree', 'lift', 'rollInShower', 'wideDoors', 'hoist'],
  }[a.mobility];
  if (accessFromMobility) preset('accessNeeds', accessFromMobility);

  const extras = [];
  if (asArray(a.medStorage).includes('refrigeration')) extras.push('fridge');
  if (a.heatTolerance === 'avoid' || a.heatTolerance === 'moderate') extras.push('airCon');
  if (asArray(a.conditions).includes('respiratory')) extras.push('filtration');
  if (extras.length) preset('roomExtras', extras);

  const locations = [];
  if (a.treatmentAtDestination === 'yes') locations.push('nearClinic');
  if (asArray(a.conditions).some((c) => ['cardiac', 'renal', 'cancer'].includes(c))) {
    locations.push('nearHospital');
  }
  if (locations.length) preset('locationPriorities', locations.slice(0, 3));

  const clinicalCap = deriveProfile({ ...a, intensityCeiling: undefined }).clinicalCap;
  preset('intensityCeiling', clinicalCap);
  preset('sessionLength', clinicalCap <= 2 ? '120' : '240');
  if (a.pace === 'restful') preset('perDay', '1');
  if (a.restPattern === 'daily') preset('perDay', '1');
}

/* ---------------------------------------------------------------- persistence */

function persist() {
  if (!state.saving) return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      step: state.step,
      answers: state.answers,
      touched: [...state.touched],
    }));
  } catch {
    // A full or blocked store must never break the form.
  }
}

function restore() {
  try {
    state.saving = localStorage.getItem(CONSENT_KEY) === 'yes';
    if (!state.saving) return;
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.answers = saved.answers || {};
    state.touched = new Set(saved.touched || []);
    state.step = Math.min(saved.step || 0, reviewStep);
  } catch {
    state.answers = {};
  }
}

function clearStore() {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {
    // Nothing to do.
  }
}

/* -------------------------------------------------------------------- inputs */

function fieldWrapper(q, control) {
  const describedBy = [];
  if (q.help) describedBy.push(`${q.id}-help`);
  if (state.errors[q.id]) describedBy.push(`${q.id}-error`);
  if (describedBy.length && control.setAttribute) {
    control.setAttribute('aria-describedby', describedBy.join(' '));
  }
  return el(
    'div',
    { class: `field${state.errors[q.id] ? ' field--error' : ''}`, 'data-question': q.id },
    el('div', { class: 'field__label', id: `${q.id}-label` }, q.label, q.required ? el('span', { class: 'field__required', text: ' required' }) : null),
    q.help ? el('p', { class: 'field__help', id: `${q.id}-help`, text: q.help }) : null,
    control,
    state.errors[q.id] ? el('p', { class: 'field__error', id: `${q.id}-error`, role: 'alert', text: state.errors[q.id] }) : null,
  );
}

function textControl(q) {
  const tag = q.type === 'textarea' ? 'textarea' : 'input';
  const node = el(tag, {
    class: 'input',
    id: q.id,
    'aria-labelledby': `${q.id}-label`,
    placeholder: q.placeholder || '',
    value: state.answers[q.id] ?? '',
    rows: q.type === 'textarea' ? 3 : undefined,
    type: { text: 'text', number: 'number', date: 'date' }[q.type] || undefined,
    min: q.min,
    max: q.max,
    oninput: (e) => {
      state.answers[q.id] = e.target.value;
      state.touched.add(q.id);
      delete state.errors[q.id];
      persist();
    },
    onblur: () => applyDerivedDefaults(),
  });
  if (q.type === 'textarea') node.value = state.answers[q.id] ?? '';
  return node;
}

function selectControl(q) {
  const node = el(
    'select',
    {
      class: 'input',
      id: q.id,
      'aria-labelledby': `${q.id}-label`,
      onchange: (e) => {
        setAnswer(q.id, e.target.value);
        render();
      },
    },
    el('option', { value: '', text: 'Choose one' }),
    q.options.map((o) => el('option', { value: o.v, text: o.l, selected: state.answers[q.id] === o.v })),
  );
  node.value = state.answers[q.id] ?? '';
  return node;
}

function radioControl(q) {
  return el('div', { class: 'options', role: 'radiogroup', 'aria-labelledby': `${q.id}-label` },
    q.options.map((o) => {
      const id = `${q.id}-${o.v}`;
      return el('label', { class: 'option', htmlFor: id },
        el('input', {
          type: 'radio',
          name: q.id,
          id,
          value: o.v,
          checked: state.answers[q.id] === o.v,
          onchange: () => {
            setAnswer(q.id, o.v);
            render();
          },
        }),
        el('span', { class: 'option__mark option__mark--radio', 'aria-hidden': 'true' }),
        el('span', { class: 'option__label', text: o.l }));
    }));
}

function checkboxControl(q) {
  const current = asArray(state.answers[q.id]);
  const atMax = q.max !== undefined && current.length >= q.max;
  return el('div', { class: 'options', role: 'group', 'aria-labelledby': `${q.id}-label` },
    q.options.map((o) => {
      const id = `${q.id}-${o.v}`;
      const checked = current.includes(o.v);
      const isExclusive = (q.exclusive || []).includes(o.v);
      return el('label', { class: `option${atMax && !checked ? ' option--disabled' : ''}`, htmlFor: id },
        el('input', {
          type: 'checkbox',
          name: q.id,
          id,
          value: o.v,
          checked,
          disabled: atMax && !checked,
          onchange: (e) => {
            let next;
            if (e.target.checked) {
              next = isExclusive ? [o.v] : [...current.filter((v) => !(q.exclusive || []).includes(v)), o.v];
            } else {
              next = current.filter((v) => v !== o.v);
            }
            setAnswer(q.id, next);
            render();
          },
        }),
        el('span', { class: 'option__mark', 'aria-hidden': 'true' }),
        el('span', { class: 'option__label', text: o.l }));
    }));
}

function scaleControl(q) {
  const values = [];
  for (let i = q.min; i <= q.max; i += 1) values.push(i);
  return el('div', { class: 'scale' },
    el('span', { class: 'scale__end', text: q.minLabel || String(q.min) }),
    el('div', { class: 'scale__row', role: 'radiogroup', 'aria-labelledby': `${q.id}-label` },
      values.map((v) => {
        const id = `${q.id}-${v}`;
        return el('label', { class: 'scale__item', htmlFor: id },
          el('input', {
            type: 'radio',
            name: q.id,
            id,
            value: v,
            checked: Number(state.answers[q.id]) === v,
            onchange: () => {
              setAnswer(q.id, v);
              render();
            },
          }),
          el('span', { class: 'scale__number', text: String(v) }));
      })),
    el('span', { class: 'scale__end', text: q.maxLabel || String(q.max) }));
}

const controls = {
  text: textControl,
  textarea: textControl,
  number: textControl,
  date: textControl,
  select: selectControl,
  radio: radioControl,
  checkbox: checkboxControl,
  scale: scaleControl,
};

/* ---------------------------------------------------------------- validation */

function validateStep() {
  const section = sections[state.step];
  if (!section) return true;
  state.errors = {};
  for (const q of visibleQuestions(section, state.answers)) {
    if (!q.required) continue;
    const value = state.answers[q.id];
    const empty = Array.isArray(value) ? value.length === 0 : value === undefined || value === '';
    if (empty) state.errors[q.id] = 'This one is needed before we can go on.';
  }
  return Object.keys(state.errors).length === 0;
}

/* ------------------------------------------------------------------ rendering */

function stepItem(number, title, state_) {
  return el('li', {
    class: `steps__item steps__item--${state_}`,
    'aria-current': state_ === 'current' ? 'step' : undefined,
  },
  el('span', { class: 'steps__num', text: state_ === 'done' ? '\u2713' : String(number).padStart(2, '0') }),
  el('span', { text: title }));
}

function renderProgress() {
  const total = sections.length + 1;
  const done = state.step + 1;
  progressBar.style.setProperty('--progress', `${Math.round((done / total) * 100)}%`);
  progressBar.setAttribute('aria-valuenow', String(done));
  progressBar.setAttribute('aria-valuemax', String(total));

  const stateOf = (i) => (i === state.step ? 'current' : i < state.step ? 'done' : 'ahead');
  stepList.replaceChildren(
    ...sections.map((s, i) => stepItem(i + 1, s.title, stateOf(i))),
    stepItem(total, 'Your brief', stateOf(reviewStep)),
  );

  progressLabel.textContent = state.step === reviewStep
    ? 'Your brief'
    : `Step ${state.step + 1} of ${total}`;
}

/**
 * The live panel in the rail. It shows the limits the answers have set so far,
 * so the traveller can watch the trip narrow as they go rather than meeting the
 * result cold at the end.
 */
function renderSignals() {
  const a = state.answers;
  const started = Boolean(a.mobility || a.pace || a.energy || (a.healthPurpose || []).length);
  if (!started) {
    signalsRoot.replaceChildren(el('div', { class: 'signals' },
      el('p', { class: 'signals__label', text: 'What this sets' }),
      el('p', {
        class: 'signals__note',
        text: 'As you answer, the limits your trip has to respect appear here.',
      })));
    return;
  }

  const profile = deriveProfile(a);
  const spec = accommodationSpec(a, profile);
  const flags = toConfirm(a);
  const rows = [];

  rows.push(el('div', { class: 'signals__row' },
    el('p', { class: 'signals__label', text: 'Activity ceiling' }),
    el('p', { class: 'signals__value', text: `${profile.cap} of 5` }),
    el('div', { class: 'meter', 'aria-hidden': 'true' },
      [1, 2, 3, 4, 5].map((n) => el('span', {
        class: `meter__seg${n <= profile.cap ? ' meter__seg--on' : ''}`,
      }))),
    profile.capReasons.length
      ? el('p', { class: 'signals__note', text: `Set by ${profile.capReasons[0]}.` })
      : null));

  rows.push(el('div', { class: 'signals__row' },
    el('p', { class: 'signals__label', text: 'Longest outing' }),
    el('p', { class: 'signals__value', text: `${profile.durationCap} min` })));

  if (spec.length) {
    rows.push(el('div', { class: 'signals__row' },
      el('p', { class: 'signals__label', text: 'Where you stay' }),
      el('p', { class: 'signals__value', text: String(spec.length) }),
      el('p', {
        class: 'signals__note',
        text: spec.length === 1 ? 'requirement captured' : 'requirements captured',
      })));
  }

  if (flags.length) {
    rows.push(el('div', { class: 'signals__row' },
      el('p', { class: 'signals__label', text: 'To confirm' }),
      el('p', { class: 'signals__value signals__value--flag', text: String(flags.length) }),
      el('p', { class: 'signals__note', text: 'before anything is booked' })));
  }

  signalsRoot.replaceChildren(el('div', { class: 'signals' }, rows));
}

function renderSection() {
  const section = sections[state.step];
  const questions = visibleQuestions(section, state.answers);
  const adaptive = questions.filter((q) => q.visibleIf).length;

  return el('section', { class: 'card', 'aria-labelledby': 'section-title' },
    el('div', { class: 'card__banner' }, el('img', {
      src: `./assets/img/${section.id}.webp`,
      alt: '',
      width: 640,
      height: 640,
      loading: state.step === 0 ? 'eager' : 'lazy',
    })),
    el('div', { class: 'card__body' },
    el('p', { class: 'eyebrow', text: `Section ${state.step + 1} of ${sections.length}` }),
    el('h2', { class: 'card__title', id: 'section-title', text: section.title }),
    el('p', { class: 'card__intro', text: section.intro }),
    adaptive > 0
      ? el('p', {
        class: 'card__adaptive',
        text: `${adaptive} of these ${adaptive === 1 ? 'question was' : 'questions were'} opened by your earlier answers.`,
      })
      : null,
    el('div', { class: 'fields' }, questions.map((q) => fieldWrapper(q, controls[q.type](q))))));
}

function list(items, className = 'list') {
  return el('ul', { class: className }, items.map((i) => el('li', typeof i === 'string' ? { text: i } : {}, typeof i === 'string' ? null : i)));
}

function renderBrief() {
  const brief = buildBrief(state.answers);
  const { profile, activities } = brief;

  const activityCard = (match, kind) => el('li', { class: `match match--${kind}` },
    el('p', { class: 'match__name', text: match.activity.name }),
    el('p', { class: 'match__blurb', text: match.activity.blurb }),
    el('p', { class: 'match__meta', text: `Intensity ${match.activity.intensity} of 5 · about ${match.activity.minutes} minutes` }),
    match.notes?.length ? list(match.notes, 'match__notes') : null,
    match.reasons?.length ? list(match.reasons, 'match__notes') : null);

  return el('section', { class: 'card', 'aria-labelledby': 'brief-title' },
    el('div', { class: 'card__body brief' },
    el('h2', { class: 'card__title', id: 'brief-title', text: `Brief for ${brief.reference}` }),
    el('p', { class: 'card__intro', text: `${brief.destination}. Built from your answers, in this browser.` }),
    el('p', { class: 'notice', text: 'A planning document, not clinical advice. A clinician confirms fitness to travel.' }),

    el('h3', { class: 'brief__heading', text: 'Limits your answers set' }),
    list([
      `Activity ceiling: ${profile.cap} of 5${profile.capReasons.length ? ` — set by ${profile.capReasons.join(', ')}` : ''}.`,
      `Longest single outing: ${profile.durationCap} minutes.`,
      ...brief.rhythm,
    ]),

    brief.care.length ? el('h3', { class: 'brief__heading', text: 'Care and treatment' }) : null,
    brief.care.length ? list(brief.care) : null,

    brief.accommodation.length ? el('h3', { class: 'brief__heading', text: 'Accommodation specification' }) : null,
    brief.accommodation.length
      ? el('ul', { class: 'list' }, brief.accommodation.map((s) => el('li', {},
        el('span', { text: s.text }),
        s.source === 'stated' ? null : el('span', { class: 'tag', text: s.source }))))
      : null,

    el('h3', { class: 'brief__heading', text: `Activities that fit (${activities.fits.length})` }),
    activities.fits.length
      ? el('ul', { class: 'matches' }, activities.fits.map((m) => activityCard(m, 'fit')))
      : el('p', { class: 'muted', text: 'Nothing in the catalogue clears every limit. Widen one limit, or brief a specialist operator directly.' }),

    activities.adjusted.length ? el('h3', { class: 'brief__heading', text: `Works with an adjustment (${activities.adjusted.length})` }) : null,
    activities.adjusted.length ? el('ul', { class: 'matches' }, activities.adjusted.map((m) => activityCard(m, 'adjust'))) : null,

    activities.excluded.length ? el('h3', { class: 'brief__heading', text: `Ruled out, and why (${activities.excluded.length})` }) : null,
    activities.excluded.length ? el('ul', { class: 'matches' }, activities.excluded.map((m) => activityCard(m, 'out'))) : null,

    brief.toConfirm.length ? el('h3', { class: 'brief__heading', text: 'To confirm before anything is booked' }) : null,
    brief.toConfirm.length ? list(brief.toConfirm, 'list list--flags') : null,

    el('h3', { class: 'brief__heading', text: 'Answers, itemised' }),
    el('div', { class: 'itemised' }, brief.itemised.map((group) => el('div', { class: 'itemised__group' },
      el('h4', { class: 'itemised__title', text: group.title }),
      el('dl', { class: 'itemised__list' }, group.items.flatMap((i) => [
        el('dt', { text: i.label }),
        el('dd', { text: i.value }),
      ]))))),

    el('div', { class: 'actions no-print' },
      el('button', { class: 'button', type: 'button', onclick: () => copyBrief(brief) }, 'Copy as text'),
      el('button', { class: 'button', type: 'button', onclick: () => downloadJson(brief) }, 'Download a copy'),
      el('button', { class: 'button', type: 'button', onclick: () => window.print() }, 'Print or save as PDF')),
    el('p', { class: 'muted no-print', id: 'copy-status', role: 'status' }, '')));
}

function renderNav() {
  const last = state.step === reviewStep;
  return el('div', { class: 'nav no-print' },
    el('button', {
      class: 'button button--quiet',
      type: 'button',
      disabled: state.step === 0,
      onclick: () => goToStep(state.step - 1),
    }, 'Back'),
    last
      ? el('button', {
        class: 'button button--quiet',
        type: 'button',
        onclick: startAgain,
      }, 'Start again')
      : el('button', {
        class: 'button button--primary',
        type: 'button',
        onclick: () => {
          if (!validateStep()) {
            render();
            const first = document.querySelector('.field--error input, .field--error select, .field--error textarea');
            first?.focus();
            return;
          }
          applyDerivedDefaults();
          goToStep(state.step + 1);
        },
      }, state.step === reviewStep - 1 ? 'Build my brief' : 'Next'));
}

/**
 * Change step and put the reader at the top of the new one.
 *
 * `focus()` alone is not enough: it scrolls the minimum needed to reveal the
 * element, so a section taller than the viewport gets its *bottom* brought into
 * view and the traveller lands part-way down a page they have not read. Focus
 * without scrolling for the screen reader, then scroll deliberately.
 */
function goToStep(next) {
  state.step = Math.min(Math.max(next, 0), reviewStep);
  state.errors = {};
  persist();
  render();
  root.focus({ preventScroll: true });
  root.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

function render() {
  renderProgress();
  renderSignals();
  root.replaceChildren(
    state.step === reviewStep ? renderBrief() : renderSection(),
    renderNav(),
  );
}

/* -------------------------------------------------------------------- exports */

function status(message) {
  const node = document.getElementById('copy-status');
  if (node) node.textContent = message;
}

async function copyBrief(brief) {
  const text = toMarkdown(brief);
  try {
    await navigator.clipboard.writeText(text);
    status('Copied. Paste it wherever it needs to go.');
  } catch {
    status('Copying was blocked. Use "Download a copy" instead.');
  }
}

function downloadJson(brief) {
  const payload = {
    generatedAt: brief.generatedAt,
    reference: brief.reference,
    answers: state.answers,
    brief: toMarkdown(brief),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = el('a', { href: url, download: `travel-health-brief-${brief.generatedAt.slice(0, 10)}.json` });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  status('Downloaded to this device.');
}

function startAgain() {
  if (!window.confirm('Clear every answer and start again?')) return;
  state.answers = {};
  state.touched = new Set();
  clearStore();
  goToStep(0);
}

/* ----------------------------------------------------------------------- boot */

saveToggle.addEventListener('change', (e) => {
  state.saving = e.target.checked;
  try {
    localStorage.setItem(CONSENT_KEY, state.saving ? 'yes' : 'no');
  } catch {
    // Ignore a blocked store.
  }
  if (state.saving) persist();
  else clearStore();
});

restore();
saveToggle.checked = state.saving;
applyDerivedDefaults();
render();
