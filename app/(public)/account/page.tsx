"use client";

import { ArrowRight, CalendarCheck, CalendarDays, CheckCircle2, Scissors, Users } from "lucide-react";
import { Avatar, Button, StatsCard, StatusBadge } from "@/components/core";
import { useAppointments } from "@/hooks";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, formatDate } from "@/lib/utils";

const TODAY = "2026-08-14";

export default function AccountDashboard() {
  const user = useAuthStore((s) => s.user);
  const { forCustomer } = useAppointments();
  const mine = user ? forCustomer(user.id) : [];

  const upcoming = mine
    .filter((a) => a.date >= TODAY && a.status !== "cancelled")
    .sort((a, b) => a.date.localeCompare(b.date));
  const next = upcoming[0];
  const completed = mine.filter((a) => a.status === "completed").length;
  const barbersVisited = new Set(mine.map((a) => a.barberId)).size;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl text-foreground sm:text-4xl">
          Good morning, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-muted">Here&apos;s what&apos;s coming up.</p>
      </div>

      {/* Next appointment */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-secondary">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="text-sm font-medium text-gold">Next appointment</p>
            {next && <StatusBadge status={next.status} />}
          </div>
          {next ? (
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="heading text-2xl text-foreground">{next.serviceName}</h2>
                  <p className="mt-1 text-muted">with {next.barberName}</p>
                </div>
                <span className="heading text-2xl text-gold">{formatCurrency(next.price)}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <CalendarDays className="size-4 text-gold" /> {formatDate(next.date, "weekday")}
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <Scissors className="size-4 text-gold" /> {next.time} · {next.durationMin} min
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/account/appointments">Manage</Button>
                <Button href="/book" variant="outline" leftIcon={<CalendarCheck className="size-4" />}>
                  Book another
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-10 text-center">
              <p className="text-muted">No upcoming appointments.</p>
              <Button href="/book" leftIcon={<CalendarCheck className="size-4" />}>
                Book now
              </Button>
            </div>
          )}
        </div>

        {/* Preferred barber */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted">Your details</p>
          <div className="mt-4 flex items-center gap-3">
            <Avatar src={user?.avatar} name={user?.name ?? ""} size="lg" />
            <div>
              <p className="font-semibold text-foreground">{user?.name}</p>
              <p className="text-sm text-muted">{user?.email}</p>
              <p className="text-sm text-muted">{user?.phone}</p>
            </div>
          </div>
          <Button href="/account/profile" variant="secondary" fullWidth className="mt-5" rightIcon={<ArrowRight className="size-4" />}>
            Edit profile
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Appointments" value={mine.length} icon={<CalendarDays className="size-5" />} accent="gold" />
        <StatsCard label="Completed" value={completed} icon={<CheckCircle2 className="size-5" />} accent="success" />
        <StatsCard label="Barbers visited" value={barbersVisited} icon={<Users className="size-5" />} accent="info" />
      </div>
    </div>
  );
}
