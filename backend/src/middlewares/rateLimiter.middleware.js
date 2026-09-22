import rateLimit from "express-rate-limit";

// Configured for high-throughput concurrency without blocking legitimate traffic
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 10000, // Up to 10,000 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    statusCode: 429,
    success: false,
    message: "Too many requests from this IP, please try again after a minute.",
  },
});

// Stricter limiter for heavy resource upload actions
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 uploads per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    statusCode: 429,
    success: false,
    message: "Upload rate limit exceeded, please try again later.",
  },
});
