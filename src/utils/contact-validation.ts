export interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  serviceType?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    serviceType: string;
    message: string;
    receivedAt: string;
  };
}

export function validateContactSubmission(body: ContactPayload): ValidationResult {
  // 1. Anti-spam honeypot defense
  if (body.honeypot && typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
    return { valid: false, error: "Spam bot submission detected" };
  }

  // 2. Name validation
  if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
    return { valid: false, error: "Valid name is required" };
  }

  // 3. Email validation
  if (
    !body.email ||
    typeof body.email !== "string" ||
    !body.email.includes("@") ||
    !body.email.includes(".") ||
    body.email.length < 5
  ) {
    return { valid: false, error: "Valid email address is required" };
  }

  // 4. Message validation
  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 5) {
    return { valid: false, error: "Message must be at least 5 characters long" };
  }

  return {
    valid: true,
    sanitized: {
      name: body.name.slice(0, 100).trim(),
      email: body.email.slice(0, 100).trim(),
      subject: (typeof body.subject === "string" ? body.subject : "General Inquiry").slice(0, 150).trim(),
      serviceType: (typeof body.serviceType === "string" ? body.serviceType : "AI Automation").slice(0, 80).trim(),
      message: body.message.slice(0, 2000).trim(),
      receivedAt: new Date().toISOString(),
    },
  };
}
