# Bug Remediation Plan: Contact Form Email Delivery & WhatsApp Dispatch

**Bug Slug:** `contact-email-whatsapp-delivery`  
**Related Assessment:** `.specify/bugs/contact-email-whatsapp-delivery/assessment.md`  
**Status:** In Progress  

---

## 1. Remediation Specifications

### File 1: `src/app/api/contact/route.ts`
Implement robust email forwarding in the API route:
- Parse and sanitize form input.
- Check `RESEND_API_KEY` for Resend delivery to `naimsmahmud50@gmail.com`.
- Dispatch autonomous zero-config server-to-server POST to `https://formsubmit.co/ajax/naimsmahmud50@gmail.com` with clean headers and JSON payload.
- Log dispatch telemetry server-side.
- Return success response with rate-limit headers.

### File 2: `src/components/home/ContactSection.tsx`
- Build `generateWhatsAppUrl(data)` that encodes full name, email, service type, subject, and message.
- Build `generateMailtoUrl(data)` that encodes the exact same structured message directly to `naimsmahmud50@gmail.com`.
- Change button handlers to popup-proof navigation and direct anchor links with `target="_blank" rel="noopener noreferrer"`.
- Upgrade the success confirmation state to show a lead summary with immediate 1-click **"Also Ping on WhatsApp"** (with full message text) and **"Open in Gmail / Email App"**.

### File 3: `src/components/ui/DiscoveryModal.tsx`
- Ensure `whatsappUrl` incorporates client name and note dynamically.
- Ensure email fallback includes full parameters.

---

## 2. Verification Criteria
1. Submitting the form calls `/api/contact` and dispatches the payload to `https://formsubmit.co/ajax/naimsmahmud50@gmail.com` (or Resend if key exists).
2. WhatsApp links generate complete formatted Markdown messages with name, email, and message.
3. No browser popup blockers trigger on WhatsApp clicks.
4. All 26 vitest tests continue passing without regression.
5. Next.js production build compiles with 0 errors.
