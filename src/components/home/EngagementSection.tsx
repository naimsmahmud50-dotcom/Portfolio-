"use client";

import React from "react";
import { engagementModelsData, EngagementModel } from "@/data/engagement";
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";

export function EngagementSection() {
  const handleSelectSprint = (sprintTitle: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-discovery-modal", {
          detail: { sprint: sprintTitle },
        })
      );
    }
  };

  return (
    <section id="engagement" className="py-20 md:py-28 bg-slate-950/40 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-electric-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // CORPORATE ENGAGEMENT MODELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            How We Can Work Together
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Transparent, outcome-driven sprint packages designed to eliminate guesswork. From 14-day AI prototypes to end-to-end full-stack architectures and fractional leadership.
          </p>
        </div>

        {/* 3-Card Engagement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {engagementModelsData.map((model: EngagementModel) => {
            const isFeatured = model.popular;
            return (
              <div
                key={model.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  isFeatured
                    ? "bg-slate-900/95 border-2 border-cyan shadow-2xl shadow-cyan/20 scale-[1.02]"
                    : "tech-card border-slate-800 hover:border-slate-700 bg-slate-950/90"
                }`}
              >
                {/* Popular / Recommended Pill */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-electric-600 to-cyan text-slate-950 text-[11px] font-bold font-mono tracking-wider uppercase shadow-md shadow-cyan/30">
                    ★ MOST POPULAR ENGAGEMENT
                  </div>
                )}

                <div>
                  {/* Top Badge & Sprint Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {model.sprintNumber}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                        isFeatured
                          ? "bg-cyan/15 text-cyan border-cyan/40"
                          : "bg-slate-900 text-slate-400 border-slate-700/80"
                      }`}
                    >
                      {model.badge}
                    </span>
                  </div>

                  {/* Title & Duration */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    {model.title}
                  </h3>

                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-mono text-cyan">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{model.duration}</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {model.tagline}
                  </p>

                  {/* Ideal For Context */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-200 block mb-0.5">Best For:</strong>
                    {model.idealFor}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Core Deliverables:
                    </span>
                    {model.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Guarantee */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{model.guarantee}</span>
                  </div>

                  <button
                    onClick={() => handleSelectSprint(model.title)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                      isFeatured
                        ? "bg-gradient-to-r from-electric-600 to-cyan text-white shadow-lg shadow-cyan/25 hover:shadow-cyan/40 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan hover:scale-[1.01]"
                    }`}
                  >
                    <span>{model.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance SLA Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-100">
                Enterprise Zero-Risk Delivery Framework
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Clear milestone milestones, NDA compliance, verified GitHub commits, and direct architect communication.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("open-discovery-modal", {
                    detail: { sprint: "Custom Enterprise Consultation" },
                  })
                );
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold shrink-0 transition-colors border border-slate-700"
          >
            Request Custom Scope
          </button>
        </div>

      </div>
    </section>
  );
}
