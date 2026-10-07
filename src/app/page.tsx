import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { PipelineSection } from "@/components/home/PipelineSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { RoiCalculator } from "@/components/ui/RoiCalculator";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero: High-impact Identity, Animated Typewriter, Real Photo & Direct CTAs */}
      <HeroSection />

      {/* 2. Featured Projects: Immediate Visual Proof of Work within 5 seconds */}
      <ProjectsSection />

      {/* 3. Core Services: 4 Flagship Solution Pillars */}
      <ServicesSection />

      {/* 4. Technical Skills: Verified Stack Matrix & Proficiencies */}
      <SkillsSection />

      {/* 5. About Mahmud: Authentic Mission, Builder Mindset & Resume */}
      <AboutSection />

      {/* 6. Credentials & Learning Journey: Verified Diplomas & Active Training */}
      <CredentialsSection />

      {/* 7. Corporate Engagement Models & Sprints: Fast Turnaround & SLAs */}
      <EngagementSection />

      {/* 8. Intelligent Systems Pipeline: 8-Step Interactive Architecture */}
      <PipelineSection />

      {/* 9. Defensive Security Philosophy: Hardening & Threat Isolation */}
      <SecuritySection />

      {/* 10. Interactive Automation ROI Calculator */}
      <RoiCalculator />

      {/* 11. Contact Dialogue & WhatsApp Instant Integration */}
      <ContactSection />
    </main>
  );
}
