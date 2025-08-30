import { Router } from 'express';
import { asyncHandler } from '@eventflow/shared';
import { auth } from '../middlewares/auth.js';
import {
  upsertMyEmail,
  getMyEmail,
} from '../controllers/contact.controller.js';
import { userLimiter } from '@eventflow/shared/rate-limit';
import { env } from '../config/env.js'; 

const router = Router();

const lightLimiter = userLimiter({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX });

router.get('/me/email', auth, lightLimiter, asyncHandler(getMyEmail));
router.put('/me/email', auth, lightLimiter, asyncHandler(upsertMyEmail));

export default router;
