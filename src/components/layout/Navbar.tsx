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
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Credentials", href: "#credentials" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Sprints", href: "#engagement" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Projects", href: "#projects" },
  { name: "Security", href: "#security" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const { theme, setTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const activeSectionRef = useRef<string>("hero");
  const isManualScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If page was loaded with an existing anchor hash, sync initial active state
    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash.replace("#", "");
      if (sectionIds.includes(initialHash)) {
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

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
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
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      isManualScrollRef.current = true;
      activeSectionRef.current = targetId;
      setActiveSection(targetId);

      // Instantly update browser URL hash
      window.history.replaceState(null, "", href);

      // Smoothly scroll with fixed header clearance
      const navOffset = 75;
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
          ? "bg-slate-950/85 dark:bg-canvas-deep/90 backdrop-blur-md border-b border-electric-500/15 py-2.5 shadow-lg shadow-black/25"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 text-slate-100 hover:text-cyan transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-600 to-cyan flex items-center justify-center p-0.5 shadow-md shadow-electric-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan" />
            </div>
          </div>
          <div>
            <span className="font-bold tracking-tight text-base sm:text-lg text-slate-100 dark:text-slate-100">
              Mahmud Hasan
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-cyan/90 border border-cyan/20 px-1.5 py-0.5 rounded bg-cyan/5">
              AI Automator
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Active Scrollspy Highlighting */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-xs xl:text-[13px] px-2.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-cyan bg-cyan/15 border border-cyan/40 shadow-sm shadow-cyan/25 font-semibold"
                    : "text-slate-300 dark:text-slate-300 hover:text-cyan dark:hover:text-cyan hover:bg-slate-800/40 font-medium"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan pointer-events-none" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
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
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan text-slate-300 hover:text-cyan text-xs font-mono transition-all group"
            title="Search & Quick Actions (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan" />
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 group-hover:text-cyan border border-slate-700">
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

          {/* Direct CTA */}
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-electric-600 to-cyan text-white shadow-md shadow-electric-600/20 hover:opacity-95 hover:shadow-cyan/30 transition-all cursor-pointer"
          >
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

      {/* Mobile Drawer with Active Scrollspy Highlighting */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 dark:bg-canvas-deep/98 border-b border-electric-500/20 backdrop-blur-xl px-6 py-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-cyan/15 text-cyan border border-cyan/40 font-semibold"
                      : "text-slate-200 hover:text-cyan hover:bg-slate-900 font-medium"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-sm shadow-cyan" />}
                </a>
              );
            })}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Available for projects</span>
              <a
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, "#contact");
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-electric-600 text-white"
              >
                Contact Mahmud
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
