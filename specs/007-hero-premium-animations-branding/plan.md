# Implementation Plan: Premium Hero Typography & Identity Plaque Animations

**Feature Slug:** `007-hero-premium-animations-branding`  
**Parent Spec:** `specs/007-hero-premium-animations-branding/spec.md`  

---

## 1. Architectural Strategy

### A. Dynamic Character Typewriter Engine
Create a reusable, highly-tuned hook or component for fluid typewriter motion:
- **Typing phase**: 45ms - 65ms per character.
- **Hold phase**: 1800ms upon full sentence completion.
- **Deleting phase**: 25ms - 35ms per character.
- **Pause before next word**: 300ms.
- **Cursor**: Glowing cyan/emerald cursor (`|` or `_`) with `animate-pulse` or CSS keyframe blinking.

### B. Title Animation & Shimmer
- In `HeroSection.tsx`:
  - Enhance "Hi, I'm Mahmud Hasan":
    - Gradient with animated background flow (`bg-[linear-gradient(110deg,#38bdf8,45%,#818cf8,55%,#22d3ee)] bg-[length:250%_100%] animate-[gradient-flow_4s_ease-in-out_infinite]`).
    - Hand wave or sparkle icon with micro-float interaction.
  - "Specializing in" container:
    - Min-height wrapper (`min-h-[44px]` or `min-h-[48px]`) to completely prevent layout jumping (Cumulative Layout Shift = 0).
    - Code badge aesthetic with frosted dark glass (`bg-slate-900/90 border border-cyan-500/40 text-cyan`).

### C. Right Column Image Card & Under-Image Plaque ("Marattok Animation")
- Restructure the right column:
  1. **Portrait Image Frame**:
     - Maintain golden ratio frame (4:5) with high-end glass border and corner bracket accents.
     - Top badge: `● LIVE STATUS // OPEN FOR WORK`.
  2. **Dedicated Under-Image Identity Marquee / Plaque**:
     - Pinned directly below the image frame (`mt-4 w-full`).
     - Plaque container: `bg-slate-950/95 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan/20 backdrop-blur-2xl relative overflow-hidden group`.
     - Decorative scanline overlay and corner crosshairs (`+`).
     - **Main Animated Name**:
       - Typewriter animated name display: `Mahmud Hasan` with luminous cyan glow.
     - **Secondary Animated Role Sub-ticker**:
       - `Web & Web Apps` • `Android & Flutter` • `Website Bug Solver` • `Automation`
     - **Quick Skill Verification Pills**:
       - `Next.js / React` • `Flutter / Dart` • `Python / Node` • `Defensive Sec`
     - **Action**: One-click quick connect or view resume button.

---

## 2. Testing & Quality Gates
1. Run `npx vitest run` to ensure all 26 existing tests pass.
2. Run `npm run build` to verify clean compilation with 0 TypeScript/Lint errors.
3. Visual and responsiveness checks across all screen sizes.
