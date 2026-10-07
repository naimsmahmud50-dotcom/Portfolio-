# Technical Plan: Typography & Human-Crafted Header System

**Feature Slug:** `005-world-class-design-typography`  
**Parent Spec:** `specs/005-world-class-design-typography/spec.md`  

---

## 1. Technical Architecture

### 1.1 Next.js 15 Font Optimization
In `src/app/layout.tsx`:
- Import `Inter` and `JetBrains_Mono` from `next/font/google`.
- Configure `variable: "--font-sans"` and `variable: "--font-mono"`.
- Set `display: "swap"` and `subsets: ["latin"]`.
- Apply variables to `<html>` and `<body>` with `-webkit-font-smoothing: antialiased`.

### 1.2 Global Contrast System in `globals.css`
- Update `--text-secondary` from `#94A3B8` (slate-400) to `#CBD5E1` (slate-300) for high legibility.
- Enhance `.tech-card` contrast: ensure text on cards stands out with crisp contrast.
- Replace dim `text-slate-500` and unreadable `text-[10px]` with clear `text-xs font-mono text-slate-300` or `text-cyan-400`.

### 1.3 Human-Crafted Header Restructure in `Navbar.tsx`
- **Left Brand:**
  - Modern geometric `M` or terminal glyph.
  - `Mahmud Hasan` with crisp font weight.
  - Glowing status badge: `🟢 Available`.
- **Center Nav:**
  - Curated: `Services`, `Projects`, `Sprints`, `Architecture ▾`, `About`, `Contact`.
  - Clean font size (`text-sm font-medium`).
- **Right Action Bar (The Unified Human Control Bar):**
  - Instead of 5 separate detached boxes, assemble into an integrated control dock:
    ```
    [ ⌘K Search ] | [ GitHub | LinkedIn ] | [ Theme Toggle ] | [ "Let's Talk" Primary CTA ]
    ```
  - Use subtle vertical dividers (`<div className="h-4 w-px bg-slate-800" />`) between functional groups so it feels like a precision instrument designed by a human product designer, not arbitrary flex items.
  - The CTA button has high visual distinction: vibrant, high-contrast, glowing gradient with crisp text.

---

## 2. Verification Plan
- Unit tests (`vitest run`): 26/26 tests passing.
- Next.js build: `npm run build` static generation without font or CSS errors.
- Visual inspection: Clean legibility, contrast verification, responsive drawer.
