// Turns answers into a travel brief.
//
// Three jobs: derive the limits the answers imply, filter the activity
// catalogue against those limits with a stated reason for every exclusion, and
// assemble the whole thing into a brief a human can act on. Pure functions.

import { activities, restDayFriendly } from './activities.js';
import { has, is, labelFor, questionById, sections, visibleQuestions } from './schema.js';

const MOBILITY_CAP = { stick: 3, wheelchairPart: 3, wheelchairFull: 2, hoist: 1 };
const ENERGY_CAP = { 1: 2, 2: 3, 3: 4 };
const PACE_CAP = { restful: 2, balanced: 4 };

/**
 * Work out the limits the answers imply.
 * Every limit records why it was applied, so the brief can show its working.
 */
export function deriveProfile(a) {
  const capReasons = [];
  let cap = 5;
  const limit = (value, reason) => {
    if (value < cap) {
      cap = value;
      capReasons.push(reason);
    }
  };

  if (MOBILITY_CAP[a.mobility]) {
    limit(MOBILITY_CAP[a.mobility], `mobility: ${labelFor('mobility', a.mobility).toLowerCase()}`);
  }
  if (ENERGY_CAP[a.energy]) limit(ENERGY_CAP[a.energy], `energy rated ${a.energy} of 5`);
  if (PACE_CAP[a.pace]) limit(PACE_CAP[a.pace], `a ${a.pace} pace`);
  if (is(a, 'recentSurgery', 'yes')) limit(2, 'surgery or a hospital stay in the last 12 weeks');
  if (has(a, 'conditions', 'cardiac')) limit(3, 'a heart or circulation condition');
  if (has(a, 'conditions', 'respiratory')) limit(3, 'a lung or breathing condition');
  if (has(a, 'conditions', 'painFatigue')) limit(3, 'chronic pain or fatigue');
  if (is(a, 'restPattern', 'daily')) limit(3, 'a daily rest requirement');

  const clinicalCap = cap;
  if (a.intensityCeiling && Number(a.intensityCeiling) < cap) {
    cap = Number(a.intensityCeiling);
    capReasons.push('the ceiling you set yourself');
  }

  const durationCap = Number(a.sessionLength) || (cap <= 2 ? 120 : 240);

  const avoid = Array.isArray(a.avoid) ? a.avoid : [];
  const immune = has(a, 'conditions', 'immune') || is(a, 'infectionRisk', 'yes');

  return {
    cap,
    clinicalCap,
    capReasons,
    durationCap,
    needsStepFree: ['wheelchairPart', 'wheelchairFull', 'hoist'].includes(a.mobility)
      || has(a, 'accessNeeds', 'stepFree'),
    needsSeated: cap <= 2 || is(a, 'restPattern', 'daily'),
    avoidHeat: avoid.includes('heat') || is(a, 'heatTolerance', 'avoid'),
    heatCaution: is(a, 'heatTolerance', 'moderate'),
    avoidAltitude: avoid.includes('altitude') || ['moderate', 'seaLevel'].includes(a.altitudeAdvice),
    avoidWater: avoid.includes('water'),
    waterCaution: immune || is(a, 'recentSurgery', 'yes') || has(a, 'treatmentTypes', 'woundCare'),
    avoidCrowds: avoid.includes('crowds') || immune,
    avoidUneven: avoid.includes('uneven'),
    avoidEarly: avoid.includes('earlyStarts'),
    avoidLate: avoid.includes('lateNights'),
    avoidLoud: avoid.includes('loud'),
    restCadence: a.restPattern || (cap <= 2 ? 'daily' : 'none'),
  };
}

/** Activities the treatment plan puts on the itinerary whatever the interests say. */
function clinicalPicks(a) {
  const picks = new Set();
  if (has(a, 'treatmentTypes', 'physio')) picks.add('physio');
  if (has(a, 'treatmentTypes', 'complementary')) picks.add('acupuncture');
  if (has(a, 'treatmentTypes', 'mentalHealth')) picks.add('quietReflection');
  return picks;
}

/**
 * Filter the catalogue. Returns three lists: activities that fit, activities
 * that fit with a named adjustment, and activities ruled out with the reason.
 */
