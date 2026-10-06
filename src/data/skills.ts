import { SkillCategory } from "@/types";

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "AI & Automation",
    badge: "Intelligent Workflows",
    description: "Architecting autonomous agents, structured pipelines, and practical RAG implementations.",
    skills: [
      { name: "AI Automation", level: "Building With", highlight: true },
      { name: "AI Agents", level: "Building With", highlight: true },
      { name: "RAG Systems", level: "Hands-on", highlight: true },
      { name: "Workflow Automation", level: "Building With" },
      { name: "API Integration", level: "Hands-on" },
      { name: "AI-Powered Applications", level: "Building With" },
      { name: "Prompt Engineering", level: "Hands-on" },
      { name: "Automation Architecture", level: "Hands-on" },
    ],
  },
  {
    title: "Full-Stack Development",
    badge: "Core Engineering",
    description: "Developing modern, reactive, accessible user interfaces and backend integrations.",
    skills: [
      { name: "TypeScript", level: "Hands-on", highlight: true },
      { name: "React", level: "Hands-on", highlight: true },
      { name: "Next.js", level: "Building With", highlight: true },
      { name: "Node.js", level: "Working Knowledge" },
      { name: "JavaScript", level: "Working Knowledge" },
      { name: "HTML / CSS / Tailwind", level: "Working Knowledge" },
      { name: "REST APIs", level: "Hands-on" },
      { name: "Git & GitHub", level: "Hands-on" },
    ],
  },
  {
    title: "App Development",
    badge: "Mobile Systems",
    description: "Expanding into native and cross-platform mobile solutions for real-world utilities.",
    skills: [
      { name: "Android Development", level: "Learning" },
      { name: "Mobile Application Development", level: "Learning" },
    ],
  },
  {
    title: "Cloud & Deployment",
    badge: "Infrastructure",
    description: "Configuring continuous deployment, serverless compute, and production runtimes.",
    skills: [
      { name: "Vercel", level: "Hands-on", highlight: true },
      { name: "Cloud Run", level: "Hands-on" },
      { name: "Modern Deployment Workflows", level: "Hands-on" },
    ],
  },
  {
    title: "Security & Protection",
    badge: "Defensive Engineering",
    description: "Building systems with defensive boundaries, least-privilege principles, and sanitization.",
    skills: [
      { name: "Web Security", level: "Hands-on", highlight: true },
      { name: "Ethical Hacking Fundamentals", level: "Working Knowledge" },
      { name: "Authentication & Authorization", level: "Hands-on" },
      { name: "Secure API Design", level: "Hands-on" },
      { name: "Input Validation", level: "Hands-on" },
      { name: "Secret Management", level: "Hands-on" },
    ],
  },
];
