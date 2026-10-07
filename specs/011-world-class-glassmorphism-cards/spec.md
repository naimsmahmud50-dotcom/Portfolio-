# Feature Specification: Pure Liquid Glassmorphism Cards (Apple VisionOS / macOS Sequoia Standard)

**Feature Slug:** `011-world-class-glassmorphism-cards`  
**Created Date:** 2026-10-07  
**Status:** In Progress (Spec-Kit SDD)  

---

## 1. Executive Summary & Problem Identification
The user uploaded a screenshot of the Services Section cards and requested a **"world class glassy pure glassy vibe"** ("amon jegula ache agular akdom world class glassy pure glassy vibe a ana jay na jevabe best hbe /spec-kit").

### Deficiencies in Current Cards:
1. **Opaque Solid Whitewash:** In light mode, `.tech-card` was set to `background: #FFFFFF !important;`, rendering cards as opaque flat white paper blocks with 0% translucency or refraction.
2. **Missing Specular Light Bevel:** Physical glass exhibits a microscopic top-edge reflection where light hits the upper bezel. Without `box-shadow: inset 0 1px 1px 0 rgba(255,255,255,0.95)`, surfaces look like flat digital cutouts rather than tangible polished glass.
3. **Absence of Background Refraction Glows:** Frosted glass requires ambient chromatic light behind it to refract. Without ambient mesh orbs behind sections, transparent glass has nothing colorful to blur or diffuse.
4. **Flat Inset Boxes:** The "Measurable Outcome" boxes and tag pills were styled as flat opaque boxes rather than nested frosted glass capsules.

---

## 2. World-Class "Pure Glass" Architecture (The 5 Pillars of Liquid Glass)

### Pillar 1: Translucent Refractive Silk Surface
- **Light Mode:**
  `background: rgba(255, 255, 255, 0.72) !important;`
  `backdrop-filter: blur(24px) saturate(190%) !important;`
  `-webkit-backdrop-filter: blur(24px) saturate(190%) !important;`
- **Dark Mode:**
  `background: linear-gradient(135deg, rgba(13, 22, 43, 0.70) 0%, rgba(9, 15, 31, 0.80) 100%);`
  `backdrop-filter: blur(24px) saturate(180%);`
  `-webkit-backdrop-filter: blur(24px) saturate(180%);`

### Pillar 2: Specular Bevel Reflection (Physical Glass Rim)
- Top-edge specular highlight simulates an authentic chamfered glass lip:
  - **Light Mode:**
    `border: 1px solid rgba(255, 255, 255, 0.85) !important;`
    `box-shadow: inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 1px rgba(226, 232, 240, 0.6), 0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 12px 32px -4px rgba(2, 132, 199, 0.08) !important;`
  - **Dark Mode:**
    `border: 1px solid rgba(56, 189, 248, 0.18);`
    `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.14), inset 0 0 0 1px rgba(56, 189, 248, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.45);`

### Pillar 3: Ambient Under-Glass Chromatic Glows
- Integrate ambient chromatic radial orbs into section backgrounds (`ServicesSection`, `ProjectsSection`, `SkillsSection`, etc.):
  - Cyan orb: `bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px]`
  - Electric azure orb: `bg-blue-500/10 dark:bg-electric-600/15 blur-[120px]`
  - Violet ambient aura: `bg-purple-500/8 dark:bg-violet-600/10 blur-[120px]`
- These ambient lights diffuse through the frosted glass, giving cards a living, breathing prismatic glow.

### Pillar 4: Nested Glass Insets (Glass-on-Glass Hierarchy)
- **Outcome Callout Boxes:**
  - Light Mode: `background: rgba(255, 255, 255, 0.60); backdrop-filter: blur(12px); border: 1px solid rgba(226, 232, 240, 0.85); box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.9);`
  - Dark Mode: `background: rgba(15, 23, 42, 0.60); backdrop-filter: blur(12px); border: 1px solid rgba(56, 189, 248, 0.15);`
- **Icon Capsules & Tags:** Translucent frosted capsules with subtle specular borders.

### Pillar 5: Liquid Glass Hover Elevation
- On hover, glass cards exhibit:
  - `-translate-y-1` fluid lift
  - Luminous azure perimeter highlight (`border-color: rgba(2, 132, 199, 0.45)` in light, `rgba(6, 182, 212, 0.6)` in dark)
  - Diffuse ambient bloom shadow: `0 20px 40px -6px rgba(2, 132, 199, 0.18)`