export function filterActivities(a, profile) {
  const interests = Array.isArray(a.interests) ? a.interests : [];
  const clinical = clinicalPicks(a);
  const fits = [];
  const adjusted = [];
  const excluded = [];

  for (const item of activities) {
    const reasons = [];
    const notes = [];
    const required = clinical.has(item.id);
    const overlap = item.interests.filter((i) => interests.includes(i));

    if (!required && interests.length > 0 && overlap.length === 0) {
      reasons.push('outside the interests you chose');
    }
    if (item.intensity > profile.cap) {
      reasons.push(`harder than your ceiling of ${profile.cap} of 5`);
    }
    if (item.minutes > profile.durationCap) {
      reasons.push(`longer than the ${profile.durationCap} minutes you asked for`);
    }
    if (profile.needsStepFree && !item.access.stepFree) {
      reasons.push('cannot be relied on to be step-free');
    }
    if (profile.avoidHeat && item.env.heat) {
      reasons.push('exposes you to the heat of the day');
    }
    if (profile.avoidAltitude && item.env.altitude) {
      reasons.push('takes you to altitude');
    }
    if (profile.avoidWater && item.env.water) {
      reasons.push('involves open water');
    }
    if (profile.waterCaution && item.env.water && !item.env.indoor) {
      reasons.push('immersion is not advised while you are healing or immune-suppressed');
    }
    if (profile.avoidCrowds && item.env.crowds) {
      reasons.push('puts you in crowds');
    }
    if (profile.avoidUneven && item.env.uneven) {
      reasons.push('crosses uneven ground');
    }
    if (profile.avoidEarly && item.env.earlyStart) reasons.push('needs an early start');
    if (profile.avoidLate && item.env.lateNight) reasons.push('runs late');
    if (profile.avoidLoud && item.env.loud) reasons.push('is loud or busy');

    if (reasons.length > 0 && !required) {
      excluded.push({ activity: item, reasons });
      continue;
    }

    if (profile.heatCaution && item.env.heat) notes.push('book the first slot of the day, before the heat');
    if (profile.needsSeated && !item.access.seatedRest) notes.push('confirm there is somewhere to sit and rest');
    if (item.intensity === profile.cap) notes.push('at the top of your range — keep the day either side clear');
    if (item.env.water && profile.waterCaution) notes.push('clear immersion with your clinician first');
    if (required) notes.push('part of your treatment plan, so it is scheduled first');

    const score = (overlap.length * 3)
      + (required ? 10 : 0)
      + (item.access.ownPace ? 2 : 0)
      + (restDayFriendly(item) ? 1 : 0)
      + Math.max(0, 3 - (profile.cap - item.intensity));

    (notes.length === 0 ? fits : adjusted).push({ activity: item, notes, score });
  }

  const byScore = (x, y) => y.score - x.score;
  return {
    fits: fits.sort(byScore),
    adjusted: adjusted.sort(byScore),
    excluded,
  };
}

