import { ApiError, HTTP } from './index.js';
import jwt from 'jsonwebtoken';

export const createVerifyToken = (secret) => {
  if (!secret)
    throw new ApiError(
      HTTP.NOT_FOUND,
      'Secret is required. Please provide a secret'
    );
  return (token) => jwt.verify(token, secret);
};

export const createSignToken = (secret, defaultExpiresIn = '7d') => {
  if (!secret)
    throw new ApiError(
      HTTP.NOT_FOUND,
      'Secret is required. Please provide a secret'
    );
  return (payload, opts = {}) =>
    jwt.sign(payload, secret, { expiresIn: defaultExpiresIn, ...opts });
};
