# Technical Architecture & Implementation Plan: Pure Liquid Glassmorphism

**Feature Slug:** `011-world-class-glassmorphism-cards`  
**Related Spec:** `specs/011-world-class-glassmorphism-cards/spec.md`  

---

## 1. Architectural Strategy
We will transition `.tech-card` from an opaque white/dark box into a high-end **Apple VisionOS / macOS Sequoia liquid glass surface** with full hardware-accelerated backdrop blur, specular top reflection, multi-layer diffuse drop shadows, and ambient under-glass lighting.

```
+--------------------------------------------------------------------------+
|                     SECTION AMBIENT BACKGROUND                           |
|       (Atmospheric Cyan/Blue/Violet Radial Blurs shining through)        |
|                                                                          |
|       +----------------------------------------------------------+       |
|       |  TOP SPECULAR HIGHLIGHT: inset 0 1px 1.5px rgba(255..0.95)|      |
|       |  CHAMFERED GLASS BORDER: 1px rgba(255, 255, 255, 0.85)   |       |
|       |  TRANSLUCENT SILK: rgba(255, 255, 255, 0.72) / blur(24px)|       |
|       |                                                          |       |
|       |  [Icon Pill: Frosted Glass Capsule]      [01 Number]     |       |
|       |                                                          |       |
|       |  Title: High-Contrast Obsidian / Electric Cyan           |       |
|       |  Description: Deep Slate Typography                      |       |
|       |                                                          |       |
|       |  +----------------------------------------------------+  |       |
|       |  | Nested Inset Glass: rgba(255,255,255,0.60) blur-md |  |       |
|       |  | Measurable Outcome: High-contrast verified text    |  |       |
|       |  +----------------------------------------------------+  |       |
|       |                                                          |       |
|       |  [Pill Tag]  [Pill Tag]                 [Inquire ->]     |       |
|       +----------------------------------------------------------+       |
|       DIFFUSE AMBIENT BLOOM SHADOW: 0 12px 32px -4px rgba(...)           |
+--------------------------------------------------------------------------+
```

---

## 2. Technical Modifications

### A. Global CSS (`src/styles/globals.css`)
1. **Redefine `.tech-card` for Dark Mode:**
   - Translucent dark smoked crystal: `linear-gradient(135deg, rgba(13, 22, 43, 0.70) 0%, rgba(9, 15, 31, 0.80) 100%)`
   - `backdrop-filter: blur(24px) saturate(180%);`
   - `border: 1px solid rgba(56, 189, 248, 0.18);`
   - `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.14), 0 8px 32px 0 rgba(0, 0, 0, 0.45);`
   - Hover state: `border-color: rgba(6, 182, 212, 0.55); box-shadow: inset 0 1px 2px rgba(6, 182, 212, 0.3), 0 16px 44px -4px rgba(6, 182, 212, 0.22); transform: translateY(-4px);`
2. **Redefine `.light .tech-card` for Light Mode:**
   - Translucent porcelain silk: `rgba(255, 255, 255, 0.74) !important;`
   - `backdrop-filter: blur(24px) saturate(190%) !important;`
   - `-webkit-backdrop-filter: blur(24px) saturate(190%) !important;`
   - Top specular glass rim: `border: 1px solid rgba(255, 255, 255, 0.85) !important;`
   - Multi-layer shadow: `box-shadow: inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 1px rgba(226, 232, 240, 0.6), 0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 12px 32px -4px rgba(2, 132, 199, 0.08) !important;`
   - Hover state: `background: rgba(255, 255, 255, 0.85) !important; border-color: rgba(2, 132, 199, 0.45) !important; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.98), 0 20px 40px -6px rgba(2, 132, 199, 0.16), 0 8px 16px -2px rgba(15, 23, 42, 0.05) !important; transform: translateY(-4px) !important;`
3. **Glass Inset Panels inside `.tech-card`:**
   - Light mode insets (outcome box, tag pills): `background-color: rgba(255, 255, 255, 0.60) !important; backdrop-filter: blur(12px) !important; border: 1px solid rgba(226, 232, 240, 0.8) !important; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.9) !important;`

### B. Section Ambient Under-Glass Lights (`ServicesSection.tsx` & others)
- Add ambient blurred chromatic orbs behind `ServicesSection`:
  - Top-left cyan orb: `w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none`
  - Bottom-right electric azure orb: `w-96 h-96 bg-blue-500/10 dark:bg-electric-600/15 rounded-full blur-[100px] pointer-events-none`
  - Center violet aura: `w-80 h-80 bg-violet-500/8 dark:bg-violet-600/10 rounded-full blur-[100px] pointer-events-none`
- Upgrade cards inside `ServicesSection.tsx`:
  - Outer card transition and glass lift.
  - Outcome box with frosted translucent styling.
  - Tags with clean glass capsules.

---

## 3. Verification & Validation
1. Automated unit & integration tests (`npx vitest run`).
2. Production build compilation (`npm run build`).
3. Visual confirmation of glass translucency, specular rim, and ambient refraction.
