// High-performance in-memory cache with TTL for 10k concurrent request handling
const cache = new Map();

const defaultTTL = parseInt(process.env.CACHE_TTL_SECONDS, 10) || 30; // 30 seconds default

export const cacheMiddleware = (durationSeconds = defaultTTL) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = `__cache__${req.originalUrl || req.url}`;
    const cachedItem = cache.get(key);

    if (cachedItem) {
      if (Date.now() < cachedItem.expiry) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("Content-Type", "application/json");
        return res.status(cachedItem.statusCode).send(cachedItem.data);
      }
      // Expired
      cache.delete(key);
    }

    // Intercept res.send / res.json to capture response
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      // Only cache successful 200 responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          data: body,
          statusCode: res.statusCode,
          expiry: Date.now() + durationSeconds * 1000,
        });
      }
      res.setHeader("X-Cache", "MISS");
      return originalSend(body);
    };

    next();
  };
};

// Invalidate cache by prefix or pattern
export const clearCache = (pattern) => {
  if (!pattern) {
    cache.clear();
    return;
  }
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
};
