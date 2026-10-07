# Implementation Tasks: World-Class Light Mode

**Feature Slug:** `010-world-class-white-mode`  
**Status:** In Progress  

---

## Task List

- [x] **Task 1: Hero Section Component Refinements**
  - Update under-image name typewriter card with adaptive luxury gradients (`dark:from-white dark:via-cyan dark:to-teal-300 from-slate-900 via-blue-700 to-cyan-600`).
  - Upgrade name card container styling with `bg-white/95 dark:bg-slate-950/70 border-slate-200 dark:border-cyan-500/30`.
  - Ensure cursor indicator, availability tag, and CTA buttons adapt seamlessly.

- [x] **Task 2: Developer Terminal Protection & Isolation**
  - Add `hero-terminal` class to `HeroTerminal.tsx` container.
  - In `globals.css`, protect `.hero-terminal` from aggressive light-mode text/background flattening so it retains its sleek dark IDE aesthetics and vibrant syntax colors.

- [x] **Task 3: Global CSS Polish & Layering Architecture**
  - Update `:root` and `.light` CSS variables in `src/styles/globals.css`.
  - Refine `.light .tech-card`, `.light .tech-grid-bg`, and `.light .cosmic-nebula-mesh`.
  - Implement luxury diffuse shadows, crisp 1px borders, and high-contrast typography rules.
  - Dim `.light canvas` to `opacity: 0.12` to eliminate starry smudges on white backgrounds.
  - Refine form inputs, buttons, pills, and header docks.

- [x] **Task 4: Quality & Verification**
  - Run `npx vitest run` to ensure all 26 tests pass.
  - Run `npm run build` to verify 0 build errors across 11 static pages.

- [x] **Task 5: Git Commit & Remote Synchronization**
  - Commit changes to `main` with a descriptive message referencing `spec-010`.
  - Push commit to GitHub `origin/main` to trigger Vercel deployment.
