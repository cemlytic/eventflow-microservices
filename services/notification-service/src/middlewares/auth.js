import { verifyToken } from '../utils/jwt.js';
import { ApiError, HTTP } from '@eventflow/shared';

export async function auth(req, _res, next) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return next(new ApiError(HTTP.UNAUTHORIZED, 'Unauthorized'));
  try {
    const payload = await verifyToken(token);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    next(new ApiError(HTTP.UNAUTHORIZED, 'Invalid token'));
  }
}
