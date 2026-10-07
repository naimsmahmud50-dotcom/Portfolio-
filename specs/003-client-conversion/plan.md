# Technical Architecture & Implementation Plan: 10-Second High-Ticket Client Conversion Funnel

**Feature Directory**: `specs/003-client-conversion`  
**Spec Reference**: [spec.md](./spec.md)  
**Status**: APPROVED  

---

## 1. Architectural Strategy

To achieve 10-second conversion without degrading performance, all components must be:
- **Zero-Dependency Lightweight**: Built with native React 19 / Next.js 15 client state, Tailwind CSS, and Lucide icons already present in the bundle.
- **Client-Decoupled via Custom Events**: `window.dispatchEvent(new CustomEvent("open-discovery-modal", { detail: { sprint?: string } }))` allows any CTA in any component to open the Strategy Discovery Modal seamlessly without prop drilling.
- **Accessible & Touch-Optimized**: Range inputs for the ROI calculator will feature custom touch sliders and responsive typography.

---

## 2. File & Component Manifest

1. **`src/data/engagement.ts`**:
   - Data structure for the 3 Corporate Engagement Models, including badge indicators, duration, deliverables checklist, and risk-reversal guarantees.

2. **`src/components/ui/RoiCalculator.tsx`**:
   - Dual-slider interactive engine:
     - State: `hoursPerWeek` (number, default 20), `hourlyRate` (number, default 35).
     - Computed: `annualSavings` = `hours * rate * 52 * 0.85`, `turnaround` = "10x Faster", `errorReduction` = "99.8%".
     - CTA button triggering `open-discovery-modal` with current calculated values.

3. **`src/components/home/EngagementSection.tsx`**:
   - Dedicated conversion section showcasing:
     - 3 Corporate Sprint Packages:
       1. Rapid AI MVP & Prototype (2 Weeks)
       2. End-to-End Enterprise Architecture (4-6 Weeks)
       3. Fractional Systems Architect Retainer (Monthly)
     - SLA & Risk-Reversal Guarantee banner.

4. **`src/components/ui/DiscoveryModal.tsx`**:
   - Global modal containing:
     - Tab 1: Instant VIP WhatsApp bridge with pre-drafted message.
     - Tab 2: 15-Min Strategy Call slot selector & calendar link.
     - Tab 3: Direct Priority Email link with pre-filled subject and body.

5. **Layout & Navigation Mounts**:
   - `src/app/layout.tsx`: Mount `<DiscoveryModal />` globally.
   - `src/app/page.tsx`: Insert `<RoiCalculator />` and `<EngagementSection />`.
   - `src/components/home/HeroSection.tsx`: Add "Book Strategy Call" quick CTA.
   - `src/components/ui/CommandPalette.tsx`: Add Discovery Call and ROI Calculator actions.

---

## 3. Testing & Verification Plan

- Run Vitest unit tests: `npx vitest run` ensuring 26/26 tests continue to pass.
- Run production build: `npm run build` verifying clean Next.js 15 compilation.
- Commit and push to `origin main` to trigger automatic Vercel production deployment.
