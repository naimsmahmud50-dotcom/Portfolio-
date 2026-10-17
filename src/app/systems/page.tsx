import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PipelineSection } from "@/components/home/PipelineSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { ArrowLeft, Sparkles, Workflow, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Systems Architecture, Pipeline & Security | Mahmud Hasan",
  description:
    "Explore Mahmud Hasan's 8-Stage Autonomous Pipeline and Zero-Trust Defensive Security philosophy for mission-critical software engineering.",
};

export default function SystemsPage() {
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
          <span className="text-cyan font-semibold">Systems &amp; Architecture</span>
        </div>
      </div>

      {/* 1. 8-Stage Intelligent Pipeline */}
      <PipelineSection />

      {/* 2. Defensive Security Philosophy */}
      <SecuritySection />

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 border border-slate-800 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Need an Autonomous or Zero-Trust Architecture?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Let's design and implement deterministic pipelines tailored to your operations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan/90 text-slate-950 font-bold text-sm shadow-lg shadow-cyan/25 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Initiate Systems Dialogue</span>
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Inspect Implemented Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
