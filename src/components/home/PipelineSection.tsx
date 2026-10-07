"use client";

import React, { useState, useEffect, useRef } from "react";
import { pipelineStepsData } from "@/data/pipeline";
import {
  Workflow,
  HelpCircle,
  Zap,
  Brain,
  Terminal,
  Repeat,
  Database,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Play,
  Square,
  RotateCcw,
  Activity,
} from "lucide-react";

const getPipelineIcon = (iconName: string) => {
  switch (iconName) {
    case "HelpCircle":
      return <HelpCircle className="w-4 h-4 text-amber-400" />;
    case "Zap":
      return <Zap className="w-4 h-4 text-cyan" />;
    case "Brain":
      return <Brain className="w-4 h-4 text-electric-400" />;
    case "Terminal":
      return <Terminal className="w-4 h-4 text-emerald-400" />;
    case "Repeat":
      return <Repeat className="w-4 h-4 text-indigo-400" />;
    case "Database":
      return <Database className="w-4 h-4 text-teal-400" />;
    case "Send":
      return <Send className="w-4 h-4 text-pink-400" />;
    case "CheckCircle2":
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    default:
      return <Sparkles className="w-4 h-4 text-cyan" />;
  }
};

const SIMULATION_TELEMETRY: Record<number, { phase: string; log: string }> = {
  1: {
    phase: "INGESTION",
    log: "Trigger received via authenticated HTTPS Webhook. Payload SHA-256 HMAC validated.",
  },
  2: {
    phase: "NORMALIZATION",
    log: "Sanitizing unstructured payload with strict runtime Zod guards. 14 schema entities isolated.",
  },
  3: {
    phase: "REASONING",
    log: "Autonomous Gemini LLM agent evaluated task constraints & selected optimal toolchain.",
  },
  4: {
    phase: "EXECUTION",
    log: "Executing actions across outbound zero-inbound MTProto tunnel. Microservice latency: 19ms.",
  },
  5: {
    phase: "VERIFICATION",
    log: "Self-correction guard verified execution assertions. 0 schema anomalies detected.",
  },
  6: {
    phase: "PERSISTENCE",
    log: "State committed to local Drift SQLite store with asynchronous PostgreSQL sync queued.",
  },
  7: {
    phase: "NOTIFICATION",
    log: "Dispatching multi-channel event alert to Telegram executive channel & WhatsApp webhook.",
  },
  8: {
    phase: "SLA_COMPLETE",
    log: "Pipeline converged successfully in 1,240ms. Zero bottlenecks. Status: 200 OK.",
  },
};

