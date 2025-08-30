import express from 'express';
import subscribeRoutes from './routes/subscribe.routes.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
app.use(express.json());

app.use('/api/subscribe', subscribeRoutes);

app.use(errorMiddleware);

export default app;
