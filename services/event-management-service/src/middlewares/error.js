import { ApiError, HTTP } from '@eventflow/shared';

export const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof ApiError)
    return res
      .status(err.status)
      .json({ message: err.message, details: err.details });

  if (err?.name === 'ValidationError')
    return res
      .status(HTTP.BAD_REQUEST)
      .json({ message: 'Validation error', details: err.errors });

  if (err?.code === 11000)
    return res
      .status(HTTP.CONFLICT)
      .json({ message: 'Duplicate key', details: err.keyValue });

  console.error(err);
  res.status(HTTP.INTERNAL).json({ message: 'Internal server error' });
};
