# Feature Specification: Enterprise Hardening & Quality Uplift

**Feature Directory**: `specs/001-enterprise-hardening`  
**Status**: APPROVED  
**Target Platform**: Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS, Vercel  

---

## 1. Executive Summary & Objective

The Mahmud Hasan Executive Portfolio codebase underwent a comprehensive architectural assessment comparing current implementation patterns against enterprise-grade Next.js 15 production standards. 

Six critical architectural and code-quality gaps were identified:
1. **Resilience & Fault Tolerance**: Missing Next.js App Router root error boundary (`error.tsx`) and streaming fallback (`loading.tsx`), leading to unhandled runtime errors showing raw browser crash screens.
2. **Enterprise Security Hardening**: Missing HTTP security headers in `next.config.ts`, leaving the site exposed to clickjacking, MIME-sniffing, and cross-origin embedding risks.
3. **API Rate Limiting & DoS Protection**: `/api/contact` lacked client IP throttling, request size limits, and bot defenses, exposing the serverless function to abuse and potential WhatsApp API quota exhaustion.
4. **URL State Synchronization**: The `ProjectsSection` category tabs and search queries lived purely in client React state without URL parameter synchronization, preventing deep-linking, bookmarking, and shareable filtered views.
5. **Runtime Schema Validation**: The contact form and API relied on ad-hoc, brittle string checks rather than strict, type-inferred runtime validation (`Zod`).
6. **Automated Test Coverage**: Vitest test suites lacked coverage for rate limiting, security headers, and edge-case schema validation.

This specification details the requirements to elevate the codebase to the highest tier ("সর্বোচ্চ মান / World-Class") of software engineering excellence.

---

## 2. User Scenarios & Acceptance Criteria

### User Scenario 1: Seamless Fault Recovery & Graceful Loading
- **Actor**: Recruiter, Enterprise Client, or Casual Visitor.
- **Context**: An unexpected client-side rendering exception occurs, or network latency delays route navigation.
- **Acceptance Criteria**:
  - The application catches unhandled client exceptions inside `src/app/error.tsx` without unmounting the root document layout.
  - The error UI matches the cosmic dark glassmorphism design system (`#030014`, cyber cyan, electric indigo).
  - Users are provided with an actionable "Try Again" recovery button calling Next.js `reset()` and a "Back Home" navigation escape route.
  - A subtle developer diagnostic disclosure (showing error digest or message) is available without compromising user experience.
  - When routes transition or initial data loads, `src/app/loading.tsx` renders a sleek, pulsing animated tech skeleton mirroring the page structure.

### User Scenario 2: Strict HTTP Security Defense
- **Actor**: Modern Web Browser / Security Scanner / Client.
- **Context**: Navigating to any page or requesting any asset on the domain.
- **Acceptance Criteria**:
  - `next.config.ts` declares an asynchronous `headers()` configuration returning industry-standard security headers for all routes (`/:path*`).
  - `X-Frame-Options` is set to `DENY` to prevent clickjacking attacks in iframe contexts.
  - `X-Content-Type-Options` is set to `nosniff` to eliminate MIME-type confusion attacks.
  - `Referrer-Policy` is configured to `strict-origin-when-cross-origin`.
  - `Permissions-Policy` restricts unneeded hardware APIs (`camera=(), microphone=(), geolocation=(), browsing-topics=()`).
  - `Strict-Transport-Security` enforces HTTPS with `max-age=63072000; includeSubDomains; preload`.
  - `X-DNS-Prefetch-Control` is set to `on` for optimal DNS resolution latency.

### User Scenario 3: Contact API Rate Limiting & Anti-Abuse Guard
- **Actor**: Legitimate Contact or Malicious Bot / Spammer.
- **Context**: Submitting leads via the `/api/contact` endpoint.
- **Acceptance Criteria**:
  - The endpoint enforces a sliding-window rate limit (e.g. 5 submissions per 10 minutes per IP address).
  - Subsequent requests exceeding the limit receive HTTP `429 Too Many Requests` with a human-readable error and a `Retry-After` header.
  - Payloads exceeding 10 Kilobytes are rejected with HTTP `413 Payload Too Large`.
  - Bot honeypot traps detect hidden automated form fills and discard them cleanly without triggering external alerts or API calls.
  - Legitimate leads under the rate limit are processed swiftly and returned HTTP `200 OK`.

### User Scenario 4: URL State Deep-linking & Synchronization
- **Actor**: Client or Collaborator sharing a specific project category or search query.
- **Context**: Filtering projects by "AI Agents" or searching for "Workflow".
- **Acceptance Criteria**:
  - Selecting a category updates the URL query string (`?category=AI+Agents`) without full page reloads (`scroll: false`).
  - Entering a search query reflects in the URL query string (`?q=Workflow`).
  - Navigating directly to `https://domain/?category=Web+Apps` immediately pre-filters the project catalog to Web Apps on first render.
  - Clearing search and category resets the URL query parameters cleanly.
  - The component is wrapped in `<Suspense>` so static site generation (`next build`) completes without SSG de-optimization errors.

### User Scenario 5: Strict Runtime Schema Validation with Zod
- **Actor**: Form Submitter / API Consumer.
- **Context**: Submitting contact information with various edge cases (empty strings, whitespace-only, oversized messages, invalid emails).
- **Acceptance Criteria**:
  - The contact schema is defined centrally in `src/utils/contact-schema.ts` using `zod`.
  - Name is constrained: min 2 characters, max 100 characters, trimmed of whitespace.
  - Email is strictly validated using standard email regex / format, max 100 characters.
  - Subject is constrained: max 150 characters with clean fallback.
  - Message is constrained: min 10 characters, max 3000 characters, trimmed.
  - TypeScript types (`ContactFormData`) are inferred directly via `z.infer<typeof contactSchema>`.
  - Route handler returns structured 400 validation error responses if schema parsing fails.

### User Scenario 6: Robust Automated Vitest Verification
- **Actor**: CI/CD Pipeline and Developer.
- **Context**: Running `npx vitest run` and `npm run build`.
- **Acceptance Criteria**:
  - Unit tests verify rate-limiter throttling, window expiration, and IP isolation.
  - Unit tests verify Zod contact schema valid and invalid cases (invalid email, too short, empty strings, payload too large).
  - Unit tests verify that `next.config.ts` produces the complete matrix of security headers.
  - 100% of test suites pass with zero regressions.
  - `npm run build` succeeds cleanly with 0 TypeScript or linting errors.

---

## 3. Scope & Non-Goals
- **In Scope**:
  - `src/app/error.tsx` & `src/app/loading.tsx`
  - `next.config.ts` security headers
  - `src/utils/rate-limiter.ts` & `/api/contact` protection
  - `src/components/home/ProjectsSection.tsx` URL synchronization with Suspense
  - `src/utils/contact-schema.ts` with Zod validation
  - `tests/` expansion for all new modules
- **Non-Goals**:
  - Altering visual theme colors, typography, or existing portfolio content/copy.
  - Modifying the profile image (`mahmud-hasan-suit.jpg`) or background starfield canvas.
  - Adding third-party external database infrastructure (Redis/Postgres) at this stage; in-memory sliding-window token bucket is self-contained and zero-dependency.

---

## 4. Assumptions & Technical Constraints
- Next.js 15 App Router requires client components using `useSearchParams()` to be wrapped in `<Suspense>` to avoid build-time de-opt warnings.
- Serverless Route Handlers on Vercel execute in stateless containers; in-memory rate limiting guards effectively against burst attacks per container instance without requiring external paid services.
- `zod` is installed in `node_modules` and available for zero-overhead imports.
