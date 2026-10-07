# Implementation Plan: Portfolio Decluttering & Conversion Flow Overhaul

**Feature Slug:** `009-portfolio-clarity-declutter-plan`  
**Parent Spec:** `specs/009-portfolio-clarity-declutter-plan/spec.md`  

---

## 1. Root Cause Breakdown ("কেন সাইটটা হিজিবিজি লাগছে")

### Issue 1: Projects Buried at the Bottom
- **Current reality:** Projects is at section 9.
- **Client impact:** 85% of visitors drop off before scrolling past Section 4. They never see the Madrasa ERP, SecureMyPC, or AI Agent!
- **Fix:** Move `ProjectsSection` immediately under `HeroSection` (Position 2).

### Issue 2: Jargon-Heavy, Dense Wall of Text ("Hibijibi Text Sprawl")
- **Current reality:** The copy is packed with cloud enterprise buzzwords ("Quantitative Engineering Metrics", "Zero-Trust Cryptographic Hardening", "P99 <50ms").
- **Client impact:** Small business owners and startup founders get overwhelmed and confused. They want to know: "Can you build my web app? Can you fix my broken WordPress/Next.js site? Can you build an Android app? How fast?"
- **Fix:** Rewrite copy into punchy, client-centric, benefit-driven bullet points (e.g., "Fast turnaround", "Clean responsive design", "Bug-free guarantee").

### Issue 3: CTA Paralysis (Too Many Buttons)
- **Current reality:** Hero has 4 buttons (`View My Work`, `Executive CV`, `Book 15-Min Call`, `Let's Work Together`) + `Copy Email`.
- **Client impact:** When you give 5 options, users choose none.
- **Fix:** Streamline Hero to 2 high-contrast focus CTAs:
  - Primary: `View Projects ↓`
  - Secondary: `Let's Talk ✨` (or `Get in Touch`)
  - Keep `Resume` and `Book Call` in the sleek executive action dock and systems drawer.

### Issue 4: Redundant Sections (Services vs Sprints vs Pipeline vs Security)
- **Current reality:**
  - Services has 10 cards.
  - Sprints has 3 cards.
  - Pipeline has 8 cards.
  - Security has 4 cards.
  That's 25 massive technical cards to read!
- **Fix:** Consolidate Services into 4 crystal-clear flagship pillars:
  1. 🌐 Web & Full-Stack Development
  2. 📱 Android & Mobile App Development
  3. 🛠️ Urgent Website Bug Fixing & Optimization
  4. 🤖 AI & Workflow Automation
  Move the complex deep-dive Pipeline and Security theory into expandable drawers / tabs or keep them crisp and compact.

---

## 2. Step-by-Step Action Plan

| Step | Action | Expected Outcome |
| :--- | :--- | :--- |
| **Phase 1** | Reorder `src/app/page.tsx` sections | `Hero` ➔ `Projects` ➔ `Services` ➔ `Skills` ➔ `About & Credentials` ➔ `Sprints` ➔ `Contact` |
| **Phase 2** | Declutter Hero CTAs & remove premature calculator from top | Hero becomes airy, premium, and directs immediately to Projects |
| **Phase 3** | Consolidate 10 Services into 4 high-impact client modules | No more service redundancy; clients instantly understand what you do |
| **Phase 4** | Simplify dense technical copy across all sections | Professional, approachable, benefit-driven text instead of enterprise buzzwords |
| **Phase 5** | Verify with tests and build | 26/26 tests passing, 0 build warnings, lightning-fast load |
