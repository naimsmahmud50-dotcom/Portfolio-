# Specification: World-Class Typography & Human-Designed Executive Navigation

**Feature Slug:** `005-world-class-design-typography`  
**Created:** 2026-10-07  
**Status:** In Progress (Spec-Kit SDD)

---

## 1. Problem Statement & User Critique

### Critique 1: Dim, Unreadable Small Text & Cheap Font Stack
- **Symptom:** Small texts (`text-xs`, `text-[10px]`, `text-slate-400`, `text-slate-500`) against the deep cosmic dark background are washed out, blurry, and difficult to read.
- **Root Cause:** No Google/Next font was loaded in `layout.tsx` (falling back to Windows Segoe UI default). Dark mode text colors were set to low-contrast shades (`#64748B`, `#94A3B8`) that fail accessibility and readability against dark backgrounds.
- **Goal:**
  - Load **Inter** (via `next/font/google`) as primary sans font with high-contrast weights.
  - Load **JetBrains Mono** for code, terminal, and engineering metrics.
  - Upgrade text contrast across the entire site: elevate body copy from `text-slate-400` to `text-slate-200` (`#E2E8F0`), headings to pure crisp white (`text-slate-100`/`#FFFFFF`), and labels to bright crisp cyan/slate. Eliminate unreadable micro-10px fonts.

### Critique 2: Disjointed "AI-Generated" Navbar Button Cluster
- **Symptom:** The top-right navbar feels like a collection of 5 arbitrary gray box buttons dumped side-by-side (`GitHub box`, `LinkedIn box`, `⌘K box`, `Sun/Moon box`, `CTA button`), looking like a generic template without intentional human design craft.
- **Root Cause:** No visual hierarchy or unified control group.
- **Goal:**
  - Redesign the header into an intentional, human-crafted corporate layout:
    1. **Brand (Left):** Unified, prestigious monogram emblem + "Mahmud Hasan" + single glowing green pulse "Available".
    2. **Navigation (Center):** Elevated pill with crisp 14px typography, ample breathing room, and seamless hover effects.
    3. **Action Cluster (Right):** A unified, cohesive control cluster:
       - Minimalist Search & Command trigger.
       - Clean, borderless Theme toggle.
       - GitHub & LinkedIn neatly integrated into a subtle icon pair with clean dividers.
       - A single high-ticket corporate CTA button: `Book a Call` / `Let's Talk` with hand-crafted gradient, subtle inner border glow, and magnetic tactile feel.

---

## 2. Requirements & Visual Standards

### 2.1 Typography System (WCAG AAA Contrast)
- **Primary Body:** `text-slate-200` (`#E2E8F0`) - Minimum 14px (`text-sm`) for readability, `leading-relaxed`.
- **Primary Headings:** `text-slate-100` (`#F8FAFC`) with bold tracking.
- **Accent Micro-labels:** `text-cyan-400` or `text-slate-300` - Minimum 12px (`text-xs`), eliminate `text-[10px]`.
- **Card Descriptions:** Must be easily readable against card backgrounds (`#0D162B` / `tech-card`).

### 2.2 Navigation Aesthetics
- No cluttered button spam. Clean visual grouping with subtle vertical dividers (`h-4 w-px bg-slate-800`).
- Elegant mobile drawer with clear hierarchy and touch-friendly targets.
