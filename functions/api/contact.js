// NOTE: Actual email sending for the contact form is handled by a standalone
// Cloudflare Worker (not this Pages Function), routed at the zone level via a
// Workers Route on shahzadakram.com/api/contact*. Cloudflare Pages Functions
// do not support the `send_email` binding, so that logic can't live here.
// This stub only exists so the /api/contact path always returns something
// sane if the zone Route is ever missing or mis-configured.
export async function onRequestPost() {
  return new Response(JSON.stringify({ ok: false, error: 'Contact form is temporarily unavailable.' }), {
    status: 503,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequestGet() {
  return new Response('Method not allowed', { status: 405 });
}
