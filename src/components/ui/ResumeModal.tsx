"use client";

import React, { useEffect } from "react";
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  Shield,
  Cpu,
  Workflow,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { profileData } from "@/data/profile";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-electric-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Controls Bar (Hidden during print) */}
        <div className="p-4 sm:px-8 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan font-bold tracking-wider">
              VERIFIED EXECUTIVE CV // MAHMUD HASAN
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-medium transition-all shadow-md shadow-electric-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-950 text-slate-100 print:bg-white print:text-slate-950 print:p-0 print:overflow-visible">
          
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-slate-900">
                  {profileData.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-cyan print:text-blue-700 mt-1">
                  Autonomous AI Systems Architect &amp; Full-Stack Systems Engineer
                </p>
                <p className="text-xs text-slate-300 print:text-slate-600 mt-1 font-medium">
                  Dhaka, Bangladesh • Open to Worldwide Remote Contracts &amp; Consulting
                </p>
              </div>

              {/* Direct Coordinate Links */}
              <div className="text-xs space-y-1 font-mono text-slate-200 print:text-slate-700 font-medium">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan print:text-blue-600 shrink-0" />
                  <a href={`mailto:${profileData.contacts.primaryEmail}`} className="hover:underline">
                    {profileData.contacts.primaryEmail}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-600 shrink-0" />
                  <span>+{profileData.contacts.whatsappNumber} (WhatsApp)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300 print:text-slate-700 shrink-0" />
                  <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/naimsmahmud50-dotcom
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-2 print:text-blue-800">
              // EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 print:text-slate-700 leading-relaxed font-normal">
              Results-oriented Systems Architect specializing in autonomous AI agents, enterprise workflow automation, and defensive software engineering. Extensive expertise designing zero-inbound-port background surveillance daemons, offline-first mobile applications with local SQLite sync, and robust multi-agent tool loops. Focused on eliminating manual operational lag while upholding uncompromising data privacy and defensive security standards.
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
              // CORE TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block mb-1">
                  🤖 Autonomous AI &amp; Agentic Systems
                </span>
                <p className="text-slate-300 print:text-slate-600">
                  LLM Tool Calling, Multi-Agent Loops, Structured Outputs (Zod), RAG Architecture, Prompt Engineering.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block mb-1">
                  ⚡ Full-Stack &amp; Scalable Architecture
                </span>
                <p className="text-slate-300 print:text-slate-600">
                  Next.js 15 (App Router), React 19, TypeScript, NestJS 12, PostgreSQL, REST APIs, Tailwind CSS.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block mb-1">
                  📱 Mobile &amp; Offline-First Systems
                </span>
                <p className="text-slate-300 print:text-slate-600">
                  Flutter, Drift (SQLite local storage), Riverpod State Management, Firebase Authentication &amp; Firestore.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block mb-1">
                  🛡️ Defensive Security &amp; Infrastructure
                </span>
                <p className="text-slate-300 print:text-slate-600">
                  Zero Inbound Open Ports, Telegram MTProto Tunnels, Sliding-Window DoS Throttling, Hardware Watchdogs.
                </p>
              </div>
            </div>
          </div>

          {/* Key Engineering Implementations */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
              // FLAGSHIP IMPLEMENTATIONS &amp; CASE STUDIES
            </h2>
            <div className="space-y-4 text-xs">
              
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-slate-100 print:text-slate-900">
                    Personal PC Security (SecureMyPC)
                  </h3>
                  <span className="font-mono text-[10px] text-cyan print:text-blue-700">Production Concept</span>
                </div>
                <p className="text-slate-300 print:text-slate-600 mb-2 font-medium">
                  Windows Remote Administration &amp; Hardware Watchdog Daemon via Encrypted Telegram Bot.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-200 print:text-slate-700">
                  <li>Engineered zero-inbound-port outbound polling daemon protecting workstations behind NAT firewalls.</li>
                  <li>Real-time USB watchdog detecting flash drive intrusions within 2 seconds with automatic webcam capture.</li>
                  <li>Single-owner whitelist authentication with Google Gemini AI conversational desktop automation.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-slate-100 print:text-slate-900">
                    Bangladesh Madrasa Management System (Madrasha Ecosystem)
                  </h3>
                  <span className="font-mono text-[10px] text-cyan print:text-blue-700">Active Development</span>
                </div>
                <p className="text-slate-300 print:text-slate-600 mb-2 font-medium">
                  Multi-Platform Offline-First Educational ERP (Flutter + NestJS 12 + Drift SQLite).
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-200 print:text-slate-700">
                  <li>Architected offline-first mobile app for teachers with zero-latency Drift SQLite persistence.</li>
                  <li>Integrated automated multi-channel notification engine dispatching daily attendance alerts via SMS/WhatsApp.</li>
                  <li>NestJS 12 modular REST backend with PostgreSQL and role-based guardian portals.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-slate-100 print:text-slate-900">
                    Autonomous Personal AI Agent Loop
                  </h3>
                  <span className="font-mono text-[10px] text-cyan print:text-blue-700">Active Development</span>
                </div>
                <p className="text-slate-300 print:text-slate-600 mb-2 font-medium">
                  Goal-Directed Autonomous Workflow Runner with Deterministic Tool Execution.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-200 print:text-slate-700">
                  <li>Multi-step Planner, Executor, and Verifier architecture preventing infinite execution loops.</li>
                  <li>Runtime Zod schema validation ensuring 100% structured type safety across tool boundaries.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Education & Verified Credentials */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3 print:text-blue-800">
              // VERIFIED CREDENTIALS &amp; APPLIED TRAINING
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block">
                  AI Automation &amp; Intelligent Systems
                </span>
                <span className="text-cyan print:text-blue-700 block">As-Sunnah Skill Development Institute</span>
                <span className="text-[11px] text-slate-300 print:text-slate-600 font-medium">
                  Applied autonomous agent design, workflow orchestration &amp; enterprise production paradigms.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 print:bg-slate-50 print:border-slate-200">
                <span className="font-bold text-white print:text-slate-900 block">
                  Ethical Hacking &amp; Corporate Internship
                </span>
                <span className="text-cyan print:text-blue-700 block">Arenta Web Security (Certified)</span>
                <span className="text-[11px] text-slate-400 print:text-slate-600">
                  Web security fundamentals, vulnerability assessment, defensive coding &amp; corporate workflows.
                </span>
              </div>
            </div>
          </div>

          {/* Footer Coordinates */}
          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 print:border-slate-300 print:text-slate-600">
            <p>Certified Portfolio: https://portfolio-sigma-rouge-68.vercel.app</p>
            <p className="mt-1">Available immediately for high-ticket contracts, consulting, and engineering roles.</p>
          </div>

        </div>
      </div>

    </div>
  );
}
