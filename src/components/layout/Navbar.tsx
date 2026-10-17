"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  FolderGit2,
  Cpu,
  User,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import { primaryNavLinks, deepDiveModules, sitemapLinks } from "@/data/navigation";

const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case "Workflow":
      return Workflow;
    case "ShieldCheck":
      return ShieldCheck;
    case "Zap":
      return Zap;
    case "FolderGit2":
      return FolderGit2;
    case "Layers":
      return Layers;
    case "Cpu":
      return Cpu;
    case "User":
      return User;
    case "GraduationCap":
      return GraduationCap;
    case "Mail":
      return Mail;
    default:
      return Sparkles;
  }
};

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemsDrawerOpen, setSystemsDrawerOpen] = useState(false);

  // Close drawers when navigating to a new route
  useEffect(() => {
    setMobileMenuOpen(false);
    setSystemsDrawerOpen(false);
  }, [pathname]);

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

  // Track header scroll state for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
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
        <Link
          href="/"
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
        </Link>

        {/* Desktop Navigation: 6 Frontline Pillars with discrete Next.js page routing */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {primaryNavLinks.map((item) => {
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {item.name}
              </Link>
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
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-cyan hover:bg-slate-800/80 transition-all text-xs font-mono group cursor-pointer"
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
              className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Subtle vertical hairline divider */}
            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Systems / Deep-Dive Modules Drawer Trigger Icon */}
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
            <span className="font-semibold text-white dark:text-slate-950">Let&apos;s Talk</span>
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
                      const Icon = getModuleIcon(item.iconName);
                      const isActive = isItemActive(item.href);

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSystemsDrawerOpen(false)}
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
                        </Link>
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

                    <Link
                      href="/"
                      onClick={() => setSystemsDrawerOpen(false)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left hover:border-cyan/40 hover:bg-slate-900 transition-all group cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan">
                          Dev Terminal
                        </div>
                        <div className="text-[10px] text-slate-400">Interactive CLI</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Section 3: Full Portfolio Directory Sitemap */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block mb-3">
                    Full Portfolio Directory
                  </span>

                  <div className="grid grid-cols-2 gap-1.5">
                    {sitemapLinks.map((item) => {
                      const isActive = isItemActive(item.href);

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSystemsDrawerOpen(false)}
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
                        </Link>
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
                  const isActive = isItemActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-cyan/15 text-cyan border border-cyan/40 font-semibold"
                          : "text-slate-200 hover:text-white hover:bg-slate-900 font-medium"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />}
                    </Link>
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
                  const Icon = getModuleIcon(item.iconName);
                  const isActive = isItemActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
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
                    </Link>
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
