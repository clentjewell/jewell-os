// Question schema for the adaptive travel and health questionnaire.
//
// Pure data plus small predicate functions. Nothing here touches the network or
// the DOM. A question appears only when its `visibleIf` predicate returns true,
// which is what makes the form adaptive: answers open and close later branches.
//
// Every question here earns its place one of three ways: it drives a branch,
// it feeds the brief engine, or it is a booking fact a coordinator cannot do
// without. Anything that did none of those was cut or folded into a free-text
// box that already existed. Rest cadence and outings-per-day are derived from
// pace rather than asked.

/** True when a multi-select answer contains `value`. */
export const has = (a, id, value) => Array.isArray(a[id]) && a[id].includes(value);

/** True when a multi-select answer contains any of `values`. */
export const anyOf = (a, id, values) => values.some((v) => has(a, id, v));

/** True when a single-value answer equals `value`. */
export const is = (a, id, value) => a[id] === value;

/** The traveller declared at least one health reason for the trip. */
export const healthLed = (a) => anyOf(a, 'healthPurpose', [
  'recovery', 'condition', 'treatment', 'wellness', 'supporting',
]);

/** Treatment is expected at the destination. */
export const treatmentPlanned = (a) => healthLed(a) && !is(a, 'treatmentAtDestination', 'no');

/** The traveller uses a mobility aid or needs transfer support. */
export const usesAid = (a) => ['stick', 'wheelchairPart', 'wheelchairFull', 'hoist']
  .includes(a.mobility);

const yesNo = [
  { v: 'yes', l: 'Yes' },
  { v: 'no', l: 'No' },
];

const yesNoUnsure = [...yesNo, { v: 'unsure', l: 'Not sure yet' }];

