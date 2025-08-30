import { Router } from 'express';
import { asyncHandler } from '@eventflow/shared';
import { auth } from '../middlewares/auth.js';
import {
  subscribe,
  unsubscribe,
  listSubscriptions,
} from '../controllers/subscribe.controller.js';

const router = Router();

router.post('/:eventId', auth, asyncHandler(subscribe));
router.delete('/:eventId', auth, asyncHandler(unsubscribe));
router.get('/me', auth, listSubscriptions);

export default router;