/** The accommodation specification the answers imply, in booking language. */
export function accommodationSpec(a, profile) {
  const spec = [];
  const add = (text, source) => spec.push({ text, source });

  const accessLabels = {
    stepFree: 'Step-free entrance and step-free internal doors',
    lift: 'A lift, or a room on the ground floor',
    rollInShower: 'A roll-in or level-access shower',
    showerSeat: 'A shower seat',
    grabRails: 'Grab rails in the bathroom',
    wideDoors: 'Doorways wide enough for a wheelchair, measured and confirmed',
    hoist: 'A hoist or ceiling track, or space for a hired one',
    bathNotShower: 'A bath rather than a shower',
  };
  for (const [value, text] of Object.entries(accessLabels)) {
    if (has(a, 'accessNeeds', value)) add(text, 'stated');
  }
  if (profile.needsStepFree && !has(a, 'accessNeeds', 'stepFree')) {
    add('Step-free access, confirmed in writing before booking', 'derived from mobility');
  }
  if (is(a, 'bedConfig', 'profiling')) add('A profiling bed in place on arrival', 'stated');
  if (is(a, 'bedConfig', 'adjoining')) add('Adjoining rooms so a carer is next door', 'stated');
  if (is(a, 'bedConfig', 'twin')) add('Twin beds', 'stated');
  if (is(a, 'bedConfig', 'separate')) add('Separate rooms', 'stated');

  if (has(a, 'medStorage', 'refrigeration') || has(a, 'roomExtras', 'fridge')) {
    add('A fridge in the room for medication, or 24-hour access to a staffed fridge', 'derived from medication');
  }
  if (has(a, 'medStorage', 'sharps')) add('A sharps bin in the room, and safe collection', 'derived from medication');
  if (has(a, 'medStorage', 'oxygen')) add('Oxygen delivery arranged in advance, and the property told', 'derived from medication');
  if (has(a, 'medStorage', 'cpap')) add('A power socket within reach of the bed for CPAP', 'derived from medication');
  if (has(a, 'medStorage', 'feeding')) add('Storage and clean preparation space for feeding supplies', 'derived from medication');

  const extras = {
    airCon: 'Air conditioning that works and can be controlled in the room',
    filtration: 'Air filtration or hypoallergenic bedding',
    kitchen: 'A kitchen for preparing special diets',
    quiet: 'A quiet room, away from lifts, bars and the road',
    blackout: 'Blackout blinds',
    laundry: 'Laundry',
    workspace: 'A desk to work at',
    balcony: 'Private outdoor space',
  };
  for (const [value, text] of Object.entries(extras)) {
    if (has(a, 'roomExtras', value)) add(text, 'stated');
  }
  if (profile.avoidHeat && !has(a, 'roomExtras', 'airCon')) {
    add('Air conditioning, given heat must be avoided', 'derived from heat tolerance');
  }
  if ((has(a, 'diet', 'softDiet') || (a.allergies || '').trim()) && !has(a, 'roomExtras', 'kitchen')) {
    add('Kitchen access, or a kitchen brief agreed with the property in advance', 'derived from diet');
  }

  if (a.clinicTravelTime) {
    add(`Within ${a.clinicTravelTime} minutes of the treatment provider, door to door`, 'derived from treatment');
  }
  const locations = {
    nearClinic: 'Close to the clinic',
    nearHospital: 'Close to a hospital and a pharmacy',
    nearBeach: 'Close to the beach',
    nearTown: 'Close to the town centre',
    quietArea: 'Quiet or rural',
    nearTransport: 'Close to transport',
    nearGreen: 'Close to green space',
  };
  for (const [value, text] of Object.entries(locations)) {
    if (has(a, 'locationPriorities', value)) add(text, 'stated');
  }

  const support = {
    reception24: '24-hour reception',
    nurse: 'A nurse or medical staff on site',
    doctorOnCall: 'A doctor on call',
    accessibleTransport: 'Accessible transport the property can arrange',
    englishSpeaking: 'Staff who speak your language',
  };
  for (const [value, text] of Object.entries(support)) {
    if (has(a, 'onSiteSupport', value)) add(text, 'stated');
  }
  if (is(a, 'assistanceDog', 'yes')) {
    add('An assistance dog accepted, confirmed in writing with the property', 'stated');
  }

  const propertyTypes = (Array.isArray(a.propertyType) ? a.propertyType : [])
    .filter((v) => v !== 'anyProperty')
    .map((v) => labelFor('propertyType', v));
  if (propertyTypes.length) add(`Property type: ${propertyTypes.join(', ')}`, 'stated');
  if (a.serviceLevel && a.serviceLevel !== 'anyBoard') {
    add(`Catering: ${labelFor('serviceLevel', a.serviceLevel).toLowerCase()}`, 'stated');
  }
  if (a.nightlyBudget && a.nightlyBudget !== 'unsetNight') {
    add(`Budget per night: ${labelFor('nightlyBudget', a.nightlyBudget)}`, 'stated');
  }
  if ((a.dealbreakers || '').trim()) add(`Rules a property out: ${a.dealbreakers.trim()}`, 'stated');

  return spec;
}

