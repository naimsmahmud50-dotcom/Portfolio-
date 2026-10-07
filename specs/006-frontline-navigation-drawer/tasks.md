# Implementation Tasks: Frontline Navigation & Executive Systems Drawer

**Feature Slug:** `006-frontline-navigation-drawer`  
**Parent Plan:** `specs/006-frontline-navigation-drawer/plan.md`  

---

## Tasks

- [x] **Task 1: Frontline Desktop Navigation Restructuring**
  - [x] 1.1 In `src/components/layout/Navbar.tsx`, update `primaryNavLinks` to directly display: `Services`, `Projects`, `Skills`, `Credentials`, `About`, `Contact`.
  - [x] 1.2 Remove the inline nested "Architecture" dropdown button from the primary link bar so all primary links are immediately accessible on the front bar.

- [x] **Task 2: Far-Right Executive Systems Drawer Trigger & UI**
  - [x] 2.1 Add an executive icon button (`LayoutGrid` or `Layers`) to the far-right action dock with tooltip "All Systems & Modules".
  - [x] 2.2 Implement `systemsDrawerOpen` state with smooth open/close triggers, backdrop blur, and body scroll lock.
  - [x] 2.3 Build the slide-over drawer content:
    - Deep-dive modules (`8-Stage Pipeline`, `Defensive Security`, `Sprint Engagements`).
    - Full site sitemap quick jump with active section indicators.
    - Executive action shortcuts (`Resume Modal`, `Strategy Call`, `Terminal`, `Command Palette`).
  - [x] 2.4 Wire click handlers with smooth scrolling, 78px header offset, automatic drawer closing, and URL hash replacement.

- [x] **Task 3: Accessibility & Mobile Parity**
  - [x] 3.1 Add `Escape` key and backdrop click dismissal.
  - [x] 3.2 Ensure mobile menu also reflects the clean hierarchy and all links.

- [x] **Task 4: Verification & Live Push**
  - [x] 4.1 Run `npx vitest run` (26/26 tests).
  - [x] 4.2 Run `npm run build` (11/11 static pages).
  - [x] 4.3 Git commit and push to `origin/main` for Vercel deployment.
