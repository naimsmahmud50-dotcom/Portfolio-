"use client";

import React from "react";
import { credentialsData } from "@/data/credentials";
import { GraduationCap, Award, BookOpen, CheckCircle, Clock, ShieldCheck } from "lucide-react";

export function CredentialsSection() {
  const currentLearning = credentialsData.filter((c) => c.kind === "current_learning");
  const completedCredentials = credentialsData.filter((c) => c.kind === "completed_credential");

  return (
    <section id="credentials" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02 // CREDENTIALS &amp; LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Education, Focus &amp; Practical Training
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Strict separation between active ongoing studies and previously certified milestones.
          </p>
        </div>

        {/* Two Category Columns: Current Learning vs Completed Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: CURRENT LEARNING (Section 7 & 21) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-cyan/20">
              <Clock className="w-5 h-5 text-cyan" />
              <h3 className="text-lg font-bold text-slate-100">Current Learning Journey</h3>
              <span className="ml-auto text-[11px] font-mono px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30 text-cyan">
                ACTIVE
              </span>
            </div>

            {currentLearning.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl tech-card relative overflow-hidden group hover:border-cyan/50 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-2xl group-hover:bg-cyan/10 transition-colors pointer-events-none" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-cyan/20 text-cyan border border-cyan/40 mb-3">
                      {item.badge}
                    </span>
                    <h4 className="text-xl font-bold text-slate-100">{item.title}</h4>
                    <p className="text-sm font-medium text-cyan mt-1">{item.institution}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan/30 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-cyan" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <p className="text-xs text-slate-200 font-mono">
                    <span className="text-slate-400 font-semibold">Core Focus: </span>
                    {item.focusArea}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{item.statusText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: PREVIOUSLY COMPLETED CREDENTIALS (Section 7, 20, 22) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-electric-500/20">
              <Award className="w-5 h-5 text-electric-400" />
              <h3 className="text-lg font-bold text-slate-100">Previously Completed Credentials</h3>
              <span className="ml-auto text-[11px] font-mono px-2 py-0.5 rounded bg-electric-950 border border-electric-500/30 text-electric-400">
                VERIFIED
              </span>
            </div>

            <div className="space-y-4">
              {completedCredentials.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl tech-card relative overflow-hidden group hover:border-electric-400/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-electric-950 text-electric-400 border border-electric-500/40 mb-3">
                        {item.badge}
                      </span>
                      <h4 className="text-lg font-bold text-slate-100">{item.title}</h4>
                      <p className="text-sm font-medium text-slate-200 mt-1">{item.institution}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-electric-500/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-electric-400" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs text-slate-300 font-mono">
                      {item.focusArea}
                    </p>
                    {item.credentialDoc && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-lg shrink-0">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{item.credentialDoc}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
