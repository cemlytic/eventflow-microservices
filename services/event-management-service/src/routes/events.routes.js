import { Router } from 'express';
import { asyncHandler, ROLES } from '@eventflow/shared';
import { createEvent, updateEvent } from '../controllers/events.controller.js';
import { auth, requireRoles } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/',
  auth,
  requireRoles([ROLES.EVENT_CREATOR]),
  asyncHandler(createEvent)
);
router.put(
  '/:id',
  auth,
  requireRoles([ROLES.EVENT_CREATOR]),
  asyncHandler(updateEvent)
);

export default router;
