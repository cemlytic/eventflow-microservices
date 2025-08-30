import { makeRedisSubscriber } from '../config/redis.js';
import { Subscription } from '../models/subscription.model.js'; 
import { notifyUsers } from '../services/notifier.js'; 
import { getEmailsForUsers } from '../services/contacts.js';
import { sendMail } from '../services/email.js';
import {
  renderEventCreated,
  renderEventUpdated,
} from '../templates/emailTemplate.js';
import { env } from '../config/env.js';

const CHANNELS = { CREATED: 'event:created', UPDATED: 'event:updated' };

async function pushRealtimeAndEmail(evt, channel) {
  const subs = await Subscription.findAll({
    where: { eventId: String(evt.id) },
    attributes: ['userId'],
    raw: true,
  });
  const userIds = subs.map((s) => s.userId);

  if (userIds.length) notifyUsers(userIds, channel, evt);
  console.log(`[notif] sent ${channel} to`, userIds);

  if (!env.EMAIL_ENABLED) return;

  const emails = await getEmailsForUsers(userIds);
  if (!emails.length) {
    console.log('[email] no contacts for', userIds.length, 'users');
    return;
  }

  const tpl =
    channel === CHANNELS.CREATED
      ? renderEventCreated(evt)
      : renderEventUpdated(evt);

  const jobs = emails.map((to) =>
    sendMail(to, tpl.subject, tpl.html, tpl.text).catch((e) => {
      console.error('[email] send fail', to, e.message);
    })
  );
  await Promise.allSettled(jobs);
  console.log(`[email] sent ${channel} to`, emails.length, 'recipients');
}

export async function startEventConsumers() {
  const sub = makeRedisSubscriber();
  await sub.connect();

  await sub.subscribe(CHANNELS.CREATED, async (raw) => {
    try {
      await pushRealtimeAndEmail(JSON.parse(raw), CHANNELS.CREATED);
    } catch (e) {
      console.error('[consumer] created error:', e);
    }
  });

  await sub.subscribe(CHANNELS.UPDATED, async (raw) => {
    try {
      await pushRealtimeAndEmail(JSON.parse(raw), CHANNELS.UPDATED);
    } catch (e) {
      console.error('[consumer] updated error:', e);
    }
  });

  console.log('[consumer] redis subscribed');
  return sub;
}
