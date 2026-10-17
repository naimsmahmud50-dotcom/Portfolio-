"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Cpu, Sparkles, CheckCircle2, CornerDownLeft, Play } from "lucide-react";
import { profileData } from "@/data/profile";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "agent";
  text: string;
  timestamp?: string;
}

const PRESET_COMMANDS = ["status", "projects", "skills", "services", "contact", "clear"];

export function HeroTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "[SYSTEM] MAHMUD ENGINEERING SENTINEL v2.6.0 [INITIALIZED]",
    },
    {
      id: "init-2",
      type: "system",
      text: "[SECURITY] Outbound MTProto Tunnel: ACTIVE | Runtime Zod Defense: ARMED",
    },
    {
      id: "init-3",
      type: "output",
      text: 'Type a command or click a quick chip below (e.g. "projects", "status", "skills")',
    },
  ]);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines, isRunning]);

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const userLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: "input",
      text: `$ ${cmd.trim()}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLines((prev) => [...prev, userLine]);
    setInputVal("");

    if (trimmed === "clear") {
      setLines([
        {
          id: `init-${Date.now()}`,
          type: "system",
          text: "[SYSTEM] Terminal display cleared. Ready for next command.",
        },
      ]);
      return;
    }

    if (trimmed === "projects") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[FLAGSHIP ARCHITECTURES & CASE STUDIES]",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  1. SecureMyPC: Remote surveillance & hardware watchdog daemon via Telegram & Gemini AI",
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: "  2. Madrasa Ecosystem: Offline-first Flutter mobile client (Drift SQLite) + NestJS backend",
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: "  3. Personal AI Agent: Bounded autonomous tool-calling assistant with schema validation",
        },
        {
          id: `out-${Date.now()}-5`,
          type: "output",
          text: '  -> Visit /projects to view complete architectures and live case studies.',
        },
      ]);
      return;
    }

    if (trimmed === "status") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "output",
          text: "[STATUS] SYSTEM VITALS: 100% HEALTHY",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  - Environment: Next.js 15 (React 19) / TypeScript 5 / Tailwind CSS",
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: "  - Sentinel Service: Active (Zero Inbound Open Ports / Tunnel Isolated)",
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: "  - Hardware Watchdog: USB Sensor Engine Operational (<2.0s Response)",
        },
        {
          id: `out-${Date.now()}-5`,
          type: "output",
          text: "  - Security Posture: Sliding-Window IP Throttling + Runtime Zod Sanitization",
        },
        {
          id: `out-${Date.now()}-6`,
          type: "system",
          text: "  - Availability: Available for Web, Mobile, Problem Solving & Automation Contracts",
        },
      ]);
      return;
    }

    if (trimmed === "skills" || trimmed === "stack") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "output",
          text: "[TECH STACK & CORE COMPETENCIES]",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  - Web Applications : Next.js 15, React 19, TypeScript, Tailwind CSS, REST APIs",
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: "  - Mobile Systems   : Android Native, Flutter, Drift SQLite, Riverpod, Offline Sync",
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: "  - Problem Solving  : Website Debugging, Critical Bug Fixes, Core Web Vitals Speed Boost",
        },
        {
          id: `out-${Date.now()}-5`,
          type: "output",
          text: "  - Automation       : Workflow Webhooks, Python/Node Daemons, AI Tool Agents",
        },
        {
          id: `out-${Date.now()}-6`,
          type: "output",
          text: "  - Security         : Input Sanitization, Rate Limiting, Threat Mitigation, OWASP Best Practices",
        },
      ]);
      return;
    }

    if (trimmed === "contact") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[DIRECT CONTACT CHANNELS]",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: `  • Primary Email : ${profileData.contacts.primaryEmail}`,
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: `  • Direct WhatsApp: +${profileData.contacts.whatsappNumber} (${profileData.contacts.whatsappDisplay})`,
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: `  • GitHub Profile : ${profileData.socials.github}`,
        },
      ]);
      return;
    }

    if (trimmed === "resume" || trimmed === "cv") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-resume-modal"));
      }
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[RESUME MODAL] Launching Executive Resume Preview...",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  - Full verified credentials, architecture case studies, and PDF print preview opened.",
        },
      ]);
      return;
    }

    if (trimmed === "services") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[CORE SERVICES & CAPABILITIES]",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  1. Modern Website Development (Fast, SEO-ready, responsive Next.js/React)",
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: "  2. Full-Stack Web Applications (Next.js 15, SaaS dashboards, auth & databases)",
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: "  3. Android & Mobile App Development (Flutter, native Android, offline-first Drift)",
        },
        {
          id: `out-${Date.now()}-5`,
          type: "output",
          text: "  4. Website Problem Solving & Bug Fixing (Emergency bug fixing & speed boost)",
        },
        {
          id: `out-${Date.now()}-6`,
          type: "output",
          text: "  5. Workflow Automation & Smart Systems (Automated pipelines, APIs & agent loops)",
        },
      ]);
      return;
    }

    if (trimmed === "sprints") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[SPRINT ENGAGEMENT MODELS & SCOPES]",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  • [SPRINT 01] Modern Website & Web App Development (1-2 Weeks Turnaround)",
        },
        {
          id: `out-${Date.now()}-3`,
          type: "output",
          text: "  • [SPRINT 02] Android & Cross-Platform App Development (3-5 Weeks / Most Popular)",
        },
        {
          id: `out-${Date.now()}-4`,
          type: "output",
          text: "  • [SPRINT 03] Website Problem Solving & Automation Systems (24-48h Emergency / Retainer)",
        },
      ]);
      return;
    }

    if (trimmed === "book" || trimmed === "hire" || trimmed === "discovery") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("open-discovery-modal", {
            detail: { sprint: "Terminal VIP Discovery" },
          })
        );
      }
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "system",
          text: "[STRATEGY CALL] Launching 15-Minute Strategy Discovery Dialogue...",
        },
        {
          id: `out-${Date.now()}-2`,
          type: "output",
          text: "  - Instant WhatsApp VIP dialogue and direct calendar booking loaded.",
        },
      ]);
      return;
    }

    if (trimmed === "help") {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}-1`,
          type: "output",
          text: "AVAILABLE COMMANDS: projects, status, skills, services, sprints, diagnostics, book, resume, contact, clear, help",
        },
      ]);
      return;
    }

    if (trimmed === "diagnostics" || trimmed === "run-agent" || trimmed === "benchmark") {
      setIsRunning(true);
      const steps = [
        "1. [VALIDATION] Verifying Next.js 15 App Router endpoints and strict TypeScript types... OK",
        "2. [DATABASE] Checking Drift SQLite offline-first sync schema and transaction safety... OK",
        "3. [DEFENSE] Inspecting IP sliding-window limiter and input sanitization boundaries... OK",
        "4. [ACCESSIBILITY] Testing WCAG 2.1 AA keyboard focus, contrast tokens, and reduced-motion... OK",
        "5. [BENCHMARK] All architectural diagnostics passed. 0 anomalies detected.",
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((r) => setTimeout(r, 380));
        setLines((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}-${i}`,
            type: "agent",
            text: steps[i],
          },
        ]);
      }
      setIsRunning(false);
      return;
    }

    // Unrecognized command
    setLines((prev) => [
      ...prev,
      {
        id: `err-${Date.now()}`,
        type: "output",
        text: `Command not recognized: "${cmd}". Type "help" or click one of the quick chips.`,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isRunning) {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="hero-terminal w-full rounded-2xl tech-card border-slate-800 dark:border-electric-500/30 overflow-hidden shadow-2xl backdrop-blur-xl bg-slate-950 text-left font-mono">
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-200 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan" />
            <span>mahmud-sentinel // interactive-sandbox</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE DAEMON</span>
          </span>
          <span className="text-xs font-mono text-slate-300 hidden sm:inline">12ms</span>
        </div>
      </div>

      {/* Terminal Log Screen */}
      <div
        ref={outputRef}
        className="p-4 sm:p-5 h-52 sm:h-60 overflow-y-auto space-y-1.5 text-xs text-slate-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800"
      >
        {lines.map((l) => {
          if (l.type === "input") {
            return (
              <div key={l.id} className="text-cyan font-bold flex items-center gap-1">
                <span>{l.text}</span>
              </div>
            );
          }
          if (l.type === "system") {
            return (
              <div key={l.id} className="text-emerald-300 text-xs font-semibold">
                {l.text}
              </div>
            );
          }
          if (l.type === "agent") {
            return (
              <div key={l.id} className="text-purple-300 pl-2 border-l-2 border-purple-500/60 text-xs">
                {l.text}
              </div>
            );
          }
          return (
            <div key={l.id} className="text-slate-200 text-xs whitespace-pre-wrap font-normal">
              {l.text}
            </div>
          );
        })}

        {isRunning && (
          <div className="text-cyan text-xs animate-pulse flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            <span>Agent executing multi-step plan...</span>
          </div>
        )}
      </div>

      {/* Command Pills for 1-Click Execution */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-300 font-sans font-semibold mr-1">Quick Run:</span>
        {PRESET_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            disabled={isRunning}
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-cyan border border-slate-700/80 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 font-medium cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Command Input Line */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/90 flex items-center gap-2">
        <span className="text-cyan font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isRunning}
          placeholder={isRunning ? "Processing command..." : "Type command ('status', 'run-agent') and hit Enter..."}
          className="flex-1 bg-transparent text-slate-100 text-xs placeholder:text-slate-400 outline-none"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          disabled={isRunning || !inputVal.trim()}
          className="p-1 rounded bg-slate-800 hover:bg-cyan hover:text-slate-950 text-slate-300 transition-colors disabled:opacity-30"
          title="Send Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
