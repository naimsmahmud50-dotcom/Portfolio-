import React from "react";
import Link from "next/link";
import { Workflow, ArrowLeft, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 tech-grid-bg">
      <div className="max-w-lg w-full p-8 sm:p-12 rounded-3xl tech-card border-electric-500/30 text-center relative overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-electric-500/30 flex items-center justify-center mx-auto mb-6 text-cyan">
          <Workflow className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-electric-950 border border-electric-500/30 text-cyan font-bold tracking-wider">
          ERROR 404 // UNROUTED_NODE
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Route Off The Workflow
        </h1>

        <p className="mt-3 text-sm text-slate-300/90 leading-relaxed max-w-sm mx-auto">
          "Looks like this route went off the workflow." The automated pipeline could not resolve the requested resource.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-cyan text-white text-xs sm:text-sm font-semibold shadow-lg shadow-electric-600/30 hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </Link>

          <Link
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan text-slate-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <FolderGit2 className="w-4 h-4 text-cyan" />
            <span>View Projects</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
