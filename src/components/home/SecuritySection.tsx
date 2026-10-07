"use client";

import React from "react";
import { securityPhilosophyData } from "@/data/security";
import { ShieldCheck, KeyRound, ShieldAlert, Lock, EyeOff, CheckCircle } from "lucide-react";

const getSecIcon = (icon: string) => {
  switch (icon) {
    case "KeyRound":
      return <KeyRound className="w-5 h-5 text-electric-400" />;
    case "ShieldAlert":
      return <ShieldAlert className="w-5 h-5 text-cyan" />;
    case "Lock":
      return <Lock className="w-5 h-5 text-emerald-400" />;
    case "EyeOff":
      return <EyeOff className="w-5 h-5 text-purple-400" />;
    default:
      return <ShieldCheck className="w-5 h-5 text-cyan" />;
  }
};

export function SecuritySection() {
  return (
    <section id="security" className="py-20 md:py-28 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Section 25) */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>07 // DEFENSIVE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Built With Security in Mind
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Designed with security best practices in mind. Integrating defensive programming, bounded access, and server-side secret isolation into every layer.
          </p>
        </div>

        {/* 4 Core Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPhilosophyData.map((principle) => (
            <div
              key={principle.title}
              className="p-6 sm:p-8 rounded-2xl tech-card group hover:border-cyan/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan/50 transition-colors">
                  {getSecIcon(principle.icon)}
                </div>
                <span className="text-[11px] font-mono text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20 font-semibold">
                  {principle.tagline}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100">{principle.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {principle.description}
              </p>

              <ul className="mt-6 space-y-2.5 pt-6 border-t border-slate-800/80">
                {principle.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Realistic Security Disclaimer Note */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
          <p className="text-xs text-slate-300 font-mono">
            ENGINEERING PRINCIPLE: Defensive posture relies on continuous threat modeling, least privilege, and sanitization rather than absolute claims.
          </p>
        </div>

      </div>
    </section>
  );
}
