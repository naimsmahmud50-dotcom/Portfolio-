"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Layers,
  Workflow,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface DomainCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  href: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  borderColor: string;
  hoverBorder: string;
  glowColor: string;
  features: string[];
  ctaLabel: string;
}

const domainCards: DomainCard[] = [
  {
    id: "projects",
    title: "Featured Projects & Systems",
    subtitle: "Battle-Tested Production Deployments",
    description:
      "Explore enterprise-grade architectures, from multi-branch education ERPs to autonomous agent swarms and zero-trust security engines.",
    badge: "5 Enterprise Showcases",
    badgeColor: "bg-cyan/15 text-cyan border-cyan/40",
    href: "/projects",
    icon: FolderGit2,
    iconColor: "text-cyan",
    iconBg: "bg-cyan/10 border-cyan/30",
    borderColor: "border-slate-800",
    hoverBorder: "hover:border-cyan/50",
    glowColor: "from-cyan/20 to-transparent",
    features: [
      "Bangladesh Madrasa Management ERP",
      "Personal PC Security Platform (Python)",
      "Autonomous AI Research & Coding Agents",
    ],
    ctaLabel: "View All Projects",
  },
  {
    id: "services",
    title: "Services, Sprints & Pricing",
    subtitle: "Fixed-Scope Delivery & Guaranteed SLAs",
    description:
      "High-velocity 2-3 week sprint deliveries with deterministic milestone pricing, defensive security auditing, and automated ROI calculations.",
    badge: "2-3 Week Fast Sprints",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/40",
    href: "/services",
    icon: Layers,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/30",
    borderColor: "border-slate-800",
    hoverBorder: "hover:border-blue-500/50",
    glowColor: "from-blue-500/20 to-transparent",
    features: [
      "Modern Next.js & Full-Stack Systems",
      "Flutter Android Mobile Applications",
      "Interactive ROI Calculator & SLAs",
    ],
    ctaLabel: "Explore Services & Sprints",
  },
  {
    id: "systems",
    title: "8-Stage Pipeline & Security",
    subtitle: "Autonomous Loop & Zero-Trust Defense",
    description:
      "Inspect the spec-driven engineering loop that coordinates multi-agent worktrees, property-based testing, and active zero-trust perimeter defense.",
    badge: "Zero-Trust Architecture",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    href: "/systems",
    icon: Workflow,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    borderColor: "border-slate-800",
    hoverBorder: "hover:border-emerald-500/50",
    glowColor: "from-emerald-500/20 to-transparent",
    features: [
      "Autonomous 8-Stage Development Loop",
      "Zero-Trust Defensive Hardening Matrix",
      "Multi-Agent Parallel Subagent Worktrees",
    ],
    ctaLabel: "Inspect Architecture",
  },
  {
    id: "about",
    title: "About Mahmud & Leadership",
    subtitle: "Philosophy, Mission & Verified Credentials",
    description:
      "The engineering leadership narrative, technical principles, accredited diplomas, active research certifications, and complete curriculum vitae.",
    badge: "Engineering Leadership",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    href: "/about",
    icon: User,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/30",
    borderColor: "border-slate-800",
    hoverBorder: "hover:border-amber-500/50",
    glowColor: "from-amber-500/20 to-transparent",
    features: [
      "Human-Centered Builder Philosophy",
      "Verified Academic Diplomas & Research",
      "Executive CV & Direct References",
    ],
    ctaLabel: "Read Story & Credentials",
  },
];

export function ExecutiveDomainGrid() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Exploration Portal</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Focused Engineering Domains
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Select a domain below to explore dedicated case studies, fixed-scope sprint packages,
          or systems architecture—with zero unnecessary scrolling.
        </p>
      </div>

      {/* 4-Card Executive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {domainCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 dark:bg-canvas-card/70 border ${card.borderColor} ${card.hoverBorder} backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden flex flex-col justify-between`}
            >
              {/* Subtle Ambient Radial Highlight on Hover */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${card.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.iconBg} border flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <span
                    className={`text-[11px] font-mono font-semibold px-3 py-1 rounded-full border ${card.badgeColor} shadow-sm`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 mb-3">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {card.description}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80 mb-6">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm font-semibold text-cyan group-hover:text-teal-300 transition-colors">
                <span>{card.ctaLabel}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:bg-cyan group-hover:text-slate-950 transition-all">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Fast Discovery & Direct WhatsApp Consultation Ribbon */}
      <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan/20 to-teal-500/20 border border-cyan/40 flex items-center justify-center shrink-0 hidden sm:flex">
            <Zap className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-100">
              Have an Urgent Project or Engineering Requirement?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Connect directly via encrypted WhatsApp dialogue, schedule a 15-minute strategy call,
              or submit project milestones.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("open-discovery-modal", {
                    detail: { sprint: "Executive Portal Discovery" },
                  })
                );
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan hover:bg-cyan/90 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Book 15-Min Call</span>
          </button>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <span>Direct Message Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
