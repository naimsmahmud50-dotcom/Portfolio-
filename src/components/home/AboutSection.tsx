"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Terminal, Shield, Cpu, Code2, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "../providers/ToastProvider";

export function AboutSection() {
  const { toast } = useToast();

  const handleResumeClick = () => {
    toast("Resume is currently being updated. Please contact Mahmud directly for early review!", "info");
  };

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
            Building Intelligent, Secure &amp; Scalable Systems
          </h2>
        </div>

        {/* Two-column layout: Story + Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Authentic Storytelling (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            {profileData.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300/90 font-normal">
                {paragraph}
              </p>
            ))}

            {/* Resume Placeholder (Section 23: "Resume Coming Soon") */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan text-slate-200 text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-cyan" />
                <span>Resume Coming Soon</span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded ml-1">
                  PDF
                </span>
              </button>

              <span className="text-xs text-slate-400">
                Official CV undergoing periodic updates
              </span>
            </div>
          </div>

          {/* Right Column: Key Focus Pillars (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="p-5 rounded-2xl tech-card transition-all">
              <div className="w-10 h-10 rounded-xl bg-electric-950 border border-electric-500/30 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5 text-electric-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">AI Automation Mindset</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                Designing event-driven workflows and autonomous agents that take real digital action rather than merely chatting.
              </p>
            </div>

            <div className="p-5 rounded-2xl tech-card transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Security-Conscious Building</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                Grounded in ethical hacking fundamentals, input sanitization, least-privilege principles, and safe API designs.
              </p>
            </div>

            <div className="p-5 rounded-2xl tech-card transition-all">
              <div className="w-10 h-10 rounded-xl bg-violet-subtle/10 border border-violet-subtle/30 flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Applied Engineering</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                Continuously translating structured learning into working software, case studies, and practical production prototypes.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
