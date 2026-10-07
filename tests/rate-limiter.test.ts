import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimitStore } from "@/utils/rate-limiter";

describe("Rate Limiter - Enterprise Sliding Window", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("permits initial requests up to the allowed maximum threshold", () => {
    const ip = "192.168.1.100";
    const options = { windowMs: 5000, maxRequests: 3 };

    const first = checkRateLimit(ip, options);
    expect(first.success).toBe(true);
    expect(first.remaining).toBe(2);

    const second = checkRateLimit(ip, options);
    expect(second.success).toBe(true);
    expect(second.remaining).toBe(1);

    const third = checkRateLimit(ip, options);
    expect(third.success).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks burst requests exceeding the limit with retry countdown", () => {
    const ip = "10.0.0.5";
    const options = { windowMs: 10000, maxRequests: 2 };

    checkRateLimit(ip, options);
    checkRateLimit(ip, options);

    const blocked = checkRateLimit(ip, options);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(10);
  });

  it("isolates client IPs so one IP limit does not block another", () => {
    const ipA = "172.16.0.1";
    const ipB = "172.16.0.2";
    const options = { windowMs: 10000, maxRequests: 1 };

    const resA1 = checkRateLimit(ipA, options);
    expect(resA1.success).toBe(true);

    const resA2 = checkRateLimit(ipA, options);
    expect(resA2.success).toBe(false);

    // IP B should still be permitted
    const resB1 = checkRateLimit(ipB, options);
    expect(resB1.success).toBe(true);
  });

  it("allows clearing store for individual keys or globally", () => {
    const ip = "192.168.1.50";
    const options = { windowMs: 60000, maxRequests: 1 };

    checkRateLimit(ip, options);
    expect(checkRateLimit(ip, options).success).toBe(false);

    resetRateLimitStore(ip);
    expect(checkRateLimit(ip, options).success).toBe(true);
  });
});
