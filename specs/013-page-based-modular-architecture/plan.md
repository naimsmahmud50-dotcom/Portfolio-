# Technical Plan 013: Page-Based Modular Routing & Navigation Architecture

## 1. Architectural Strategy
We leverage Next.js 15 App Router directory-based routing:
```text
src/app/
├── page.tsx            # Executive Landing (Hero + Curated Previews + CTAs)
├── projects/
│   ├── page.tsx        # All Projects Showcase & Filter
│   └── [slug]/page.tsx # Deep Case Study
├── services/
│   └── page.tsx        # Solution Pillars + Sprints + ROI Calculator
├── skills/
│   └── page.tsx        # Verified Tech Matrix & Domain Proficiencies
├── about/
│   └── page.tsx        # Background, Mindset & Resume Modal
├── credentials/
│   └── page.tsx        # Degrees, Training & Research
├── systems/
│   └── page.tsx        # 8-Stage Pipeline & Zero-Trust Security
├── contact/
│   └── page.tsx        # Secure Contact Form, WhatsApp & Discovery
└── admin/page.tsx      # Admin Console Sandbox
```

### Component Composition & Modularity
Existing modular section components in `src/components/home/` are reused cleanly without duplicating UI logic:
- `src/components/home/ProjectsSection.tsx` -> consumed inside `src/app/projects/page.tsx`
- `src/components/home/ServicesSection.tsx` + `EngagementSection.tsx` + `RoiCalculator.tsx` -> consumed inside `src/app/services/page.tsx`
- `src/components/home/SkillsSection.tsx` -> consumed inside `src/app/skills/page.tsx`
- `src/components/home/AboutSection.tsx` -> consumed inside `src/app/about/page.tsx`
- `src/components/home/CredentialsSection.tsx` -> consumed inside `src/app/credentials/page.tsx`
- `src/components/home/PipelineSection.tsx` + `SecuritySection.tsx` -> consumed inside `src/app/systems/page.tsx`
- `src/components/home/ContactSection.tsx` -> consumed inside `src/app/contact/page.tsx`

### Shared Page Wrapper / Breadcrumb
To provide a cohesive visual experience with fast page transitions, each subpage will use a standard top padding (`pt-28 pb-16 sm:pb-24`) to clear the fixed executive navbar, complete with an elegant header breadcrumb (`Home / [Section]`).

---

## 2. Navigation & State Management
- In `src/components/layout/Navbar.tsx`:
  - Import `usePathname` from `next/navigation`.
  - Replace hash anchor links (`#projects`) with route links (`/projects`, `/services`, `/skills`, `/about`, `/credentials`, `/contact`).
  - Active detection logic:
    - For home: `pathname === "/"`
    - For subpages: `pathname.startsWith(item.href)`
  - Update `sitemapLinks` and `deepDiveModules` to target `/systems`, `/projects`, `/services`, etc.
- In `src/components/layout/Footer.tsx`:
  - Update links to the exact routes.
- In `src/components/ui/CommandPalette.tsx`:
  - Update actions to call `router.push(item.href)`.
- In `src/components/home/HeroSection.tsx`:
  - Update CTAs to point to `/projects` and `/contact`.

---

## 3. Verification Strategy
1. **Unit & Integrity Tests (`tests/navigation-routes.test.ts`)**:
   - Verify that all primary route URLs are defined and mapped.
   - Verify active route matching function.
2. **Regression Testing**:
   - Run existing 35 Vitest tests.
3. **Build Validation**:
   - `npx next build` generates all static HTML pages without hydration or type errors.
