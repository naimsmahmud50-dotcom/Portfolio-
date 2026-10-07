"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/data/profile";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  CheckCircle,
  Copy,
  FileText,
  Calendar,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { useToast } from "../providers/ToastProvider";
import { HeroTerminal } from "../ui/HeroTerminal";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profileData.subRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contacts.primaryEmail);
    toast("Primary email copied to clipboard!", "success");
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden tech-grid-bg"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Indicator (Section 4) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium text-emerald-300 shadow-sm shadow-emerald-950/40 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profileData.availability.status}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-electric-400 via-cyan to-blue-200 bg-clip-text text-transparent">
                {profileData.name}
              </span>
            </h1>

            {/* Dynamic Rotating Sub-Role Ticker (Section 4) */}
            <div className="mt-3 flex items-center gap-2 text-lg sm:text-2xl font-semibold text-slate-200">
              <span className="text-slate-300 font-normal">Specializing in</span>
              <span className="inline-block px-3 py-1 rounded-md bg-electric-950/80 border border-electric-500/30 text-cyan font-mono text-base sm:text-xl transition-all duration-300 shadow-inner">
                {profileData.subRoles[roleIndex]}
              </span>
            </div>

            {/* Supporting Headline (Section 4) */}
            <p className="mt-6 text-base sm:text-lg text-slate-200 dark:text-slate-200 max-w-2xl leading-relaxed font-normal">
              {profileData.supportingHeadline}
            </p>

            {/* Primary Action Buttons (Section 4) */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white font-semibold text-sm shadow-lg shadow-electric-600/25 hover:shadow-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-resume-modal"));
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 font-medium text-sm hover:bg-slate-800/80 transition-all shadow-md shadow-emerald-950/30"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Executive CV</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                  PDF
                </span>
              </button>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-discovery-modal", {
                        detail: { sprint: "15-Min Strategy Discovery" },
                      })
                    );
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan text-cyan hover:text-white font-medium text-sm hover:bg-slate-800/80 transition-all shadow-md shadow-cyan/20"
              >
                <Calendar className="w-4 h-4 text-cyan" />
                <span>Book 15-Min Call</span>
              </button>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan text-slate-200 hover:text-white font-medium text-sm hover:bg-slate-800/80 transition-all"
              >
                <span>Let's Work Together</span>
                <Sparkles className="w-4 h-4 text-cyan" />
              </Link>
            </div>

            {/* Secondary Social & Quick Action Row (Section 4 & 14, 15) */}
            <div className="mt-10 flex flex-wrap items-center gap-5 pt-6 border-t border-slate-800/80 text-sm text-slate-300">
              <span className="font-mono text-slate-300 font-semibold uppercase tracking-wider text-xs">Connect:</span>
              
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-slate-300" />
                <span>GitHub</span>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan transition-colors"
                title="Click to copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </button>
            </div>
          </div>

          {/* Right Column: Professional Portrait (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[310px] sm:max-w-[335px] w-full cursor-pointer transition-transform duration-500 ease-out hover:translate-y-2.5">
              
              {/* Luminous ambient glow behind portrait */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-electric-600/35 via-cyan/35 to-violet-500/25 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Elegant Floating Glass Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-cyan-500/30 group-hover:border-cyan-400/60 shadow-2xl transition-all duration-500">
                
                {/* Portrait Image (Golden Ratio 4:5 with top focus) */}
                <div className="relative aspect-[4/5] w-full bg-slate-950 overflow-hidden">
                  <Image
                    src="/images/profile/mahmud-hasan-suit.jpg"
                    alt="Mahmud Hasan - AI Automation Expert, App Developer & Web Developer"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle inner edge ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                  
                  {/* Subtle bottom shadow vignette for badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Sleek Floating Glass Pill Badge at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/70 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
                      </span>
                      <span className="text-xs font-semibold text-slate-100 font-sans">{profileData.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30">
                      Web &amp; Apps Engineer
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Live Interactive System Terminal Sandbox */}
        <div className="mt-14 max-w-4xl mx-auto w-full">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
