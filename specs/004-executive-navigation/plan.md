# Technical Plan: Executive Corporate Navigation Architecture

**Feature Slug:** `004-executive-navigation`  
**Parent Spec:** `specs/004-executive-navigation/spec.md`  

---

## 1. Architectural Strategy

### 1.1 Structural Decomposition
The navbar will be restructured into 3 distinct zones with ample breathing room:

```
+---------------------------------------------------------------------------------------------------+
|  [Logo & Available Badge]      [Services | Projects | Sprints | Architecture v | About | Contact]    [Ctrl+K | Theme | Let's Talk]  |
+---------------------------------------------------------------------------------------------------+
```

### 1.2 Desktop Navigation Model
- **Primary Nav Array:**
  - `Services` -> `#services`
  - `Projects` -> `#projects`
  - `Sprints`  -> `#engagement`
  - `Architecture` (Dropdown containing: Skills `#skills`, Pipeline `#pipeline`, Security `#security`, Credentials `#credentials`)
  - `About`    -> `#about`
  - `Contact`  -> `#contact`
- **Dropdown Mechanics:**
  - Hover or click opens a luxurious frosted glass popover (`bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl rounded-2xl p-2`).
  - Each item in the dropdown has an icon (`Layers`, `Workflow`, `ShieldCheck`, `Award`), title, and micro-description.
  - Clicking any item smoothly scrolls to that section and closes the dropdown.
  - Keyboard accessible (ESC closes).

### 1.3 Mobile Navigation Drawer
- Clean categorized sections:
  - **Core Pillars:** Services, Projects, Sprints, About, Contact
  - **Technical Architecture:** Skills, Pipeline, Security, Credentials
- Large touch targets (min 44px height).

### 1.4 Active Section Tracking
- Maintains accurate scrollspy across all section IDs (`hero`, `services`, `projects`, `engagement`, `skills`, `pipeline`, `security`, `credentials`, `about`, `contact`).
- If an active section is inside the "Architecture" dropdown, the "Architecture" trigger button itself highlights as active with a subtle indicator badge.

---

## 2. Testing & Verification Plan
- Unit tests (`tests/data-integrity.test.ts`): Verify all sections remain navigable and no regressions occur.
- Browser test: Smooth scrolling with proper 80px fixed navbar clearance offset.
- Build test: `npm run build` static generation check.
