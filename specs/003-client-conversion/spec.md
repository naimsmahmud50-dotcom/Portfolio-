# Feature Specification: 10-Second High-Ticket Client Conversion Funnel

**Feature Branch/Directory**: `specs/003-client-conversion`  
**Status**: APPROVED  
**Target Delivery**: Enterprise Portfolio Conversion Uplift  

---

## 1. Executive Summary & Objective

Transform Mahmud Hasan's portfolio from a passive presentation into an aggressive, high-converting enterprise sales engine that convinces incoming international founders, CTOs, and agency executives to initiate a hiring dialogue within **10 seconds** of landing on the site.

The feature achieves this through three psychological vectors:
1. **Quantified Business ROI**: Demonstrates immediate, tangible financial and operational savings via an interactive dual-slider ROI calculator.
2. **Frictionless Engagement Clarity**: Removes ambiguity regarding engagement terms through 3 clearly-scoped corporate sprint packages (Rapid AI MVP, End-to-End Enterprise System, Fractional Architect Retainer).
3. **Instant Zero-Friction Booking**: Eliminates long contact forms with a 1-click strategy discovery schedule modal and pre-filled WhatsApp VIP dialogue link.

---

## 2. User Scenarios & Acceptance Flows

### Scenario A: The US/EU Tech Founder seeking rapid AI Automation
- **Actor**: Founder / CEO with operational bottleneck.
- **Action**: Lands on portfolio, adjusts the Enterprise ROI Calculator sliders to their team's metrics (e.g. 25 hrs/wk @ $45/hr).
- **Result**: Instantly sees $49,000+ annual savings projection, clicks "Automate This With Mahmud", and schedules a 15-minute discovery call within 30 seconds.

### Scenario B: The CTO evaluating architectural engagement models
- **Actor**: Technical executive looking for contract talent or architecture review.
- **Action**: Scrolls to the "Corporate Engagement Models" matrix.
- **Result**: Sees transparent delivery scope, timeline (2-Week MVP vs 4-6 Week Enterprise vs Monthly Retainer), and zero-risk SLA terms. Clicks to initiate dialogue.

### Scenario C: The Mobile / WhatsApp Executive on the go
- **Actor**: International client browsing on mobile.
- **Action**: Clicks "Book 15-Min Strategy Discovery".
- **Result**: Selects WhatsApp direct route; opens WhatsApp with an automatically pre-drafted message with executive context, avoiding typing friction.

---

## 3. Functional Requirements

### FR-1: Enterprise Automation ROI Calculator Widget
- **Sliders**:
  - `Team Operational Hours`: Range 5 to 80 hrs/wk, step 1, default 20.
  - `Average Employee Hourly Cost`: Range $20 to $120/hr, step 5, default $35.
- **Dynamic Output Metrics**:
  - `Estimated Annual Dollar Savings`: Calculated as `Hours × Rate × 52 × 0.85` (accounting for 85% automation efficiency).
  - `Turnaround Speed Multiplier`: Displayed as `10x Faster Execution`.
  - `Accuracy Standard`: Displayed as `99.8% Zero-Error SLA`.
- **Integrated Action CTA**: One-click action button linking directly to the Strategy Discovery Modal.

### FR-2: 3 Corporate Engagement Models Matrix
- **Module 1 - Rapid AI MVP & Prototype**:
  - Timeline: 2 Weeks
  - Ideal for: Early-stage startups, PoC validation, fast tool integrations.
  - Deliverables: Functional agent tool-loop, Next.js frontend, deployed Vercel demo.
- **Module 2 - End-to-End Enterprise Architecture**:
  - Timeline: 4 to 6 Weeks
  - Ideal for: Production systems, educational ERPs, workstation surveillance.
  - Deliverables: Next.js + Flutter + NestJS + Drift SQLite + Zero-Trust tunnels + Full Git handover.
- **Module 3 - Fractional AI Systems Architect**:
  - Timeline: Monthly Ongoing Retainer
  - Ideal for: Growing companies needing ongoing architecture review, security audits, pipeline scalability.
  - Deliverables: 15-20 hrs/mo dedicated advisory, PR reviews, security hardening, incident support.
- **Risk Reversal Guarantee**:
  - Transparent milestones, verifiable Git history, and SLA delivery guarantee.

### FR-3: Strategy Discovery Booking Modal (`DiscoveryModal.tsx`)
- Triggerable via:
  - Hero primary CTA ("Book 15-Min Strategy Discovery")
  - ROI Calculator CTA ("Automate This With Mahmud")
  - Engagement Model cards ("Select Sprint")
  - Global Command Palette (`⌘K` shortcut)
- Content:
  - Tab 1: Instant WhatsApp VIP Connect (Pre-drafted executive message link).
  - Tab 2: 15-Min Discovery Calendar / Quick Time Selector.
  - Tab 3: Direct Priority Email with pre-filled subject.

### FR-4: Zero-Friction Codebase Preservation
- Preserve existing 26/26 unit tests.
- Retain dark luxury cosmic glassmorphism design tokens.
- Retain existing `Navbar`, `Footer`, `HeroTerminal`, `ResumeModal`, and `PipelineSection`.

---

## 4. Success Criteria

1. **Conversion Speed**: Client can view estimated savings and launch the discovery modal in under 10 seconds.
2. **Zero Regressions**: All Vitest test suites (26/26) continue to pass with 0 failures.
3. **Build Integrity**: Clean Next.js 15 compilation with 0 TypeScript or lint errors.
4. **Mobile Responsiveness**: 100% responsive layout across mobile, tablet, and desktop viewports.