/** The care requirements, in the words a coordinator would use. */
export function careRequirements(a) {
  const care = [];
  const treatments = (Array.isArray(a.treatmentTypes) ? a.treatmentTypes : [])
    .map((v) => labelFor('treatmentTypes', v));
  if (treatments.length) {
    const frequency = a.treatmentFrequency ? labelFor('treatmentFrequency', a.treatmentFrequency).toLowerCase() : 'frequency to confirm';
    care.push(`Treatment at the destination: ${treatments.join(', ')} — ${frequency}.`);
  }
  if (a.treatmentBooked) care.push(`Provider status: ${labelFor('treatmentBooked', a.treatmentBooked).toLowerCase()}.`);
  if (a.treatmentDays) care.push(`On treatment days: ${labelFor('treatmentDays', a.treatmentDays).toLowerCase()}.`);

  const storage = (Array.isArray(a.medStorage) ? a.medStorage : [])
    .filter((v) => v !== 'noneStorage')
    .map((v) => labelFor('medStorage', v).toLowerCase());
  if (storage.length) care.push(`Medication handling: ${storage.join(', ')}.`);

  if ((a.allergies || '').trim()) care.push(`Allergies: ${a.allergies.trim()}`);

  const diet = (Array.isArray(a.diet) ? a.diet : [])
    .filter((v) => !['noneDiet', 'otherDiet'].includes(v))
    .map((v) => labelFor('diet', v).toLowerCase());
  if (a.dietOther) diet.push(a.dietOther.trim());
  if (diet.length) care.push(`Diet: ${diet.join(', ')}. Send to every property and restaurant in advance.`);

  const transfers = (Array.isArray(a.transferSupport) ? a.transferSupport : [])
    .map((v) => labelFor('transferSupport', v).toLowerCase());
  if (transfers.length) care.push(`Transfers: ${transfers.join(', ')}.`);

  const carer = (Array.isArray(a.carerTasks) ? a.carerTasks : [])
    .map((v) => labelFor('carerTasks', v).toLowerCase());
  if (carer.length) care.push(`Companion covers: ${carer.join(', ')}.`);

  if (a.emergencyContact) {
    care.push(`Emergency contact: ${a.emergencyContact}${a.emergencyPhone ? `, ${a.emergencyPhone}` : ''}.`);
  }
  if ((a.healthNotes || '').trim()) care.push(a.healthNotes.trim());
  return care;
}

/** What a human has to settle before this trip can be booked. */
export function toConfirm(a) {
  const flags = [];
  const flag = (text) => flags.push(text);

  const healthDeclared = (a.healthPurpose || []).some((v) => v !== 'none');
  if (is(a, 'clinicianSignOff', 'no')) flag('No clinician has confirmed fitness to travel. Nothing is booked until they have.');
  if (is(a, 'clinicianSignOff', 'pending')) flag('Fitness to travel is with a clinician and not yet returned.');
  if (healthDeclared && !a.clinicianSignOff) flag('Fitness to travel was left unanswered. Treat it as outstanding.');
  if (healthDeclared && !a.insurance) flag('Travel insurance was left unanswered. Treat it as outstanding.');
  if (is(a, 'recentSurgery', 'yes') && !is(a, 'clinicianSignOff', 'yes')) {
    flag('Recent surgery and no sign-off yet — flying and immersion both need clearing.');
  }
  if (is(a, 'insurance', 'undeclared')) flag('Conditions are not declared on the insurance. Cover may not stand.');
  if (is(a, 'insurance', 'none')) flag('No travel insurance arranged yet.');
  if (is(a, 'treatmentBooked', 'help')) flag('A treatment provider still has to be found and vetted at the destination.');
  if (is(a, 'treatmentBooked', 'identified')) flag('The clinic is identified but not booked. Confirm before the accommodation is fixed.');
  if (is(a, 'treatmentAtDestination', 'unsure')) flag('Whether treatment is needed while away is still open.');
  if (is(a, 'altitudeAdvice', 'unsure')) flag('Altitude advice is unknown. Assume sea level until it is answered.');
  if (is(a, 'infectionRisk', 'unsure')) flag('Advice on crowds and untreated water is unknown. Assume caution until it is answered.');
  if (is(a, 'medications', 'yes') && !(a.medStorage || []).length) {
    flag('Medication is travelling but the handling needs are not recorded.');
  }
  if (has(a, 'medStorage', 'controlled')) flag('Controlled drugs need a letter and, in some countries, an import permit. Check the destination rules.');
  if (a.healthPurpose?.length && !a.emergencyContact) flag('No emergency contact recorded.');
  if (is(a, 'destinationFixed', 'open')) flag('The destination is open, so this brief is a specification, not a booking.');
  return flags;
}

/** A plain-language rhythm for the week, from pace and rest answers. */
export function rhythm(a, profile) {
  const perDay = a.perDay === 'flexible' ? 'as many as the day allows' : a.perDay;
  const restLine = {
    daily: 'A clear rest every afternoon.',
    alternate: 'A full rest day every second or third day.',
    none: 'No rest days planned.',
  }[profile.restCadence] || 'Rest pattern not set.';
  const treatmentLine = has(a, 'treatmentTypes', 'dialysis')
    ? 'Dialysis days are fixed points. Everything else moves around them.'
    : null;
  return [
    `Up to ${perDay || 'one'} outing a day, each no longer than ${profile.durationCap} minutes.`,
    restLine,
    treatmentLine,
  ].filter(Boolean);
}

