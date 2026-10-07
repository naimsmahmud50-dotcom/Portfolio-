# Implementation Plan: Enterprise Hardening & Quality Uplift

**Feature Directory**: `specs/001-enterprise-hardening`  
**Spec Reference**: [spec.md](./spec.md)  
**Status**: APPROVED FOR EXECUTION  

---

## 1. Technical Architecture Overview

```
Client Tier:
  [ Browser ] 
       │
       ├──► URL Sync (?category=...&q=...) ──► [ ProjectsSection (<Suspense>) ]
       │
       ├──► Form Validation ──► [ contactSchema (Zod safeParse) ]
       │
       └──► Global Error Catch ──► [ error.tsx ] / Streaming ──► [ loading.tsx ]

Network Tier:
  [ Next.js Security Headers (next.config.ts) ]
       ├── X-Frame-Options: DENY
       ├── X-Content-Type-Options: nosniff
       ├── Referrer-Policy: strict-origin-when-cross-origin
       ├── Permissions-Policy
       └── Strict-Transport-Security

Server / Route Handler Tier:
  [ POST /api/contact ]
       ├── 1. Request Body Size Guard (< 10 KB)
       ├── 2. In-Memory Sliding-Window Rate Limiter (5 req / 10 min / IP)
       ├── 3. Honeypot Bot Trap Check
       ├── 4. Zod Schema Validation & Sanitization
       └── 5. WhatsApp API / Server Response (200 / 400 / 413 / 429)
```

---

## 2. Component & Module Specifications

### Module 1: Resilience & Fallbacks (`src/app/error.tsx` & `src/app/loading.tsx`)
- **`src/app/error.tsx`**:
  - Directives: `"use client"`
  - Props: `{ error: Error & { digest?: string }, reset: () => void }`
  - Elements:
    - Tech shield / alert icon with glowing aura (`text-cyan`, `border-electric-500/30`)
    - Error headline: "System Anomaly Intercepted"
    - Friendly message explaining the error was safely isolated
    - "Try Recovery" button triggering `reset()`
    - "Back to Safety" Link to `/`
    - Collapsible developer diagnostic panel (showing `error.message` and `error.digest`)
- **`src/app/loading.tsx`**:
  - Server Component streaming boundary
  - Elements:
    - Animated skeleton representing Navbar, Hero Executive card, and Grid Cards
    - Shimmering gradient animation (`animate-pulse`, `bg-slate-900/60`, `border-slate-800`)

### Module 2: Enterprise Security Headers (`next.config.ts`)
- Export `headers()` function matching `source: "/:path*"`:
  ```ts
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
      ],
    },
  ]
  ```

### Module 3: Sliding-Window Rate Limiter (`src/utils/rate-limiter.ts`)
- Interface:
  ```ts
  export interface RateLimitOptions {
    windowMs: number;
    maxRequests: number;
  }
  export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    resetMs: number;
  }
  ```
- Implementation: In-memory Map keyed by client identifier (`IP`). Values store timestamp array `number[]`. Expired entries older than `now - windowMs` are filtered. Max map size is bounded with periodic garbage collection to prevent memory leaks in persistent processes.

### Module 4: URL State Synchronization (`ProjectsSection.tsx`)
- Hooks: `useSearchParams()`, `useRouter()`, `usePathname()`.
- State synchronization:
  - Initial state initialized from `searchParams.get("category")` (with fallback to `"All"`) and `searchParams.get("q")` (with fallback to `""`).
  - When user alters filters, update local state and update query params via `router.replace(newUrl, { scroll: false })`.
  - Architecture: Wrap the component consuming `useSearchParams` in `<Suspense fallback={<ProjectsSkeleton />}>` to guarantee zero build-time de-optimization during SSG.

### Module 5: Strict Runtime Schema Validation (`src/utils/contact-schema.ts`)
- Zod Schema:
  ```ts
  import { z } from "zod";

  export const contactSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
    email: z.string().trim().email("Please provide a valid email address").max(100),
    subject: z.string().trim().max(150).default("General Inquiry"),
    serviceType: z.string().trim().max(80).default("AI Automation"),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message cannot exceed 3000 characters"),
    honeypot: z.string().optional(),
  });

  export type ContactFormData = z.infer<typeof contactSchema>;
  ```

### Module 6: Automated Test Verification
- Tests in `tests/`:
  - `tests/rate-limiter.test.ts`: Verify burst allowance, threshold blockage, window recovery, and IP isolation.
  - `tests/contact-schema.test.ts`: Verify valid inputs, short message, malformed email, field trimming, honeypot.
  - `tests/security-headers.test.ts`: Verify all headers returned by `next.config.ts`.
  - Existing `contact-validation.test.ts` & `data-integrity.test.ts` maintained for full backward compatibility.

---

## 3. Verification & Acceptance Gates
- Gate 1: `npx vitest run` passes with 100% test success across all test files.
- Gate 2: `npm run build` succeeds cleanly with 0 TypeScript, lint, or SSG warnings.
- Gate 3: Git status clean, changes committed and pushed to `main` for Vercel deployment.
