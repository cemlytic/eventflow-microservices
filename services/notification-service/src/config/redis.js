import { createClient } from 'redis';
import { env } from './env.js';

export function makeRedisSubscriber() {
  const client = createClient({ url: env.REDIS_URL });
  client.on('error', (e) => console.error('[redis] error:', e));
  return client;
}
