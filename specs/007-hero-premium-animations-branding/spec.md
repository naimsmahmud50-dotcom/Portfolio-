# Feature Specification: Premium Hero Typography & Identity Plaque Animations

**Feature Slug:** `007-hero-premium-animations-branding`  
**Created Date:** 2026-10-07  
**Status:** In Progress  

---

## 1. Problem Statement & Motivation
The previous Hero title and "Specializing in..." rotation used an abrupt, low-fidelity string swap every 2.8 seconds with an instantaneous CSS transition, creating visual jitter and looking amateurish. Additionally, the engineer's portrait had only a small static badge tucked inside the photo, lacking the high-impact ("marattok") personal branding, presence, and motion aesthetics expected in high-end Silicon Valley / top-tier agency portfolios.

The user mandate:
1. Overhaul the Hero title and "Specializing in..." into an ultra-premium, smooth character-by-character typewriter animation with realistic cadence, glowing cursor, and shimmering gradient typography.
2. Build a high-impact animated identity plaque directly underneath the engineer's portrait image featuring a stunning typing animation for Mahmud's name, rotating role credentials, live verification telemetry, and glowing holographic accents.

---

## 2. Requirements & User Stories

### User Story 1: Fluid Typewriter for "Specializing in..."
- **As a client landing on the site**, I want to see "Specializing in [Role]" typed out smoothly letter by letter with a blinking cyan cursor and smooth backspace erasure, so that the technological agility and engineering craftsmanship are apparent within the first 3 seconds.

### User Story 2: Luminous Title Typography
- **As a visitor**, I want Mahmud Hasan's name in the main hero heading to feature a living, smooth gradient shimmer animation and crisp font antialiasing, elevating the site beyond cookie-cutter AI templates.

### User Story 3: Under-Image Animated Identity Plaque ("Marattok Animation")
- **As an evaluator**, I want a dedicated identity marquee directly underneath the portrait image that dynamically types out `Mahmud Hasan` with a glowing cursor, cycles through his primary disciplines (`Web & Full-Stack Apps`, `Android & Flutter`, `Website Bug Fixing`, `Automation`), and showcases real-time availability badges.

---

## 3. Technical Constraints & Design Principles
- Zero layout shifts (CLS = 0): Ensure fixed/minimum bounding dimensions on dynamic text containers so the layout never jumps when longer or shorter strings type out.
- High Performance: Pure React state with `requestAnimationFrame` or tuned `setTimeout` intervals for letter-by-letter typing and smooth memory cleanup.
- Full mobile responsiveness: Stack smoothly on mobile viewports (`< 768px`) without clipping or overflow.
