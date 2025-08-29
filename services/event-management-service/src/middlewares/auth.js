import { verifyToken } from '../utils/jwt.js';
import { ApiError, HTTP, ROLES } from '@eventflow/shared';

export const auth = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  if (!token) return next(new ApiError(HTTP.UNAUTHORIZED, 'Unauthorized'));
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    next(new ApiError(HTTP.UNAUTHORIZED, 'Invalid token'));
  }
};

export const requireRole = (role) => (req, _res, next) => {
  const ok = req.user?.role === role || req.user?.role === ROLES.ADMIN;
  if (!ok) return next(new ApiError(HTTP.FORBIDDEN, 'Forbidden'));
  next();
};

export const requireRoles = (roles) => (req, _res, next) => {
  const ok = roles.includes(req.user?.role) || req.user?.role === ROLES.ADMIN;
  if (!ok) return next(new ApiError(HTTP.FORBIDDEN, 'Forbidden'));
  next();
};
