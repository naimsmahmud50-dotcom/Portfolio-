import { describe, it, expect } from "vitest";
import nextConfig from "../next.config";

describe("Next.js Enterprise Security Headers", () => {
  it("configures strict HTTP security headers for all routes", async () => {
    expect(nextConfig.headers).toBeDefined();
    if (!nextConfig.headers) return;

    const headersConfig = await nextConfig.headers();
    expect(headersConfig.length).toBeGreaterThanOrEqual(1);

    const rootRoute = headersConfig.find((entry) => entry.source === "/:path*");
    expect(rootRoute).toBeDefined();

    const headerMap = new Map(
      rootRoute?.headers.map((h: { key: string; value: string }) => [h.key, h.value])
    );

    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headerMap.get("Strict-Transport-Security")).toContain("max-age=63072000");
    expect(headerMap.get("X-DNS-Prefetch-Control")).toBe("on");
    expect(headerMap.get("Permissions-Policy")).toContain("camera=()");
  });
});
