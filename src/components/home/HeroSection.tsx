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
  // TYPEWRITER ENGINE 2: Under-Image Name Plaque Animation
  // =========================================================================
  const fullName = profileData.name;
  const [nameTyped, setNameTyped] = useState("");
  const [isNameComplete, setIsNameComplete] = useState(false);

  useEffect(() => {
    if (nameTyped.length < fullName.length) {
      const timer = setTimeout(() => {
        setNameTyped(fullName.slice(0, nameTyped.length + 1));
      }, 70);
      return () => clearTimeout(timer);
    } else {
      setIsNameComplete(true);
    }
  }, [nameTyped, fullName]);

  // =========================================================================
  // TYPEWRITER ENGINE 3: Under-Image Secondary Role Cycler
  // =========================================================================
  const identityRoles = [
    "Full-Stack Web & Android Developer",
    "Website Bug Solver & Problem Solver",
    "Smart Workflow Automation Engineer",
    "Zero-Trust Defensive Hardener",
  ];
  const [identityRoleIndex, setIdentityRoleIndex] = useState(0);
  const [identityRoleText, setIdentityRoleText] = useState("");
  const [isIdentityDeleting, setIsIdentityDeleting] = useState(false);

  useEffect(() => {
    const currentRole = identityRoles[identityRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isIdentityDeleting) {
      if (identityRoleText.length < currentRole.length) {
        timer = setTimeout(() => {
          setIdentityRoleText(currentRole.slice(0, identityRoleText.length + 1));
        }, 45);
      } else {
        timer = setTimeout(() => {
          setIsIdentityDeleting(true);
        }, 2500);
      }
    } else {
      if (identityRoleText.length > 0) {
        timer = setTimeout(() => {
          setIdentityRoleText(currentRole.slice(0, identityRoleText.length - 1));
        }, 22);
      } else {
        setIsIdentityDeleting(false);
        setIdentityRoleIndex((prev) => (prev + 1) % identityRoles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [identityRoleText, isIdentityDeleting, identityRoleIndex, identityRoles]);

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

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white font-semibold text-sm shadow-lg shadow-electric-600/25 hover:shadow-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 font-medium text-sm hover:bg-slate-800/80 transition-all shadow-md shadow-emerald-950/30 cursor-pointer"
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan text-cyan hover:text-white font-medium text-sm hover:bg-slate-800/80 transition-all shadow-md shadow-cyan/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-cyan" />
                <span>Book 15-Min Call</span>
              </button>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan text-slate-200 hover:text-white font-medium text-sm hover:bg-slate-800/80 transition-all cursor-pointer"
              >
                <span>Let's Work Together</span>
                <Sparkles className="w-4 h-4 text-cyan" />
              </Link>
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
                  HIGH-IMPACT ANIMATED IDENTITY PLAQUE UNDERNEATH THE IMAGE
                  ========================================================================= */}
              <div className="mt-3.5 w-full rounded-2xl bg-slate-950/95 border border-cyan-500/40 p-4 shadow-2xl shadow-cyan/20 backdrop-blur-2xl relative overflow-hidden group/plaque">
                
                {/* Scanning Laser Beam Effect */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan-beam pointer-events-none" />

                {/* Corner Cyber Brackets */}
                <span className="absolute top-1.5 left-2 text-[10px] font-mono text-cyan/50 select-none">[</span>
                <span className="absolute top-1.5 right-2 text-[10px] font-mono text-cyan/50 select-none">]</span>

                {/* Plaque Header: Telemetry & Status */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYS://IDENTITY_CONFIRMED</span>
                  </div>
                  <span className="text-slate-400">Dhaka • UTC+6</span>
                </div>

                {/* Centerpiece: Animated Typewriter Name */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-xs text-slate-400 font-normal">const engineer =</span>
                    <div className="flex items-center text-lg sm:text-xl font-bold font-mono tracking-wide">
                      <span className="text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                        "{nameTyped}"
                      </span>
                      <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-cyan animate-terminal-blink shadow-sm shadow-cyan" />
                      {isNameComplete && (
                        <CheckCircle className="w-4 h-4 text-cyan inline-block ml-1.5 shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Dynamic Secondary Rotating Title Typewriter */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-mono min-h-[22px]">
                    <span className="text-slate-400 shrink-0">role:</span>
                    <span className="text-cyan font-semibold flex items-center">
                      <span>{identityRoleText}</span>
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan/80 animate-terminal-blink" />
                    </span>
                  </div>
                </div>

                {/* Mini Capabilities Pills */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {[
                    { label: "Web & Apps", color: "text-cyan bg-cyan/10 border-cyan/30" },
                    { label: "Android", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
                    { label: "Bug Fixing", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
                    { label: "Automation", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
                  ].map((pill) => (
                    <span
                      key={pill.label}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-medium ${pill.color}`}
                    >
                      {pill.label}
                    </span>
                  ))}
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
