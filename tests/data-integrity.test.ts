import { describe, it, expect } from "vitest";
import { skillCategoriesData } from "@/data/skills";
import { credentialsData } from "@/data/credentials";
import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { profileData } from "@/data/profile";
import { pipelineStepsData } from "@/data/pipeline";

describe("1. Skills Section - PDF Compliance", () => {
  it("STRICT: Must NOT list Google AI Studio or Google Antigravity as public skills (Section 8)", () => {
    const allSkills = skillCategoriesData.flatMap((cat) => cat.skills.map((s) => s.name.toLowerCase()));
    
    expect(allSkills).not.toContain("google ai studio");
    expect(allSkills).not.toContain("google antigravity");
    expect(allSkills).not.toContain("antigravity");
  });

  it("Must include key categories like AI & Automation, Full-Stack Development, Security", () => {
    const categoryTitles = skillCategoriesData.map((c) => c.title);
    expect(categoryTitles).toContain("AI & Automation");
    expect(categoryTitles).toContain("Full-Stack Development");
    expect(categoryTitles).toContain("Security & Protection");
  });
});

describe("2. Credentials & Learning - PDF Compliance (Section 7, 21)", () => {
  it("STRICT: Current Learning must be As-Sunnah Skill Development Institute (AI Automation)", () => {
    const current = credentialsData.filter((c) => c.kind === "current_learning");
    expect(current.length).toBeGreaterThanOrEqual(1);
    expect(current[0].institution).toContain("As-Sunnah");
    expect(current[0].badge).toBe("CURRENT");
  });

  it("STRICT: Arenta Web Security must be marked as COMPLETED, not current", () => {
    const completed = credentialsData.filter((c) => c.kind === "completed_credential");
    expect(completed.length).toBe(2);
    
    const institutions = completed.map((c) => c.institution);
    expect(institutions).toContain("Arenta Web Security");
    
    completed.forEach((c) => {
      expect(c.kind).not.toBe("current_learning");
      expect(c.statusText).not.toContain("Currently active");
    });
  });
});

describe("3. Projects System - PDF Compliance (Section 10, 11)", () => {
  it("Must contain at least 5 initial projects specified in brief", () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(5);
  });

  it("Must have unique, non-empty URL slugs for all projects", () => {
    const slugs = projectsData.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
    slugs.forEach((slug) => {
      expect(slug).toBeTruthy();
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("Each project must include a complete case study structure (Section 38)", () => {
    projectsData.forEach((project) => {
      const { caseStudy } = project;
      expect(caseStudy.overview).toBeTruthy();
      expect(caseStudy.problem).toBeTruthy();
      expect(caseStudy.goal).toBeTruthy();
      expect(caseStudy.solution).toBeTruthy();
      expect(caseStudy.architecture.length).toBeGreaterThan(0);
      expect(caseStudy.keyFeatures.length).toBeGreaterThan(0);
      expect(caseStudy.securityConsiderations.length).toBeGreaterThan(0);
    });
  });
});

describe("4. Services Section - PDF Compliance (Section 9)", () => {
  it("Must include all 10 outcome-oriented services", () => {
    expect(servicesData.length).toBe(10);
    servicesData.forEach((service) => {
      expect(service.title).toBeTruthy();
      expect(service.outcome).toBeTruthy();
      expect(service.tags.length).toBeGreaterThan(0);
    });
  });
});

describe("5. Pipeline Section - PDF Compliance (Section 24)", () => {
  it("Must contain 8 ordered stages: Problem through Result", () => {
    expect(pipelineStepsData.length).toBe(8);
    const titles = pipelineStepsData.map((s) => s.title);
    expect(titles[0]).toBe("Problem Definition");
    expect(titles[1]).toBe("Trigger Engine");
    expect(titles[2]).toBe("AI & Decision Logic");
    expect(titles[7]).toBe("Measurable Result");
  });
});

describe("6. Profile Contact Info - PDF Compliance (Section 14, 15, 17)", () => {
  it("Contains valid Mahmud Hasan contact info", () => {
    expect(profileData.name).toBe("Mahmud Hasan");
    expect(profileData.contacts.primaryEmail).toBe("naimsmahmud50@gmail.com");
    expect(profileData.contacts.whatsappDisplay).toBe("01767850859");
    expect(profileData.socials.githubUsername).toBe("naimsmahmud50-dotcom");
    expect(profileData.socials.linkedin).toContain("mahmud-hasan-687908269");
  });
});
