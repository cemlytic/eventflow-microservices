import { Router } from 'express';
import { asyncHandler, ROLES } from '@eventflow/shared';
import { createEvent, updateEvent } from '../controllers/events.controller.js';
import { auth, requireRoles } from '../middlewares/auth.js';
import { userLimiter } from '@eventflow/shared/rate-limit';

const router = Router();

const perUserEventLimiter = userLimiter({
  windowMs: Number(process.env.EVENT_RATE_LIMIT_WINDOW_MS || 60_000),
  max: Number(process.env.EVENT_RATE_LIMIT_MAX || 30),
});

router.post(
  '/',
  auth,
  requireRoles([ROLES.EVENT_CREATOR]),
  perUserEventLimiter,
  asyncHandler(createEvent)
);
router.put(
  '/:id',
  auth,
  requireRoles([ROLES.EVENT_CREATOR]),
  perUserEventLimiter,
  asyncHandler(updateEvent)
);

export default router;
