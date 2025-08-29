import { Router } from 'express';
import { register, login, updateRole } from '../controllers/auth.controller.js';
import { auth, requireRole } from '../middlewares/auth.js';
import { asyncHandler, ROLES } from '@eventflow/shared';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.put(
  '/:id/role',
  auth,
  requireRole(ROLES.ADMIN),
  asyncHandler(updateRole)
);

export default router;
