"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Terminal,
  Shield,
  Cpu,
  Code2,
  FileText,
  Lock,
  Zap,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Globe,
  Smartphone,
  Wrench,
  Workflow,
} from "lucide-react";
import { ResumeModal } from "../ui/ResumeModal";

export function AboutSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            High-Performance Web, Mobile Apps, Problem Solving &amp; Automation
          </h2>
        </div>

        {/* Two-column layout: Story + Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Authentic Executive Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            {profileData.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300/90 font-normal">
                {paragraph}
              </p>
            ))}

            {/* Verified Executive CV Button (No more "coming soon") */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan/30 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-electric-600/25"
              >
                <FileText className="w-4 h-4" />
                <span>View Executive Resume</span>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-bold">
                  PDF / PRINT
                </span>
              </button>

              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Credentials • Updated 2026</span>
              </span>
            </div>
          </div>

          {/* Right Column: Key Focus Pillars (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
            
            <div className="p-4 sm:p-5 rounded-2xl tech-card transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Modern Websites &amp; Web Apps</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive Next.js 15 &amp; React architectures, tailored UI/UX, database portals, and 95+ Core Web Vitals performance.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl tech-card transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Android &amp; Mobile Engineering</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Production-ready Android and Flutter mobile apps with offline-first Drift SQLite sync, zero memory leaks, and smooth UX.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl tech-card transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Problem Solving &amp; Bug Fixing</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rapid diagnosis and repair for broken sites, CSS/JS layout glitches, failing APIs, slow loading, and critical errors.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl tech-card transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-electric-950/80 border border-electric-500/30 flex items-center justify-center text-cyan">
                  <Workflow className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Workflow &amp; AI Automation</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connecting APIs, automating repetitive manual operations, webhook pipelines, and reliable autonomous agent loops.
              </p>
            </div>

          </div>

        </div>

        {/* Quantified Executive Impact Bento Grid (Section 23 & KPI Proof) */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="mb-6">
            <span className="text-xs font-mono text-cyan tracking-wider uppercase font-semibold">
              // QUANTIFIED ARCHITECTURAL BENCHMARKS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              Measurable Engineering Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bento Card 1 */}
            <div className="p-6 rounded-2xl tech-card border-electric-500/30 flex flex-col justify-between group hover:border-cyan/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan">
                    0
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan/30 flex items-center justify-center text-cyan">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-100">Inbound Open Ports</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Workstation daemon communicates exclusively via outbound MTProto encrypted tunnels, leaving zero attack surface to external WAN port scanners.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-4 block">SECUREMYPC ARCHITECTURE</span>
            </div>

            {/* Bento Card 2 */}
            <div className="p-6 rounded-2xl tech-card border-electric-500/30 flex flex-col justify-between group hover:border-cyan/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-electric-400">
                    &lt; 2.0s
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-electric-500/30 flex items-center justify-center text-electric-400">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-100">Hardware Watchdog Trap</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Instant detection of physical USB flash drive insertion with immediate desktop lock and multi-camera snapshot dispatch to owner.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-4 block">KERNEL TELEMETRY SPEED</span>
            </div>

            {/* Bento Card 3 */}
            <div className="p-6 rounded-2xl tech-card border-electric-500/30 flex flex-col justify-between group hover:border-cyan/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                    100%
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Database className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-100">Offline-First Drift SQLite</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Educational ERP operates flawlessly during regional rural internet blackouts, queuing mutations for bidirectional NestJS sync.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-4 block">ZERO-NETWORK TOLERANCE</span>
            </div>

            {/* Bento Card 4 */}
            <div className="p-6 rounded-2xl tech-card border-electric-500/30 flex flex-col justify-between group hover:border-cyan/50 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-violet-400">
                    Type-Safe
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-100">Zod &amp; Sliding-Window Guard</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Enterprise Route Handlers protected with sliding-window in-memory IP rate limiters, 10KB size guards, and strict runtime Zod schemas.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-4 block">ZERO RUNTIME INJECTIONS</span>
            </div>

          </div>
        </div>

      </div>

      {/* Executive CV Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
