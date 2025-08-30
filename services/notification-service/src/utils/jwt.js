import { createVerifyToken } from '@eventflow/shared/jwt';
import { env } from '../config/env.js';


export const verifyToken = createVerifyToken(env.JWT_SECRET);
