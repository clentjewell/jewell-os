// Verification for the submission endpoint. Run with: npm test
//
// This is the only code that puts a traveller's health information on the
// network, so the cases here pin the things that would actually hurt: mail
// going somewhere it should not, a header being injected through a name, and
// the endpoint accepting junk or unbounded input.

import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequest, onRequestPost } from '../functions/api/submit.js';

const KEY = { RESEND_API_KEY: 'test-key-not-a-real-one' };
const BRIEF = '# Travel and health brief\n\nEnough characters to count as a real brief.';

const post = (body, { headers = { 'content-type': 'application/json' } } = {}) => new Request(
  'https://example.test/api/submit',
  { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) },
);

/** Run the handler with fetch stubbed, and hand back what it tried to send. */
async function send(request, env = KEY, resendStatus = 200) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init, payload: JSON.parse(init.body) });
    return new Response('{}', { status: resendStatus });
  };
  try {
    const response = await onRequestPost({ request, env });
    return { response, body: await response.json(), calls };
  } finally {
    globalThis.fetch = original;
  }
}

test('without an API key it refuses, and says what to do instead', async () => {
  const { response, body, calls } = await send(post({ brief: BRIEF }), {});
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.match(body.error, /Download a copy/);
  assert.equal(calls.length, 0, 'nothing is sent when the key is missing');
});

test('the recipient is fixed in server code and cannot be redirected', async () => {
  const { calls } = await send(post({
    brief: BRIEF,
    to: 'attacker@evil.test',
    RECIPIENT: 'attacker@evil.test',
  }));
  assert.deepEqual(calls[0].payload.to, ['clent@jewellprojects.com']);
});

test('a name carrying newlines cannot inject a mail header', async () => {
  const { calls } = await send(post({
    brief: BRIEF,
    reference: 'Ellis\r\nBcc: attacker@evil.test',
    destination: 'Spain\nX-Injected: yes',
  }));
  const { subject } = calls[0].payload;
  // The defence is that no line break survives, not that the word "Bcc" is
  // banned. A header can only be injected by a carriage return; "Bcc:" sitting
  // in a subject as ordinary text is harmless, and blocklisting words would
  // mangle legitimate names while stopping nothing.
  assert.ok(!/[\u0000-\u001F\u007F]/.test(subject), `control character survived: ${JSON.stringify(subject)}`);
  assert.match(subject, /Ellis Bcc: attacker@evil\.test/, 'the text is kept, flattened to one line');
  assert.deepEqual(calls[0].payload.to, ['clent@jewellprojects.com'], 'and the recipient is untouched');
});

test('ordinary punctuation in a name survives intact', async () => {
  const { calls } = await send(post({ brief: BRIEF, reference: "O'Brien-Smith (JP-1042) & co." }));
  assert.match(calls[0].payload.subject, /O'Brien-Smith \(JP-1042\) & co\./);
});

test('the email is plain text, never caller-supplied markup', async () => {
  const { calls } = await send(post({
    brief: '# Brief\n\n<script>alert(1)</script> and enough length to pass.',
    html: '<script>alert(1)</script>',
  }));
  const payload = calls[0].payload;
  assert.equal(payload.html, undefined, 'no html part is ever sent');
  assert.ok(payload.text.includes('<script>alert(1)</script>'), 'the brief is carried verbatim as text');
});

test('it rejects the wrong content type, unreadable bodies and empty briefs', async () => {
  const wrongType = await send(post({ brief: BRIEF }, { headers: { 'content-type': 'text/plain' } }));
  assert.equal(wrongType.response.status, 415);

  const unreadable = await send(post('not json at all'));
  assert.equal(unreadable.response.status, 400);

  const empty = await send(post({ brief: 'too short' }));
  assert.equal(empty.response.status, 400);
  assert.match(empty.body.error, /no brief to send/);

  for (const r of [wrongType, unreadable, empty]) {
    assert.equal(r.calls.length, 0, 'a rejected submission never reaches the mail provider');
  }
});

test('an oversized brief is refused rather than forwarded', async () => {
  const huge = await send(post({ brief: 'x'.repeat(40001) }));
  assert.equal(huge.response.status, 413);
  assert.equal(huge.calls.length, 0);
});

test('a provider failure is reported without leaking its message', async () => {
  const quiet = console.error;
  console.error = () => {};
  try {
    const { response, body } = await send(post({ brief: BRIEF }), KEY, 422);
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.match(body.error, /download a copy/i);
    assert.ok(!/resend|api|key/i.test(body.error), 'the provider is not named to the traveller');
  } finally {
    console.error = quiet;
  }
});

test('a good submission returns ok and carries the brief', async () => {
  const { response, body, calls } = await send(post({
    brief: BRIEF,
    reference: 'Ellis Hartnett',
    destination: 'Andalusia, Spain',
  }));
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  assert.match(calls[0].init.headers.authorization, /^Bearer /);
  assert.match(calls[0].payload.subject, /Ellis Hartnett/);
  assert.match(calls[0].payload.subject, /Andalusia, Spain/);
  assert.ok(calls[0].payload.text.includes(BRIEF), 'the brief itself is in the body');
  assert.match(calls[0].payload.text, /consent box/, 'the email records that consent was given');
});

test('anything other than POST is turned away', async () => {
  const get = await onRequest({ request: new Request('https://example.test/api/submit') });
  assert.equal(get.status, 405);
  const posted = await onRequest({ request: post({ brief: BRIEF }) });
  assert.equal(posted, undefined, 'POST falls through to the handler');
});
