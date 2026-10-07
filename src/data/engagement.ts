export interface EngagementModel {
  id: string;
  sprintNumber: string;
  title: string;
  tagline: string;
  duration: string;
  popular?: boolean;
  badge: string;
  idealFor: string;
  deliverables: string[];
  guarantee: string;
  ctaText: string;
}

export const engagementModelsData: EngagementModel[] = [
  {
    id: "rapid-ai-mvp",
    sprintNumber: "SPRINT 01",
    title: "Rapid AI MVP & Prototype",
    tagline: "Turn your bottleneck or product concept into a working autonomous AI tool in 14 days.",
    duration: "2 Weeks Turnaround",
    badge: "FAST VALIDATION",
    idealFor: "Startups, Founders & Agencies needing fast, verified proof-of-concept AI agents.",
    deliverables: [
      "Custom LLM tool-calling agent loop (Gemini / OpenAI / Claude)",
      "Next.js 15 responsive UI with streaming completions",
      "Zod runtime schema validation & structured output guardrails",
      "Production deployment to Vercel with 100% automated test coverage",
    ],
    guarantee: "14-Day Delivery SLA • Clean Git Source Handover",
    ctaText: "Book 2-Week MVP Sprint",
  },
  {
    id: "enterprise-architecture",
    sprintNumber: "SPRINT 02",
    title: "Full-Stack Enterprise Architecture",
    tagline: "Production-grade cross-platform systems with offline persistence & defensive zero-trust infrastructure.",
    duration: "4 - 6 Weeks",
    popular: true,
    badge: "RECOMMENDED",
    idealFor: "Growing businesses, institutions & platforms needing high-performance software builds.",
    deliverables: [
      "Cross-platform Flutter mobile app with offline-first Drift SQLite sync",
      "Next.js 15 web platform with SSR, Tailwind CSS & role-based portals",
      "NestJS 12 modular REST backend with PostgreSQL & strict JWT/auth",
      "Defensive security posture (sliding-window rate limiter + secret isolation)",
    ],
    guarantee: "100% Full IP Ownership • Production CI/CD & Architecture Docs",
    ctaText: "Commission Enterprise Build",
  },
  {
    id: "fractional-architect",
    sprintNumber: "SPRINT 03",
    title: "Fractional Systems Architect Retainer",
    tagline: "Ongoing AI workflow engineering, architectural direction, security audits, and team oversight.",
    duration: "Monthly Retainer",
    badge: "STRATEGIC PARTNER",
    idealFor: "Companies needing senior engineering guidance without high full-time executive overhead.",
    deliverables: [
      "Dedicated weekly engineering advisory & architecture roadmapping",
      "Multi-agent automation pipeline design, tuning & maintenance",
      "Defensive security audits, dependency hardening & PR code reviews",
      "Priority SLA response window & direct WhatsApp VIP channel access",
    ],
    guarantee: "Cancel Anytime • Guaranteed Weekly Engineering Bandwidth",
    ctaText: "Retain Mahmud As Architect",
  },
];
