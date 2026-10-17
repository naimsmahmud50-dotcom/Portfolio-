"use client";

import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Mail, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 dark:bg-canvas-deep text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top row: Identity and Page Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block font-bold text-lg text-slate-100 hover:text-cyan transition-colors">
              {profileData.name}
            </Link>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              {profileData.primaryRole}
            </p>
            <div className="mt-1.5 flex items-center justify-center md:justify-start gap-1.5 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for worldwide contracts &amp; sprints</span>
            </div>
          </div>

          {/* Quick Page Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-medium text-slate-300">
            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
            <span className="text-slate-700">•</span>
            <Link href="/projects" className="hover:text-cyan transition-colors">Projects</Link>
            <span className="text-slate-700">•</span>
            <Link href="/services" className="hover:text-cyan transition-colors">Services</Link>
            <span className="text-slate-700">•</span>
            <Link href="/skills" className="hover:text-cyan transition-colors">Skills</Link>
            <span className="text-slate-700">•</span>
            <Link href="/about" className="hover:text-cyan transition-colors">About</Link>
            <span className="text-slate-700">•</span>
            <Link href="/credentials" className="hover:text-cyan transition-colors">Credentials</Link>
            <span className="text-slate-700">•</span>
            <Link href="/systems" className="hover:text-cyan transition-colors">Systems</Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Middle row: Social & Direct channels */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-300">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profileData.socials.naimKnowsFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Naim Knows</span>
            </a>
            <a
              href={`mailto:${profileData.contacts.primaryEmail}`}
              className="flex items-center gap-1.5 hover:text-cyan transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href={`https://wa.me/${profileData.contacts.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Right copyright & Admin link */}
          <div className="text-center sm:text-right text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Mahmud Hasan. All rights reserved.</p>
            <p className="mt-1 flex items-center justify-center sm:justify-end gap-1 text-xs text-slate-400">
              <ShieldCheck className="w-3 h-3 text-cyan" />
              <span>Built with modern engineering &amp; security</span>
              <span className="mx-1.5">•</span>
              <Link href="/admin" className="hover:text-cyan text-slate-300 transition-colors">
                Console
              </Link>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
