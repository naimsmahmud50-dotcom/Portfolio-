"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowUpRight, ExternalLink, ShieldCheck, Cpu, Bot, Sparkles } from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article
      className={`rounded-2xl tech-card overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.01] hover:border-cyan/50 ${
        featured ? "lg:col-span-2 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90" : ""
      }`}
    >
      <div>
        {/* Visual Cover Header */}
        <div className={`relative w-full bg-slate-950 overflow-hidden ${featured ? "h-64 sm:h-72" : "h-52"}`}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide bg-slate-950/80 backdrop-blur-md border border-cyan/30 text-cyan">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          </div>

          {featured && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-electric-950/80 backdrop-blur-md border border-electric-500/40 text-electric-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan" />
              <span>FEATURED CASE STUDY</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          <Link href={`/projects/${project.slug}`} className="group-hover:text-cyan transition-colors">
            <h3 className={`font-bold text-slate-100 flex items-center justify-between gap-2 ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}>
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </h3>
          </Link>

          <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions & Case Study link */}
      <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-100 p-1 transition-colors"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan p-1 transition-colors"
              title="Visit Live Page"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-semibold text-cyan hover:text-electric-400 transition-colors flex items-center gap-1 font-mono"
        >
          <span>Read Case Study</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
