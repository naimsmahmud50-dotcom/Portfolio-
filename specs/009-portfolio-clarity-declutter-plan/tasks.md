# Implementation Tasks: Portfolio Decluttering, Conversion Flow & White Mode Polish

**Feature Slug:** `009-portfolio-clarity-declutter-plan`  
**Parent Plan:** `specs/009-portfolio-clarity-declutter-plan/plan.md`  

---

## Tasks

- [x] **Task 1: Re-order `page.tsx` for Maximum Client Conversion**
  - [x] 1.1 Move `ProjectsSection` to position 2 (immediately after Hero) so clients see proof of work within 5 seconds.
  - [x] 1.2 Sequence: `Hero` ➔ `Projects` ➔ `Services` ➔ `Skills` ➔ `About` ➔ `Credentials` ➔ `Engagement (Sprints)` ➔ `Contact`.
  - [x] 1.3 Update `Navbar.tsx` `domSectionOrder` and links to match the new order for seamless scrollspy and URL hash sync.

- [x] **Task 2: Consolidate Services & Declutter Copywriting**
  - [x] 2.1 In `ServicesSection.tsx`, consolidate 10 sprawling cards into 4 flagship pillars (Web & Apps, Android Mobile, Bug Fixing & Speed, Workflow Automation).
  - [x] 2.2 In `HeroSection.tsx`, streamline CTAs to 2 primary high-converting buttons (`View Projects ↓` & `Let's Talk ✨`).
  - [x] 2.3 Refine dense enterprise buzzwords into punchy, client-centric, benefit-driven copy.

- [x] **Task 3: Dual-Mode Polish: Luxury Dark Mode (Default) + Crisp White/Light Mode**
  - [x] 3.1 In `src/styles/globals.css`, add comprehensive `.light` CSS rules for `.tech-card`, text contrasts, borders, and ambient gradients.
  - [x] 3.2 Ensure all sections and navbar support seamless light mode classes (`dark:text-... light:text-...` and CSS variables).
  - [x] 3.3 Verify Sun/Moon toggle in navbar flips instantly and saves in `localStorage`.

- [x] **Task 4: Verification & Live Push**
  - [x] 4.1 Run `npx vitest run` (26/26 tests).
  - [x] 4.2 Run `npm run build` (11/11 static pages).
  - [x] 4.3 Git commit and push to `origin/main` for Vercel deployment.
