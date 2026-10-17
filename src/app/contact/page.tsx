import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/home/ContactSection";
import { ArrowLeft, Sparkles, Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Strategy Consultation | Mahmud Hasan",
  description:
    "Initiate a project dialogue with Mahmud Hasan. Reach out directly via encrypted WhatsApp, email, or schedule a 15-minute technical discovery session.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen pt-24 sm:pt-28 pb-16">
      {/* Page Header with Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <Link
            href="/"
            className="hover:text-cyan transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-cyan font-semibold">Contact &amp; Discovery</span>
        </div>
      </div>

      {/* Contact Section Form & Channels */}
      <ContactSection />
    </main>
  );
}
