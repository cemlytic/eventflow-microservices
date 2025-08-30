import rateLimit, { ipKeyGenerator } from 'express-rate-limit';


export function createLimiter({
  windowMs = 60_000,
  max = 60,
  keyGenerator, 
  standardHeaders = true,
  legacyHeaders = false,
  message = { message: 'Too many requests, please try again later.' },
  skip = (req) => req.method === 'OPTIONS',
} = {}) {
  return rateLimit({
    windowMs,
    max,
    keyGenerator,
    standardHeaders,
    legacyHeaders,
    message,
    skip,
  });
}


export function ipLimiter(opts = {}) {
  return createLimiter({ ...opts });
}


export function userLimiter(opts = {}) {
  return createLimiter({
    ...opts,
    keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req),
  });
}


export function userRouteLimiter(opts = {}) {
  return createLimiter({
    ...opts,
    keyGenerator: (req) =>
      `${req.user?.id ?? ipKeyGenerator(req)}:${req.route?.path || req.path}`,
  });
}
