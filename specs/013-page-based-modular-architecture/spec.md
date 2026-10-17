# Feature Spec 013: Page-Based Modular Routing & Navigation Architecture

## 1. Overview & Context
Currently, the portfolio renders all 11 sections vertically stacked on the root landing page (`/`). A visitor, client, or hiring manager has to scroll through thousands of vertical pixels to see Mahmud's services, skills, or contact dialogue.
While jump links (`#projects`, `#services`) scroll down the page, they create cognitive overload, degrade mobile usability, and do not provide clean shareable deep URLs for specific topics.

This feature transforms the portfolio into an executive, multi-page Next.js web application:
1. **Dedicated Routes**: Each core domain has its own dedicated, clean route (`/projects`, `/services`, `/skills`, `/about`, `/credentials`, `/systems`, `/contact`).
2. **High-Impact Landing Page (`/`)**: Streamlined executive entry point with hero identity, terminal, curated highlights, and direct CTAs to deep pages.
3. **Active Navigation Awareness**: Top navigation bar and drawers leverage Next.js App Router `usePathname()` to display instant visual feedback for the active page.
4. **Shareable & SEO-Optimized**: Every page receives distinct metadata (`title`, `description`, OpenGraph context).

---

## 2. User Stories
- **US-1 (Prospective Enterprise Client):** As an engineering executive or client, I want to click "Services" or "Projects" and immediately see a dedicated, distraction-free page tailored to that topic without having to scroll through Mahmud's whole personal history.
- **US-2 (Technical Recruiter / CTO):** As a CTO evaluating technical capabilities, I want to visit `/skills` or `/systems` directly or share the link with my team so they can inspect Mahmud's architectural methodology without extraneous noise.
- **US-3 (Mobile Visitor):** As a smartphone user, I want quick, lightweight pages where clicking each section loads only that view, saving mobile bandwidth and battery while eliminating infinite scrolling fatigue.

---

## 3. Functional Requirements
- **FR-1 (Route Hierarchy):** Next.js App Router must host the following dedicated page routes:
  - `/`: Executive Home & Hero with curated preview highlights.
  - `/projects`: Complete projects showcase (As-Sunnah SDI, Arenta, etc.) linking to `/projects/[slug]`.
  - `/services`: Core solution pillars, Sprint Engagements, and ROI Calculator.
  - `/skills`: Verified Technology Matrix and proficiencies.
  - `/about`: Mission statement, engineering mindset, journey, and resume trigger.
  - `/credentials`: Academic degrees, ongoing training, and certifications.
  - `/systems`: 8-Stage Pipeline, Defensive Security zero-trust blueprint.
  - `/contact`: Client onboarding form, WhatsApp direct link, and strategy discovery booking.
- **FR-2 (Navbar Active States):** The top navigation bar must use Next.js `usePathname()` to detect the active route and style the corresponding button/link with active highlights.
- **FR-3 (Consistent Page Header):** Each subpage must display a clean section title, breadcrumb ("Home / [Page]"), and an executive summary lead paragraph.
- **FR-4 (Internal Linking):** All buttons, drawer items, footer links, command palette entries, and hero CTAs must navigate to the appropriate route rather than obsolete hash anchors.
- **FR-5 (SEO & Metadata):** Each route must export customized Next.js `metadata` for search engines and social sharing.

---

## 4. Acceptance Criteria
- [x] Visiting `/projects` loads only the projects showcase without the other 9 sections.
- [x] Visiting `/services` loads the services, sprints, and ROI calculator.
- [x] Visiting `/skills` loads the verified skills matrix.
- [x] Visiting `/about` loads the biography and mission.
- [x] Visiting `/credentials` loads the credentials and research.
- [x] Visiting `/systems` loads the pipeline and security architecture.
- [x] Visiting `/contact` loads the hardened contact form and communication channels.
- [x] Navbar links navigate instantaneously and indicate the active route accurately.
- [x] All 35+ Vitest tests pass without regressions.
- [x] `npm run build` succeeds with zero errors and generates static pages for all routes.
