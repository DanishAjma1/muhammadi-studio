# 🎬 Muhammadi Studio — High-End Cinematography & Photography Web App

A complete, full-featured web application for **Muhammadi Studio**, a premier photography, cinematography, and movie production house co-founded by **Attiq Butt** and founded by **Muhammad Usman**.

- 🌐 **Live Website**: [https://muhammadi-studio.vercel.app](https://muhammadi-studio.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/DanishAjma1/muhammadi-studio](https://github.com/DanishAjma1/muhammadi-studio)

> **Client Discovery → Portfolio → Services & Packages → Choose Director / Artist → Schedule Shoot → Book Session → Gmail SMTP Notification → Studio Production Dashboard.**

---

## ✨ Features & Highlights

- **Bespoke Luxury Visuals**: Signature dark + gold aesthetic tailored for high-end cinema, weddings, fashion editorial, and commercial brand productions.
- **Co-Founder & Creative Direction**: Featuring Co-Founder & Director of Cinematography **Attiq Butt**, Founder & Master Photographer **Muhammad Usman**, Drone Specialist **Farhan Tariq**, and Fashion Director **Ayesha Noor**.
- **Gmail Notification System using SMTP**:
  - Direct integration with Google's SMTP servers (`smtp.gmail.com:465`).
  - Automated HTML email dispatch with dark + gold Muhammadi Studio branding.
  - Sends lead alerts to the studio admin and instant confirmation receipts to clients.
  - Includes smart fallback simulation mode when SMTP credentials are not yet configured in development.
  - Admin settings panel with a live **"Send Test Gmail Notification"** button.
- **Multi-Step Production Booking Wizard**:
  - Step 1: Select signature production package (Wedding Cinema, Royal Bridal Shoot, Commercial Film, Studio Portraits, 4K Drone).
  - Step 2: Choose Lead Artist / Director (Attiq Butt, Muhammad Usman, Farhan Tariq, Ayesha Noor, or Any Available).
  - Step 3: Date selection.
  - Step 4: Available call times.
  - Step 5: Contact details, venue notes, and instant confirmation.
- **Client Portal**: Dashboard, shoot reservations, rescheduling, and profile management.
- **Studio Admin Portal**:
  - Live production KPIs and revenue trends.
  - Call-sheet calendar (day & week views).
  - Complete CRUD for production packages and team members.
  - Gmail SMTP configuration status card and live test tool.
  - Client database and review moderation.

---

## 📧 Gmail SMTP Setup Instructions

To activate live email notifications via Google's SMTP:

1. Open your **Google Account** ([https://myaccount.google.com/](https://myaccount.google.com/)).
2. Navigate to **Security** and ensure **2-Step Verification** is enabled.
3. Search for **"App passwords"** in the top search bar (or under 2-Step Verification).
4. Enter an App Name (e.g., `Muhammadi Studio`) and click **Create**.
5. Google will display a 16-character code (e.g., `abcd efgh ijkl mnop`).
6. Copy that code and paste it into your `.env.local` file:

```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
NOTIFICATION_RECIPIENT=attiq@muhammadistudio.com
SMTP_FROM_NAME="Muhammadi Studio"
```

*(Note: Spaces in the password are automatically handled).*

---

## 🔐 Studio Admin Demo Login

The studio dashboard is gated by an administrative login:

```
Email:    attiq@muhammadistudio.com
Password: admin123
```

---

## 🚀 Getting Started

```bash
# Run development server
npm run dev
# or: ./node_modules/.bin/next dev

# Production build
npm run build
# or: ./node_modules/.bin/next build

# Start production server
npm start
# or: ./node_modules/.bin/next start
```

---

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & State**: React 19, Tailwind CSS v4, Zustand, Motion
- **Mailing**: Nodemailer (Gmail SMTP: `smtp.gmail.com`)
- **Visuals & Charts**: Lucide React, Recharts
