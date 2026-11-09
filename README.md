# 🎬 Muhammadi Studio — Event Booking & Media Pipeline Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-1.3-FBF0DF?style=for-the-badge&logo=bun&logoColor=black" alt="Bun" />
  <img src="https://img.shields.io/badge/TanStack_Table-9.1-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="TanStack Table" />
  <img src="https://img.shields.io/badge/ExcelJS-Automated_Export-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white" alt="ExcelJS" />
  <img src="https://img.shields.io/badge/Nodemailer-SMTP_Workflows-007ACC?style=for-the-badge" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
</p>
<br/>

> **Muhammadi Studio** is a high-performance cinematography, photography, and event management platform built on Next.js 16 and Bun. It features automated slot conflict resolution, multi-tier staff booking, automated Excel ledger generation, and transactional Gmail SMTP client notifications.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph ClientExperience ["Client & Public Experience"]
        PublicBooking["Interactive Booking Portal (Appointments / Dates)"]
        MediaGallery["High-Res Cinematography & Portfolio Showcase"]
        ClientAccount["Client Account & Booking Status Dashboard"]
    end

    subgraph ServerRuntime ["Next.js 16 Server Architecture (Bun Runtime)"]
        RouteHandlers["Next.js Server Actions & API Handlers"]
        SlotResolver["Slot Conflict & Availability Engine"]
        ExcelPipeline["ExcelJS Financial Ledger Exporter"]
        EmailWorker["Nodemailer Transactional SMTP Queue"]
    end

    subgraph AdministrativeLayer ["Studio Operations & Analytics"]
        AdminDashboard["Studio Management & Schedule Matrix"]
        StaffScheduler["Cinematographer & Crew Assignment Console"]
        RevenueAnalytics["Recharts Revenue & Booking Distribution"]
    end

    PublicBooking --> RouteHandlers
    MediaGallery --> RouteHandlers
    ClientAccount --> RouteHandlers

    RouteHandlers --> SlotResolver
    SlotResolver --> AdminDashboard
    SlotResolver --> StaffScheduler

    AdminDashboard --> ExcelPipeline
    RouteHandlers --> EmailWorker
    AdminDashboard --> RevenueAnalytics
```

---

## ⚡ Core Engineering Highlights

- **Bun-Powered Performance**: Fast builds, rapid server-side rendering, and low memory footprint utilizing Bun runtime dependencies and scripts.
- **Dynamic Scheduling & Conflict Guard**: Custom scheduling algorithms preventing double bookings across multi-day weddings, studio photo shoots, and cinematographer crews.
- **Automated Financial Reporting Pipeline**: Integrated `exceljs` pipeline compiling client invoices, advance deposits, remaining balances, and crew payouts into styled Excel spreadsheets.
- **Transactional SMTP Notification Engine**: Automated confirmation emails and schedule updates with branded HTML templates dispatched via Nodemailer.
- **Data-Dense Administration**: High-throughput admin tables powered by TanStack Table supporting column filtering, sorting, pagination, and status badge updates.

---

## 📁 Repository Structure

```text
app/
  (public)/             Public customer routes (Booking, Gallery, Cinematographers)
  account/              Client appointment management and profile settings
  api/                  Route handlers for bookings, contact forms, and Excel exports
lib/                    ExcelJS report builder, Nodemailer transport, and Zod schemas
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Bun >= 1.2.0 (or Node.js >= 20.0.0)

### 1. Installation
```bash
git clone https://github.com/DanishAjma1/muhammadi-studio.git
cd muhammadi-studio
bun install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="your-studio-email@gmail.com"
SMTP_PASS="your-app-specific-password"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Run Development Server
```bash
bun run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the studio portal.

---

## 📜 License
Distributed under the MIT License. Built with passion by [Danish Ajmal](https://github.com/DanishAjma1).