export const sections = [
  {
    id: 'trip',
    title: 'Trip basics',
    intro: 'The shape of the trip. A minute or two, and it sets everything that follows.',
    questions: [
      {
        id: 'reference',
        type: 'text',
        label: 'Traveller name or reference',
        help: 'Whatever you will recognise later. Leave it blank and we will give the brief a code.',
        placeholder: 'e.g. Ellis, or JP-1042',
      },
      {
        id: 'destination',
        type: 'text',
        label: 'Where are you going?',
        required: true,
        placeholder: 'Country, region or city — or "open to suggestions"',
      },
      {
        id: 'when',
        type: 'text',
        label: 'When, and for how long?',
        placeholder: 'e.g. early November, about 12 nights',
      },
      {
        id: 'party',
        type: 'select',
        label: 'Who is travelling?',
        options: [
          { v: 'solo', l: 'Just me' },
          { v: 'twoAdults', l: 'Two adults' },
          { v: 'twoAdultsChildren', l: 'Two adults and children' },
          { v: 'moreAdults', l: 'Three or more adults' },
          { v: 'groupChildren', l: 'A larger group, including children' },
        ],
      },
      {
        id: 'companion',
        type: 'radio',
        label: 'Is anyone travelling to support you?',
        required: true,
        options: [
          { v: 'none', l: 'No — travelling independently' },
          { v: 'partner', l: 'A partner or family member' },
          { v: 'carer', l: 'A paid carer or nurse' },
          { v: 'group', l: 'Part of a supported group' },
        ],
      },
      {
        id: 'carerTasks',
        type: 'checkbox',
        label: 'What can your companion help with?',
        help: 'This changes which activities we can safely put forward.',
        visibleIf: (a) => ['partner', 'carer', 'group'].includes(a.companion),
        options: [
          { v: 'transfers', l: 'Transfers and lifting' },
          { v: 'medication', l: 'Medication and injections' },
          { v: 'navigation', l: 'Navigation and language' },
          { v: 'pacing', l: 'Watching pace and fatigue' },
          { v: 'personal', l: 'Personal care' },
        ],
      },
      {
        id: 'pace',
        type: 'radio',
        label: 'What pace suits you?',
        help: 'This sets how many outings a day we plan, and how much rest sits between them.',
        required: true,
        options: [
          { v: 'restful', l: 'Restful — one thing a day, and a rest every afternoon' },
          { v: 'balanced', l: 'Balanced — mornings out, afternoons free, a clear rest day every few days' },
          { v: 'full', l: 'Full — make the most of every day' },
        ],
      },
      {
        id: 'budgetBand',
        type: 'select',
        label: 'Total budget per person, all in',
        options: [
          { v: 'under2k', l: 'Under 2,000' },
          { v: '2to5k', l: '2,000 to 5,000' },
          { v: '5to10k', l: '5,000 to 10,000' },
          { v: 'over10k', l: 'Over 10,000' },
          { v: 'unset', l: 'Not decided yet' },
        ],
      },
    ],
  },

  {
    id: 'health',
    title: 'Health and treatment',
    intro:
      'This is the part that shapes the trip. Answer what you are comfortable answering. '
      + 'Nothing leaves this browser unless you choose to send it at the end.',
    questions: [
      {
        id: 'healthPurpose',
        type: 'checkbox',
        label: 'What part does health play in this trip?',
        required: true,
        exclusive: ['none'],
        options: [
          { v: 'recovery', l: 'Recovering from an illness, injury or operation' },
          { v: 'condition', l: 'Managing a long-term condition while away' },
          { v: 'treatment', l: 'Receiving treatment at the destination' },
          { v: 'wellness', l: 'Wellness, prevention or rehabilitation' },
          { v: 'supporting', l: 'Supporting someone else who is unwell' },
          { v: 'none', l: 'No health factor — this is an ordinary holiday' },
        ],
      },
      {
        id: 'conditions',
        type: 'checkbox',
        label: 'Which of these apply?',
        help: 'Used to set safe limits on heat, altitude, water and effort. Nothing is diagnosed here. '
          + 'Anything not listed can go in the notes at the end of this section.',
        visibleIf: healthLed,
        exclusive: ['declined'],
        options: [
          { v: 'cardiac', l: 'Heart or circulation' },
          { v: 'respiratory', l: 'Lungs or breathing' },
          { v: 'diabetes', l: 'Diabetes' },
          { v: 'musculoskeletal', l: 'Joints, bones or mobility' },
          { v: 'neurological', l: 'Neurological' },
          { v: 'cancer', l: 'Cancer, current or recent' },
          { v: 'renal', l: 'Kidney, including dialysis' },
          { v: 'immune', l: 'Reduced immunity' },
          { v: 'mentalHealth', l: 'Mental health' },
          { v: 'painFatigue', l: 'Chronic pain or fatigue' },
          { v: 'pregnancy', l: 'Pregnancy' },
          { v: 'declined', l: 'Prefer not to say' },
        ],
      },
      {
        id: 'recentSurgery',
        type: 'radio',
        label: 'Have you had surgery or a hospital stay in the last 12 weeks?',
        visibleIf: (a) => anyOf(a, 'healthPurpose', ['recovery', 'treatment', 'condition']),
        options: yesNo,
      },
      {
        id: 'clinicianSignOff',
        type: 'radio',
        label: 'Has a clinician agreed you are fit to travel?',
        help: 'We will not plan around a limit a clinician has not seen.',
        visibleIf: healthLed,
        options: [
          { v: 'yes', l: 'Yes, confirmed' },
          { v: 'pending', l: 'Asked, waiting on the answer' },
          { v: 'no', l: 'Not asked yet' },
          { v: 'na', l: 'Not needed for this trip' },
        ],
      },
      {
        id: 'treatmentAtDestination',
        type: 'radio',
        label: 'Will you need treatment or therapy while you are away?',
        visibleIf: healthLed,
        options: yesNoUnsure,
      },
      {
        id: 'treatmentTypes',
        type: 'checkbox',
        label: 'What kind of treatment?',
        visibleIf: treatmentPlanned,
        options: [
          { v: 'dialysis', l: 'Dialysis' },
          { v: 'physio', l: 'Physiotherapy or rehabilitation' },
          { v: 'oncology', l: 'Oncology care' },
          { v: 'infusion', l: 'Infusion or IV therapy' },
          { v: 'woundCare', l: 'Wound or stoma care' },
          { v: 'dental', l: 'Dental' },
          { v: 'fertility', l: 'Fertility' },
          { v: 'procedure', l: 'A planned procedure or operation' },
          { v: 'mentalHealth', l: 'Counselling or psychiatric support' },
          { v: 'complementary', l: 'Acupuncture, TCM or complementary therapy' },
          { v: 'otherTreatment', l: 'Something else' },
        ],
      },
      {
        id: 'treatmentFrequency',
        type: 'select',
        label: 'How often?',
        visibleIf: treatmentPlanned,
        options: [
          { v: 'daily', l: 'Daily' },
          { v: 'thrice', l: 'Two or three times a week' },
          { v: 'weekly', l: 'Weekly' },
          { v: 'once', l: 'Once during the trip' },
          { v: 'unsure', l: 'Not sure yet' },
        ],
      },
      {
        id: 'treatmentBooked',
        type: 'radio',
        label: 'Is the provider arranged?',
        visibleIf: treatmentPlanned,
        options: [
          { v: 'booked', l: 'Booked and confirmed' },
          { v: 'identified', l: 'Clinic identified, not yet booked' },
          { v: 'help', l: 'Not arranged — we need help finding a provider' },
        ],
      },
      {
        id: 'clinicTravelTime',
        type: 'select',
        label: 'Longest acceptable journey from where you stay to the clinic',
        visibleIf: treatmentPlanned,
        options: [
          { v: '10', l: 'Up to 10 minutes' },
          { v: '20', l: 'Up to 20 minutes' },
          { v: '30', l: 'Up to 30 minutes' },
          { v: '45', l: 'Up to 45 minutes' },
          { v: '60', l: 'An hour is workable' },
        ],
      },
      {
        id: 'mobility',
        type: 'radio',
        label: 'How do you get about?',
        required: true,
        options: [
          { v: 'none', l: 'Unaided' },
          { v: 'stick', l: 'Stick, crutches or a frame' },
          { v: 'wheelchairPart', l: 'Wheelchair or scooter for longer distances' },
          { v: 'wheelchairFull', l: 'Wheelchair full time' },
          { v: 'hoist', l: 'Hoist or full transfer assistance' },
        ],
      },
      {
        id: 'walkingDistance',
        type: 'select',
        label: 'How far can you walk comfortably in one go?',
        help: 'This is the single strongest guide to which outings will suit you.',
        visibleIf: (a) => ['none', 'stick', 'wheelchairPart'].includes(a.mobility),
        options: [
          { v: '200', l: 'Under 200 m' },
          { v: '500', l: 'About 500 m' },
          { v: '1000', l: 'About 1 km' },
          { v: '3000', l: 'Up to 3 km' },
          { v: '5000', l: 'Over 3 km' },
        ],
      },
      {
        id: 'transferSupport',
        type: 'checkbox',
        label: 'What support do you need at airports and transfers?',
        visibleIf: usesAid,
        options: [
          { v: 'assistance', l: 'Airport special assistance booked' },
          { v: 'aisleChair', l: 'Aisle chair on board' },
          { v: 'wav', l: 'Wheelchair-accessible vehicle for transfers' },
          { v: 'aidInHold', l: 'Mobility aid carried in the hold' },
          { v: 'porter', l: 'Help with luggage' },
        ],
      },
      {
        id: 'energy',
        type: 'scale',
        label: 'Energy on a typical good day',
        help: '1 is very limited. 5 is no restriction.',
        visibleIf: healthLed,
        min: 1,
        max: 5,
        minLabel: 'Very limited',
        maxLabel: 'No restriction',
      },
      {
        id: 'medStorage',
        type: 'checkbox',
        label: 'Are you travelling with medication that needs special handling?',
        visibleIf: healthLed,
        exclusive: ['plain', 'noMeds'],
        options: [
          { v: 'refrigeration', l: 'Refrigeration' },
          { v: 'controlled', l: 'Controlled drugs needing documentation' },
          { v: 'sharps', l: 'Sharps and safe disposal' },
          { v: 'oxygen', l: 'Oxygen' },
          { v: 'cpap', l: 'CPAP or ventilator' },
          { v: 'feeding', l: 'Feeding pump or supplies' },
          { v: 'plain', l: 'Medication, but nothing special' },
          { v: 'noMeds', l: 'No medication' },
        ],
      },
      {
        id: 'allergies',
        type: 'textarea',
        label: 'Allergies, intolerances, and any dietary detail not covered below',
        placeholder: 'Include severity and anything that must be within reach.',
      },
      {
        id: 'diet',
        type: 'checkbox',
        label: 'Dietary requirements',
        exclusive: ['noneDiet'],
        options: [
          { v: 'glutenFree', l: 'Gluten free' },
          { v: 'dairyFree', l: 'Dairy free' },
          { v: 'lowSalt', l: 'Low salt' },
          { v: 'diabetic', l: 'Diabetic' },
          { v: 'softDiet', l: 'Soft or pureed' },
          { v: 'halal', l: 'Halal' },
          { v: 'kosher', l: 'Kosher' },
          { v: 'vegetarian', l: 'Vegetarian' },
          { v: 'vegan', l: 'Vegan' },
          { v: 'noneDiet', l: 'None' },
        ],
      },
      {
        id: 'heatTolerance',
        type: 'radio',
        label: 'How do you cope with heat?',
        options: [
          { v: 'fine', l: 'No difficulty' },
          { v: 'moderate', l: 'Better under about 28 °C' },
          { v: 'avoid', l: 'Heat must be avoided' },
        ],
      },
      {
        id: 'altitudeAdvice',
        type: 'radio',
        label: 'Any advice about altitude?',
        visibleIf: healthLed,
        options: [
          { v: 'none', l: 'No restriction' },
          { v: 'moderate', l: 'Stay below about 2,000 m' },
          { v: 'seaLevel', l: 'Stay near sea level' },
          { v: 'unsure', l: 'Not sure — to check' },
        ],
      },
      {
        id: 'infectionRisk',
        type: 'radio',
        label: 'Have you been advised to avoid crowds or untreated water?',
        visibleIf: healthLed,
        options: yesNoUnsure,
      },
      {
        id: 'insurance',
        type: 'radio',
        label: 'Travel insurance',
        visibleIf: healthLed,
        options: [
          { v: 'declared', l: 'Arranged, with all conditions declared' },
          { v: 'undeclared', l: 'Arranged, conditions not yet declared' },
          { v: 'none', l: 'Not arranged yet' },
        ],
      },
      {
        id: 'emergencyContact',
        type: 'text',
        label: 'Emergency contact — name, relationship and phone',
        visibleIf: healthLed,
        placeholder: 'e.g. Sam Okafor, brother, +61 400 000 000',
      },
      {
        id: 'healthNotes',
        type: 'textarea',
        label: 'Anything else about your health we should know',
        help: 'A condition not listed above, a recent date that matters, the thing you would tell a good travel nurse.',
        visibleIf: healthLed,
      },
    ],
  },

  {
    id: 'stay',
    title: 'Where you stay',
    intro: 'Preferences first, then the requirements your health answers have already set.',
    questions: [
      {
        id: 'propertyType',
        type: 'checkbox',
        label: 'What sort of place suits you?',
        exclusive: ['anyProperty'],
        options: [
          { v: 'hotel', l: 'Hotel' },
          { v: 'apartment', l: 'Serviced apartment' },
          { v: 'villa', l: 'Villa or private house' },
          { v: 'resort', l: 'Resort' },
          { v: 'retreat', l: 'Medical or recovery retreat' },
          { v: 'guesthouse', l: 'Guesthouse or bed and breakfast' },
          { v: 'anyProperty', l: 'No preference' },
        ],
      },
      {
        id: 'bedConfig',
        type: 'radio',
        label: 'Sleeping arrangement',
        options: [
          { v: 'double', l: 'One double' },
          { v: 'twin', l: 'Twin beds' },
          { v: 'separate', l: 'Separate rooms' },
          { v: 'profiling', l: 'A profiling or hospital bed is needed' },
          { v: 'adjoining', l: 'Adjoining rooms for a carer' },
        ],
      },
      {
        id: 'accessNeeds',
        type: 'checkbox',
        label: 'Access requirements in the property',
        help: 'Pre-ticked from your mobility answer. Adjust freely.',
        exclusive: ['noneAccess'],
        options: [
          { v: 'stepFree', l: 'Step-free entrance and internal doors' },
          { v: 'lift', l: 'Lift, or a ground-floor room' },
          { v: 'rollInShower', l: 'Roll-in or level-access shower' },
          { v: 'showerSeat', l: 'Shower seat' },
          { v: 'grabRails', l: 'Grab rails' },
          { v: 'wideDoors', l: 'Doorways wide enough for a wheelchair' },
          { v: 'hoist', l: 'Hoist or ceiling track' },
          { v: 'bathNotShower', l: 'A bath rather than a shower' },
          { v: 'assistanceDog', l: 'An assistance dog is travelling' },
          { v: 'noneAccess', l: 'None needed' },
        ],
      },
      {
        id: 'roomExtras',
        type: 'checkbox',
        label: 'What must the room have?',
        options: [
          { v: 'fridge', l: 'Fridge for medication' },
          { v: 'airCon', l: 'Air conditioning' },
          { v: 'filtration', l: 'Air filtration or hypoallergenic bedding' },
          { v: 'kitchen', l: 'Kitchen for special diets or self-catering' },
          { v: 'quiet', l: 'Quiet, away from lifts and the road' },
          { v: 'blackout', l: 'Blackout blinds' },
          { v: 'laundry', l: 'Laundry' },
          { v: 'workspace', l: 'A desk to work at' },
          { v: 'balcony', l: 'Outdoor space of its own' },
        ],
      },
      {
        id: 'locationPriorities',
        type: 'checkbox',
        label: 'What matters most about the location?',
        help: 'Choose up to three.',
        max: 3,
        options: [
          { v: 'nearClinic', l: 'Close to the clinic' },
          { v: 'nearHospital', l: 'Close to a hospital or pharmacy' },
          { v: 'nearBeach', l: 'Close to the beach' },
          { v: 'nearTown', l: 'Close to the town centre' },
          { v: 'quietArea', l: 'Quiet or rural' },
          { v: 'nearTransport', l: 'Close to transport' },
          { v: 'nearGreen', l: 'Close to green space' },
        ],
      },
      {
        id: 'onSiteSupport',
        type: 'checkbox',
        label: 'Support on site',
        exclusive: ['noneSupport'],
        options: [
          { v: 'reception24', l: '24-hour reception' },
          { v: 'nurse', l: 'Nurse or medical staff on site' },
          { v: 'doctorOnCall', l: 'Doctor on call' },
          { v: 'accessibleTransport', l: 'Accessible transport arranged by the property' },
          { v: 'englishSpeaking', l: 'Staff who speak your language' },
          { v: 'noneSupport', l: 'None needed' },
        ],
      },
      {
        id: 'dealbreakers',
        type: 'textarea',
        label: 'Anything that would rule a property out',
        placeholder: 'e.g. no stairs to the entrance, no shared bathrooms, must be full board.',
      },
    ],
  },

  {
    id: 'activities',
    title: 'What you want to do',
    intro: 'We match this against the limits your health answers set, and show our working.',
    questions: [
      {
        id: 'interests',
        type: 'checkbox',
        label: 'What interests you?',
        required: true,
        options: [
          { v: 'culture', l: 'Culture and heritage' },
          { v: 'food', l: 'Food and drink' },
          { v: 'nature', l: 'Nature and wildlife' },
          { v: 'water', l: 'Water and beaches' },
          { v: 'wellness', l: 'Wellness and spa' },
          { v: 'walking', l: 'Gentle walking' },
          { v: 'arts', l: 'Arts and music' },
          { v: 'shopping', l: 'Markets and shopping' },
          { v: 'sport', l: 'Sport and activity' },
          { v: 'learning', l: 'Learning and workshops' },
          { v: 'faith', l: 'Faith and reflection' },
          { v: 'family', l: 'Family and children' },
        ],
      },
      {
        id: 'intensityCeiling',
        type: 'scale',
        label: 'Hardest you want any single activity to be',
        help: 'Pre-set from your health answers. You can lower it, and you can raise it up to your limit.',
        min: 1,
        max: 5,
        minLabel: 'Seated and gentle',
        maxLabel: 'Strenuous',
      },
      {
        id: 'sessionLength',
        type: 'select',
        label: 'Longest comfortable single outing',
        options: [
          { v: '60', l: 'About an hour' },
          { v: '120', l: 'Two hours' },
          { v: '180', l: 'Three hours' },
          { v: '240', l: 'Half a day' },
          { v: '480', l: 'A full day' },
        ],
      },
      {
        id: 'avoid',
        type: 'checkbox',
        label: 'What should we rule out?',
        exclusive: ['avoidNothing'],
        options: [
          { v: 'heat', l: 'The heat of the day' },
          { v: 'crowds', l: 'Crowds' },
          { v: 'altitude', l: 'Altitude' },
          { v: 'water', l: 'Open water' },
          { v: 'uneven', l: 'Uneven or unmade ground' },
          { v: 'longTransfers', l: 'Long transfers' },
          { v: 'earlyStarts', l: 'Early starts' },
          { v: 'lateNights', l: 'Late nights' },
          { v: 'loud', l: 'Loud or busy places' },
          { v: 'avoidNothing', l: 'Nothing to rule out' },
        ],
      },
      {
        id: 'treatmentDays',
        type: 'radio',
        label: 'On treatment days, what are you good for?',
        visibleIf: treatmentPlanned,
        options: [
          { v: 'nothing', l: 'Nothing else — keep the day clear' },
          { v: 'gentle', l: 'One gentle thing afterwards' },
          { v: 'normal', l: 'A normal day around the appointment' },
        ],
      },
      {
        id: 'mustDo',
        type: 'textarea',
        label: 'The one thing that would make the trip',
        help: 'Name it plainly. It goes at the top of your brief, and we plan the rest around it.',
        placeholder: 'e.g. eat somewhere memorable, once. Swim in the sea. See my sister.',
      },
    ],
  },
];

/** Every question in the schema, flattened, in order. */
export const allQuestions = sections.flatMap((s) => s.questions);

/** Look up a question by id. */
export const questionById = Object.fromEntries(allQuestions.map((q) => [q.id, q]));

/** The human label for a stored option value. */
export function labelFor(questionId, value) {
  const q = questionById[questionId];
  const option = q?.options?.find((o) => o.v === value);
  return option ? option.l : String(value);
}

/** Questions in a section that are currently visible for these answers. */
export function visibleQuestions(section, answers) {
  return section.questions.filter((q) => !q.visibleIf || q.visibleIf(answers));
}
