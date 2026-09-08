import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

const FROM_ADDRESS = 'contact@shahzadakram.com';
const TO_ADDRESS = 'shazakram82@yahoo.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function redirect(url, status = 303) {
  return new Response(null, { status, headers: { Location: url } });
}

async function verifyTurnstile(token, secret, ip) {
  if (!secret || !token) return false;
  try {
    const body = new FormData();
    body.append('secret', secret);
    body.append('response', token);
    if (ip) body.append('remoteip', ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const isJson = (request.headers.get('accept') || '').includes('application/json');

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return isJson ? jsonResponse({ ok: false, error: 'Invalid form submission.' }, 400) : redirect('/contact?error=1');
  }

  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();
  const honeypot = (formData.get('company') || '').toString().trim();
  const turnstileToken = (formData.get('cf-turnstile-response') || '').toString();

  // Bot caught by honeypot — pretend success, do nothing.
  if (honeypot) {
    return isJson ? jsonResponse({ ok: true }) : redirect('/contact?sent=1');
  }

  if (!name || !email || !message) {
    return isJson
      ? jsonResponse({ ok: false, error: 'Please fill in name, email, and message.' }, 400)
      : redirect('/contact?error=1');
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return isJson ? jsonResponse({ ok: false, error: 'Input too long.' }, 400) : redirect('/contact?error=1');
  }

  if (!EMAIL_RE.test(email)) {
    return isJson ? jsonResponse({ ok: false, error: 'Please enter a valid email address.' }, 400) : redirect('/contact?error=1');
  }

  const captchaOk = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!captchaOk) {
    return isJson
      ? jsonResponse({ ok: false, error: 'Captcha verification failed. Please try again.' }, 400)
      : redirect('/contact?error=1');
  }

  try {
    const msg = createMimeMessage();
    msg.setSender({ name: 'shahzadakram.com contact form', addr: FROM_ADDRESS });
    msg.setRecipient(TO_ADDRESS);
    msg.setSubject(`New contact form message from ${name}`);
    msg.addMessage({
      contentType: 'text/plain',
      data: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    msg.setHeader('Reply-To', email);

    const emailMessage = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, msg.asRaw());
    await env.SEND_EMAIL.send(emailMessage);
  } catch (err) {
    return isJson
      ? jsonResponse({ ok: false, error: 'Could not send message right now. Please try again later.' }, 502)
      : redirect('/contact?error=1');
  }

  return isJson ? jsonResponse({ ok: true }) : redirect('/contact?sent=1');
}

export async function onRequestGet() {
  return new Response('Method not allowed', { status: 405 });
}
