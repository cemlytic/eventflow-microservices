
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

function detectServiceFromEmail(user) {
  if (!user) return null;
  const domain = String(user.split('@')[1] || '').toLowerCase();

  if (/(gmail\.com|googlemail\.com)$/.test(domain)) return 'gmail';
  if (/(outlook\.com|hotmail\.com|live\.com|msn\.com)$/.test(domain))
    return 'hotmail';
  if (/yahoo\./.test(domain)) return 'yahoo';
  if (/yandex\./.test(domain)) return 'yandex';

  return null;
}

let transporter;

export function getTransporter() {
  if (transporter) return transporter;

  if (!env.EMAIL_ENABLED) {
    throw new Error('Email disabled (EMAIL_ENABLED=false)');
  }
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    throw new Error('EMAIL_USER/EMAIL_PASS missing');
  }

  const service = detectServiceFromEmail(env.EMAIL_USER);

  if (service) {
    transporter = nodemailer.createTransport({
      service,
      auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS },
    });
  } else {
    throw new Error(
      `Unknown email domain for ${env.EMAIL_USER}. Supported auto services: Gmail, Outlook/Hotmail, Yahoo, Yandex.`
    );
  }

  return transporter;
}

export async function sendMail(to, subject, html, text) {
  const t = getTransporter();
  return t.sendMail({ from: env.EMAIL_FROM, to, subject, html, text });
}
