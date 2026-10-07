"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ProjectCategory } from "@/types";
import { ProjectCard } from "../projects/ProjectCard";
import { FolderGit2, Search, ExternalLink, Share2 } from "lucide-react";
import { profileData } from "@/data/profile";

const categories: ProjectCategory[] = [
  "All",
  "AI Automation",
  "AI Agents",
  "Web Apps",
  "Security",
  "Productivity",
];

function ProjectsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial filters from URL search params
  const urlCategory = searchParams.get("category") as ProjectCategory;
  const initialCategory = categories.includes(urlCategory) ? urlCategory : "All";
  const initialQuery = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sync internal state with browser back/forward URL navigation
  useEffect(() => {
    const cat = searchParams.get("category") as ProjectCategory;
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    } else if (!cat) {
      setActiveCategory("All");
    }

    const q = searchParams.get("q");
    setSearchQuery(q ?? "");
  }, [searchParams]);

  // Synchronize state updates back to URL search params without page jumping
  const updateUrlParams = useCallback(
    (newCategory: ProjectCategory, newQuery: string) => {
      const params = new URLSearchParams();
      if (newCategory !== "All") {
        params.set("category", newCategory);
      }
      if (newQuery.trim().length > 0) {
        params.set("q", newQuery.trim());
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}#projects` : `${pathname}#projects`;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router]
  );

  const handleCategoryChange = (cat: ProjectCategory) => {
    setActiveCategory(cat);
    updateUrlParams(cat, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlParams(activeCategory, query);
  };

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    router.replace(`${pathname}#projects`, { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>06 // REAL IMPLEMENTATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
              Featured Case Studies &amp; Projects
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Scalable, security-conscious systems designed to automate workflows and solve real operational problems.
            </p>
          </div>

          {/* Search Bar with Bidirectional URL State */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs with Bidirectional URL State */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-cyan text-slate-950 font-bold shadow-md shadow-cyan/25"
                  : "bg-slate-900/70 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-base text-slate-200 font-medium">No matching projects found</p>
            <p className="text-xs text-slate-300 mt-1">Try refining your search keyword or selecting "All" categories.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-electric-600 text-white text-xs font-medium hover:bg-electric-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dedicated "Naim Knows" Social Presence Card */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/70 to-slate-950 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono mb-2">
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>MEDIA &amp; KNOWLEDGE INITIATIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Naim Knows — Demystifying AI &amp; Practical Tech
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              Mahmud's personal initiative bringing grounded explanations, hands-on automation demos, and cybersecurity awareness directly to aspiring builders and technology enthusiasts.
            </p>
          </div>

          <a
            href={profileData.socials.naimKnowsFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all shrink-0"
          >
            <span>Explore Naim Knows Page</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

function ProjectsLoadingFallback() {
  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-64 bg-slate-800/40 rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
          <div className="h-64 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <Suspense fallback={<ProjectsLoadingFallback />}>
      <ProjectsContent />
    </Suspense>
  );
}
