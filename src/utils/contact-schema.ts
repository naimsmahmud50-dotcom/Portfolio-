import { z } from "zod";

/**
 * Strict runtime validation schema for Contact Form submissions.
 * Prevents injection, oversized payloads, malformed emails, and automated bot spam.
 */
export const contactSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string({ message: "Email is required" })
    .trim()
    .email("Please provide a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  subject: z
    .string()
    .trim()
    .max(150, "Subject cannot exceed 150 characters")
    .optional()
    .transform((val) => (val && val.length > 0 ? val : "General Inquiry")),

  serviceType: z
    .string()
    .trim()
    .max(80, "Service type cannot exceed 80 characters")
    .optional()
    .transform((val) => (val && val.length > 0 ? val : "AI Automation")),

  budget: z
    .string()
    .trim()
    .max(80, "Budget cannot exceed 80 characters")
    .optional()
    .transform((val) => (val && val.length > 0 ? val : "Flexible / To Discuss")),

  timeline: z
    .string()
    .trim()
    .max(80, "Timeline cannot exceed 80 characters")
    .optional()
    .transform((val) => (val && val.length > 0 ? val : "Flexible")),

  message: z
    .string({ message: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message cannot exceed 3000 characters"),

  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length === 0, {
      message: "Spam bot submission detected",
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactValidationResponse {
  success: boolean;
  data?: ContactFormData & { receivedAt: string };
  errors?: Record<string, string>;
  firstError?: string;
}

/**
 * Safely parses and sanitizes incoming contact submissions.
 */
export function parseContactSubmission(payload: unknown): ContactValidationResponse {
  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    const firstIssue = result.error.issues[0];
    const firstError = firstIssue ? firstIssue.message : "Validation error";

    return {
      success: false,
      errors,
      firstError,
    };
  }

  return {
    success: true,
    data: {
      ...result.data,
      receivedAt: new Date().toISOString(),
    },
  };
}
