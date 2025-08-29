import express from 'express';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/events.routes.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use(errorMiddleware);

export default app;
