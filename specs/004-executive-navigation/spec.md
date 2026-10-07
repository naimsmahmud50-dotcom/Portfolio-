# Specification: Executive Corporate Navigation Redesign

**Feature Slug:** `004-executive-navigation`  
**Created:** 2026-10-07  
**Status:** In Progress (Spec-Kit SDD)

---

## 1. Executive Summary & Problem Statement

### The Problem:
The top navigation bar currently forces 10 separate section links (`Home`, `About`, `Credentials`, `Skills`, `Services`, `Sprints`, `Pipeline`, `Projects`, `Security`, `Contact`) into a single tight horizontal row between the brand identity and utility controls.

This creates several critical UX and visual flaws:
1. **Severe Font Cramping:** Font size was shrunk to `text-xs` (12px), making labels hard to read and giving an amateurish, unpolished feel.
2. **Visual Clutter ("Hibijibi"):** Having 10 consecutive links in a row overwhelms visitors with cognitive load and looks like a cluttered sentence rather than a top-tier executive portal.
3. **Lack of Corporate Authority:** World-class software architectures (Linear, Stripe, Vercel, Apple) never cram 10 raw links into the primary header. They use curated primary items, clear dropdown groups for deep dives, and generous spacing.

---

## 2. Requirements & Goals

### 2.1 Core Functional Requirements
- **FR-01 (Curated Primary Items):** Consolidate top-level navigation into 5 high-impact corporate links:
  1. `Services` (`#services` - What Mahmud Builds: Web, Apps, Bug Fixes, Automations)
  2. `Projects` (`#projects` - Featured Case Studies & Production Systems)
  3. `Sprints` (`#engagement` - Transparent Engagement Packages & SLAs)
  4. `About` (`#about` - Executive Bio & Engineering Standards)
  5. `Contact` (`#contact` - Direct Dialogue & Inquiries)
- **FR-02 (Architecture & Deep Dive Dropdown):** Provide a sleek, animated "Architecture" dropdown containing:
  - `Technical Skills & Stack` (`#skills`)
  - `Intelligent Systems Pipeline` (`#pipeline`)
  - `Defensive Security Posture` (`#security`)
  - `Credentials & Certifications` (`#credentials`)
- **FR-03 (Typography & Sizing):** Upgrade nav typography to `text-sm font-medium` (14px), comfortable click targets (`px-3.5 py-2`), and modern rounded containers.
- **FR-04 (Floating Glass Styling):** Implement a polished frosted-glass floating header container (`backdrop-blur-xl bg-slate-950/80 border border-slate-800/80 shadow-2xl`) with refined active indicator states.
- **FR-05 (Mobile Drawer Parity):** The mobile drawer must display all items in a clean, categorized, touch-friendly list with icons and descriptions.
- **FR-06 (Action Area):** Preserve the `⌘K` Search launcher, Theme Switcher, and the VIP "Let's Talk" CTA button with generous breathing room.

---

## 3. Success Metrics
- **Visual Impact:** Instant corporate, clean, uncluttered hierarchy.
- **Zero Regression:** 100% of existing tests pass (`tests/data-integrity.test.ts`, etc.).
- **Build Quality:** Zero TypeScript or lint errors in Next.js 15 production build.
