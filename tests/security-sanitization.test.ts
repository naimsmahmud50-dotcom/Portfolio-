import { describe, it, expect } from "vitest";
import { escapeHtml, sanitizePlainText, sanitizeOrigin } from "@/utils/sanitize";

describe("Security Sanitization Primitives (Strix XSS & Header Defense)", () => {
  describe("escapeHtml() - HTML Injection & Stored XSS Mitigation", () => {
    it("escapes classic XSS script tags and special characters", () => {
      const malicious = '<script>alert("XSS")</script>';
      const escaped = escapeHtml(malicious);
      expect(escaped).toBe("&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;");
      expect(escaped).not.toContain("<");
      expect(escaped).not.toContain(">");
    });

    it("escapes event handler injection payloads", () => {
      const payload = '<img src=x onerror=alert(document.cookie)>';
      const escaped = escapeHtml(payload);
      expect(escaped).toBe("&lt;img src&#x3D;x onerror&#x3D;alert(document.cookie)&gt;");
    });

    it("escapes single quotes, double quotes, backticks, and equals signs", () => {
      const payload = `name='admin' "test" \`template\``;
      const escaped = escapeHtml(payload);
      expect(escaped).toContain("&#39;");
      expect(escaped).toContain("&quot;");
      expect(escaped).toContain("&#x60;");
    });

    it("gracefully handles null, undefined, and non-string inputs", () => {
      expect(escapeHtml(null)).toBe("");
      expect(escapeHtml(undefined)).toBe("");
      expect(escapeHtml(12345)).toBe("12345");
      expect(escapeHtml("")).toBe("");
    });
  });

  describe("sanitizePlainText() - Control Character Stripping", () => {
    it("removes dangerous null bytes and control chars while keeping newlines", () => {
      const raw = "First line\u0000\u0007\u0008\nSecond line\twith tab";
      const sanitized = sanitizePlainText(raw);
      expect(sanitized).toBe("First line\nSecond line\twith tab");
      expect(sanitized).not.toContain("\u0000");
    });

    it("respects maxLength limits", () => {
      const longText = "A".repeat(500);
      const sanitized = sanitizePlainText(longText, 50);
      expect(sanitized.length).toBe(50);
    });
  });

  describe("sanitizeOrigin() - Header Injection & Spoofing Defense", () => {
    it("allows valid https and http origins", () => {
      expect(sanitizeOrigin("https://mahmud-portfolio.vercel.app")).toBe("https://mahmud-portfolio.vercel.app");
      expect(sanitizeOrigin("http://localhost:3000")).toBe("http://localhost:3000");
    });

    it("rejects javascript:, data:, and malformed schemes with fallback", () => {
      const fallback = "https://mahmud-portfolio.vercel.app";
      expect(sanitizeOrigin("javascript:alert(1)", fallback)).toBe(fallback);
      expect(sanitizeOrigin("data:text/html,<script>", fallback)).toBe(fallback);
      expect(sanitizeOrigin("not-a-valid-url", fallback)).toBe(fallback);
      expect(sanitizeOrigin(null, fallback)).toBe(fallback);
    });
  });
});
