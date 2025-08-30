import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { startEventConsumers } from './consumers/events.consumer.js';
import { initSocket } from './config/socket.js';

const server = http.createServer(app);
initSocket(server);

server.listen(env.PORT, () => console.log(`NOTIF running on :${env.PORT}`));

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('MySQL error', error);
  }
  try {
    await startEventConsumers();
  } catch (error) {
    console.error('Redis error', error);
  }
})();
