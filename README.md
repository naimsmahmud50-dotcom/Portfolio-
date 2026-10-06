# Mahmud Hasan — AI Automation & Engineering Portfolio

A premium, production-grade personal portfolio website for **Mahmud Hasan** (*AI Automation Expert | App Developer | Web Developer*), built strictly in alignment with the 21-page specification PDF.

---

## 🚀 Key Architectural Features

- **Dark-First Modern Tech Aesthetic:** Deep navy canvas (`#070A13`), Electric Blue (`#3B82F6`), Cyan (`#06B6D4`), and subtle Violet accents.
- **Dynamic Content Engine:** All data (Profile, Skills, Services, Credentials, Projects, Pipeline, Security) lives in modular, type-safe stores under `src/data/`.
- **Authentic Credentials Separation:** Strict distinction between:
  - **Current Learning Journey:** As-Sunnah Skill Development Institute (AI Automation)
  - **Previously Completed Credentials:** Arenta Web Security (Ethical Hacking Course & Corporate Internship)
- **Interactive Intelligent Systems Pipeline:** 8-stage interactive workflow diagram (`Problem → Trigger → AI/Logic → Tools/APIs → Automation → Database → Action → Result`).
- **Dynamic Deep Case Studies:** `/projects/[slug]` pages featuring Problem, Goal, Solution, Architecture, Key Features, Security, and Stack breakdown.
  - *Personal PC Security* (`/projects/personal-pc-security`)
  - *Bangladesh Madrasa Management System* (`/projects/bangladesh-madrasa-management-system`)
  - *Personal AI Agent* (`/projects/personal-ai-agent`)
  - *Naim Knows* (`/projects/naim-knows`)
  - *AI Automation Learning Journey* (`/projects/ai-automation-learning-journey`)
- **WhatsApp Dual-Mode Workflow:**
  - **Mode A (Client Fallback):** Pre-filled direct WhatsApp click-to-chat.
  - **Mode B (Cloud API Ready):** Server-side route handler ready to accept Meta WhatsApp Business credentials via `.env.local`.
- **Private Admin Console:** Route `/admin` featuring:
  - Staging future projects without touching code.
  - Testimonial moderation pipeline (*Pending*, *Approved*, *Rejected*).
  - Honest privacy-conscious visitor analytics with clean empty states.
- **Zero Hallucinated Metrics:** Adheres strictly to the PDF rule prohibiting invented dates, jobs, customer stats, or fake telemetry.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion + CSS Keyframes
- **Icons:** Lucide React
- **Theme:** Dark Mode (default), Light Mode & System Preference support

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🔐 Environment Variables (Optional)

Create a `.env.local` file in the root directory if you wish to activate WhatsApp Cloud API Mode B:

```env
WHATSAPP_CLOUD_API_TOKEN=your_meta_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_RECIPIENT_PHONE=8801767850859
```

---

## 📁 Project Structure

```text
Mahmud Protfolio/
├── public/
│   ├── images/
│   │   ├── profile/mahmud-hasan.jpg    # Verified personal portrait
│   │   └── projects/*.svg              # Project artwork
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout, SEO OpenGraph, Theme & Toast
│   │   ├── page.tsx                    # Main visual narrative (9 connected sections)
│   │   ├── not-found.tsx               # Creative 404 handler
│   │   ├── projects/[slug]/page.tsx    # Dynamic Case Study detail view
│   │   ├── admin/page.tsx              # Private Admin console
│   │   └── api/contact/route.ts        # Honeypot & WhatsApp Cloud API handler
│   ├── components/
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── home/ (Hero, About, Credentials, Skills, Services, Pipeline, Projects, Security, Contact)
│   │   ├── projects/ (ProjectCard)
│   │   └── providers/ (ThemeProvider, ToastProvider)
│   ├── data/                           # Scalable content files
│   └── types/                          # Strict TypeScript definitions
```
