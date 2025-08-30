import { ApiError, HTTP } from '@eventflow/shared';

export function errorMiddleware(err, _req, res, _next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, details: err.details });
  }
  console.error(err);
  res.status(HTTP.INTERNAL).json({ message: 'Internal server error' });
}
