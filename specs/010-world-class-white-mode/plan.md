# Technical Architecture & Implementation Plan: World-Class Light Mode

**Feature Slug:** `010-world-class-white-mode`  
**Related Spec:** `specs/010-world-class-white-mode/spec.md`  

---

## 1. Architecture Overview
This plan establishes a comprehensive, high-contrast, luxury styling system in `globals.css` and component-level enhancements for the portfolio's Light Mode.

```
+---------------------------------------------------------------+
|                      porcelain canvas (#F8FAFC)                |
|  +---------------------------------------------------------+  |
|  |     Frosted Executive Header (bg-white/85 blur-2xl)     |  |
|  +---------------------------------------------------------+  |
|                                                               |
|  +---------------------------+  +--------------------------+  |
|  | Hero Left: Obsidian Title |  | Portrait + Under-Image   |  |
|  | Cobalt CTAs, Deep Text    |  | Sapphire-Cobalt Gradient |  |
|  +---------------------------+  +--------------------------+  |
|                                                               |
|  +---------------------------------------------------------+  |
|  |  Hero Terminal: Dark Titanium Sandbox (#0B0F19 chassis) |  |
|  |  Authentic VS Code / macOS High-Contrast Syntax Colors  |  |
|  +---------------------------------------------------------+  |
|                                                               |
|  +---------------------------------------------------------+  |
|  | Bento Cards & Sections: Pure White (#FFFFFF), 1px Slate |  |
|  | Diffuse Shadow System, WCAG AAA Obsidian Typography     |  |
|  +---------------------------------------------------------+  |
+---------------------------------------------------------------+
```

---

## 2. Technical Modifications

### A. Global CSS Refinement (`src/styles/globals.css`)
1. **Light Mode Root Variables:**
   - `--bg-canvas: #F8FAFC;`
   - `--bg-surface: #FFFFFF;`
   - `--bg-card: #FFFFFF;`
   - `--text-primary: #090D16;`
   - `--text-secondary: #334155;`
   - `--accent-electric: #2563EB;`
   - `--accent-cyan: #0284C7;`
   - `--border-subtle: rgba(226, 232, 240, 0.9);`
2. **Layered Card Elevation & Diffuse Shadows:**
   - Define `.light .tech-card` with crisp white background, multi-layer shadow `0 1px 3px rgba(0,0,0,0.02), 0 10px 28px -4px rgba(15, 23, 42, 0.05)`, and azure hover ring.
3. **Typography & Contrast Rules:**
   - Ensure all `.light` text overrides guarantee 7:1+ contrast against white cards.
   - Text slate-100 / 200 -> `#090D16` / `#0F172A`.
   - Text slate-300 -> `#334155`.
   - Text slate-400 -> `#475569`.
4. **Hero Terminal Exception & Chassis Isolation:**
   - Preserve `.hero-terminal` as an authentic dark IDE console (`bg-[#0B0F19] text-slate-100 border-slate-800`) so terminal logs, syntax tokens, and interactive inputs retain their authentic developer aesthetic.
5. **Interactive Background Dimming:**
   - Set `.light canvas` to `opacity: 0.12 !important;` so starry particles provide delicate micro-ambience without gray smudging.

### B. Component Level Precision Upgrades
1. **`HeroSection.tsx`:**
   - Name under portrait: Update gradient to be adaptive or rich in light mode:
     `dark:from-white dark:via-cyan dark:to-teal-300 from-slate-900 via-blue-700 to-cyan-600`.
   - Name card background: `bg-white/90 dark:bg-slate-950/70 border-slate-200 dark:border-cyan-500/30 shadow-xl shadow-slate-200/50 dark:shadow-cyan/15`.
   - Role pill & Availability pill: Crisp light mode styling with `#059669` and `#0284C7`.
2. **`Navbar.tsx`:**
   - Center navigation bar and right utility dock: crisp styling on light mode with clear active indicators.
   - Logo emblem: high-contrast dark-inner emblem with vibrant `M/`.
3. **`ProjectCard.tsx`, `ServicesSection.tsx`, `SkillsSection.tsx`:**
   - Verify card backgrounds and pill badges render with luxury clarity.

---

## 3. Verification Strategy
1. **Automated Testing:** Run `npx vitest run` to ensure all 26 tests pass with 0 regressions.
2. **Static Site Build:** Run `npm run build` to verify clean compilation across all 11 static routes.
3. **Visual Quality Audit:** Verify contrast ratios, text legibility, terminal authenticity, and transition smoothness.
