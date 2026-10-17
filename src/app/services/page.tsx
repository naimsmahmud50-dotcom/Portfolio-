import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ServicesSection } from "@/components/home/ServicesSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { RoiCalculator } from "@/components/ui/RoiCalculator";
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services, Sprints & Solutions | Mahmud Hasan",
  description:
    "Explore Mahmud Hasan's engineered software services: Full-Stack Web Apps, Android Mobile Applications, Intelligent AI Automations, and High-Velocity Fixed-Scope Sprints.",
};

export default function ServicesPage() {
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
          <span className="text-cyan font-semibold">Services &amp; Solutions</span>
        </div>
      </div>

      {/* 1. Core Services & Solution Pillars */}
      <ServicesSection />

      {/* 2. Fixed-Scope Sprints & Engagement Models */}
      <EngagementSection />

      {/* 3. Interactive ROI Calculator */}
      <RoiCalculator />

      {/* Bottom Conversion CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-electric-500/10 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Ready to Accelerate Your Product or Workflow?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Whether you need a full web platform, an Android mobile app, or an urgent bug fix, let's establish your timeline and scope.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan/90 text-slate-950 font-bold text-sm shadow-lg shadow-cyan/25 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Book a 15-Minute Sprint Call</span>
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              View Proven Case Studies
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
