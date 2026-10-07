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
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              className="p-6 sm:p-7 rounded-2xl tech-card flex flex-col justify-between group hover:border-cyan/40 hover:scale-[1.01] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-slate-800 transition-colors">
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

                {/* Outcome Callout */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
                  <span className="font-mono text-cyan font-semibold block mb-0.5">Measurable Outcome:</span>
                  <span className="text-slate-100 font-medium">{service.outcome}</span>
                </div>
              </div>

              {/* Tags & Interaction CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-200 border border-slate-700/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-cyan hover:bg-slate-800 transition-all flex items-center gap-1 text-xs font-mono"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span className="hidden sm:inline">Inquire</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Collapse Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan text-slate-200 hover:text-cyan text-xs sm:text-sm font-mono transition-all cursor-pointer shadow-md"
          >
            <span>
              {showAllServices
                ? "Show Core 4 Flagship Pillars"
                : "Explore All 10 Specialized Solutions (APIs, AI, Admin Consoles, Security)"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showAllServices ? "rotate-180 text-cyan" : ""
              }`}
            />
          </button>
        </div>

      </div>
    </section>
  );
}
