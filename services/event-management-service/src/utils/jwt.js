import { createSignToken, createVerifyToken } from '@eventflow/shared/jwt';
import { env } from '../config/env.js';

export const verifyToken = createVerifyToken(env.JWT_SECRET);
export const signToken = createSignToken(env.JWT_SECRET, env.JWT_EXPIRES_IN);