/** Every answered question, in order, as label and value pairs. */
export function itemisedAnswers(a) {
  return sections.map((section) => ({
    title: section.title,
    items: visibleQuestions(section, a)
      .map((q) => ({ label: q.label, value: formatAnswer(q.id, a[q.id]) }))
      .filter((item) => item.value !== ''),
  })).filter((group) => group.items.length > 0);
}

/** Render a stored answer as readable text. */
export function formatAnswer(id, value) {
  if (value === undefined || value === null || value === '') return '';
  const q = questionById[id];
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    return value.map((v) => labelFor(id, v)).join(', ');
  }
  if (q?.type === 'scale') return `${value} of ${q.max}`;
  if (q?.options) return labelFor(id, value);
  return String(value);
}

/** Assemble the whole brief. */
export function buildBrief(a) {
  const profile = deriveProfile(a);
  return {
    generatedAt: new Date().toISOString(),
    reference: a.reference || 'Unnamed traveller',
    destination: a.destination || 'Destination not set',
    profile,
    rhythm: rhythm(a, profile),
    care: careRequirements(a),
    accommodation: accommodationSpec(a, profile),
    activities: filterActivities(a, profile),
    toConfirm: toConfirm(a),
    itemised: itemisedAnswers(a),
  };
}

const bullets = (lines) => lines.map((l) => `- ${l}`).join('\n');

/** The brief as Markdown, for pasting into a document or a message. */
export function toMarkdown(brief) {
  const { profile } = brief;
  const out = [];
  out.push(`# Travel and health brief — ${brief.reference}`);
  out.push('');
  out.push(`Destination: ${brief.destination}. Prepared ${brief.generatedAt.slice(0, 10)}.`);
  out.push('');
  out.push('This is a planning document, not clinical advice. A clinician confirms fitness to travel.');
  out.push('');

  out.push('## Limits these answers set');
  out.push('');
  out.push(bullets([
    `Activity ceiling: ${profile.cap} of 5${profile.capReasons.length ? ` — set by ${profile.capReasons.join(', ')}` : ''}.`,
    `Longest single outing: ${profile.durationCap} minutes.`,
    ...brief.rhythm,
  ]));
  out.push('');

  if (brief.care.length) {
    out.push('## Care and treatment');
    out.push('');
    out.push(bullets(brief.care));
    out.push('');
  }

  if (brief.accommodation.length) {
    out.push('## Accommodation specification');
    out.push('');
    out.push(bullets(brief.accommodation.map((s) => `${s.text}${s.source === 'stated' ? '' : ` (${s.source})`}`)));
    out.push('');
  }

  out.push('## Activities that fit');
  out.push('');
  out.push(brief.activities.fits.length
    ? bullets(brief.activities.fits.map((m) => `${m.activity.name} — ${m.activity.blurb}`))
    : '- Nothing in the catalogue clears every limit. Widen a limit or brief a specialist operator.');
  out.push('');

  if (brief.activities.adjusted.length) {
    out.push('## Activities that work with an adjustment');
    out.push('');
    out.push(bullets(brief.activities.adjusted.map(
      (m) => `${m.activity.name} — ${m.notes.join('; ')}`,
    )));
    out.push('');
  }

  if (brief.activities.excluded.length) {
    out.push('## Ruled out, and why');
    out.push('');
    out.push(bullets(brief.activities.excluded.map(
      (m) => `${m.activity.name} — ${m.reasons.join('; ')}`,
    )));
    out.push('');
  }

  if (brief.toConfirm.length) {
    out.push('## To confirm before anything is booked');
    out.push('');
    out.push(bullets(brief.toConfirm));
    out.push('');
  }

  out.push('## Answers, itemised');
  out.push('');
  for (const group of brief.itemised) {
    out.push(`### ${group.title}`);
    out.push('');
    out.push(bullets(group.items.map((i) => `${i.label}: ${i.value}`)));
    out.push('');
  }

  out.push('Next: send this to whoever is booking, and close the open items above first.');
  return out.join('\n');
}
