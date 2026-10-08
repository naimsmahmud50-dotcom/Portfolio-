# Tasks 012: Worldwide Client Contracting & Multi-Channel Contact Optimization

- [x] **Task 012.1 (Schema & Data):** Update `profileData.contacts.whatsappDisplay` in `src/data/profile.ts` to `+880 1767-850859`.
- [x] **Task 012.2 (Schema Extension):** Extend `contactSchema` in `src/utils/contact-schema.ts` with optional `budget` and `timeline` fields.
- [ ] **Task 012.3 (API Robustness):** Update `src/app/api/contact/route.ts` to inject dynamic `Origin` and `Referer` headers for FormSubmit and verify response JSON.
- [ ] **Task 012.4 (Global Client UX):** Upgrade `src/components/home/ContactSection.tsx`:
  - Add Global Remote Availability, Timezone Overlap (US/EU), and SLA card in left column.
  - Add 1-click "Book 15-Min Strategy Discovery" trigger in left column.
  - Add Budget Tier and Target Timeline selectors to the form.
  - Update `getWhatsAppUrl` and `getMailtoUrl` with budget and timeline parameters.
  - Update transmission summary in success view.
- [ ] **Task 012.5 (Automated Test Suite):** Add unit tests for budget and timeline fields in `tests/contact-schema.test.ts` and verify vitest passes 100%.
- [ ] **Task 012.6 (Production Verification):** Execute `npm run build` and ensure all 11 routes compile cleanly.
- [ ] **Task 012.7 (Git Deployment):** Commit and push changes to `origin/main`.
