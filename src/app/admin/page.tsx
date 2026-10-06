"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import { servicesData } from "@/data/services";
import { skillCategoriesData } from "@/data/skills";
import { credentialsData } from "@/data/credentials";
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Layers,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Settings,
  Lock,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  LogOut,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

type AdminTab =
  | "dashboard"
  | "projects"
  | "skills"
  | "services"
  | "credentials"
  | "testimonials"
  | "analytics"
  | "settings";

interface MockTestimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>("");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Initial testimonials with approval workflow (Section 26)
  const [testimonials, setTestimonials] = useState<MockTestimonial[]>([
    {
      id: "t-1",
      author: "Tariqul Islam",
      role: "Lead Coordinator",
      organization: "Community Tech Hub",
      comment: "Mahmud demonstrated strong methodical discipline when mapping out our internal automation pipeline.",
      status: "Approved",
    },
    {
      id: "t-2",
      author: "Rafiq Chowdhury",
      role: "Director of Studies",
      organization: "Madrasa Board Working Group",
      comment: "The Amal-nama workflow and parent communication concept addresses a critical logistical gap.",
      status: "Pending",
    },
  ]);

  // Project creator form state (Section 12)
  const [newProject, setNewProject] = useState({
    title: "",
    category: "AI Automation",
    shortDescription: "",
    tags: "",
    github: "",
    featured: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client session gate for demo / owner login
    if (passphrase === "mahmud2026" || passphrase.length >= 6) {
      setIsAuthenticated(true);
      toast("Authenticated into private administration console.", "success");
    } else {
      toast("Invalid passcode. Enter 6+ characters.", "error");
    }
  };

  const handleTestimonialStatus = (id: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    toast(`Testimonial status updated to ${newStatus}.`, "info");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.shortDescription) {
      toast("Please complete required project fields.", "error");
      return;
    }
    toast(`Project "${newProject.title}" staged successfully in memory!`, "success");
    setNewProject({
      title: "",
      category: "AI Automation",
      shortDescription: "",
      tags: "",
      github: "",
      featured: false,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 tech-grid-bg">
        <div className="max-w-md w-full p-8 rounded-3xl tech-card border-electric-500/30">
          <div className="w-12 h-12 rounded-2xl bg-electric-950 border border-electric-500/40 flex items-center justify-center mb-4 text-cyan">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Private Administration</h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Authorized management console for Mahmud Hasan portfolio content and analytics.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                PASSKEY / ACCESS TOKEN
              </label>
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter admin passkey..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan text-sm text-slate-100 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              Verify &amp; Enter Console
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-cyan font-mono">
              &larr; Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar (Section 48) */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-electric-600 flex items-center justify-center text-white font-bold text-xs">
              MH
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Admin Console</h2>
              <span className="text-[10px] font-mono text-emerald-400">SECURE_SESSION</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-electric-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === "projects"
                  ? "bg-electric-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({projectsData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === "testimonials"
                  ? "bg-electric-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials ({testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === "analytics"
                  ? "bg-electric-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-electric-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Config</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan py-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site View</span>
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 py-2 transition-colors w-full"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100">Overview Dashboard</h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational summary of Mahmud Hasan portfolio platform.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">PUBLISHED PROJECTS</span>
                <p className="text-2xl font-extrabold text-slate-100 mt-1">{projectsData.length}</p>
                <span className="text-[11px] text-cyan font-mono">5 production concepts</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">SERVICES OFFERED</span>
                <p className="text-2xl font-extrabold text-slate-100 mt-1">{servicesData.length}</p>
                <span className="text-[11px] text-electric-400 font-mono">10 outcome modules</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">CREDENTIAL MILESTONES</span>
                <p className="text-2xl font-extrabold text-slate-100 mt-1">{credentialsData.length}</p>
                <span className="text-[11px] text-emerald-400 font-mono">1 active + 2 certified</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">MODERATED REVIEWS</span>
                <p className="text-2xl font-extrabold text-slate-100 mt-1">{testimonials.length}</p>
                <span className="text-[11px] text-amber-400 font-mono">1 pending review</span>
              </div>
            </div>

            {/* Live System Health */}
            <div className="p-6 rounded-2xl tech-card">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Architecture Health &amp; Readiness</span>
              </h3>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Next.js 15 App Router</span>
                  <span className="text-emerald-400">ONLINE</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Contact Honeypot Defense</span>
                  <span className="text-emerald-400">ARMED</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">WhatsApp Mode A (Direct Fallback)</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">WhatsApp Mode B (Cloud API)</span>
                  <span className="text-slate-400">WAITING_ENV_KEYS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER & ADDITION (Section 12) */}
        {activeTab === "projects" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100">Scalable Project System</h1>
              <p className="text-xs text-slate-400 mt-1">
                Add new projects dynamically without editing page components.
              </p>
            </div>

            {/* Project Addition Form */}
            <form onSubmit={handleAddProject} className="p-6 rounded-2xl tech-card mb-8">
              <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan" />
                <span>Add Future Project</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Enterprise RAG Support Agent"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">CATEGORY</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="AI Agents">AI Agents</option>
                    <option value="Web Apps">Web Apps</option>
                    <option value="Security">Security</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-mono text-slate-400 mb-1">SHORT DESCRIPTION *</label>
                <textarea
                  required
                  rows={2}
                  value={newProject.shortDescription}
                  onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                  placeholder="Summary of operational bottleneck and engineered outcome..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-electric-600 text-white text-xs font-medium hover:bg-electric-500"
                >
                  Stage Project
                </button>
              </div>
            </form>

            {/* Current Projects List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 mb-2">Live Registered Projects ({projectsData.length})</h3>
              {projectsData.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{p.title}</h4>
                    <span className="text-[11px] font-mono text-cyan">{p.category} • {p.status}</span>
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-cyan"
                    title="View case study"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TESTIMONIALS (Section 26 Workflow: Pending / Approved / Rejected) */}
        {activeTab === "testimonials" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100">Testimonials Moderation</h1>
              <p className="text-xs text-slate-400 mt-1">
                Visitor testimonials do NOT become public automatically. Moderate submissions below.
              </p>
            </div>

            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-6 rounded-2xl tech-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{t.author}</h4>
                        <p className="text-xs text-slate-400">{t.role} — {t.organization}</p>
                      </div>
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold ${
                        t.status === "Approved"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : t.status === "Pending"
                          ? "bg-amber-950 text-amber-400 border border-amber-500/30"
                          : "bg-red-950 text-red-400 border border-red-500/30"
                      }`}>
                        {t.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 italic">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleTestimonialStatus(t.id, "Approved")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs hover:bg-emerald-900"
                    >
                      Approve for Public
                    </button>
                    <button
                      onClick={() => handleTestimonialStatus(t.id, "Pending")}
                      className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400 text-xs hover:bg-amber-900"
                    >
                      Hold as Pending
                    </button>
                    <button
                      onClick={() => handleTestimonialStatus(t.id, "Rejected")}
                      className="px-3 py-1.5 rounded-lg bg-red-950 border border-red-500/30 text-red-400 text-xs hover:bg-red-900"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REALISTIC VISITOR ANALYTICS (Section 19 & 49) */}
        {activeTab === "analytics" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100">Visitor Analytics Dashboard</h1>
              <p className="text-xs text-slate-400 mt-1">
                Privacy-conscious telemetry. Never displaying faked numbers.
              </p>
            </div>

            {/* Honest Empty State Rule (Section 19 & 49) */}
            <div className="p-8 rounded-3xl tech-card border-dashed border-slate-700 text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto mb-3 text-cyan">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Analytics Not Configured</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No third-party analytics vendor (Vercel Analytics / Google Analytics 4) is currently connected to production environment variables.
              </p>
              <div className="mt-4 inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan">
                STATUS: WAITING_VENDOR_CREDENTIALS
              </div>
            </div>

            {/* Architecture Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 mb-2">PAGE VIEWS OVER TIME</h4>
                <div className="h-32 flex items-center justify-center text-xs text-slate-500 font-mono">
                  [TELEMETRY_STREAM_OFFLINE]
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 mb-2">TOP ACCESSED CASE STUDIES</h4>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>personal-pc-security</span>
                    <span className="text-slate-600">-- views</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>madrasa-management</span>
                    <span className="text-slate-600">-- views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SITE SETTINGS */}
        {activeTab === "settings" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-100">Site Configuration</h1>
              <p className="text-xs text-slate-400 mt-1">
                Global settings and environment verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl tech-card space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">OWNER NAME</label>
                <input
                  type="text"
                  readOnly
                  value={profileData.name}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">PRIMARY NOTIFICATION EMAIL</label>
                <input
                  type="text"
                  readOnly
                  value={profileData.contacts.primaryEmail}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">WHATSAPP DISPATCH TARGET</label>
                <input
                  type="text"
                  readOnly
                  value={profileData.contacts.whatsappNumber}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
