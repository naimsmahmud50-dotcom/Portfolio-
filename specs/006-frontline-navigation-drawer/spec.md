# Feature Specification: Frontline Primary Navigation & Executive Systems Drawer

**Feature Slug:** `006-frontline-navigation-drawer`  
**Created Date:** 2026-10-07  
**Status:** In Progress  

---

## 1. Problem Statement & Motivation
In the previous navigation structure, core portfolio pillars (such as **Technical Skills** and **Credentials**) were tucked inside a nested dropdown labeled "Architecture". Users and potential enterprise clients felt that essential engineering signals (Skills, Credentials) were buried behind an extra click, while deep-dive modules (Pipeline, Defensive Security, Sprints) cluttered the primary user attention.

The user mandate:
1. Promote all primary portfolio options to the front navigation bar (`Services`, `Projects`, `Skills`, `Credentials`, `About`, `Contact`).
2. Provide a dedicated icon on the far right side that opens an executive slide-over drawer / navigation sheet containing the specialized deep-dive systems (8-Stage Pipeline, Defensive Security Hardening, Sprint Engagements, Interactive Tools, and Full Site Sitemap).

---

## 2. Requirements & User Stories

### User Story 1: Immediate Frontline Clarity
- **As a client or hiring manager**, I want to see the core evaluation sections (`Services`, `Projects`, `Skills`, `Credentials`, `About`, `Contact`) immediately visible in the desktop navbar, so that I can evaluate core engineering capabilities without opening dropdown menus.

### User Story 2: Far-Right Executive Systems Drawer
- **As a technical evaluator or CTO**, I want a dedicated icon on the far right side of the navbar (`LayoutGrid` / `More` icon), so that clicking it opens an executive right slide-over drawer showing deep-dive engineering modules (8-Stage Autonomous Pipeline, Defensive Security Architecture, Sprints & Pricing, ROI Calculator, Resume, and Terminal).

### User Story 3: Seamless Interaction & Mobile Parity
- **As any user**, clicking any item in either the front navigation bar or the systems drawer must:
  - Smoothly scroll to the corresponding section with sticky header offset (78px).
  - Instantly update the browser URL hash (`#skills`, `#pipeline`, `#security`, etc.).
  - Auto-close the slide-over drawer and mobile drawer smoothly.
  - Support `Escape` key and outside-click dismissal.

---

## 3. Scope & Non-Goals

### In Scope
- Upgrade desktop navigation links in `Navbar.tsx` to include `Services`, `Projects`, `Skills`, `Credentials`, `About`, `Contact`.
- Add an executive systems drawer trigger icon on the far right of the navbar.
- Build an ultra-sleek, responsive slide-over drawer with high-contrast glassmorphism (`backdrop-blur-2xl`), categorized modules (Deep-Dive Systems, Quick Jump, Utility Actions), and keyboard accessibility.
- Update mobile menu to ensure complete parity with all sections and actions.
- Full test and build verification.

### Out of Scope
- Modifying underlying section content or schemas.
- Adding third-party heavy drawer libraries (native React + Tailwind + Lucide icons only).
