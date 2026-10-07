# Implementation Plan: ScrollSpy Precision & DOM Synchronization

**Feature Slug:** `008-scrollspy-precision-fix`  
**Parent Spec:** `specs/008-scrollspy-precision-fix/spec.md`  

---

## 1. Architectural Strategy

### A. Accurate DOM Order Array in `Navbar.tsx`
Replace `allSectionIds` with `domSectionOrder` aligned with `src/app/page.tsx`:
```ts
const domSectionOrder = [
  "hero",
  "about",
  "credentials",
  "skills",
  "services",
  "engagement",
  "pipeline",
  "projects",
  "security",
  "contact",
];
```

### B. Two-Sided Bounding Box Scroll Detection
Calculate active section using both `top` and `bottom` boundaries:
```ts
const navThreshold = 140; // Pixel clearance under sticky navbar

for (const id of domSectionOrder) {
  const el = document.getElementById(id);
  if (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= navThreshold && rect.bottom > navThreshold) {
      detectedSection = id;
      break;
    }
  }
}
```
Plus page-level overrides:
- `currentScrollY < 120` -> `hero`
- `currentScrollY + clientHeight >= scrollHeight - 70` -> `contact`

### C. Immediate User Wheel & Touch Detection
Listen to `wheel` and `touchmove` events to reset `isManualScrollRef.current = false` immediately, preventing any click timeout from swallowing manual scroll updates.

---

## 2. Testing & Verification
1. Run `npx vitest run` (26/26 tests).
2. Run `npm run build` (11/11 static pages).
3. Test scroll transitions across all sections.
