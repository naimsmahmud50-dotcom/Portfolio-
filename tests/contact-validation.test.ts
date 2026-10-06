import { describe, it, expect } from "vitest";
import { validateContactSubmission } from "@/utils/contact-validation";

describe("Contact Form Input & Honeypot Validation", () => {
  it("rejects honeypot bot trap submission", () => {
    const result = validateContactSubmission({
      name: "Bot Spammer",
      email: "bot@spam.com",
      message: "Buy cheap crypto",
      honeypot: "automated_fill_trap",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toContain("Spam bot");
  });

  it("rejects missing or empty name", () => {
    const result = validateContactSubmission({
      name: "   ",
      email: "test@domain.com",
      message: "Legitimate inquiry about AI agents",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toContain("name is required");
  });

  it("rejects invalid email address", () => {
    const result = validateContactSubmission({
      name: "Valid Name",
      email: "not-an-email",
      message: "Legitimate inquiry about AI agents",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toContain("Valid email");
  });

  it("rejects message that is too short", () => {
    const result = validateContactSubmission({
      name: "Valid Name",
      email: "valid@domain.com",
      message: "hi",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toContain("at least 5 characters");
  });

  it("accepts valid input and returns sanitized payload with timestamp", () => {
    const result = validateContactSubmission({
      name: "  Sarah Connor  ",
      email: "sarah@skynet-defense.org",
      subject: "  Automation Workflow  ",
      serviceType: "AI Agent Development",
      message: "We need an autonomous pipeline for system health checks.",
    });

    expect(result.valid).toBe(true);
    expect(result.sanitized?.name).toBe("Sarah Connor");
    expect(result.sanitized?.email).toBe("sarah@skynet-defense.org");
    expect(result.sanitized?.subject).toBe("Automation Workflow");
    expect(result.sanitized?.serviceType).toBe("AI Agent Development");
    expect(result.sanitized?.receivedAt).toBeTruthy();
  });
});
