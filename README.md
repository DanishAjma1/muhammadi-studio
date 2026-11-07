# 🎬 Muhammadi Studio & Event Management

A complete, full-featured web application for **Muhammadi Studio & Event Management**, customized with authentic Pakistani wedding and event culture, directed by **Owner Atiq Butt**.

- 🌐 **Live Website**: [https://muhammadi-studio.vercel.app](https://muhammadi-studio.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/DanishAjma1/muhammadi-studio](https://github.com/DanishAjma1/muhammadi-studio)
- 📍 **Studio Location**: Main Bazar, New Plaza, Shop No: 2, Pakistan
- 📞 **Helpline & WhatsApp**: `0313-7526305`
- 💬 **Tagline**: *"Dream It... We Plan It... You Enjoy It! We Make Your Event Unforgettable!"*

---

## ✨ Features & Architecture

1. **Authentic Pakistani Cultural Alignment**:
   - Replaced all Western tropes and random stock imagery with authentic Pakistani event setups extracted directly from the official flyer.
   - Core Setups: **Movie Setup (Cinema Like Experience)**, **Studio Setup (Professional Photography & Video Shoots)**, **Event Decoration (Beautiful & Unique Decorations)**, and **Lighting Setup (Stunning Lighting Effects)**.
   - Pakistani Event Occasions: **Wedding Barat & Walima**, **Mehndi & Qawwali Night**, **Mangni (Engagement)**, **Birthday Parties**, **Corporate Events**, and **Special Occasions**.

2. **Always-Visible Sticky Navbar**:
   - High-contrast, sticky navigation bar (`top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-xl shadow-lg`) permanently on display across all scroll positions.
   - Includes quick-dial button for `0313-7526305` and a responsive mobile drawer.

3. **Multi-Function Booking (No Pricing / Custom Quotes)**:
   - Pricing has been removed across all function cards. Every function displays rich details and a **Custom Quote** badge.
   - Clients can multi-select multiple functions and setups in a single booking inquiry (e.g., Barat + Movie Setup + Event Decoration).
   - Time slots tailored to Pakistani event timings: Morning Session, Lunch Reception, Evening Barat, Night Walima/Qawwali, and Full Day Coverage.

4. **Admin Approval & Email Confirmation Workflow (Gmail SMTP)**:
   - Client inquiries are created with `pending` status.
   - Admin (Atiq Butt) logs into `/admin/appointments` to review details, client contact, venue city, and notes.
   - Clicking **"Review & Approve"** marks the booking as confirmed and triggers an automated, branded HTML confirmation email to the client containing:
     - Official Studio Confirmation badge
     - List of all approved functions & setups
     - Event date, session timing, and venue location
     - Studio helpline (`0313-7526305`) and location (`Main Bazar, New Plaza, Shop No: 2`)
   - Smart development simulation mode with console logs when SMTP credentials are not yet configured.

---

## 📧 Gmail SMTP Setup Instructions

To activate live email notifications via Google's SMTP:

1. Open your **Google Account** ([https://myaccount.google.com/](https://myaccount.google.com/)).
2. Navigate to **Security** and ensure **2-Step Verification** is enabled.
3. Search for **"App passwords"** in the top search bar.
4. Enter an App Name (e.g., `Muhammadi Studio`) and click **Create**.
5. Copy the 16-character code into your `.env.local`:

```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
NOTIFICATION_RECIPIENT=atiq@muhammadistudio.com
SMTP_FROM_NAME="Muhammadi Studio & Event Management"
```

---

## 🔐 Studio Admin Credentials

To access the studio control panel (`/admin`):

```
Email:    atiq@muhammadistudio.com
Password: admin123
```

---

## 🚀 Local Development

```bash
# Run Next.js development server
npm run dev

# Open in browser:
http://localhost:3000
```
