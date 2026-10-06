import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  const { caseStudy } = project;

  return (
    <article className="min-w-full bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 tech-grid-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb (Section 38: Back to Projects) */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; BACK TO ALL PROJECTS</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan/20 text-cyan border border-cyan/40">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {caseStudy.overview}
          </p>

          {/* External Links */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-medium transition-all"
              >
                <GithubIcon className="w-4 h-4 text-slate-300" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-md shadow-electric-600/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Platform</span>
              </a>
            )}
          </div>
        </header>

        {/* Cover Artwork Hero Frame */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-electric-500/30 shadow-2xl mb-12 bg-slate-900">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* 2-Column Overview: Problem vs Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>THE PROBLEM</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan/20">
            <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>THE ENGINEERING GOAL</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {caseStudy.goal}
            </p>
          </div>
        </div>

        {/* Engineered Solution */}
        <section className="mb-12 p-8 rounded-2xl tech-card">
          <div className="flex items-center gap-2 text-electric-400 font-mono text-xs font-bold mb-3">
            <Cpu className="w-4 h-4" />
            <span>ARCHITECTED SOLUTION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">
            How The System Solves The Challenge
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {caseStudy.solution}
          </p>
        </section>

        {/* System Architecture Steps */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-4">
            <Layers className="w-4 h-4" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.architecture.map((layer, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-electric-950 text-cyan border border-cyan/30 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-200">{layer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features & Capabilities */}
        <section className="mb-12 p-8 rounded-2xl tech-card">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Key Features &amp; Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseStudy.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Security Considerations (Section 25 & 38) */}
        <section className="mb-12 p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80">
          <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>DEFENSIVE &amp; SECURITY CONSIDERATIONS</span>
          </div>
          <ul className="space-y-2">
            {caseStudy.securityConsiderations.map((sec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technology Stack Badges */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold mb-4">
            <Terminal className="w-4 h-4 text-cyan" />
            <span>TECHNOLOGY STACK</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(project.techStack).flatMap(([group, items]) =>
              (items || []).map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200"
                >
                  <span className="text-slate-500 uppercase mr-1">{group}:</span>
                  {item}
                </span>
              ))
            )}
          </div>
        </section>

        {/* Next / Previous Project Pagination (Section 38) */}
        <footer className="pt-10 border-t border-slate-800 flex items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-cyan font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous: </span>
            <span className="text-slate-200 font-bold">{prevProject.title}</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-cyan font-mono transition-colors text-right"
          >
            <span className="hidden sm:inline">Next: </span>
            <span className="text-slate-200 font-bold">{nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </footer>

      </div>
    </article>
  );
}
