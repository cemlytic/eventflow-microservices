import express from 'express';
import subscribeRoutes from './routes/subscribe.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());

app.use('/api/subscribe', subscribeRoutes);
app.use('/api', contactRoutes);

app.use(errorMiddleware);

export default app;
