import { describe, it, expect } from "vitest";
import { primaryNavLinks, deepDiveModules, sitemapLinks } from "@/data/navigation";

describe("Navigation & Route Integrity Suite", () => {
  it("should have all primary navigation links pointing to valid section anchors and routes", () => {
    expect(primaryNavLinks.length).toBeGreaterThan(0);

    for (const link of primaryNavLinks) {
      expect(link.name).toBeDefined();
      expect(link.targetId).toBeDefined();
      expect(link.href).toBeDefined();
      expect(link.href.startsWith("/")).toBe(true);
      expect(link.href.includes("#")).toBe(false);
      expect(link.route).toBeDefined();
      expect(link.route?.startsWith("/")).toBe(true);
    }
  });

  it("should contain all required corporate pillars in primary nav", () => {
    const hrefs = primaryNavLinks.map((l) => l.href);
    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/services");
    expect(hrefs).toContain("/skills");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/credentials");
    expect(hrefs).toContain("/contact");
  });

  it("should have all deep dive modules pointing to valid targets and routes", () => {
    expect(deepDiveModules.length).toBe(3);
    for (const mod of deepDiveModules) {
      expect(mod.targetId).toBeDefined();
      expect(mod.badge).toBeDefined();
      expect(mod.description).toBeDefined();
      expect(mod.route?.startsWith("/")).toBe(true);
    }
  });

  it("should have a complete sitemap linking to all domains and sections", () => {
    const sitemapTargets = sitemapLinks.map((s) => s.targetId);
    expect(sitemapTargets).toContain("hero");
    expect(sitemapTargets).toContain("projects");
    expect(sitemapTargets).toContain("services");
    expect(sitemapTargets).toContain("skills");
    expect(sitemapTargets).toContain("about");
    expect(sitemapTargets).toContain("credentials");
    expect(sitemapTargets).toContain("engagement");
    expect(sitemapTargets).toContain("pipeline");
    expect(sitemapTargets).toContain("security");
    expect(sitemapTargets).toContain("contact");
  });

  it("should accurately resolve active link states", () => {
    const isLinkActive = (href: string, pathname: string) => {
      if (href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(href);
    };

    // Root home tests
    expect(isLinkActive("/", "/")).toBe(true);
    expect(isLinkActive("/", "/projects")).toBe(false);

    // Subpage tests
    expect(isLinkActive("/projects", "/projects")).toBe(true);
    expect(isLinkActive("/projects", "/projects/madrasa-educational-erp")).toBe(true);
    expect(isLinkActive("/projects", "/services")).toBe(false);

    // Services tests
    expect(isLinkActive("/services", "/services")).toBe(true);
    expect(isLinkActive("/services", "/contact")).toBe(false);

    // Contact tests
    expect(isLinkActive("/contact", "/contact")).toBe(true);
  });
});
