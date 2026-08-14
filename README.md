# 💈 Barber & Co. — Premium Barbershop Mockup

A fully interactive, front-end-only mockup for a premium barbershop brand — built to demonstrate the complete business flow:

> **Instagram → Website → Choose service → Choose barber → Choose time → Book → Shop dashboard.**

No backend or database. Every page, button, form and modal works using in-memory state (Zustand), so the whole product can be demoed end-to-end.

---

## ✨ Highlights

- **Premium dark + gold theme** — luxury, masculine, modern (not the cliché barber pole).
- **Reusable component system** — `components/core` (buttons, badges, avatar, inputs, modal, switch, toast, stats card, spinner, **data table with resizable columns + CSV export**, and more) and `components/charts` (Recharts wrappers).
- **New-style navigation** — floating pill nav with a sliding gold active indicator + full-screen animated mobile menu.
- **Multi-step booking flow** that writes real appointments to the store.
- **Full customer account** — dashboard, appointments (cancel/reschedule), profile with a working edit modal.
- **Complete shop admin** — dashboard, appointments, calendar, customers, barbers & services CRUD, revenue, analytics, notifications, settings — with a **fixed sidebar + top bar (content-only scroll)** and a **dummy admin login gate**.
- **Mobile-first & responsive** everywhere, with subtle Motion animations.

---

## 🚀 Getting started

This project uses **[Bun](https://bun.sh)**.

```bash
bun install
bun dev        # start the dev server → http://localhost:3000
bun run build  # production build
bun run start  # serve the production build
```

> **Note on Next.js:** this repo pins a build of **Next.js 16** whose conventions can differ from older docs. The framework re-writes `AGENTS.md` on `next dev`; that block is committed intentionally to keep the tree clean.

### 🔐 Demo admin login

The admin area is gated by a dummy login:

```
Email:    admin@barberand.co
Password: admin123
```

(Any values are accepted — it's a mockup.) The public site and customer account start "signed in" as a demo customer.

---

## 🗂️ Project structure

```
app/
├─ (public)/            # Public site (clean URLs via a route group)
│  ├─ page.tsx          #   / landing
│  ├─ about, services, barbers/[slug], gallery, reviews,
│  │  contact, faq, blog/[slug], social
│  ├─ book/, book/success/     # multi-step booking + confirmation
│  ├─ login/, register/        # auth
│  └─ account/                 # customer dashboard, appointments, profile
├─ admin/               # Shop dashboard (own fixed shell) + /admin/login
├─ layout.tsx           # root layout (fonts, ToastProvider, metadata)
├─ globals.css          # design system (palette, fonts, animations, utilities)
└─ icon.svg             # brand comb mark (favicon)

components/
├─ core/                # reusable UI primitives (the design system)
├─ charts/              # reusable Recharts wrappers
├─ layout/              # navbar, footer, mobile book bar, logo
├─ common/              # Reveal, SectionHeading, PageHeader, CTABand, icons
├─ home/ services/ barbers/ reviews/ gallery/ blog/
│  contact/ booking/ account/ auth/ admin/   # page-scoped components

data/       # seeded mock data + centralized image URLs (data/images.ts)
hooks/      # api-style hooks over the stores (useAppointments, useBarbers, …)
store/      # Zustand: dataStore (mutable "db"), authStore, adminAuthStore, bookingStore
types/      # domain model
lib/        # utils (cn, formatters, CSV export)
```

**Images** are all Unsplash / pravatar URLs centralized in [`data/images.ts`](data/images.ts) — swap any of them in one place. `next.config.ts` runs images `unoptimized` so remote placeholders load without an optimizer.

---

## 🎨 Design tokens

| Token | Value |
| --- | --- |
| Background / Secondary / Card | `#0B0B0B` / `#121212` / `#181818` |
| Text / Muted | `#F5F5F5` / `#A1A1AA` |
| Gold / Gold hover | `#C9A227` / `#E0B93D` |
| Border | `#272727` |
| Success / Error | `#22C55E` / `#EF4444` |

Fonts: **Inter** (body) + **Manrope** (display).

---

## 🧱 Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Recharts · Motion · React Hook Form · lucide-react.

---

> This is a design/UX mockup. Data lives in memory and resets on refresh — there is no backend, payments or persistence.
