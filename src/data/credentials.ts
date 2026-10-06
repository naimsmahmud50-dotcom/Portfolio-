import { CredentialItem } from "@/types";

export const credentialsData: CredentialItem[] = [
  {
    id: "cred-assunnah-ai",
    kind: "current_learning",
    badge: "CURRENT",
    title: "AI Automation Learning Journey",
    institution: "As-Sunnah Skill Development Institute",
    statusText: "Currently Active Learning Journey",
    focusArea: "AI Automation, Intelligent Workflows & Practical Applied Systems",
    verified: true,
  },
  {
    id: "cred-arenta-ethical-hacking",
    kind: "completed_credential",
    badge: "CERTIFIED",
    title: "Ethical Hacking Course",
    institution: "Arenta Web Security",
    statusText: "Completed",
    credentialDoc: "Certificate Achieved",
    focusArea: "Web Security Fundamentals, Vulnerability Assessment & Defensive Principles",
    verified: true,
  },
  {
    id: "cred-arenta-internship",
    kind: "completed_credential",
    badge: "COMPLETED",
    title: "Corporate Internship",
    institution: "Arenta Web Security",
    statusText: "Previously Completed Internship",
    credentialDoc: "Corporate Internship Certificate Achieved",
    focusArea: "Security Practice, Corporate Workflows & Practical Implementation",
    verified: true,
  },
];
