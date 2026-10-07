"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft, ChevronDown, ChevronUp, Terminal } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log unexpected errors safely on client console
    console.error("Runtime exception caught by root error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 tech-grid-bg">
      <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl tech-card border-red-500/30 text-center relative overflow-hidden shadow-2xl">
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-center mx-auto mb-6 text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 font-bold tracking-wider inline-block">
          STATUS 500 // SYSTEM_ANOMALY
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          System Anomaly Intercepted
        </h1>

        <p className="mt-3 text-sm text-slate-300/90 leading-relaxed max-w-md mx-auto">
          An unexpected runtime exception was isolated by the fault-tolerance boundary. The system state has been preserved.
        </p>

        {/* Primary Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white text-xs sm:text-sm font-semibold shadow-lg shadow-electric-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Attempt Recovery</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan text-slate-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyan" />
            <span>Return to Safety</span>
          </Link>
        </div>

        {/* Diagnostic Accordion */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-left">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors py-1"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan" />
              <span>Technical Diagnostics</span>
            </span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showDetails && (
            <div className="mt-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 break-all space-y-1.5 animate-in fade-in duration-200">
              <p className="text-red-400 font-semibold">
                Message: {error.message || "An unspecified application error occurred."}
              </p>
              {error.digest && (
                <p className="text-slate-500">
                  Digest ID: <span className="text-cyan">{error.digest}</span>
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
