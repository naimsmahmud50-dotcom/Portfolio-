export type ProficiencyLevel = "Learning" | "Working Knowledge" | "Building With" | "Hands-on";

export interface SkillItem {
  name: string;
  level: ProficiencyLevel;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  tags: string[];
  icon: string;
}

export interface PipelineStep {
  step: number;
  phase: string;
  title: string;
  summary: string;
  details: string;
  tools: string[];
  icon: string;
}

export interface SecurityPrinciple {
  title: string;
  tagline: string;
  description: string;
  points: string[];
  icon: string;
}

export interface CredentialItem {
  id: string;
  kind: "current_learning" | "completed_credential";
  badge: "CURRENT" | "COMPLETED" | "CERTIFIED";
  title: string;
  institution: string;
  statusText: string;
  credentialDoc?: string;
  focusArea?: string;
  verified?: boolean;
}

export type ProjectCategory =
  | "All"
  | "AI Automation"
  | "AI Agents"
  | "Web Apps"
  | "Mobile Apps"
  | "Security"
  | "Productivity"
  | "Experimental";

export interface CaseStudy {
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  architecture: string[];
  keyFeatures: string[];
  aiComponents?: string[];
  automationComponents?: string[];
  securityConsiderations: string[];
  challenges: string[];
  resultsStatus: string;
  metricsPlaceholder?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  featured: boolean;
  coverImage: string;
  tags: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    ai?: string[];
    automation?: string[];
    tools?: string[];
  };
  links: {
    github?: string;
    live?: string;
    demoVideo?: string;
  };
  status: "In Active Development" | "Production Concept" | "Exploratory Architecture" | "Completed Credential Build";
  caseStudy: CaseStudy;
}

export interface ProfileData {
  name: string;
  primaryRole: string;
  subRoles: string[];
  supportingHeadline: string;
  availability: {
    status: string;
    availableForHire: boolean;
  };
  aboutBio: string[];
  contacts: {
    primaryEmail: string;
    secondaryEmail: string;
    whatsappNumber: string;
    whatsappDisplay: string;
  };
  socials: {
    github: string;
    githubUsername: string;
    linkedin: string;
    naimKnowsFacebook: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}
