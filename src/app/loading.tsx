import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 flex flex-col justify-start">
      {/* Top Navbar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="w-36 h-6 rounded-lg bg-slate-800/60 animate-pulse" />
        <div className="hidden md:flex items-center gap-6">
          <div className="w-16 h-4 rounded bg-slate-800/40 animate-pulse" />
          <div className="w-20 h-4 rounded bg-slate-800/40 animate-pulse" />
          <div className="w-16 h-4 rounded bg-slate-800/40 animate-pulse" />
          <div className="w-24 h-8 rounded-lg bg-slate-800/70 animate-pulse" />
        </div>
      </header>

      {/* Main Content Skeleton Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-48 h-7 rounded-full bg-slate-800/70 animate-pulse" />
            <div className="w-full max-w-lg h-14 rounded-2xl bg-slate-800/50 animate-pulse" />
            <div className="w-3/4 h-6 rounded-xl bg-slate-800/40 animate-pulse" />
            <div className="w-full max-w-md h-16 rounded-xl bg-slate-850/30 animate-pulse" />
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-40 h-12 rounded-xl bg-electric-600/30 animate-pulse" />
              <div className="w-36 h-12 rounded-xl bg-slate-800/60 animate-pulse" />
            </div>
          </div>

          {/* Right Column Portrait Skeleton */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-72 sm:w-80 h-[380px] rounded-3xl bg-slate-900/60 border border-slate-800 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>

        {/* Section Divider Skeleton */}
        <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* Card Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4 animate-pulse"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80" />
              <div className="w-3/4 h-5 rounded-lg bg-slate-800/60" />
              <div className="w-full h-12 rounded-lg bg-slate-800/30" />
              <div className="flex gap-2 pt-2">
                <div className="w-14 h-5 rounded bg-slate-800/50" />
                <div className="w-16 h-5 rounded bg-slate-800/50" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
