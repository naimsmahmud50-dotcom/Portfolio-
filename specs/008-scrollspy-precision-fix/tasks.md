# Implementation Tasks: ScrollSpy Precision & DOM Synchronization

**Feature Slug:** `008-scrollspy-precision-fix`  
**Parent Plan:** `specs/008-scrollspy-precision-fix/plan.md`  

---

## Tasks

- [x] **Task 1: Real DOM Sequence & Dual-Boundary ScrollSpy Engine**
  - [x] 1.1 In `src/components/layout/Navbar.tsx`, update `domSectionOrder` to strictly match the DOM order of `page.tsx`.
  - [x] 1.2 Implement dual-boundary check (`rect.top <= navThreshold && rect.bottom > navThreshold`) in `handleScroll`.
  - [x] 1.3 Add wheel and touchmove event listeners to unblock manual scroll calculation instantly.

- [x] **Task 2: Verification & Live Push**
  - [x] 2.1 Run `npx vitest run` (26/26 tests).
  - [x] 2.2 Run `npm run build` (11/11 static pages).
  - [x] 2.3 Git commit and push to `origin/main` for Vercel deployment.
