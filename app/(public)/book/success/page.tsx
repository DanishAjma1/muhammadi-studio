"use client";

import { motion } from "motion/react";
import { CalendarPlus, Check, Clock, MapPin, Navigation, Scissors, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/core";
import { useBookingStore } from "@/store/bookingStore";
import { shopSettings } from "@/data";
import { formatCurrency, formatDate } from "@/lib/utils";

function toDate(dateIso: string, time: string) {
  const [t, ap] = time.split(" ");
  const [hRaw, m] = t.split(":").map(Number);
  let h = hRaw;
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  const [y, mo, d] = dateIso.split("-").map(Number);
  return new Date(y, mo - 1, d, h, m);
}
const pad = (n: number) => String(n).padStart(2, "0");
const gcal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

export default function BookingSuccessPage() {
  const booking = useBookingStore((s) => s.lastBooking);

  if (!booking) {
    return (
      <div className="mx-auto max-w-md px-4 pt-40 pb-24 text-center">
        <h1 className="heading text-2xl text-foreground">No booking found</h1>
        <p className="mt-2 text-muted">Looks like you haven&apos;t booked yet.</p>
        <Button href="/book" className="mt-6">
          Book an appointment
        </Button>
      </div>
    );
  }

  const start = toDate(booking.date, booking.time);
  const end = new Date(start.getTime() + booking.durationMin * 60000);
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${booking.serviceName} — ${shopSettings.name}`,
  )}&dates=${gcal(start)}/${gcal(end)}&location=${encodeURIComponent(shopSettings.address)}&details=${encodeURIComponent(
    `Appointment with ${booking.barberName}`,
  )}`;

  return (
    <div className="mx-auto max-w-lg px-4 pt-28 pb-20 sm:pt-36">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15 text-success"
      >
        <Check className="size-10" strokeWidth={3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-center"
      >
        <p className="eyebrow mb-2">You&apos;re booked</p>
        <h1 className="heading text-3xl text-foreground sm:text-4xl">See you soon!</h1>
        <p className="mt-3 text-muted">
          A confirmation has been sent to your phone. We can&apos;t wait to have you in the chair.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-8 overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="border-b border-border bg-secondary px-6 py-4">
          <p className="heading text-xl text-foreground">{booking.serviceName}</p>
          <p className="text-sm text-gold">{formatCurrency(booking.price)}</p>
        </div>
        <dl className="space-y-3 px-6 py-5 text-sm">
          <Row icon={<User className="size-4" />} label="Barber" value={booking.barberName} />
          <Row icon={<Scissors className="size-4" />} label="Date" value={formatDate(booking.date, "weekday")} />
          <Row icon={<Clock className="size-4" />} label="Time" value={`${booking.time} · ${booking.durationMin} min`} />
          <Row icon={<MapPin className="size-4" />} label="Location" value={`${shopSettings.name}, ${shopSettings.address}`} />
        </dl>
      </motion.div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button href={calUrl} variant="secondary" leftIcon={<CalendarPlus className="size-4" />}>
          Add to calendar
        </Button>
        <Button href="https://maps.google.com" variant="secondary" leftIcon={<Navigation className="size-4" />}>
          Get directions
        </Button>
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Button href="/account/appointments" fullWidth>
          View my appointments
        </Button>
        <Link
          href="/"
          className="flex h-11 flex-1 items-center justify-center rounded-full text-sm text-muted transition-colors hover:text-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <span className="w-20 text-muted">{label}</span>
      <span className="flex-1 text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
