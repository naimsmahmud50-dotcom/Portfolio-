import { describe, it, expect } from "vitest";
import { parseContactSubmission, contactSchema } from "@/utils/contact-schema";

describe("Contact Schema - Runtime Zod Validation", () => {
  it("validates legitimate contact payloads and provides defaults and timestamp", () => {
    const payload = {
      name: "Tariq Hasan",
      email: "tariq@enterprise.dev",
      message: "We need an intelligent autonomous pipeline deployed for customer support.",
    };

    const result = parseContactSubmission(payload);
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Tariq Hasan");
    expect(result.data?.email).toBe("tariq@enterprise.dev");
    expect(result.data?.subject).toBe("General Inquiry");
    expect(result.data?.serviceType).toBe("AI Automation");
    expect(result.data?.receivedAt).toBeTruthy();
  });

  it("rejects honeypot bot trap attempts", () => {
    const payload = {
      name: "Bad Bot",
      email: "bot@spammer.org",
      message: "Automated SEO spam message sent to contact form.",
      honeypot: "malicious_bot_injection",
    };

    const result = parseContactSubmission(payload);
    expect(result.success).toBe(false);
    expect(result.firstError).toContain("Spam bot submission detected");
  });

  it("rejects invalid email formats", () => {
    const payload = {
      name: "Valid Name",
      email: "invalid-email-address",
      message: "Valid message describing technical requirements.",
    };

    const result = parseContactSubmission(payload);
    expect(result.success).toBe(false);
    expect(result.firstError).toContain("valid email address");
    expect(result.errors?.email).toBeTruthy();
  });

  it("rejects messages that are too short", () => {
    const payload = {
      name: "Valid Name",
      email: "user@example.com",
      message: "Short",
    };

    const result = parseContactSubmission(payload);
    expect(result.success).toBe(false);
    expect(result.firstError).toContain("at least 10 characters");
  });

  it("rejects names shorter than 2 characters", () => {
    const payload = {
      name: "A",
      email: "user@example.com",
      message: "A full detailed inquiry about system automation architecture.",
    };

    const result = parseContactSubmission(payload);
    expect(result.success).toBe(false);
    expect(result.firstError).toContain("at least 2 characters");
  });

  it("trims whitespace from string inputs safely", () => {
    const payload = {
      name: "   Dr. Evelyn Vance   ",
      email: "   evelyn@ai-lab.io   ",
      subject: "   Neural Agents   ",
      message: "   Looking for enterprise autonomous agent implementations.   ",
    };

    const parsed = contactSchema.parse(payload);
    expect(parsed.name).toBe("Dr. Evelyn Vance");
    expect(parsed.email).toBe("evelyn@ai-lab.io");
    expect(parsed.subject).toBe("Neural Agents");
    expect(parsed.message).toBe("Looking for enterprise autonomous agent implementations.");
  });
});
