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
  ChevronDown,
  Layers,
  Workflow,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

// Curated primary corporate links (No more 10-link horizontal sprawl)
const primaryNavLinks = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Sprints", href: "#engagement" },
];

const architectureDropdownLinks = [
  {
    name: "Technical Skills",
    href: "#skills",
    description: "AI, Full-Stack, Flutter & Security stack",
    icon: Layers,
    color: "text-purple-400",
  },
  {
    name: "8-Stage Pipeline",
    href: "#pipeline",
    description: "End-to-end autonomous engineering loop",
    icon: Workflow,
    color: "text-cyan",
  },
  {
    name: "Defensive Security",
    href: "#security",
    description: "Zero-trust hardening & threat isolation",
    icon: ShieldCheck,
    color: "text-emerald-400",
  },
  {
    name: "Credentials & Research",
    href: "#credentials",
    description: "Applied learning & certified training",
    icon: GraduationCap,
    color: "text-amber-400",
  },
];

const allSectionIds = [
  "hero",
  "services",
  "projects",
  "engagement",
  "skills",
  "pipeline",
  "security",
  "credentials",
  "about",
  "contact",
];

const architectureIds = ["skills", "pipeline", "security", "credentials"];

export function Navbar() {
  const { theme, setTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeSectionRef = useRef<string>("hero");
  const isManualScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // If page was loaded with an existing anchor hash, sync initial active state
    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash.replace("#", "");
      if (allSectionIds.includes(initialHash)) {
        setActiveSection(initialHash);
        activeSectionRef.current = initialHash;
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If user recently clicked a nav item, pause automatic scrollspy until animation settles
      if (isManualScrollRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // Bottom of page detection -> activate contact
      if (currentScrollY + clientHeight >= scrollHeight - 70) {
        syncActiveSection("contact");
        return;
      }

      // Top of page detection -> activate hero
      if (currentScrollY < 120) {
        syncActiveSection("hero");
        return;
      }

      // Reverse scan sections from bottom to top based on viewport position
      const navThreshold = 180;
      let detectedSection = "hero";

      for (let i = allSectionIds.length - 1; i >= 0; i--) {
        const id = allSectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navThreshold) {
            detectedSection = id;
            break;
          }
        }
      }

      syncActiveSection(detectedSection);
    };

    function syncActiveSection(sectionId: string) {
      if (activeSectionRef.current !== sectionId) {
        activeSectionRef.current = sectionId;
        setActiveSection(sectionId);

        // Auto-update browser URL hash dynamically without polluting history stack
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDropdownOpen(false);
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

  const isArchitectureActive = architectureIds.includes(activeSection);

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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-600 via-cyan to-blue-400 flex items-center justify-center p-0.5 shadow-lg shadow-cyan/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg text-slate-100">
                Mahmud Hasan
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden md:block">
              Web • Apps • Problem Solving • Automation
            </span>
          </div>
        </a>

        {/* Desktop Navigation: Curated 5 Core Pillars + Architecture Dropdown (14px Legibility) */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {/* Services */}
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, "#services")}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              activeSection === "services"
                ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Services
          </a>

          {/* Projects */}
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "#projects")}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              activeSection === "projects"
                ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Projects
          </a>

          {/* Sprints */}
          <a
            href="#engagement"
            onClick={(e) => handleNavClick(e, "#engagement")}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              activeSection === "engagement"
                ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Sprints
          </a>

          {/* Architecture Dropdown Popover (Deep Dive Modules) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                isArchitectureActive || dropdownOpen
                  ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
              aria-expanded={dropdownOpen}
            >
              <span>Architecture</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-cyan" : "text-slate-400"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-slate-950/95 border border-slate-800/90 shadow-2xl backdrop-blur-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-800/60">
                  Engineering Systems &amp; Stack
                </div>
                <div className="mt-1 space-y-1">
                  {architectureDropdownLinks.map((item) => {
                    const Icon = item.icon;
                    const isItemActive = activeSection === item.href.replace("#", "");

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          isItemActive
                            ? "bg-cyan/15 border border-cyan/40 text-cyan"
                            : "hover:bg-slate-900 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {isItemActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              activeSection === "about"
                ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            About
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
              activeSection === "contact"
                ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/20 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mahmud Hasan's GitHub Profile"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mahmud Hasan's LinkedIn Profile"
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Command Palette Launcher (Ctrl+K / Cmd+K) */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Open Command Palette (Ctrl+K)"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan text-slate-300 hover:text-cyan text-xs font-mono transition-all group shadow-sm"
            title="Search & Quick Actions (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan" />
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 group-hover:text-cyan border border-slate-700 font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 text-slate-400 hover:text-cyan hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Executive Direct CTA Button */}
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
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-electric-600 via-cyan to-teal-400 hover:from-electric-500 hover:to-teal-300 text-slate-950 shadow-md shadow-cyan/25 hover:shadow-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Let's Talk</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Categorized Executive Groups */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          
          <div className="space-y-6">
            {/* Group 1: Primary Services & Works */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                Core Offerings
              </span>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { name: "Services", href: "#services" },
                  { name: "Projects & Case Studies", href: "#projects" },
                  { name: "Sprint Packages", href: "#engagement" },
                  { name: "About Mahmud", href: "#about" },
                  { name: "Contact Dialogue", href: "#contact" },
                ].map((item) => {
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

            {/* Group 2: Architecture Deep Dives */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                Technical Architecture
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {architectureDropdownLinks.map((item) => {
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
                          <div className="text-sm font-semibold">{item.name}</div>
                          <div className="text-xs text-slate-400">{item.description}</div>
                        </div>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Bottom Action */}
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
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-electric-600 via-cyan to-teal-400 text-slate-950 font-bold text-sm text-center shadow-lg shadow-cyan/20 flex items-center justify-center gap-2"
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

