import app from './app.js';
import { env } from './config/env.js';
import { connectRedis } from './config/redis.js';
import { connectDB } from './config/db.js';

(async () => {
  await connectDB();
  await connectRedis();
  app.listen(env.PORT, () => console.log(`EMS running on :${env.PORT}`));
})();
