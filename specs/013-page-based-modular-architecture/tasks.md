# Tasks 013: Discrete Page-Based Modular Architecture & Zero Scroll Fatigue

Organized implementation tasks to eliminate the 12,000px continuous scroll on the homepage and establish discrete, human-crafted modular page views.

## Phase 1: Setup & Navigation Routing Data
- [ ] T001 Update `src/data/navigation.ts` with discrete page routes (`/projects`, `/services`, `/skills`, `/about`, `/credentials`, `/contact`)
- [ ] T002 Update `tests/navigation-routes.test.ts` to validate dedicated routes and active link resolution

## Phase 2: Human-Crafted Executive Homepage (Zero Scroll Fatigue)
- [ ] T003 [US1] Create `src/components/home/ExecutiveDomainGrid.tsx` featuring 4 liquid glassmorphism cards (Projects, Services, Systems, About) with specular light bevels, micro-badges, and direct route action buttons
- [ ] T004 [US1] Refactor `src/app/page.tsx` into an Executive Command Portal (Hero + HeroTerminal + ExecutiveDomainGrid + Fast Discovery Dialogue) reducing scroll height by ~75%

## Phase 3: Discrete Navigation & Component Linking
- [ ] T005 [US2] Update `src/components/layout/Navbar.tsx` with Next.js `Link` routing, active path state, and clean drawer transitions
- [ ] T006 [US2] Update `src/components/layout/Footer.tsx` navigation links to point directly to dedicated routes
- [ ] T007 [US2] Synchronize CTAs in `src/components/home/HeroSection.tsx` and `src/components/ui/HeroTerminal.tsx` to route to `/projects` and `/contact`

## Phase 4: Bug-Free Verification & Quality Assurance (/speckit-bug-test)
- [ ] T008 Run Vitest test suite (`npm test`) to confirm 100% pass across all 7 test files
- [ ] T009 Run static TypeScript typecheck (`npx tsc --noEmit`)
- [ ] T010 Run production build (`npm run build`) to generate all 18 static pages cleanly
- [ ] T011 Verify live local server (`http://localhost:3000`) and test response status across all routes
