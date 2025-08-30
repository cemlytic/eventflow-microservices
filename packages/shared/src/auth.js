import { ApiError, HTTP, ROLES } from './index.js';

function defaultExtractUserId(p) {
  return (
    p?.id ?? p?.userId ?? p?._id ?? p?.sub ?? p?.user?.id ?? p?.uid ?? null
  );
}

export function makeAuth({
  verifyToken,
  extractUserId = defaultExtractUserId,
  extractRole = (p) => p?.role || ROLES.USER,
} = {}) {
  if (typeof verifyToken !== 'function') {
    throw new Error('makeAuth: verifyToken is required');
  }

  return function auth(req, _res, next) {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' ');
    if (!token) return next(new ApiError(HTTP.UNAUTHORIZED, 'Unauthorized'));

    try {
      const payload = verifyToken(token);
      const id = extractUserId(payload);
      if (!id) {
        return next(new ApiError(HTTP.UNAUTHORIZED, 'Invalid token payload'));
      }
      req.user = { id: String(id), role: extractRole(payload) };
      next();
    } catch {
      next(new ApiError(HTTP.UNAUTHORIZED, 'Invalid token'));
    }
  };
}

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
