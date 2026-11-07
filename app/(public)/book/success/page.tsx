"use client";

import { motion } from "motion/react";
import {
  CalendarPlus,
  Check,
  Clock,
  MailCheck,
  MapPin,
  Phone,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/core";
import { useBookingStore } from "@/store/bookingStore";
import { shopSettings } from "@/data";
import { formatDate } from "@/lib/utils";

function toDate(dateIso: string, time: string) {
  const [t, ap] = time.split(" ");
  const [hRaw, m] = t ? t.split(":").map(Number) : [10, 0];
  let h = hRaw;
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  const [y, mo, d] = dateIso.split("-").map(Number);
  return new Date(y, mo - 1, d, h, m || 0);
}
const pad = (n: number) => String(n).padStart(2, "0");
const gcal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

export default function BookingSuccessPage() {
  const booking = useBookingStore((s) => s.lastBooking);

  if (!booking) {
    return (
      <div className="mx-auto max-w-md px-4 pt-40 pb-24 text-center">
        <h1 className="heading text-2xl text-foreground">No booking request found</h1>
        <p className="mt-2 text-muted">You haven&apos;t submitted an event booking request yet.</p>
        <Button href="/book" className="mt-6">
          Book an Event or Setup
        </Button>
      </div>
    );
  }

  const start = toDate(booking.date, booking.time || "10:00 AM");
  const end = new Date(start.getTime() + (booking.durationMin || 180) * 60000);
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${booking.serviceName} — ${shopSettings.name}`,
  )}&dates=${gcal(start)}/${gcal(end)}&location=${encodeURIComponent("Main Bazar, New Plaza, Shop No: 2, Pakistan")}&details=${encodeURIComponent(
    `Event arrangement managed by Atiq Butt (Owner). Helpline: 0313-7526305`,
  )}`;

  return (
    <div className="mx-auto max-w-lg px-4 pt-28 pb-20 sm:pt-36">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold/15 text-gold border-2 border-gold/40 shadow-lg"
      >
        <Sparkles className="size-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-center"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
          <span>⏳ Pending Studio Approval</span>
        </div>
        <h1 className="heading text-3xl text-foreground sm:text-4xl">Booking Request Received!</h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Thank you, <strong>{booking.customerName}</strong>! Your event booking has been submitted directly to Owner <strong>Atiq Butt</strong>. Once approved, you will receive an official <strong>Confirmation Email</strong> with full arrangement details.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs text-gold">
          <MailCheck className="size-4" />
          <span>Notification dispatched to Atiq Butt &amp; Studio Team</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
      >
        <div className="border-b border-border bg-secondary px-6 py-4">
          <p className="text-xs uppercase font-semibold text-gold tracking-wider">Booked Function(s) &amp; Setups</p>
          <p className="heading text-lg text-foreground mt-1">{booking.serviceName}</p>
        </div>
        <dl className="space-y-3 px-6 py-5 text-sm">
          <Row icon={<User className="size-4" />} label="Lead Director" value={booking.barberName || "Atiq Butt (Owner)"} />
          <Row icon={<CalendarPlus className="size-4" />} label="Event Date" value={formatDate(booking.date, "weekday")} />
          <Row icon={<Clock className="size-4" />} label="Call Session" value={booking.time} />
          <Row icon={<MapPin className="size-4" />} label="Studio Office" value="Main Bazar, New Plaza, Shop No: 2" />
          {booking.venueCity && (
            <Row icon={<MapPin className="size-4" />} label="Event Venue" value={booking.venueCity} />
          )}
          <Row
            icon={<Phone className="size-4" />}
            label="Direct Contact"
            value="0313-7526305 (Atiq Butt)"
          />
        </dl>
      </motion.div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button href="tel:03137526305" variant="secondary" leftIcon={<Phone className="size-4" />}>
          Call Atiq Butt
        </Button>
        <Button href={calUrl} variant="secondary" leftIcon={<CalendarPlus className="size-4" />}>
          Add to calendar
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button href="https://wa.me/923137526305" fullWidth>
          WhatsApp Atiq Butt
        </Button>
        <Link
          href="/"
          className="flex h-11 flex-1 items-center justify-center rounded-full text-sm text-muted transition-colors hover:text-foreground"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <span className="w-28 text-xs text-muted">{label}</span>
      <span className="flex-1 text-right text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}
