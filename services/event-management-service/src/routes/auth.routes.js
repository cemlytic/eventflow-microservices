import { Router } from 'express';
import { register, login, updateRole } from '../controllers/auth.controller.js';
import { auth, requireRole } from '../middlewares/auth.js';
import { asyncHandler, ROLES } from '@eventflow/shared';
import { ipLimiter } from '@eventflow/shared/rate-limit';

const router = Router();

const authLimiter = ipLimiter({
  windowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.AUTH_RATE_LIMIT_MAX),
});

router.post('/register', authLimiter, asyncHandler(register));
router.post('/login', authLimiter, asyncHandler(login));
router.put(
  '/:id/role',
  auth,
  requireRole(ROLES.ADMIN),
  asyncHandler(updateRole)
);

export default router;
