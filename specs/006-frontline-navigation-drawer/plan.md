# Implementation Plan: Frontline Primary Navigation & Executive Systems Drawer

**Feature Slug:** `006-frontline-navigation-drawer`  
**Parent Spec:** `specs/006-frontline-navigation-drawer/spec.md`  

---

## 1. Architectural Strategy

### A. Navigation Restructuring in `Navbar.tsx`
- **Primary Frontline Links (`primaryNavLinks`):**
  1. `Services` (`#services`)
  2. `Projects` (`#projects`)
  3. `Skills` (`#skills`)
  4. `Credentials` (`#credentials`)
  5. `About` (`#about`)
  6. `Contact` (`#contact`)
  
  These 6 links cover every fundamental portfolio section directly in front of the visitor without requiring any clicks or hovers.

### B. Far-Right Systems Drawer Trigger
- Add a dedicated executive trigger icon on the far right (inside the action bar / dock or adjacent to the CTA):
  - Icon: `LayoutGrid` (representing "All Systems & Modules") with pulse indicator and tooltip `"Explore Systems & Modules"`.
  - State: `const [systemsDrawerOpen, setSystemsDrawerOpen] = useState(false)`.
  - Also triggerable on mobile or unified smoothly with the menu.

### C. Executive Slide-Over Drawer Component
- Render a high-end slide-over drawer pinned to the right (`fixed inset-y-0 right-0 z-50 w-full sm:w-96`):
  - Backdrop: `fixed inset-0 bg-black/70 backdrop-blur-sm z-40`.
  - Drawer surface: `bg-slate-950/95 border-l border-slate-800/90 shadow-2xl backdrop-blur-2xl p-6 overflow-y-auto`.
  - Content sections:
    1. **Header**: Drawer title ("Executive System Navigator"), status pill ("Online / Active"), and Close (`X`) button.
    2. **Specialized Deep-Dive Systems (Hidden from front bar to prevent clutter)**:
       - **8-Stage Autonomous Pipeline** (`#pipeline` - icon: `Workflow`, cyan)
       - **Defensive Security Hardening** (`#security` - icon: `ShieldCheck`, emerald)
       - **Sprint Engagements & SLAs** (`#engagement` - icon: `Zap`, amber)
    3. **All Portfolio Sections (Quick Jump)**:
       - Clean 2-column or list view of all sections with active indicator dots.
    4. **Direct Engineering Utilities**:
       - Download / View CV Resume (`open-resume-modal`)
       - Book Strategy Call (`open-discovery-modal`)
       - Command Palette Search (`open-command-palette`)
       - Live Developer Terminal quick scroll
    5. **Socials & Direct Contact Footer**:
       - GitHub, LinkedIn, Direct Email with copy action.

### D. Keyboard & Focus Accessibility
- Escape key listener closes the drawer.
- Click outside (backdrop click) closes the drawer.
- Body scroll locking (`overflow-hidden`) while drawer is open to prevent background jank.
- Clean ARIA labels: `aria-expanded`, `aria-label="Systems and modules drawer"`.

---

## 2. Testing & Quality Gates
1. Run `npx vitest run` to verify all 26 unit tests continue to pass.
2. Run `npm run build` to verify clean Next.js 15 build with 11/11 static pages.
3. Verify interactive behavior: smooth scrolling, URL hash sync, open/close animations.
