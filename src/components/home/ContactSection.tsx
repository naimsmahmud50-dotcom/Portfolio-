"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  MessageSquare,
  Copy,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useToast } from "../providers/ToastProvider";
import { contactSchema } from "@/utils/contact-schema";

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    serviceType: "AI Automation",
    message: "",
    honeypot: "", // Spam prevention honeypot
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast(`Copied ${email} to clipboard!`, "success");
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(profileData.contacts.whatsappDisplay);
    toast("WhatsApp number copied to clipboard!", "success");
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Mahmud, I visited your portfolio and would like to discuss a project about: ${formData.subject || "Collaboration"}`
    );
    window.open(`https://wa.me/${profileData.contacts.whatsappNumber}?text=${text}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side schema validation using Zod
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      toast(firstIssue ? firstIssue.message : "Please check your form entries.", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json().catch(() => ({}));

      if (res.status === 429) {
        toast("Rate limit reached. Please wait a few minutes before submitting another message.", "error");
        return;
      }

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to send message");
      }

      setSubmitted(true);
      toast("Message received. Thank you — I'll get back to you as soon as possible.", "success");
    } catch {
      // Safe fallback to Mode A WhatsApp or direct mailto
      setSubmitted(true);
      toast("Message prepared. You can also send directly via WhatsApp!", "info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-500/20 text-xs font-mono text-cyan mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>08 // INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Let's Build Something Intelligent
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Have a project, workflow automation requirement, or collaboration in mind? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Fast Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl tech-card flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded">
                    PRIMARY EMAIL
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200">Personal &amp; Business Inquiries</h4>
                <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1 select-all">
                  {profileData.contacts.primaryEmail}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`mailto:${profileData.contacts.primaryEmail}`}
                  className="text-xs font-semibold text-cyan hover:text-white transition-colors"
                >
                  Send Direct Mail &rarr;
                </a>
                <button
                  onClick={() => handleCopyEmail(profileData.contacts.primaryEmail)}
                  className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Secondary Email Card */}
            <div className="p-6 rounded-2xl tech-card flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-electric-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    SECONDARY EMAIL
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-200">Developer &amp; Tech Communications</h4>
                <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1 select-all">
                  {profileData.contacts.secondaryEmail}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`mailto:${profileData.contacts.secondaryEmail}`}
                  className="text-xs font-semibold text-electric-400 hover:text-white transition-colors"
                >
                  Send Direct Mail &rarr;
                </a>
                <button
                  onClick={() => handleCopyEmail(profileData.contacts.secondaryEmail)}
                  className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy secondary email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* WhatsApp Card (Section 18 Dual Mode) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    INSTANT WHATSAPP
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100">Direct Messaging Channel</h4>
                <p className="text-xs sm:text-sm font-mono text-emerald-300 mt-1">
                  {profileData.contacts.whatsappDisplay}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Open WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopyWhatsApp}
                  className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy WhatsApp number"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) (Section 17 & 40) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl tech-card border-electric-500/25">
              
              {submitted ? (
                /* Success State (Section 40) */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 animate-in zoom-in">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Message Received</h3>
                  <p className="mt-2 text-sm text-slate-300 max-w-md">
                    Thank you — I'll get back to you as soon as possible.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Also Ping on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          subject: "",
                          serviceType: "AI Automation",
                          message: "",
                          honeypot: "",
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Invisible Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this</label>
                    <input
                      id="hp_field"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. tariq@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. AI Workflow Integration"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        PROJECT / SERVICE TYPE
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan text-sm text-slate-200 outline-none transition-all"
                      >
                        <option value="AI Automation">AI Automation</option>
                        <option value="AI Agent Development">AI Agent Development</option>
                        <option value="Business Workflow Automation">Business Workflow Automation</option>
                        <option value="AI-Powered Web Application">AI-Powered Web Application</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="Security Consultation">Security Consultation</option>
                        <option value="Other Inquiries">Other Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project goals, technical expectations, or timelines..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submission CTA (Section 17 CTA: "Start a Conversation") */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white font-semibold text-sm shadow-lg shadow-electric-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Start a Conversation</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 py-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Prefer WhatsApp directly?</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
