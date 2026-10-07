# Feature Specification: ScrollSpy Precision & DOM Synchronization

**Feature Slug:** `008-scrollspy-precision-fix`  
**Created Date:** 2026-10-07  
**Status:** In Progress  

---

## 1. Problem Statement & Bug Analysis
The user reported that clicking on "About" in the navbar, and subsequently scrolling down the page to other sections (e.g., `#projects`), resulted in "About" remaining highlighted in the navbar instead of dynamically switching to the currently visible section.

### Root Cause
1. **DOM Order Mismatch:** In `Navbar.tsx`, `allSectionIds` had `about` listed near the end of the array (index 8), whereas in `src/app/page.tsx`, `<AboutSection />` is positioned right after the Hero section near the top of the DOM.
2. **One-Sided Boundary Check:** The scrollspy algorithm checked `rect.top <= navThreshold` in reverse without verifying `rect.bottom > navThreshold`. As a result, any section scrolled past upwards (which had a negative `rect.top`) qualified as `rect.top <= navThreshold`. Because `about` was checked early in the reverse loop, it prematurely matched and permanently locked the active state.
3. **Manual Scroll Lock Latency:** `isManualScrollRef` held a hardcoded 700ms timeout that could ignore user wheel/touch events during fast manual scrolling.

---

## 2. Requirements & Acceptance Criteria
- **Strict Bounding-Box Detection:** A section is active if and only if `rect.top <= navThreshold && rect.bottom > navThreshold` (or at true top/bottom page limits).
- **Accurate DOM Sequence:** `domSectionOrder` must strictly reflect the exact top-to-bottom layout of `src/app/page.tsx`:
  `hero` -> `about` -> `credentials` -> `skills` -> `services` -> `engagement` -> `pipeline` -> `projects` -> `security` -> `contact`.
- **Responsive Intent Clearing:** Clear `isManualScrollRef` immediately upon user `wheel` or `touchmove` interaction so manual scrolling always updates active state instantaneously.
- **URL Hash Synchronization:** Dynamic and accurate URL hash updates as sections scroll into view.
