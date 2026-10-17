import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ExecutiveDomainGrid } from "@/components/home/ExecutiveDomainGrid";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero: High-impact Identity, Animated Typewriter, Real Portrait & Interactive CLI Terminal */}
      <HeroSection />

      {/* 2. Executive Exploration Portals: 4 High-Impact Domains with Direct Discrete Page Routing */}
      <ExecutiveDomainGrid />
    </main>
  );
}
