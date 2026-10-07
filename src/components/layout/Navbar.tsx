"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";
import { profileData } from "@/data/profile";
import {
  Menu,
  X,
  Sun,
  Moon,
  Terminal,
  Search,
  Workflow,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Zap,
  FileText,
  Layers,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

// Curated primary frontline links - directly visible in the front navbar
const primaryNavLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];

// Specialized deep-dive engineering modules housed inside the executive right drawer
const deepDiveModules = [
  {
    name: "8-Stage Pipeline",
    href: "#pipeline",
    badge: "Autonomous Loop",
    description: "Spec-driven autonomous engineering workflow from spec to deployment",
    icon: Workflow,
    color: "text-cyan",
    border: "group-hover:border-cyan/40",
    bg: "bg-cyan/10 border-cyan/30",
  },
  {
    name: "Defensive Security",
    href: "#security",
    badge: "Zero-Trust",
    description: "Zero-trust hardening, DDoS mitigation & threat isolation protocols",
    icon: ShieldCheck,
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    name: "Sprint Engagements",
    href: "#engagement",
    badge: "High Velocity",
    description: "Fixed-scope 2-3 week high-velocity delivery sprints with strict SLAs",
    icon: Zap,
    color: "text-amber-400",
    border: "group-hover:border-amber-500/40",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
];

// Complete sitemap links for quick jump inside the systems drawer
const sitemapLinks = [
  { name: "Home / Hero", href: "#hero" },
  { name: "Featured Projects", href: "#projects" },
  { name: "Core Services", href: "#services" },
  { name: "Skills Matrix", href: "#skills" },
  { name: "About Mahmud", href: "#about" },
  { name: "Credentials & Research", href: "#credentials" },
  { name: "Sprint Engagements", href: "#engagement" },
  { name: "8-Stage Pipeline", href: "#pipeline" },
  { name: "Defensive Security", href: "#security" },
  { name: "Contact Dialogue", href: "#contact" },
];

const domSectionOrder = [
  "hero",
  "projects",
  "services",
  "skills",
  "about",
  "credentials",
  "engagement",
  "pipeline",
  "security",
  "roi-calculator",
  "contact",
];

export function Navbar() {
  const { theme, setTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemsDrawerOpen, setSystemsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const activeSectionRef = useRef<string>("hero");
  const isManualScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close drawers on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSystemsDrawerOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when any drawer is active
  useEffect(() => {
    if (systemsDrawerOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [systemsDrawerOpen, mobileMenuOpen]);

  // Sync scroll position with active section and URL hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash.replace("#", "");
      if (domSectionOrder.includes(initialHash)) {
        setActiveSection(initialHash);
        activeSectionRef.current = initialHash;
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isManualScrollRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // 1. Bottom of page detection -> activate contact
      if (currentScrollY + clientHeight >= scrollHeight - 70) {
        syncActiveSection("contact");
        return;
      }

      // 2. Top of page detection -> activate hero
      if (currentScrollY < 120) {
        syncActiveSection("hero");
        return;
      }

      // 3. Dual-boundary detection in true DOM sequence:
      // The active section is the one currently crossing the 140px header clearance
      const navThreshold = 140;
      let detectedSection = "hero";
      let matched = false;

      for (const id of domSectionOrder) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navThreshold && rect.bottom > navThreshold) {
            detectedSection = id;
            matched = true;
            break;
          }
        }
      }

      // Fallback: If in small gaps between sections, find the closest section above threshold
      if (!matched && currentScrollY >= 120) {
        let bestId = "hero";
        let bestTop = -Infinity;
        for (const id of domSectionOrder) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= navThreshold && rect.top > bestTop) {
              bestTop = rect.top;
              bestId = id;
            }
          }
        }
        detectedSection = bestId;
      }

      syncActiveSection(detectedSection);
    };

    function syncActiveSection(sectionId: string) {
      if (activeSectionRef.current !== sectionId) {
        activeSectionRef.current = sectionId;
        setActiveSection(sectionId);

        const newHash = sectionId === "hero" ? "" : `#${sectionId}`;
        const currentHash = window.location.hash;

        if (currentHash !== newHash) {
          const newUrl = newHash
            ? `${window.location.pathname}${window.location.search}${newHash}`
            : `${window.location.pathname}${window.location.search}`;
          window.history.replaceState(null, "", newUrl);
        }
      }
    }

    // Immediately unblock manual scroll calculation when user scrolls via wheel or touch
    const handleUserScrollIntent = () => {
      isManualScrollRef.current = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserScrollIntent, { passive: true });
    window.addEventListener("touchmove", handleUserScrollIntent, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserScrollIntent);
      window.removeEventListener("touchmove", handleUserScrollIntent);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setSystemsDrawerOpen(false);
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      isManualScrollRef.current = true;
      activeSectionRef.current = targetId;
      setActiveSection(targetId);

      // Instantly update browser URL hash
      window.history.replaceState(null, "", href);

      // Smoothly scroll with fixed header clearance
      const navOffset = 78;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetScrollY = Math.max(0, elementTop - navOffset);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrollRef.current = false;
      }, 700);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 dark:bg-canvas-deep/90 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl shadow-black/30"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity: Corporate Executive Emblem */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 text-slate-100 hover:text-cyan transition-colors group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 via-cyan to-teal-400 flex items-center justify-center p-[1.5px] shadow-lg shadow-cyan/25 group-hover:scale-105 group-hover:shadow-cyan/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-sm text-cyan group-hover:text-white transition-colors">
                M/
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg text-slate-100 group-hover:text-cyan transition-colors">
                Mahmud Hasan
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-400 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-300 font-medium hidden md:block">
              Web • Apps • Problem Solving • Automation
            </span>
          </div>
        </a>

        {/* Desktop Navigation: 6 Frontline Pillars directly visible in the front bar */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {primaryNavLinks.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Bar: Unified Executive Control Dock & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Executive Utility Dock: Unified frosted capsule */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800/90 rounded-2xl p-1 backdrop-blur-xl shadow-inner shadow-black/20">
            {/* Search trigger with ⌘K */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              aria-label="Open Command Palette (Ctrl+K)"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-cyan hover:bg-slate-800/80 transition-all text-xs font-mono group"
              title="Search portfolio & actions (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan transition-colors" />
              <span className="hidden 2xl:inline text-xs font-sans text-slate-300 group-hover:text-slate-100">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-800/90 text-[10px] text-slate-300 group-hover:text-cyan border border-slate-700/80 font-mono font-medium">
                ⌘K
              </kbd>
            </button>

            {/* Subtle vertical hairline divider */}
            <div className="hidden sm:block w-px h-4 bg-slate-800 mx-1" />

            {/* Social links */}
            <div className="hidden sm:flex items-center gap-0.5">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mahmud Hasan's GitHub Profile"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mahmud Hasan's LinkedIn Profile"
                className="p-1.5 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-800/80 rounded-lg transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Subtle vertical hairline divider */}
            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Subtle vertical hairline divider */}
            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Systems / Deep-Dive Modules Drawer Trigger Icon (Far Right Icon) */}
            <button
              onClick={() => setSystemsDrawerOpen(true)}
              aria-label="Open systems and deep-dive modules drawer"
              aria-expanded={systemsDrawerOpen}
              title="All Modules: Pipeline, Security, Sprints & Sitemap"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all text-xs font-mono group cursor-pointer ${
                systemsDrawerOpen
                  ? "bg-cyan/20 text-cyan border border-cyan/40"
                  : "text-slate-300 hover:text-cyan hover:bg-slate-800/80"
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-cyan group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-xs font-sans text-slate-300 group-hover:text-slate-100 font-medium">
                Modules
              </span>
            </button>
          </div>

          {/* Standalone Executive Primary CTA Button */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("open-discovery-modal", {
                    detail: { sprint: "Strategy Discovery Session" },
                  })
                );
              }
            }}
            className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 dark:from-cyan dark:via-teal-400 dark:to-blue-500 text-white dark:text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-500/20 dark:shadow-cyan/20 hover:shadow-blue-500/40 dark:hover:shadow-cyan/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Sparkles className="w-3.5 h-3.5 fill-current text-white dark:text-slate-950 shrink-0" />
            <span className="font-semibold text-white dark:text-slate-950">Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 text-white dark:text-slate-950 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          EXECUTIVE SYSTEMS SLIDE-OVER DRAWER (Desktop & Tablet Deep-Dive Navigator)
          ========================================================================= */}
      {systemsDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setSystemsDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over panel pinned to the right edge */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
            <div className="w-screen max-w-md bg-slate-950/95 border-l border-slate-800/90 shadow-2xl backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan shadow-sm shadow-cyan/20">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-100">Executive Systems</h2>
                      <p className="text-xs text-slate-300 font-mono">Specialized Architectures &amp; Modules</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSystemsDrawerOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close systems drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Section 1: Deep-Dive Specialized Architecture Systems */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Specialized Architecture Systems
                    </span>
                    <span className="text-[10px] font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded-full border border-cyan/30 font-medium">
                      Deep Dive
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {deepDiveModules.map((item) => {
                      const Icon = item.icon;
                      const sectionId = item.href.replace("#", "");
                      const isActive = activeSection === sectionId;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`group block p-3.5 rounded-2xl border transition-all ${
                            isActive
                              ? "bg-slate-900 border-cyan/50 shadow-md shadow-cyan/10"
                              : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-9 h-9 rounded-xl ${item.bg} border flex items-center justify-center shrink-0 mt-0.5`}>
                                <Icon className={`w-4 h-4 ${item.color}`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan transition-colors">
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Executive Tools & Shortcuts */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block mb-3">
                    Executive Tools &amp; Actions
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSystemsDrawerOpen(false);
                        window.dispatchEvent(new CustomEvent("open-resume-modal"));
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left hover:border-cyan/40 hover:bg-slate-900 transition-all group cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan">
                          Executive CV
                        </div>
                        <div className="text-[10px] text-slate-400">View &amp; PDF</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSystemsDrawerOpen(false);
                        window.dispatchEvent(
                          new CustomEvent("open-discovery-modal", {
                            detail: { sprint: "Executive Systems Call" },
                          })
                        );
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left hover:border-cyan/40 hover:bg-slate-900 transition-all group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-cyan shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan">
                          Book Call
                        </div>
                        <div className="text-[10px] text-slate-400">15-min sprint</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSystemsDrawerOpen(false);
                        window.dispatchEvent(new CustomEvent("open-command-palette"));
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left hover:border-cyan/40 hover:bg-slate-900 transition-all group cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan">
                          Command Bar
                        </div>
                        <div className="text-[10px] text-slate-400">Ctrl + K</div>
                      </div>
                    </button>

                    <a
                      href="#hero"
                      onClick={(e) => handleNavClick(e, "#hero")}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left hover:border-cyan/40 hover:bg-slate-900 transition-all group cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan">
                          Dev Terminal
                        </div>
                        <div className="text-[10px] text-slate-400">Interactive CLI</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Section 3: Full Portfolio Directory Sitemap */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block mb-3">
                    Full Portfolio Directory
                  </span>

                  <div className="grid grid-cols-2 gap-1.5">
                    {sitemapLinks.map((item) => {
                      const sectionId = item.href.replace("#", "");
                      const isActive = activeSection === sectionId;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`text-xs px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-cyan/15 text-cyan font-semibold border border-cyan/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-900 font-medium"
                          }`}
                        >
                          <span>{item.name}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Bar */}
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-slate-300">{profileData.contacts.primaryEmail}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-[#0A66C2] hover:bg-slate-800/60 rounded-lg transition-colors"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE COMPREHENSIVE DRAWER
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="space-y-6">
            
            {/* Group 1: Frontline Core Offerings */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Core Offerings
              </span>
              <div className="grid grid-cols-1 gap-1">
                {primaryNavLinks.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-sm py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-cyan/15 text-cyan border border-cyan/40 font-semibold"
                          : "text-slate-200 hover:text-white hover:bg-slate-900 font-medium"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Specialized Engineering Architecture */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Specialized Systems &amp; Architecture
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {deepDiveModules.map((item) => {
                  const Icon = item.icon;
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`p-3 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-cyan/15 text-cyan border border-cyan/40 font-semibold"
                          : "text-slate-200 hover:text-white hover:bg-slate-900 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div>
                          <div className="text-sm font-semibold text-slate-100">{item.name}</div>
                          <div className="text-xs text-slate-300 font-normal">{item.description}</div>
                        </div>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-discovery-modal", {
                        detail: { sprint: "Mobile Discovery Call" },
                      })
                    );
                  }
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-electric-600 via-cyan to-teal-400 text-slate-950 font-bold text-sm text-center shadow-lg shadow-cyan/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Book 15-Min Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
