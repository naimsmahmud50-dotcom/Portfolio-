import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { PipelineSection } from "@/components/home/PipelineSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { ContactSection } from "@/components/home/ContactSection";
import { RoiCalculator } from "@/components/ui/RoiCalculator";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero: High-impact Identity, Real Photo & Direct CTAs */}
      <HeroSection />

      {/* 1.5. Interactive Enterprise Automation ROI Calculator */}
      <RoiCalculator />

      {/* 2. About: Authentic Mission, Builder Mindset & Resume Staging */}
      <AboutSection />

      {/* 3. Credentials & Ongoing Journey: Strict separation of Current vs Past */}
      <CredentialsSection />

      {/* 4. Technical Skills: Balanced Proficiencies & Honest Badging */}
      <SkillsSection />

      {/* 5. Services: 10 Outcome-driven Solution Modules */}
      <ServicesSection />

      {/* 5.5. Corporate Engagement Models & Sprints */}
      <EngagementSection />

      {/* 6. Intelligent Systems Pipeline: 8-Step Interactive Architecture */}
      <PipelineSection />

      {/* 7. Scalable Projects & Naim Knows Initiative */}
      <ProjectsSection />

      {/* 8. Defensive Security Philosophy */}
      <SecuritySection />

      {/* 9. Contact Dialogue & WhatsApp Dual-Mode Integration */}
      <ContactSection />
    </main>
  );
}
