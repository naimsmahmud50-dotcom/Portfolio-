import { SecurityPrinciple } from "@/types";

export const securityPhilosophyData: SecurityPrinciple[] = [
  {
    title: "Server-Side Secret Isolation",
    tagline: "Zero Client Leaks",
    description: "API keys, database credentials, and external webhook secrets are strictly kept inside server runtimes.",
    points: [
      "No secrets bundled in client JavaScript bundles",
      "Environment variables parsed securely on server-side only",
      "Fail-safe defaults if credentials are unconfigured",
    ],
    icon: "KeyRound",
  },
  {
    title: "Rigorous Input Sanitization",
    tagline: "Defensive Validation",
    description: "Every payload entering the system is strictly typed, schema-validated, and sanitized before processing.",
    points: [
      "Strict schema validation on contact & form payloads",
      "Protection against XSS and parameter injection vectors",
      "Honeypot fields and rate limiting to prevent automated spam abuse",
    ],
    icon: "ShieldAlert",
  },
  {
    title: "Least Privilege & Access Control",
    tagline: "Role-Bounded Authorization",
    description: "Administrative functions and data mutations require explicit authentication boundaries.",
    points: [
      "Private administrative panels guarded against unauthorized browsing",
      "Non-public endpoints require session verification",
      "Separation between public presentation layers and back-office management",
    ],
    icon: "Lock",
  },
  {
    title: "Privacy-Conscious Analytics",
    tagline: "Respecting User Data",
    description: "Visitor analytics are aggregated and anonymized without tracking sensitive personal identities.",
    points: [
      "No selling or leaking of visitor browsing patterns",
      "Aggregate metrics only (traffic, top views, bounce rates)",
      "Transparent empty-state reporting without simulated or inflated numbers",
    ],
    icon: "EyeOff",
  },
];
