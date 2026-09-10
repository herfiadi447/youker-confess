# Implementation Plan: Web App "Confession Page" (YOUKER-CONFEST)

Website personal, romantis, dan interaktif untuk menyatakan perasaan secara digital dengan user flow yang singkat, desain "Tender Modernity" sesuai acuan Stitch, penyimpanan data ke Supabase, dan notifikasi realtime via Telegram Bot.

---

## Technical Stack & Architecture

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom design system based on `tender_modernity/DESIGN.md`:
  - **Colors**: Canvas `#FCFAF9`, Primary Rose `#E11D48` / `#b80035`, Charcoal Text `#1C1917`, Soft Muted `#78716C`, Border `#F3E8E8`.
  - **Typography**: Google Font **Plus Jakarta Sans**.
  - **Shapes & Radius**: Full Pill (`rounded-full`) for buttons/inputs, `24px` (`rounded-xl`) for cards.
- **Animations**:
  - `Framer Motion` for screen transitions and micro-interactions.
  - `canvas-confetti` / custom particle engine for celebratory "Yes" burst.
  - HTML5 Canvas for gentle falling particles on "No" screen.
- **Database**: Supabase Postgres (`responses` table).
- **Notification**: Telegram Bot API (`sendMessage` trigger from backend API route).
- **Admin Protection**: Password gate checked against server-side `ADMIN_PASSWORD`.
- **Config Management**: Centralized configuration `src/config/confession.ts` for customizable variables (Target Name, Sender Name, Question, Slug).

---

## Directory Structure Strategy

```
YOUKER-CONFEST/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Global Root Layout (Plus Jakarta Sans, viewport limits)
│   │   ├── page.tsx                # Landing page / slug redirect
│   │   ├── [slug]/                 # Personalized confession page route
│   │   │   └── page.tsx
│   │   ├── admin/                  # Admin recap dashboard (Password protected)
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── response/           # API Route: Save response to Supabase + Telegram notify
│   │       └── admin-auth/         # API Route: Verify admin PIN/password
│   ├── components/
│   │   ├── screens/
│   │   │   ├── LandingScreen.tsx   # Screen 1: Personal greeting + "Buka" button
│   │   │   ├── QuestionScreen.tsx  # Screen 2: Question + Evading "Nggak" button
│   │   │   ├── AnswerYesScreen.tsx # Screen 3: Fireworks/Hearts celebration
│   │   │   └── AnswerNoScreen.tsx  # Screen 4: Dignified falling particles result
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx  # Recap metrics & activity log
│   │   └── ParticleCanvas.tsx      # Falling particles canvas for "No" screen
│   ├── config/
│   │   └── confession.ts           # Central config for customizable names & question
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client setup
│   │   └── telegram.ts             # Telegram Bot notification dispatcher
│   └── types/
│       └── confession.ts           # TypeScript interfaces for response telemetry
├── .gitignore
├── env.local.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema (Supabase `responses`)

```sql
create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  answer text not null check (answer in ('yes', 'no')),
  message text null,
  dodged_count integer default 0,
  answered_at timestamptz default now()
);
```

---

## Phased Execution Workflow

Progress will be built and confirmed step-by-step:

### Phase 1: Project Setup & Infrastructure
- Initialize Next.js App Router project in repository root.
- Install dependencies (`@supabase/supabase-js`, `framer-motion`, `canvas-confetti`, `@types/canvas-confetti`, `lucide-react` / `@fontsource/plus-jakarta-sans`).
- Configure `tailwind.config.ts` with design tokens from `tender_modernity/DESIGN.md`.
- Verify `.env.local` reading (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ADMIN_PASSWORD`).
- Ensure `.gitignore` explicitly ignores `.env.local` and `.env`.
- Create feature branch `feature/confession-app`.

### Phase 2: Landing Screen (`LandingScreen.tsx`)
- Implement mobile-first container (`max-width: 420px`) with warm blush background `#FCFAF9`.
- Render subtle header badge ("Pesan Pribadi"), pulsing heart icon, personal greeting (`Hi, [Target Name]`), subtext, and pill button ("Buka").
- Replicate exact visuals and micro-interactions from `stitch_instruction_following_app/1._landing_screen/code.html`.

### Phase 3: Question Screen & Dodging UX (`QuestionScreen.tsx`)
- Render core question headline ("Mau jadian?" / custom question).
- Implement primary "Iya" button and secondary outline "Nggak" button.
- **Dodging logic**:
  - Hover / near-touch triggers random `translate(x, y)` offset.
  - Cycle label texts (`'Yakin?'`, `'Coba pikir lagi'`, `'Masa sih?'`, `'Jahat banget...'`, `'Sekali lagi deh'`).
  - Track `dodged_count` for analytics telemetry.

### Phase 4: Result Screens (`AnswerYesScreen.tsx` & `AnswerNoScreen.tsx`)
- **Yes Screen**:
  - Full-screen `canvas-confetti` heart burst animation.
  - Central celebration badge ("Yeay! ❤️"), warm confirmation copy, and "Status Respon" pill.
- **No Screen**:
  - Custom HTML5 canvas with gentle descending particles (`#A8A29E`).
  - Sincere, dignified text ("Oke, thx ya"), privacy note card, and close button.

### Phase 5: Backend & Database Integration
- Create Next.js API route `/api/response`:
  - Receives `{ answer, message, dodged_count }`.
  - Inserts response into Supabase Postgres `responses` table.
- Implement client-side anti-duplicate check (localStorage flag) so target cannot resubmit from the same browser.

### Phase 6: Telegram Bot Notification Integration
- Server-side handler in `/api/response` triggers Telegram Bot `sendMessage`:
  - Formatted message containing: Receiver Name, Answer ('IYA'/'TIDAK'), Dodged Count, Timestamp, and optional message.
  - Silent error fallback so user UI is not broken if Telegram API fails.

### Phase 7: Admin / Recap Page (`/admin`)
- Build PIN authentication screen matching `5._admin_recap_screen/code.html`.
- Compare input password with `process.env.ADMIN_PASSWORD`.
- Display response metrics: Target name, Answer badge, Response timestamp, Dodged count, Activity timeline, Salin Tautan, and Reset Session button.

---

## User Review & Open Questions

> [!IMPORTANT]
> **Variable Configuration**: All target & sender details are centralized in `src/config/confession.ts`. You can update these values anytime without modifying component code:
> - `SENDER_NAME` (Default: "Youker")
> - `TARGET_NAME` (Default: "Etri")
> - `QUESTION_TEXT` (Default: "Mau jadian?")
> - `UNIQUE_SLUG` (Default: "untuk-etri")

> [!NOTE]
> **Supabase Table Setup**: Before testing Phase 5, ensure the `responses` table is created in your Supabase SQL Editor. SQL snippet will be provided in the walkthrough.

---

## Verification Plan

### Automated / Build Verification
- Run `npm run build` or `npx tsc --noEmit` to verify type safety and build integrity.
- Test Next.js server launch with `npm run dev`.

### Manual Verification
- Test Landing Page -> Question Page transition on desktop & simulated mobile view.
- Test dodging mechanics on "Nggak" button and click on "Iya".
- Verify record creation in Supabase `responses` table.
- Verify instant notification receipt in Telegram chat via `@Youkerresbot`.
- Test PIN protection and recap data display on `/admin`.
