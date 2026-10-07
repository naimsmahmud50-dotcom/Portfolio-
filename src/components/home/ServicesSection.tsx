"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/services";
import {
  Layers,
  Cpu,
  Bot,
  Workflow,
  Sparkles,
  Globe,
  Smartphone,
  Database,
  Gauge,
  ShieldCheck,
  ArrowUpRight,
  Wrench,
  ChevronDown,
} from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Globe":
      return <Globe className="w-5 h-5 text-emerald-400" />;
    case "Layers":
      return <Layers className="w-5 h-5 text-cyan" />;
    case "Smartphone":
      return <Smartphone className="w-5 h-5 text-pink-400" />;
    case "Wrench":
      return <Wrench className="w-5 h-5 text-amber-400" />;
    case "Workflow":
      return <Workflow className="w-5 h-5 text-blue-400" />;
    case "Bot":
      return <Bot className="w-5 h-5 text-cyan" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-electric-400" />;
    case "Sparkles":
      return <Sparkles className="w-5 h-5 text-violet-400" />;
    case "Database":
      return <Database className="w-5 h-5 text-teal-400" />;
    case "Gauge":
      return <Gauge className="w-5 h-5 text-indigo-400" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    default:
      return <Cpu className="w-5 h-5 text-cyan" />;
  }
};

export function ServicesSection() {
  const [showAllServices, setShowAllServices] = useState(false);

  // Present the top 4 flagship offerings by default to prevent cognitive clutter
  const displayedServices = showAllServices ? servicesData : servicesData.slice(0, 4);

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient chromatic refraction orbs behind the frosted glass */}
      <div className="absolute top-1/4 -left-10 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-500/12 via-blue-500/10 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-[480px] h-[480px] bg-gradient-to-bl from-purple-500/10 via-electric-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-teal-400/8 dark:bg-cyan-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>03 // CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Engineered Services &amp; Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Outcome-focused digital services: From modern websites and Android mobile apps to emergency website bug fixes and intelligent workflow automations.
          </p>
        </div>

        {/* Dynamic Services Grid (4 Flagship Pillars or Full 10 Solutions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-3xl tech-card flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-center group-hover:border-cyan/60 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-cyan/20 backdrop-blur-md transition-all">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs text-slate-300 font-bold tracking-wider">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Outcome Callout (Nested Frosted Glass Capsule) */}
                <div className="mt-4 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-xs shadow-sm">
                  <span className="font-mono text-cyan font-bold block mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span>Measurable Outcome:</span>
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed block">
                    {service.outcome}
                  </span>
                </div>
              </div>

              {/* Tags & Interaction CTA */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-cyan hover:border-cyan/50 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1 text-xs font-mono group/btn shadow-sm"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span className="font-semibold">Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Collapse Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl tech-card text-slate-800 dark:text-slate-200 hover:text-cyan text-xs sm:text-sm font-mono transition-all cursor-pointer shadow-md group"
          >
            <span className="font-semibold">
              {showAllServices
                ? "Show Core 4 Flagship Pillars"
                : "Explore All 10 Specialized Solutions (APIs, AI, Admin Consoles, Security)"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 group-hover:text-cyan ${
                showAllServices ? "rotate-180 text-cyan" : ""
              }`}
            />
          </button>
        </div>

      </div>
    </section>
  );
}
