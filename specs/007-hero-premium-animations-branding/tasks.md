# Implementation Tasks: Premium Hero Typography & Identity Plaque Animations

**Feature Slug:** `007-hero-premium-animations-branding`  
**Parent Plan:** `specs/007-hero-premium-animations-branding/plan.md`  

---

## Tasks

- [x] **Task 1: Fluid Typewriter Hook & Typography Animation Engine**
  - [x] 1.1 Implement smooth character typewriter state logic with typing cadence, hold duration, and backspace erasure.
  - [x] 1.2 Wire the typewriter into "Specializing in..." with a fixed bounding container (`min-h-[44px]`) and blinking cyan terminal cursor.
  - [x] 1.3 Upgrade Hero title ("Hi, I'm Mahmud Hasan") with an animated luminous sheen and responsive typography.

- [x] **Task 2: Under-Image Animated Identity Plaque ("Marattok Animation")**
  - [x] 2.1 Refactor right-side portrait card to feature a clean top status badge.
  - [x] 2.2 Build the executive under-image plaque component directly below the portrait:
    - Animated typewriter name: `Mahmud Hasan` with pulsing cursor.
    - Synchronized subtitle typewriter cycling through primary domains (`Full-Stack Web & Android Apps`, `Website Bug Solver`, `Workflow Automation`).
    - Verified identity telemetry pill (`ID: MH-2026 // Dhaka, BD (UTC+6)`).
    - Cybernetic scanline shimmer and corner brackets.

- [x] **Task 3: Verification & Live Push**
  - [x] 3.1 Run `npx vitest run` (26/26 tests).
  - [x] 3.2 Run `npm run build` (11/11 static pages).
  - [x] 3.3 Git commit and push to `origin/main` for live Vercel deployment.
