export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSeconds: number;
}

interface ClientRecord {
  timestamps: number[];
  lastSeen: number;
}

// In-memory sliding window store
const rateLimitStore = new Map<string, ClientRecord>();

// Max number of distinct IP tracks before LRU sweep to prevent memory leak
const MAX_STORE_SIZE = 5000;

function cleanupOldRecords(now: number, maxWindow: number): void {
  for (const [key, record] of rateLimitStore.entries()) {
    if (now - record.lastSeen > maxWindow) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Enterprise sliding-window rate limiter for serverless route handlers.
 * Throttles burst submissions per client identifier (IP / Fingerprint).
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? 10 * 60 * 1000; // 10 minutes default
  const maxRequests = options.maxRequests ?? 5; // 5 requests per window default
  const now = Date.now();

  // Periodic memory eviction if store grows large
  if (rateLimitStore.size > MAX_STORE_SIZE) {
    cleanupOldRecords(now, windowMs);
  }

  let record = rateLimitStore.get(identifier);

  if (!record) {
    record = { timestamps: [], lastSeen: now };
    rateLimitStore.set(identifier, record);
  }

  // Remove timestamps outside current sliding window
  const windowStart = now - windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);
  record.lastSeen = now;

  // Check if current count is at or exceeds threshold
  if (record.timestamps.length >= maxRequests) {
    const earliestTimestamp = record.timestamps[0] || now;
    const resetMs = Math.max(0, earliestTimestamp + windowMs - now);
    const retryAfterSeconds = Math.max(1, Math.ceil(resetMs / 1000));

    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetMs,
      retryAfterSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  const remaining = Math.max(0, maxRequests - record.timestamps.length);

  return {
    success: true,
    limit: maxRequests,
    remaining,
    resetMs: windowMs,
    retryAfterSeconds: 0,
  };
}

/**
 * Resets the in-memory rate limiter cache. Primarily for testing.
 */
export function resetRateLimitStore(identifier?: string): void {
  if (identifier) {
    rateLimitStore.delete(identifier);
  } else {
    rateLimitStore.clear();
  }
}
