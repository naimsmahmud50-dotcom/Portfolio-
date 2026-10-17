import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ArrowLeft, Sparkles, Terminal, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills & Technical Stack Matrix | Mahmud Hasan",
  description:
    "Explore Mahmud Hasan's verified technical proficiencies across Next.js, TypeScript, Python, Flutter, Docker, Linux, Zero-Trust Security, and Intelligent Workflow Automation.",
};

export default function SkillsPage() {
  return (
    <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16">
      {/* Page Header with Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <Link
            href="/"
            className="hover:text-cyan transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-cyan font-semibold">Technical Skills</span>
        </div>
      </div>

      {/* Skills Matrix Section */}
      <SkillsSection />

      {/* Bottom CTA & Related Systems */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Want to see these technologies in action?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Explore the live case studies built with this stack or review our 8-Stage Autonomous Pipeline.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-xl bg-cyan text-slate-950 font-bold text-xs sm:text-sm hover:bg-cyan/90 transition-all shadow-md shadow-cyan/20"
            >
              Explore Projects
            </Link>
            <Link
              href="/systems"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-700 border border-slate-700 transition-all"
            >
              View System Architecture
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
