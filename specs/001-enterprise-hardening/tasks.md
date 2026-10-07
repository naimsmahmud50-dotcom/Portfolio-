# Implementation Tasks: Enterprise Hardening & Quality Uplift

**Feature Directory**: `specs/001-enterprise-hardening`  
**Plan Reference**: [plan.md](./plan.md)  
**Status**: COMPLETED  

---

## Task List

- [x] **Task 1: Resilience & Fallbacks**
  - [x] 1.1 Create `src/app/error.tsx` client error boundary with retry and diagnostics.
  - [x] 1.2 Create `src/app/loading.tsx` streaming skeleton fallback matching cosmic theme.
  
- [x] **Task 2: Enterprise Security Hardening**
  - [x] 2.1 Update `next.config.ts` with strict HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `X-DNS-Prefetch-Control`).

- [x] **Task 3: API Rate Limiting & DoS Protection**
  - [x] 3.1 Create `src/utils/rate-limiter.ts` sliding-window in-memory rate limiter with TTL cleanup.
  - [x] 3.2 Update `src/app/api/contact/route.ts` with rate-limiting check (`429`), payload size guard (`413`), and IP extraction.

- [x] **Task 4: URL State Deep-linking & Synchronization**
  - [x] 4.1 Update `src/components/home/ProjectsSection.tsx` with bidirectional URL query synchronization (`category`, `q`).
  - [x] 4.2 Wrap the search-params consumer in `<Suspense>` to preserve Next.js 15 Static Site Generation (SSG).

- [x] **Task 5: Runtime Schema Validation with Zod**
  - [x] 5.1 Create `src/utils/contact-schema.ts` defining strict Zod schema and TypeScript inference types.
  - [x] 5.2 Integrate `contactSchema` into `src/app/api/contact/route.ts` for safe parsing and detailed error responses.
  - [x] 5.3 Enhance `src/components/home/ContactSection.tsx` with pre-submission schema validation feedback.

- [x] **Task 6: Test Suite Expansion & Quality Verification**
  - [x] 6.1 Create `tests/rate-limiter.test.ts` testing sliding window, burst limits, and IP isolation.
  - [x] 6.2 Create `tests/contact-schema.test.ts` testing valid and boundary/edge case inputs.
  - [x] 6.3 Create `tests/security-headers.test.ts` verifying all security headers are configured.
  - [x] 6.4 Execute `npx vitest run` to verify 100% test pass (26/26 tests passing).
  - [x] 6.5 Execute `npm run build` to verify zero production build errors (11/11 pages statically generated).
  - [x] 6.6 Commit all verified changes and push to `origin main`.
