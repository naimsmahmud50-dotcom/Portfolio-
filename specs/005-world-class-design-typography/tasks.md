# Implementation Tasks: Typography & Human-Crafted Header System

**Feature Slug:** `005-world-class-design-typography`  
**Parent Plan:** `specs/005-world-class-design-typography/plan.md`  

---

## Tasks

- [x] **Task 1: Next.js Google Font Integration & Global Legibility**
  - [x] 1.1 In `src/app/layout.tsx`, import and wire up `Inter` and `JetBrains_Mono` from `next/font/google`.
  - [x] 1.2 In `src/styles/globals.css`, upgrade text contrast variables and anti-aliasing.
  - [x] 1.3 Ensure small labels across the app are upgraded to high-contrast readable colors (`text-slate-200`, `text-slate-300`, `text-cyan-400`).

- [x] **Task 2: Human-Crafted Navbar & Button Redesign in `Navbar.tsx`**
  - [x] 2.1 Refactor brand block into a clean, confident executive emblem (logo + name + live status).
  - [x] 2.2 Re-architect right-side action buttons into a unified, harmonious control dock with micro-dividers.
  - [x] 2.3 Style the primary "Let's Talk" CTA with high-end corporate tactile polish.
  - [x] 2.4 Refine the Architecture dropdown popover for smooth interaction and readable typography.

- [x] **Task 3: Verification & Live Push**
  - [x] 3.1 Run `npx vitest run` to ensure all 26 tests pass.
  - [x] 3.2 Run `npm run build` to verify clean Next.js 15 compilation.
  - [x] 3.3 Commit and push to `origin/main` for live Vercel deployment.
