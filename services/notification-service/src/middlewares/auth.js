import { makeAuth } from '@eventflow/shared/auth';
import { verifyToken } from '../utils/jwt.js';

export const auth = makeAuth({ verifyToken });
