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
  const { toast } = useToast();

  // =========================================================================
  // TYPEWRITER ENGINE 1: "Specializing in..." Rotating Sub-Roles
  // =========================================================================
  const subRoles = profileData.subRoles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isRoleDeleting, setIsRoleDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = subRoles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isRoleDeleting) {
      if (roleText.length < currentFullRole.length) {
        // Typing character by character
        timer = setTimeout(() => {
          setRoleText(currentFullRole.slice(0, roleText.length + 1));
        }, 55);
      } else {
        // Hold on completed sentence before deleting
        timer = setTimeout(() => {
          setIsRoleDeleting(true);
        }, 2200);
      }
    } else {
      if (roleText.length > 0) {
        // Erasing character by character
        timer = setTimeout(() => {
          setRoleText(currentFullRole.slice(0, roleText.length - 1));
        }, 28);
      } else {
        // Switch to next sub-role smoothly
        setIsRoleDeleting(false);
        setRoleIndex((prev) => (prev + 1) % subRoles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, isRoleDeleting, roleIndex, subRoles]);

  // =========================================================================
  // TYPEWRITER ENGINE 2: Under-Image Name Typewriter
  // =========================================================================
  const fullName = profileData.name;
  const [nameTyped, setNameTyped] = useState("");
  const [isNameDeleting, setIsNameDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isNameDeleting) {
      if (nameTyped.length < fullName.length) {
        timer = setTimeout(() => {
          setNameTyped(fullName.slice(0, nameTyped.length + 1));
        }, 85);
      } else {
        // Hold on completed name for 4 seconds
        timer = setTimeout(() => {
          setIsNameDeleting(true);
        }, 4000);
      }
    } else {
      if (nameTyped.length > 0) {
        timer = setTimeout(() => {
          setNameTyped(fullName.slice(0, nameTyped.length - 1));
        }, 45);
      } else {
        setIsNameDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [nameTyped, isNameDeleting, fullName]);

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
            
            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-medium text-emerald-300 shadow-sm shadow-emerald-950/40 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profileData.availability.status}</span>
            </div>

            {/* Name Heading with Luminous Living Gradient */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan via-teal-300 to-electric-400 bg-clip-text text-transparent animate-gradient-flow font-extrabold drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                  {profileData.name}
                </span>
              </span>
            </h1>

            {/* Dynamic Rotating Sub-Role Ticker with Fluid Typewriter */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-lg sm:text-2xl font-semibold text-slate-200 min-h-[48px]">
              <span className="text-slate-300 font-normal">Specializing in</span>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan font-mono text-base sm:text-xl transition-all shadow-lg shadow-cyan/10">
                <span>{roleText}</span>
                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1.5 bg-cyan animate-terminal-blink align-middle shadow-sm shadow-cyan" />
              </span>
            </div>

            {/* Supporting Headline */}
            <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
              {profileData.supportingHeadline}
            </p>

            {/* Primary Action Buttons: High-conversion streamlined layout */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 via-cyan to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan/25 hover:shadow-cyan/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View Featured Work</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan text-slate-100 hover:text-cyan font-semibold text-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span>Let's Work Together</span>
                <Sparkles className="w-4 h-4 text-cyan" />
              </Link>

              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-resume-modal"));
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/70 hover:border-emerald-400/50 text-slate-300 hover:text-emerald-300 text-xs font-mono transition-all cursor-pointer"
                  title="View Executive Resume PDF"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume CV</span>
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
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/70 hover:border-cyan/50 text-slate-300 hover:text-cyan text-xs font-mono transition-all cursor-pointer"
                  title="Book 15-Minute Strategy Call"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan" />
                  <span>Book Call</span>
                </button>
              </div>
            </div>

            {/* Secondary Social & Quick Action Row */}
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
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </button>
            </div>
          </div>

          {/* Right Column: Professional Portrait & Executive Animated Plaque (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
            <div className="relative group max-w-[320px] sm:max-w-[345px] w-full">
              
              {/* Luminous ambient glow behind portrait */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-electric-600/35 via-cyan/35 to-violet-500/25 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Elegant Floating Glass Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/90 border border-cyan-500/30 group-hover:border-cyan-400/60 shadow-2xl transition-all duration-500">
                
                {/* Top Floating Status Pill */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono font-medium text-emerald-300 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>VERIFIED PRO</span>
                </div>

                {/* Top Right ID Tag */}
                <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-slate-300">
                  MH-2026
                </div>

                {/* Portrait Image (Golden Ratio 4:5 with top focus) */}
                <div className="relative aspect-[4/5] w-full bg-slate-950 overflow-hidden">
                  <Image
                    src="/images/profile/mahmud-hasan-suit.jpg"
                    alt="Mahmud Hasan - Full-Stack Web, Android & Automation Engineer"
                    fill
                    sizes="(max-width: 768px) 100vw, 345px"
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle inner edge ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                  
                  {/* Subtle bottom shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* =========================================================================
                  ELEGANT FROSTED GLASS NAME CARD UNDERNEATH THE IMAGE
                  ========================================================================= */}
              <div className="mt-3.5 w-full rounded-2xl bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-xl border border-white/10 dark:border-cyan-500/30 p-4 sm:p-5 shadow-2xl shadow-cyan/15 flex flex-col items-center justify-center text-center group hover:border-cyan/50 hover:shadow-cyan/25 transition-all">
                
                {/* Luminous Animated Name */}
                <div className="flex items-center justify-center min-h-[40px]">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
                    <span className="bg-gradient-to-r from-white via-cyan to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.45)]">
                      {nameTyped}
                    </span>
                    <span className="inline-block w-2.5 h-6 sm:h-7 ml-1 bg-cyan animate-terminal-blink align-middle rounded-sm shadow-sm shadow-cyan" />
                  </span>
                </div>

                {/* Refined Executive Role Subtitle */}
                <div className="mt-1.5 flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Full-Stack Web &amp; Android Apps Engineer</span>
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
