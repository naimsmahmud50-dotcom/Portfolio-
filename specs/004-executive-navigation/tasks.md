# Implementation Tasks: Executive Corporate Navigation

**Feature Slug:** `004-executive-navigation`  
**Parent Plan:** `specs/004-executive-navigation/plan.md`  

---

## Task List

- [x] **Task 1: Redesign Desktop Navigation Structure in `Navbar.tsx`**
  - [x] 1.1 Define curated primary links: `Services`, `Projects`, `Sprints`, `About`, `Contact`.
  - [x] 1.2 Define architecture dropdown links: `Skills`, `Pipeline`, `Security`, `Credentials` with icons and subtitles.
  - [x] 1.3 Upgrade nav link typography to `text-sm font-medium` (14px) with `px-3.5 py-2` touch area.
  - [x] 1.4 Implement accessible animated "Architecture" dropdown popover with smooth fade-in/out and click-outside/escape handlers.

- [x] **Task 2: Polish Header Shell & Responsive Mobile Drawer**
  - [x] 2.1 Refactor header container into a floating frosted glass pill / island with backdrop blur.
  - [x] 2.2 Reorganize mobile menu drawer with clean categorized grouping and 44px+ tap targets.
  - [x] 2.3 Optimize right utility bar: `⌘K` search shortcut, theme toggle, and "Let's Talk" VIP CTA button.

- [x] **Task 3: Verification & Convergence**
  - [x] 3.1 Run `npx vitest run` and confirm 26/26 tests pass.
  - [x] 3.2 Run `npm run build` and ensure Next.js 15 builds in <3.5s with zero errors.
  - [x] 3.3 Commit and push to `origin/main` for live Vercel deployment.
