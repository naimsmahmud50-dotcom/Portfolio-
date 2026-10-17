# Bug Assessment: Restore Complete Homepage Architecture & Fix Webpack Runtime Error

- **Slug**: `restore-homepage-sections-and-fix-webpack-error`
- **Reported**: 2026-10-17
- **Severity**: High (User-facing regression & dev-server webpack cache corruption)
- **Status**: Triaged & Ready for Fix

## 1. Symptoms & User Impact
1. **Missing Portfolio Content on Homepage**: The previous refactor stripped all 10 core sections (`ProjectsSection`, `ServicesSection`, `SkillsSection`, `AboutSection`, `CredentialsSection`, `EngagementSection`, `PipelineSection`, `SecuritySection`, `RoiCalculator`, `ContactSection`) from `src/app/page.tsx` and moved them strictly to subroutes. The user saw their beloved projects and sections disappear from the main landing page.
2. **Next.js Webpack Runtime TypeError**: In the running dev server, Fast Refresh caused React Client Manifest desynchronization:
   `TypeError: __webpack_modules__[moduleId] is not a function`
3. **FOUC / Unstyled CSS**: Because the runtime error broke client hydration, Tailwind CSS failed to apply, causing unstyled text links and SVGs to expand to full viewport dimensions.
4. **SVG Unconstrained Viewport Explosion**: `GithubIcon` and other SVGs lacking HTML `width`/`height` attributes blew up to full viewport width when CSS was delayed or interrupted.

## 2. Root Cause Analysis
1. `src/app/page.tsx` was over-streamlined, removing the rich components the user wanted present on the main site.
2. The long-running dev server task cached old webpack module IDs in `.next/cache` while new App Router route directories were created and modified concurrently, causing `__webpack_modules__[moduleId] is not a function`.
3. Navigation links were changed to hard route transitions (`/projects`, `/services`) instead of seamless section navigation on the homepage with graceful fallback for external routes.

## 3. Proposed Remediation
1. **Restore Full Homepage (`src/app/page.tsx`)**: Re-mount all 11 sections in true sequential order:
   - `HeroSection`
   - `ProjectsSection` (`id="projects"`)
   - `ServicesSection` (`id="services"`)
   - `SkillsSection` (`id="skills"`)
   - `AboutSection` (`id="about"`)
   - `CredentialsSection` (`id="credentials"`)
   - `EngagementSection` (`id="engagement"`)
   - `PipelineSection` (`id="pipeline"`)
   - `SecuritySection` (`id="security"`)
   - `RoiCalculator` (`id="roi-calculator"`)
   - `ContactSection` (`id="contact"`)
2. **Unified Hybrid Navigation (`Navbar.tsx`)**:
   - When on `/`, clicking `Projects`, `Services`, `Skills`, etc. smoothly and instantaneously scrolls to that section (`#projects`, `#services`) without any page reload or hydration glitch.
   - When on subpages (e.g. `/projects/[slug]` or `/admin`), links navigate back to `/#projects`, etc.
   - Active scrollspy and route detection work harmoniously.
3. **Dedicated Subpage Preservation**: Keep the dedicated pages (`/projects`, `/services`, `/skills`, `/about`, `/credentials`, `/systems`, `/contact`) intact and error-free for users accessing them directly via deep links.
4. **Inline SVG Hardening (`SocialIcons.tsx`)**: Add explicit `width={16}` and `height={16}` HTML attributes to inline SVGs to prevent viewport blowups during any loading state.
5. **Clean Dev Server Reset**: Stop `task-305`, purge `.next` cache, and restart `npm run dev` with a clean manifest.

## 4. Files to Change
- `src/app/page.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/ui/SocialIcons.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/HeroTerminal.tsx`
- `src/components/home/HeroSection.tsx`
- `src/data/navigation.ts`
- `tests/navigation-routes.test.ts`
