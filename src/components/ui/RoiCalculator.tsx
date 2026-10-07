"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [hourlyRate, setHourlyRate] = useState<number>(40);

  // Annual savings formula: (hours/wk * hourly cost * 52 weeks) * 85% automation efficiency
  const annualManualCost = hoursPerWeek * hourlyRate * 52;
  const annualSavings = Math.round(annualManualCost * 0.85);
  const hoursRecoveredPerYear = Math.round(hoursPerWeek * 52 * 0.85);

  const formattedSavings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(annualSavings);

  const handleOpenDiscovery = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-discovery-modal", {
          detail: { sprint: `Custom AI Pipeline (${formattedSavings}/yr ROI)` },
        })
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative rounded-3xl p-6 sm:p-10 tech-card border-cyan-500/30 overflow-hidden shadow-2xl backdrop-blur-xl bg-slate-950/80">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-electric-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sliders & Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan">
              <Calculator className="w-3.5 h-3.5" />
              <span>BUSINESS VALUE METRICS // ROI CALCULATOR</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Calculate Your Automation ROI
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Estimate how much operational capital and team bandwidth Mahmud's autonomous AI pipelines recover for your company every year.
              </p>
            </div>

            {/* Slider 1: Weekly Hours */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan" />
                  <span>Weekly Manual Operational Hours</span>
                </label>
                <span className="text-sm font-bold font-mono text-cyan px-2.5 py-0.5 rounded bg-cyan/10 border border-cyan/30">
                  {hoursPerWeek} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                step={1}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-cyan h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>5 hrs (Small Team)</span>
                <span>40 hrs (Full-time)</span>
                <span>80 hrs (Multi-dept)</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Average Staff Cost per Hour</span>
                </label>
                <span className="text-sm font-bold font-mono text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={120}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>$20/hr (Junior)</span>
                <span>$60/hr (Specialist)</span>
                <span>$120/hr (Senior / Agency)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Impact Dashboard (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-cyan-500/40 shadow-xl space-y-6">
            
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Projected Annual Business Value
              </span>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-emerald-300 to-teal-200 font-mono tracking-tight">
                {formattedSavings}
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Recapturing approximately <strong className="text-slate-200 font-mono">{hoursRecoveredPerYear.toLocaleString()} hours</strong> of productive team bandwidth annually.
                </span>
              </p>
            </div>

            {/* Dual Micro KPIs */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-electric-400 font-bold mb-1">
                  <Zap className="w-3.5 h-3.5 text-cyan" />
                  <span>10x Speed</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Seconds-level agent turnaround vs manual multi-hour processing lag.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>99.8% Accuracy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Eliminating manual entry errors via deterministic schema validations.
                </p>
              </div>
            </div>

            {/* Direct CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleOpenDiscovery}
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-electric-600 via-cyan to-teal-400 hover:from-electric-500 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan/25 hover:shadow-cyan/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Automate This With Mahmud</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] font-mono text-slate-500 mt-3">
                Free 15-Minute Architectural Audit • Zero Commitment • Direct Discovery
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
