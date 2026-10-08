# Technical Plan 012: Worldwide Client Contracting & Multi-Channel Contact Optimization

## 1. Architecture Overview
This plan implements end-to-end optimizations for global client conversion across three architectural tiers:
1. **Data & Schema Layer:**
   - Update `profileData.contacts.whatsappDisplay` to `"+880 1767-850859"`.
   - Extend `contactSchema` with optional `budget` and `timeline` string fields.
2. **Backend API Route Layer (`/api/contact/route.ts`):**
   - Provide dynamic `Origin` and `Referer` headers derived from `req.nextUrl.origin` (fallback to `https://mahmud-portfolio.vercel.app`).
   - Parse FormSubmit response JSON to verify `success: true` or `'true'`.
   - Include `budget` and `timeline` in email HTML payload (Resend) and JSON payload (FormSubmit).
3. **Presentation & Interaction Layer (`ContactSection.tsx` & `DiscoveryModal.tsx`):**
   - Add Worldwide Client Trust Signals card in the left column (Global Timezone Overlap: US EST, UK GMT, EU CET; < 4h SLA; NDA-ready).
   - Add a direct 1-click "Book 15-Min Strategy Discovery" action card in the left column to immediately launch `DiscoveryModal`.
   - Add Budget & Timeline dropdowns in the contact form grid.
   - Update `getWhatsAppUrl` and `getMailtoUrl` to include `budget` and `timeline`.
   - Update transmission summary to show selected budget and timeline upon submission.

---

## 2. Risk Mitigation & Compatibility
- **Backward Compatibility:** All new schema fields (`budget`, `timeline`) are optional. Existing test fixtures in `tests/contact-validation.test.ts` and `tests/contact-schema.test.ts` will continue to pass without modifications.
- **Bot Defense:** Honeypot and rate-limiting guards remain strictly enforced.
- **Popup-Blocker Immunity:** All external anchors retain `<a target="_blank" rel="noopener noreferrer">`.

---

## 3. Test Strategy
- Unit tests: Verify `contactSchema` accepts valid budget and timeline parameters and rejects oversized values.
- Build validation: Verify Next.js compilation with zero type errors.
