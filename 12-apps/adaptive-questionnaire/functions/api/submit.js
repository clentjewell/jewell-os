/**
 * POST /api/submit — deliver a completed brief to Jewell Projects by email.
 *
 * This is the only part of the questionnaire that sends anything anywhere. It
 * runs on Cloudflare Pages Functions, so the traveller's browser talks only to
 * this site's own origin; the page's Content-Security-Policy allows no other
 * destination.
 *
 * Deliberate constraints, because this endpoint is public and carries health
 * information:
 *
 * - The recipient is fixed here, in server code. Nothing in the request can
 *   redirect where the email goes, so the endpoint cannot be used to send mail
 *   to anyone else.
 * - The email is plain text assembled from validated fields. No caller-supplied
 *   HTML is ever rendered, and control characters are stripped from anything
 *   that reaches a header, so a crafted reference cannot inject one.
 * - The payload is capped. A completed brief is around 9,000 characters; the
 *   limits here leave generous room and still refuse anything absurd.
 * - The API key lives only in the Cloudflare environment. It is never sent to
 *   the browser and never appears in this repository.
 */

const RECIPIENT = 'clent@jewellprojects.com';
const MAX_BODY_BYTES = 64 * 1024;
const MAX_BRIEF_CHARS = 40000;

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
});

/** Strip control characters and clamp, so nothing reaches a mail header raw. */
const headerSafe = (value, max = 120) => String(value ?? '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, max);

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return json(503, {
      ok: false,
      error: 'Sending is not switched on for this site yet. Use "Copy as text" or '
        + '"Download a copy" and send it on by hand.',
    });
  }

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: 'That submission is too large to send.' });
  }
  if (!(request.headers.get('content-type') || '').includes('application/json')) {
    return json(415, { ok: false, error: 'Expected JSON.' });
  }

  let payload;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: 'That submission is too large to send.' });
    }
    payload = JSON.parse(text);
  } catch {
    return json(400, { ok: false, error: 'That submission could not be read.' });
  }

  const brief = typeof payload?.brief === 'string' ? payload.brief : '';
  if (brief.trim().length < 40) {
    return json(400, { ok: false, error: 'There is no brief to send yet.' });
  }
  if (brief.length > MAX_BRIEF_CHARS) {
    return json(413, { ok: false, error: 'That brief is too long to send.' });
  }

  const reference = headerSafe(payload?.reference) || 'Unnamed traveller';
  const destination = headerSafe(payload?.destination) || 'Destination not set';

  const body = [
    'A traveller has completed the adaptive travel and health questionnaire.',
    '',
    `Traveller: ${reference}`,
    `Destination: ${destination}`,
    `Submitted: ${new Date().toISOString()}`,
    '',
    'They ticked the consent box before sending. This carries health information —',
    'handle it accordingly, and do not forward it without their say-so.',
    '',
    '-'.repeat(66),
    '',
    brief,
  ].join('\n');

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.SUBMIT_FROM || 'Questionnaire <onboarding@resend.dev>',
        to: [RECIPIENT],
        subject: `Travel and health brief — ${reference} — ${destination}`,
        text: body,
      }),
    });
  } catch {
    return json(502, {
      ok: false,
      error: 'The email service could not be reached. Please download a copy and send it on.',
    });
  }

  if (!response.ok) {
    // The provider's own message can name the account or the key, so it is
    // logged for the operator rather than returned to the traveller.
    console.error('resend rejected the send', response.status, await response.text());
    return json(502, {
      ok: false,
      error: 'The email did not go through. Please download a copy and send it on.',
    });
  }

  return json(200, { ok: true });
}

/** Anything other than POST is not a submission. */
export async function onRequest({ request }) {
  if (request.method === 'POST') return undefined;
  return json(405, { ok: false, error: 'Send a POST to submit.' });
}
