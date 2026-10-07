"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  ArrowRight,
  FolderGit2,
  FileText,
  Mail,
  MessageSquare,
  Shield,
  Layers,
  Cpu,
  Workflow,
  X,
  Sparkles,
  Calendar,
  Calculator,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { useToast } from "../providers/ToastProvider";
import { ResumeModal } from "./ResumeModal";

interface PaletteItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Cmd+K / Ctrl+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    const handleCustomResumeOpen = () => {
      setIsOpen(false);
      setResumeOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    window.addEventListener("open-resume-modal", handleCustomResumeOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
      window.removeEventListener("open-resume-modal", handleCustomResumeOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const navigateToHash = (hash: string) => {
    setIsOpen(false);
    const element = document.getElementById(hash.replace("#", ""));
    if (element) {
      const navOffset = 75;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: "smooth",
      });
      window.history.replaceState(null, "", hash);
    }
  };

  const allItems: PaletteItem[] = [
    // Navigation items
    {
      id: "nav-hero",
      category: "Navigation",
      title: "Home",
      subtitle: "Executive introduction & live sandbox",
      icon: <Sparkles className="w-4 h-4 text-cyan" />,
      action: () => navigateToHash("#hero"),
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "About Me",
      subtitle: "Architectural philosophy & impact metrics",
      icon: <Cpu className="w-4 h-4 text-electric-400" />,
      action: () => navigateToHash("#about"),
    },
    {
      id: "nav-credentials",
      category: "Navigation",
      title: "Credentials",
      subtitle: "Applied research & certified training",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      action: () => navigateToHash("#credentials"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Technical Stack & Skills",
      subtitle: "AI, Full-Stack, Mobile, and Security proficiencies",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      action: () => navigateToHash("#skills"),
    },
    {
      id: "nav-services",
      category: "Navigation",
      title: "Engineered Services",
      subtitle: "10 outcome-focused solution modules",
      icon: <Workflow className="w-4 h-4 text-amber-400" />,
      action: () => navigateToHash("#services"),
    },
    {
      id: "nav-engagement",
      category: "Navigation",
      title: "Corporate Engagement Models & Sprints",
      subtitle: "2-Week MVP, Enterprise Build, Fractional Retainer",
      icon: <Layers className="w-4 h-4 text-cyan" />,
      action: () => navigateToHash("#engagement"),
    },
    {
      id: "nav-pipeline",
      category: "Navigation",
      title: "Intelligent Systems Pipeline",
      subtitle: "8-step automated engineering workflow",
      icon: <Workflow className="w-4 h-4 text-cyan" />,
      action: () => navigateToHash("#pipeline"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Featured Projects & Case Studies",
      subtitle: "Production codebases and real architectures",
      icon: <FolderGit2 className="w-4 h-4 text-blue-400" />,
      action: () => navigateToHash("#projects"),
    },
    {
      id: "nav-security",
      category: "Navigation",
      title: "Defensive Security Posture",
      subtitle: "Zero-trust principles and threat modeling",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      action: () => navigateToHash("#security"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact Dialogue",
      subtitle: "Initiate dialogue via email, WhatsApp, or form",
      icon: <Mail className="w-4 h-4 text-cyan" />,
      action: () => navigateToHash("#contact"),
    },

    // Project deep links
    ...projectsData.map((p) => ({
      id: `proj-${p.slug}`,
      category: "Projects" as const,
      title: p.title,
      subtitle: p.shortDescription,
      icon: <FolderGit2 className="w-4 h-4 text-cyan" />,
      action: () => {
        setIsOpen(false);
        router.push(`/projects/${p.slug}`);
      },
    })),

    // Quick Actions
    {
      id: "act-discovery",
      category: "Actions",
      title: "Book 15-Minute Strategy Discovery Call",
      subtitle: "Instant WhatsApp VIP connection or calendar slot with Mahmud",
      icon: <Calendar className="w-4 h-4 text-cyan" />,
      action: () => {
        setIsOpen(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("open-discovery-modal", {
              detail: { sprint: "15-Min Strategy Discovery" },
            })
          );
        }
      },
    },
    {
      id: "act-resume",
      category: "Actions",
      title: "View & Print Executive CV",
      subtitle: "Verified credentials and engineering case studies",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false);
        setResumeOpen(true);
      },
    },
    {
      id: "act-copy-email",
      category: "Actions",
      title: "Copy Primary Email Address",
      subtitle: profileData.contacts.primaryEmail,
      icon: <Mail className="w-4 h-4 text-cyan" />,
      action: () => {
        setIsOpen(false);
        navigator.clipboard.writeText(profileData.contacts.primaryEmail);
        toast("Primary email copied to clipboard!", "success");
      },
    },
    {
      id: "act-whatsapp",
      category: "Actions",
      title: "Chat on WhatsApp Directly",
      subtitle: `+${profileData.contacts.whatsappNumber}`,
      icon: <MessageSquare className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false);
        window.open(`https://wa.me/${profileData.contacts.whatsappNumber}`, "_blank");
      },
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: profileData.socials.github,
      icon: <GithubIcon className="w-4 h-4 text-slate-300" />,
      action: () => {
        setIsOpen(false);
        window.open(profileData.socials.github, "_blank");
      },
    },
  ];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) {
    return <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative w-full max-w-xl bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-4 h-4 text-cyan shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search sections, projects, or actions (e.g. 'SecureMyPC', 'CV')..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-2.5 sm:p-3 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? "bg-cyan/15 border border-cyan/40 text-slate-100"
                        : "text-slate-300 hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold truncate text-slate-100">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 uppercase">
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan shrink-0 animate-in fade-in" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                No matching sections or actions found for "{query}"
              </div>
            )}
          </div>

          {/* Keyboard Helper Footer */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <span className="text-cyan/80">Command Palette</span>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
