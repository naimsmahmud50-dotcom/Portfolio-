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
    id: "web-development-sprint",
    sprintNumber: "SPRINT 01",
    title: "Modern Website & Web App Development",
    tagline: "High-performance, responsive websites and full-stack web applications built with clean code and modern UX.",
    duration: "1 - 2 Weeks Turnaround",
    badge: "FAST DELIVERY",
    idealFor: "Businesses, startups, and founders needing high-converting websites, SaaS portals, or custom web apps.",
    deliverables: [
      "Modern Next.js 15 & React responsive web architecture with custom Tailwind CSS styling",
      "Full-stack capabilities: Authentication, database persistence, REST APIs & contact forms",
      "100% mobile-friendly responsive design, SEO optimization, and 95+ Core Web Vitals score",
      "Production deployment (Vercel / Cloud) with clean modular Git source handover",
    ],
    guarantee: "Guaranteed Timeline SLA • Clean Modular Code • 100% IP Ownership",
    ctaText: "Commission Web Build",
  },
  {
    id: "mobile-app-sprint",
    sprintNumber: "SPRINT 02",
    title: "Android & Cross-Platform App Development",
    tagline: "Production-ready Android and mobile applications engineered with offline-first persistence and responsive UX.",
    duration: "3 - 5 Weeks Turnaround",
    popular: true,
    badge: "MOST POPULAR",
    idealFor: "Startups and companies wanting reliable Android and cross-platform apps with zero lag and offline sync.",
    deliverables: [
      "Native Android & Flutter cross-platform mobile application with clean layered architecture",
      "Offline-first local database persistence (Drift SQLite) with automatic cloud sync",
      "Secure REST API / Firebase integration, JWT authentication, and push notifications",
      "Release-ready signed APK / App Bundle generation with automated unit & widget tests",
    ],
    guarantee: "100% Full Source Handover • Zero Memory Leaks • Play Store Ready",
    ctaText: "Commission Mobile App",
  },
  {
    id: "problem-solving-automation",
    sprintNumber: "SPRINT 03",
    title: "Website Problem Solving & Automation Systems",
    tagline: "Rapid website bug fixing, emergency performance diagnosis, and custom business workflow automations.",
    duration: "24-48h Emergency / Monthly Retainer",
    badge: "SOLVE & AUTOMATE",
    idealFor: "Website owners with broken features, slow loading speeds, or businesses needing repetitive workflows automated.",
    deliverables: [
      "Rapid website bug diagnosis & deep code troubleshooting (fixing broken logic, CSS/JS, and APIs)",
      "Website speed boost (optimizing LCP/CLS/TTFB) and security vulnerability patching",
      "Custom business workflow automation (connecting APIs, automated webhooks & smart scripts)",
      "Smart AI automation loops to eliminate repetitive manual data entry and operations",
    ],
    guarantee: "Rapid Turnaround • 100% Fix Guarantee • Priority Direct Support",
    ctaText: "Fix My Website / Automate",
  },
];
