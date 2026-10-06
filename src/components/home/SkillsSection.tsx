"use client";

import React, { useState } from "react";
import { skillCategoriesData } from "@/data/skills";
import { ProficiencyLevel } from "@/types";
import { Cpu, Terminal, Sparkles, Shield, Layers, Smartphone, Cloud, Check } from "lucide-react";

const getBadgeStyle = (level: ProficiencyLevel) => {
  switch (level) {
    case "Building With":
      return "bg-electric-950 text-electric-400 border-electric-500/40";
    case "Hands-on":
      return "bg-cyan/15 text-cyan border-cyan/40";
    case "Working Knowledge":
      return "bg-slate-800 text-slate-300 border-slate-700";
    case "Learning":
      return "bg-amber-950/40 text-amber-300 border-amber-500/30";
    default:
      return "bg-slate-800 text-slate-300 border-slate-700";
  }
};

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillCategoriesData.map((c) => c.title)];

  const displayedCategories =
    selectedCategory === "All"
      ? skillCategoriesData
      : skillCategoriesData.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Skills &amp; Technology Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Transparent, balanced proficiencies across automation, development, cloud infrastructure, and security.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-electric-600 text-white shadow-md shadow-electric-600/30"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-6 rounded-2xl tech-card flex flex-col justify-between group hover:border-cyan/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{cat.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-transform group-hover:scale-[1.01] ${getBadgeStyle(
                        skill.level
                      )}`}
                    >
                      <span>{skill.name}</span>
                      <span className="text-[9px] font-mono opacity-70 border-l border-current/20 pl-1">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer legend */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{cat.skills.length} verified technologies</span>
                <span className="text-emerald-400/80">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Transparency Note (Section 5, 8 & 50) */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
          <Shield className="w-4 h-4 text-cyan shrink-0" />
          <p>
            <strong className="text-slate-300">Authenticity Commitment: </strong> 
            Skills reflect practical application and active study. Tools and concepts are labeled according to genuine hands-on experience without inflated claims.
          </p>
        </div>

      </div>
    </section>
  );
}
