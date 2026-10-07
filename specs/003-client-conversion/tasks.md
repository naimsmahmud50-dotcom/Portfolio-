# Implementation Tasks: 10-Second High-Ticket Client Conversion Funnel

**Feature Directory**: `specs/003-client-conversion`  
**Plan Reference**: [plan.md](./plan.md)  
**Status**: COMPLETED  

---

## Task List

- [x] **Task 1: Corporate Engagement Data Schema**
  - [x] 1.1 Create `src/data/engagement.ts` defining the 3 Corporate Sprints (Rapid AI MVP, End-to-End Enterprise Architecture, Fractional Retainer) with deliverables, SLAs, and badges.

- [x] **Task 2: Strategy Discovery Booking Modal (`DiscoveryModal.tsx`)**
  - [x] 2.1 Create `src/components/ui/DiscoveryModal.tsx` with instant WhatsApp VIP connect, 15-min calendar slot request, and priority email channels.
  - [x] 2.2 Mount `<DiscoveryModal />` globally in `src/app/layout.tsx` and attach `open-discovery-modal` event listener.

- [x] **Task 3: Interactive Automation ROI Calculator (`RoiCalculator.tsx`)**
  - [x] 3.1 Create `src/components/ui/RoiCalculator.tsx` with dual interactive sliders (Hours: 5-80, Rate: $20-$120), live annual savings metrics, and "Automate With Mahmud" CTA.
  - [x] 3.2 Place `<RoiCalculator />` on the main page (`src/app/page.tsx`) between Hero and About sections.

- [x] **Task 4: Corporate Engagement Models Section (`EngagementSection.tsx`)**
  - [x] 4.1 Create `src/components/home/EngagementSection.tsx` with the 3 sprint cards, deliverables badges, and risk-reversal guarantee.
  - [x] 4.2 Integrate `<EngagementSection />` into `src/app/page.tsx` right after Services section (`#services`).

- [x] **Task 5: Hero & Global Navigation Integration**
  - [x] 5.1 Add "Book 15-Min Call" CTA in `HeroSection.tsx`.
  - [x] 5.2 Add Discovery Call and ROI Calculator actions in `CommandPalette.tsx`.

- [x] **Task 6: Verification, Production Build & Deployment**
  - [x] 6.1 Run `npx vitest run` to ensure all 26 unit tests pass (26/26 passed).
  - [x] 6.2 Run `npm run build` to verify 100% clean production compilation (11/11 pages compiled).
  - [x] 6.3 Commit changes with conventional commit and push to `origin main` for Vercel deployment.
