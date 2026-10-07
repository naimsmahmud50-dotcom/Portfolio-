"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  Calendar,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { useToast } from "../providers/ToastProvider";

interface DiscoveryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialSprint?: string;
}

export function DiscoveryModal({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  initialSprint: propsInitialSprint,
}: DiscoveryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"whatsapp" | "calendar" | "email">("whatsapp");
  
  // Quick request form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNote, setClientNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (typeof propsIsOpen === "boolean") {
      setIsOpen(propsIsOpen);
    }
  }, [propsIsOpen]);

  useEffect(() => {
    if (propsInitialSprint) {
      setSelectedSprint(propsInitialSprint);
    }
  }, [propsInitialSprint]);

  // Global event listener for "open-discovery-modal"
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ sprint?: string }>;
      if (customEvent.detail?.sprint) {
        setSelectedSprint(customEvent.detail.sprint);
      }
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("open-discovery-modal", handleCustomOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-discovery-modal", handleCustomOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (propsOnClose) {
      propsOnClose();
    }
  };

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    selectedSprint
      ? `Hi Mahmud, I reviewed your enterprise portfolio and would like to discuss commissioning: "${selectedSprint}".`
      : `Hi Mahmud, I reviewed your portfolio and would like to discuss a Web, Mobile, Bug Fix or Automation project with you.`
  );

  const whatsappUrl = `https://wa.me/${profileData.contacts.whatsappNumber}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    selectedSprint
      ? `Discovery Inquiry: ${selectedSprint} - Mahmud Hasan`
      : `15-Minute Strategy Discovery Inquiry - Mahmud Hasan`
  );

  const emailBody = encodeURIComponent(
    `Hi Mahmud,\n\nI reviewed your portfolio and would like to discuss our upcoming project requirements.\n\nProject Scope: ${selectedSprint || "AI Automation / Systems Engineering"}\nTimeline: Immediate\n\nLooking forward to hearing from you.`
  );

  const emailUrl = `mailto:${profileData.contacts.primaryEmail}?subject=${emailSubject}&body=${emailBody}`;

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim()) {
      toast("Please provide your email address", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName || "Executive Client",
          email: clientEmail,
          subject: selectedSprint ? `Discovery Call: ${selectedSprint}` : "15-Min Strategy Discovery Request",
          message: clientNote || `Requesting a 15-minute strategy discovery call for ${selectedSprint || "AI Automation & Systems Engineering"}.`,
        }),
      });

      if (res.ok) {
        toast("Discovery request received! Mahmud will reach out within 4 hours.", "success");
        setTimeout(() => handleClose(), 1200);
      } else {
        toast("Unable to send request directly. Redirecting to WhatsApp...", "error");
        window.open(whatsappUrl, "_blank");
      }
    } catch {
      window.open(whatsappUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-electric-600 to-cyan flex items-center justify-center text-white shadow-md shadow-cyan/20">
              <Sparkles className="w-4 h-4 text-cyan" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Book 15-Min Strategy Discovery</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                  FREE / ZERO-RISK
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {selectedSprint ? `Discussing: ${selectedSprint}` : "Immediate direct access to Mahmud Hasan"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 ${
              activeTab === "whatsapp"
                ? "bg-slate-900 text-emerald-400 border-emerald-400 shadow-sm"
                : "text-slate-300 hover:text-white border-transparent"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Instant WhatsApp VIP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 ${
              activeTab === "calendar"
                ? "bg-slate-900 text-cyan border-cyan shadow-sm"
                : "text-slate-300 hover:text-white border-transparent"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct Time Slot</span>
          </button>

          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 ${
              activeTab === "email"
                ? "bg-slate-900 text-electric-400 border-electric-400 shadow-sm"
                : "text-slate-300 hover:text-white border-transparent"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Priority Email</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Tab 1: WhatsApp VIP Direct Route */}
          {activeTab === "whatsapp" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-emerald-300">Fastest Executive Route (&lt; 30 Min Response)</p>
                  <p className="text-slate-200 mt-1 leading-relaxed">
                    Skip email queues and communicate directly with Mahmud on encrypted WhatsApp. A pre-drafted project message will automatically be queued for you.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-slate-400 block mb-1 font-sans text-xs font-semibold">Pre-Drafted Message Preview:</span>
                <span className="text-cyan">
                  "{decodeURIComponent(whatsappMessage)}"
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => handleClose(), 500)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Launch WhatsApp VIP Dialogue</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          )}

          {/* Tab 2: Calendar / Quick Time Slot Request */}
          {activeTab === "calendar" && (
            <form onSubmit={handleQuickSubmit} className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Leave your coordinates and Mahmud will coordinate a 15-minute video call slot (Google Meet / Zoom) matching your timezone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">Your Name / Title</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Morgan, CTO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">Work Email (Required)</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">Project Objective / Preferred Time</label>
                <textarea
                  rows={3}
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder={`Brief context (e.g. Need 2-week MVP for invoice automation / Free weekdays 2-4 PM EST)`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white font-semibold text-sm shadow-lg shadow-cyan/20 hover:shadow-cyan/40 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>{isSubmitting ? "Sending Request..." : "Request 15-Min Strategy Session"}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}

          {/* Tab 3: Priority Email */}
          {activeTab === "email" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-electric-950/40 border border-electric-500/30 flex items-start gap-3">
                <Mail className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-electric-300">Executive Mailbox</p>
                  <p className="text-slate-200 mt-1 leading-relaxed">
                    Direct dispatch to <span className="text-cyan font-mono">{profileData.contacts.primaryEmail}</span>. Monitored continuously with guaranteed response within 4 hours.
                  </p>
                </div>
              </div>

              <a
                href={emailUrl}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-electric-600 to-blue-500 hover:from-electric-500 hover:to-blue-400 text-white font-semibold text-sm shadow-lg shadow-electric-600/30 transition-all hover:scale-[1.01]"
              >
                <Mail className="w-4 h-4" />
                <span>Open Pre-Filled Email Draft</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          )}

          {/* Reassurance Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Spam • Direct Architect Communication</span>
            </span>
            <span className="text-slate-300 font-semibold">SLA: &lt; 4h Reply</span>
          </div>

        </div>
      </div>
    </div>
  );
}
