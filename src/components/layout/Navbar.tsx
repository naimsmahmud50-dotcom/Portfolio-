"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";
import { profileData } from "@/data/profile";
import {
  Menu,
  X,
  Sun,
  Moon,
  Terminal,
  Shield,
  Layers,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Pipeline", href: "#pipeline" },
  { name: "Projects", href: "#projects" },
  { name: "Credentials", href: "#credentials" },
  { name: "Security", href: "#security" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, setTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 dark:bg-canvas-deep/85 backdrop-blur-md border-b border-electric-500/15 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="#hero"
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
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-slate-300 dark:text-slate-300 hover:text-cyan dark:hover:text-cyan px-2.5 py-1.5 rounded-lg hover:bg-slate-800/40 transition-colors"
            >
              {link.name}
            </Link>
          ))}
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

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 text-slate-400 hover:text-cyan hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Direct CTA */}
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-electric-600 to-cyan text-white shadow-md shadow-electric-600/20 hover:opacity-95 hover:shadow-cyan/30 transition-all"
          >
            <span>Let's Talk</span>
          </Link>

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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 dark:bg-canvas-deep/98 border-b border-electric-500/20 backdrop-blur-xl px-6 py-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan py-2 px-3 rounded-lg hover:bg-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Available for projects</span>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-electric-600 text-white"
              >
                Contact Mahmud
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
