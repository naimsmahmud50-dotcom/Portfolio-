export interface NavLink {
  name: string;
  href: string;
  targetId: string;
  route?: string;
}

export interface DeepDiveModule {
  name: string;
  href: string;
  targetId: string;
  route?: string;
  badge: string;
  description: string;
  iconName: string;
  color: string;
  border: string;
  bg: string;
}

export interface SitemapLink {
  name: string;
  href: string;
  targetId: string;
  route?: string;
  iconName: string;
}

// Curated primary frontline links - discrete page navigation
export const primaryNavLinks: NavLink[] = [
  { name: "Projects", href: "/projects", targetId: "projects", route: "/projects" },
  { name: "Services", href: "/services", targetId: "services", route: "/services" },
  { name: "Skills", href: "/skills", targetId: "skills", route: "/skills" },
  { name: "About", href: "/about", targetId: "about", route: "/about" },
  { name: "Credentials", href: "/credentials", targetId: "credentials", route: "/credentials" },
  { name: "Contact", href: "/contact", targetId: "contact", route: "/contact" },
];

// Specialized deep-dive engineering modules housed inside the executive right drawer
export const deepDiveModules: DeepDiveModule[] = [
  {
    name: "8-Stage Pipeline",
    href: "/systems#pipeline",
    targetId: "pipeline",
    route: "/systems#pipeline",
    badge: "Autonomous Loop",
    description: "Spec-driven autonomous engineering workflow from spec to deployment",
    iconName: "Workflow",
    color: "text-cyan",
    border: "group-hover:border-cyan/40",
    bg: "bg-cyan/10 border-cyan/30",
  },
  {
    name: "Defensive Security",
    href: "/systems#security",
    targetId: "security",
    route: "/systems#security",
    badge: "Zero-Trust",
    description: "Zero-trust hardening, DDoS mitigation & threat isolation protocols",
    iconName: "ShieldCheck",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    name: "Sprint Engagements",
    href: "/services#engagement",
    targetId: "engagement",
    route: "/services#engagement",
    badge: "High Velocity",
    description: "Fixed-scope 2-3 week high-velocity delivery sprints with strict SLAs",
    iconName: "Zap",
    color: "text-amber-400",
    border: "group-hover:border-amber-500/40",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
];

// Complete sitemap links for quick jump inside the systems drawer
export const sitemapLinks: SitemapLink[] = [
  { name: "Home / Hero", href: "/", targetId: "hero", route: "/", iconName: "Sparkles" },
  { name: "Featured Projects", href: "/projects", targetId: "projects", route: "/projects", iconName: "FolderGit2" },
  { name: "Core Services", href: "/services", targetId: "services", route: "/services", iconName: "Layers" },
  { name: "Skills Matrix", href: "/skills", targetId: "skills", route: "/skills", iconName: "Cpu" },
  { name: "About Mahmud", href: "/about", targetId: "about", route: "/about", iconName: "User" },
  { name: "Credentials & Research", href: "/credentials", targetId: "credentials", route: "/credentials", iconName: "GraduationCap" },
  { name: "Sprint Engagements", href: "/services#engagement", targetId: "engagement", route: "/services#engagement", iconName: "Zap" },
  { name: "8-Stage Pipeline", href: "/systems#pipeline", targetId: "pipeline", route: "/systems#pipeline", iconName: "Workflow" },
  { name: "Defensive Security", href: "/systems#security", targetId: "security", route: "/systems#security", iconName: "ShieldCheck" },
  { name: "Contact Dialogue", href: "/contact", targetId: "contact", route: "/contact", iconName: "Mail" },
];
