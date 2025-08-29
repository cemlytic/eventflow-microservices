import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signToken = (payload, opts = {}) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    ...opts,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
