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
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { useToast } from "../providers/ToastProvider";

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
            <div className="mt-3 flex items-center gap-2 text-lg sm:text-2xl font-semibold text-slate-300">
              <span className="text-slate-400 font-normal">Specializing in</span>
              <span className="inline-block px-3 py-1 rounded-md bg-electric-950/80 border border-electric-500/30 text-cyan font-mono text-base sm:text-xl transition-all duration-300 shadow-inner">
                {profileData.subRoles[roleIndex]}
              </span>
            </div>

            {/* Supporting Headline (Section 4) */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 dark:text-slate-300 max-w-2xl leading-relaxed">
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

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan text-slate-200 hover:text-white font-medium text-sm hover:bg-slate-800/80 transition-all"
              >
                <span>Let's Work Together</span>
                <Sparkles className="w-4 h-4 text-cyan" />
              </Link>
            </div>

            {/* Secondary Social & Quick Action Row (Section 4 & 14, 15) */}
            <div className="mt-10 flex flex-wrap items-center gap-5 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-mono text-slate-500 uppercase tracking-wider">Connect:</span>
              
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-100 transition-colors"
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
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan transition-colors"
                title="Click to copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </button>
            </div>
          </div>

          {/* Right Column: Professional Portrait (5 cols) (Section 5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Subtle ambient glow behind photo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-electric-600/40 via-cyan/40 to-violet-subtle/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Portrait Container Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-electric-500/30 shadow-2xl">
                
                {/* Tech HUD header bezel */}
                <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-300 font-medium">MAHMUD_ID // VERIFIED</span>
                  </div>
                  <span className="text-cyan/80">AI AUTOMATION</span>
                </div>

                {/* Portrait Image */}
                <div className="relative aspect-[3/4] w-full bg-slate-950">
                  <Image
                    src="/images/profile/mahmud-hasan.jpg"
                    alt="Mahmud Hasan - AI Automation Expert, App Developer & Web Developer"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    priority
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                  />
                  {/* Subtle lower gradient overlay for seamless badge integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Spec Footer Pill */}
                <div className="p-4 bg-slate-950/95 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-100">{profileData.name}</p>
                      <p className="text-xs text-cyan font-mono mt-0.5">Applied Systems &amp; Workflows</p>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-slate-300">
                      Dhaka, BD
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
