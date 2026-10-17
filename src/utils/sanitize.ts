/**
 * Enterprise Input Sanitization & Defensive Security Primitives
 * Prevents Stored XSS, HTML Injection in Email Templates, and Header Injection.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Escapes characters with special meaning in HTML to prevent XSS / HTML Injection.
 * Safe for use in HTML email templates, server rendering, and attributes.
 */
export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) {
    return "";
  }
  const str = String(input);
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes plain text input by stripping control characters and normalizing whitespace.
 */
export function sanitizePlainText(input: unknown, maxLength = 3000): string {
  if (typeof input !== "string") {
    return "";
  }
  // Remove null bytes and dangerous control characters except standard newlines/tabs
  const cleaned = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
  return cleaned.slice(0, maxLength).trim();
}

/**
 * Validates and safely resolves an HTTP/HTTPS origin to prevent Host/Origin header injection.
 */
export function sanitizeOrigin(originHeader: string | null, fallback = "https://mahmud-portfolio.vercel.app"): string {
  if (!originHeader) return fallback;
  try {
    const parsed = new URL(originHeader);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.origin;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