export function PipelineSection() {
  const [activeStep, setActiveStep] = useState<number>(3); // Defaults to AI & Logic step
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<
    Array<{ step: number; phase: string; log: string; timestamp: string }>
  >([]);

  const telemetryRef = useRef<HTMLDivElement>(null);
  const current = pipelineStepsData.find((s) => s.step === activeStep) || pipelineStepsData[0];

  // Simulation execution timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setTimeout(() => {
        if (activeStep < 8) {
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          setSimulationLogs((prev) => [
            ...prev,
            {
              step: nextStep,
              phase: SIMULATION_TELEMETRY[nextStep].phase,
              log: SIMULATION_TELEMETRY[nextStep].log,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } else {
          // Completed simulation
          setIsSimulating(false);
        }
      }, 1300);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, activeStep]);

  // Auto-scroll telemetry log
  useEffect(() => {
    if (telemetryRef.current) {
      telemetryRef.current.scrollTop = telemetryRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  const handleStartSimulation = () => {
    setActiveStep(1);
    setIsSimulating(true);
    setSimulationLogs([
      {
        step: 1,
        phase: SIMULATION_TELEMETRY[1].phase,
        log: SIMULATION_TELEMETRY[1].log,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setActiveStep(3);
    setSimulationLogs([]);
  };

  return (
    <section id="pipeline" className="py-20 md:py-28 bg-slate-950/50 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Simulation Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>05 // ARCHITECTURAL BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
              How I Build Intelligent Systems
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              An end-to-end interactive architecture: from unstructured real-world bottlenecks to deterministic, automated outcomes.
            </p>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {!isSimulating ? (
              <button
                onClick={handleStartSimulation}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white text-xs font-semibold shadow-lg shadow-cyan/25 hover:shadow-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Live Workflow</span>
              </button>
            ) : (
              <button
                onClick={handleStopSimulation}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all animate-pulse"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Halt Simulation</span>
              </button>
            )}

            {simulationLogs.length > 0 && !isSimulating && (
              <button
                onClick={handleResetSimulation}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar during simulation */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan" />
              <span>
                {isSimulating
                  ? `Simulating Stage 0${activeStep} of 08...`
                  : `Selected Node: Stage 0${activeStep} // ${current.phase}`}
              </span>
            </span>
            <span className="text-cyan font-bold">{Math.round((activeStep / 8) * 100)}% Execution</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-electric-500 via-cyan to-emerald-400 transition-all duration-500"
              style={{ width: `${(activeStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* 8-Step Pipeline Stepper Bar */}
        <div className="p-2 sm:p-3 rounded-2xl bg-slate-900/90 border border-electric-500/20 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            {pipelineStepsData.map((step) => {
              const isActive = step.step === activeStep;
              const isPast = step.step < activeStep;

              return (
                <button
                  key={step.step}
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStep(step.step);
                  }}
                  className={`flex-1 flex flex-col items-center py-2.5 px-2 rounded-xl text-center transition-all ${
                    isActive
                      ? "bg-gradient-to-b from-electric-600/40 to-cyan/20 border border-cyan/50 shadow-md shadow-cyan/20 scale-[1.02]"
                      : isPast
                      ? "hover:bg-slate-800/60 text-slate-300"
                      : "hover:bg-slate-800/60 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                        isActive
                          ? "bg-cyan text-slate-950 ring-2 ring-cyan/40"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : step.step}
                    </span>
                    {getPipelineIcon(step.icon)}
                  </div>
                  <span
                    className={`text-[11px] font-bold line-clamp-1 ${
                      isActive ? "text-slate-100" : isPast ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">
                    {step.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Node Detail Card */}
        <div className="p-6 sm:p-8 rounded-3xl tech-card border-electric-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step Description (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-cyan/15 text-cyan border border-cyan/30 text-xs font-mono font-bold">
                  STAGE 0{current.step} // {current.phase}
                </span>
                <span className="text-xs text-slate-500 font-mono">EXECUTION_NODE</span>
                {isSimulating && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SIMULATING
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {current.title}
              </h3>

              <p className="mt-3 text-base sm:text-lg text-slate-300 font-medium">
                {current.summary}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {current.details}
              </p>

              {/* Tools & Handled Components */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Components &amp; Protocols:</span>
                {current.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Flow Visualizer Graphic (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-600 to-cyan flex items-center justify-center p-1 shadow-xl shadow-electric-600/30 mb-4 relative">
                {isSimulating && (
                  <span className="absolute -inset-1 rounded-2xl bg-cyan/40 animate-ping pointer-events-none" />
                )}
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center scale-100">
                  {getPipelineIcon(current.icon)}
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-slate-200">Stage Hand-off</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                  <span>{current.step > 1 ? `Stage 0${current.step - 1}` : "Source"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan" />
                  <span className="text-cyan font-bold">Stage 0{current.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan" />
                  <span>{current.step < 8 ? `Stage 0${current.step + 1}` : "SLA Done"}</span>
                </div>
              </div>

              {/* Navigation stepper buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  disabled={current.step === 1 || isSimulating}
                  onClick={() => setActiveStep(Math.max(1, current.step - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 transition-colors"
                >
                  Previous Node
                </button>
                <button
                  disabled={current.step === 8 || isSimulating}
                  onClick={() => setActiveStep(Math.min(8, current.step + 1))}
                  className="px-3 py-1.5 rounded-lg bg-electric-600 text-white text-xs font-medium disabled:opacity-30 disabled:pointer-events-none hover:bg-electric-500 transition-colors"
                >
                  Next Node
                </button>
              </div>

            </div>

          </div>

          {/* Real-time Simulation Telemetry Console */}
          {simulationLogs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800/80 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan uppercase font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>// LIVE PIPELINE TELEMETRY FEED</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  STREAMING LOGS ({simulationLogs.length}/8)
                </span>
              </div>

              <div
                ref={telemetryRef}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 max-h-36 overflow-y-auto space-y-1.5 font-mono text-[11px] text-slate-300 scrollbar-thin scrollbar-thumb-slate-800"
              >
                {simulationLogs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 shrink-0">[{item.timestamp}]</span>
                    <span className="text-cyan font-bold shrink-0">{item.phase}</span>
                    <span className="text-slate-600">│</span>
                    <span className="text-slate-200">{item.log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
