"use client";

import React from "react";
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
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // WHAT I BUILD &amp; DELIVER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Engineered Services &amp; Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Outcome-focused digital services: From modern websites and Android mobile apps to emergency website bug fixes and intelligent workflow automations.
          </p>
        </div>

        {/* 10 Services Grid (Section 9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl tech-card flex flex-col justify-between group hover:border-cyan/40 hover:scale-[1.01] transition-all"
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

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Outcome Callout (Section 9: Clear outcome-oriented language) */}
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
                  className="p-1 text-slate-300 hover:text-cyan group-hover:translate-x-0.5 transition-all"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
