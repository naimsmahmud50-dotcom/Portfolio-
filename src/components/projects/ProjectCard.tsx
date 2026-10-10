"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { ArrowUpRight, ExternalLink, Sparkles, Lock } from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const router = useRouter();

  // Navigate to project case study on click anywhere on the card
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Do not intercept external action buttons (like GitHub or Live Demo)
    if (target.closest("[data-no-card-nav]")) {
      return;
    }
    router.push(`/projects/${project.slug}`);
  };

  // Keyboard accessibility (Enter or Space navigates into the project)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View case study for ${project.title}`}
      className={`cursor-pointer rounded-3xl tech-card overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-cyan/60 hover:shadow-xl hover:shadow-cyan/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan select-none ${
        featured ? "lg:col-span-2 ring-1 ring-cyan-500/20" : ""
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
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide bg-slate-950/80 backdrop-blur-md border border-cyan/30 text-cyan">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          </div>

          {featured && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-electric-950/80 backdrop-blur-md border border-electric-500/40 text-electric-300 flex items-center gap-1 pointer-events-none">
              <Sparkles className="w-3 h-3 text-cyan" />
              <span>FEATURED CASE STUDY</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          <Link
            href={`/projects/${project.slug}`}
            className="block group-hover:text-cyan transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`font-bold text-slate-100 flex items-center justify-between gap-2 ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}>
              <span className="group-hover:text-cyan transition-colors">{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </h3>
          </Link>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions & Case Study link */}
      <div className="px-6 py-4 bg-white/50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-no-card-nav="true"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan text-xs font-mono font-medium text-slate-200 hover:text-white transition-all shadow-sm group/btn"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5 text-cyan group-hover/btn:scale-110 transition-transform" />
              <span>Source Code</span>
            </a>
          )}
          {project.isPrivateRepo && (
            <span
              data-no-card-nav="true"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] font-mono text-amber-300 select-none shadow-sm"
              title={project.accessNotice || "Proprietary Architecture (Protected under NDA)"}
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>NDA Protected</span>
            </span>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              data-no-card-nav="true"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric-950/80 hover:bg-electric-900/90 border border-electric-500/40 hover:border-cyan text-xs font-mono font-medium text-cyan hover:text-white transition-all shadow-sm group/btn"
              title="Visit Live Page"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-semibold text-cyan group-hover:text-electric-300 transition-colors flex items-center gap-1.5 font-mono"
        >
          <span>Explore Case Study</span>
          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
