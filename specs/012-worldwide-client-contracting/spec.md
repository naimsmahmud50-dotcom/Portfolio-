# Feature Spec 012: Worldwide Client Contracting & Multi-Channel Contact Optimization

## 1. Overview & Context
Mahmud Hasan's portfolio serves global enterprise clients, startup founders, product managers, and engineering directors across North America (US/Canada), Europe (UK/EU), the Middle East, and Asia-Pacific.
To maximize contract conversion and eliminate friction for worldwide clients, the portfolio must support international contracting expectations:
1. Rock-solid backend email dispatch with correct HTTP `Origin` and `Referer` headers for zero-config transports.
2. Full international notation for direct communication (E.164 phone standard `+880 1767-850859`).
3. Multi-channel regional routing: North American clients prefer corporate email & scheduled discovery calls; European & global founders often prefer encrypted WhatsApp.
4. Professional scoping inputs: Optional Budget Tier and Timeline selectors to signal serious engineering and sprint delivery readiness.
5. Global Trust & Availability signals: Timezone overlap assurances, response SLA (< 4 hours), contract models (Fixed Sprint, Milestone, NDA-ready).

---

## 2. User Stories
- **US-1 (US/EU Enterprise Client):** As a CTO or Product Director in New York or London, I want to see clear remote availability, timezone overlap, and professional budget/timeline options so I can initiate a project discussion via email or 15-min discovery call without friction.
- **US-2 (Fast-Paced Global Founder):** As a startup founder in Berlin or Dubai, I want to initiate a chat via WhatsApp with my project brief, budget, and timeline already pre-filled so I don't have to repeat myself.
- **US-3 (Portfolio Owner - Mahmud):** As Mahmud, I want all client submissions to reliably reach my primary Gmail (`naimsmahmud50@gmail.com`) with client details, budget, timeline, and reply-to headers intact.

---

## 3. Functional Requirements
- **FR-1:** Server-to-server dispatch in `/api/contact/route.ts` must pass valid `Origin` and `Referer` headers to FormSubmit and verify `data.success === 'true' || data.success === true`.
- **FR-2:** `src/data/profile.ts` must display the full international WhatsApp number (`+880 1767-850859`) instead of local format (`01767850859`).
- **FR-3:** `src/utils/contact-schema.ts` must accept optional `budget` and `timeline` fields with sanitization.
- **FR-4:** `ContactSection.tsx` must feature:
  - Budget Tier selector (`< $1k`, `$1k - $3k`, `$3k - $5k`, `$5k+`, `Discuss Scope`)
  - Target Timeline selector (`Immediate (< 1 wk)`, `1-2 Weeks`, `1 Month`, `Flexible`)
  - Global Remote Availability & Timezone Overlap card
  - 1-Click "Book 15-Min Strategy Discovery" trigger in the left column
  - Transmission summary including budget and timeline in the success view
- **FR-5:** WhatsApp URL generator must encode budget and timeline alongside name, email, service, subject, and message.
- **FR-6:** Mailto fallback URL generator must encode budget, timeline, and reply-to data.

---

## 4. Success Criteria
1. FormSubmit server-to-server POST receives valid headers without origin errors.
2. WhatsApp links format cleanly with international standard number `+880 1767-850859` and full lead breakdown.
3. 100% test pass rate across all Vitest suites (zero regressions).
4. Next.js production build (`npm run build`) completes cleanly with 0 TypeScript/ESLint errors.
