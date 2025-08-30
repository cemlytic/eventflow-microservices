import { makeRedisSubscriber } from '../config/redis.js';
import { Subscription } from '../models/subscription.model.js';
import { notifyUsers } from '../services/notifier.js';

const CHANNELS = { CREATED: 'event:created', UPDATED: 'event:updated' };

export async function startEventConsumers() {
  const sub = makeRedisSubscriber();
  await sub.connect();

  await sub.subscribe(CHANNELS.CREATED, async (raw) => {
    try {
      const event = JSON.parse(raw);
      const subs = await Subscription.findAll({
        where: { eventId: String(event.id) },
        attributes: ['userId'],
      });
      const uids = subs.map((s) => s.userId);
      notifyUsers(uids, CHANNELS.CREATED, event);
      console.log(`[notif] sent ${CHANNELS.CREATED} to`, uids);
    } catch (error) {
      console.error('[consumer] created error', error);
    }
  });

  await sub.subscribe(CHANNELS.UPDATED, async (raw) => {
    try {
      const event = JSON.parse(raw);
      const subs = await Subscription.findAll({
        where: { eventId: String(event.id) },
        attributes: ['userId'],
      });
      const uids = subs.map((s) => s.userId);
      notifyUsers(uids, CHANNELS.UPDATED, event);
      console.log(`[notif] sent ${CHANNELS.UPDATED} to`, uids);
    } catch (e) {
      console.error('[consumer] updated error:', e);
    }
  });

  console.log('[consumer] redis subscribed');
  return sub;
}
