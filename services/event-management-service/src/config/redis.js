import { createClient } from 'redis';
import { env } from './env.js';

export const publisher = createClient({ url: env.REDIS_URL });
publisher.on('error', (e) => console.error('Redis error:', e));

export async function connectRedis() {
  await publisher.connect();
  console.log('Redis publisher connected');
}
