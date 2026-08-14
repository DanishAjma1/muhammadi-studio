"use client";

import { useMemo, useState } from "react";
import { Select, StatusBadge, Tabs } from "@/components/core";
import { useAppointments, useBarbers } from "@/hooks";
import { cn, formatCurrency } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";

const BASE = new Date(2026, 7, 14);
const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const statusBorder: Record<AppointmentStatus, string> = {
  confirmed: "border-l-info",
  pending: "border-l-warning",
  completed: "border-l-success",
  cancelled: "border-l-error",
  no_show: "border-l-faint",
};

export default function AdminCalendarPage() {
  const { appointments } = useAppointments();
  const { barbers } = useBarbers();
  const [view, setView] = useState("week");
  const [barberId, setBarberId] = useState<string | null>("all");

  const days = useMemo(() => {
    if (view === "day") return [BASE];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(BASE);
      d.setDate(BASE.getDate() - 3 + i);
      return d;
    });
  }, [view]);

  const filtered =
    barberId === "all" ? appointments : appointments.filter((a) => a.barberId === barberId);

  const barberOptions = [
    { label: "All barbers", value: "all" },
    ...barbers.map((b) => ({ label: b.name, value: b.id })),
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          variant="pill"
          value={view}
          onChange={setView}
          tabs={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
          ]}
        />
        <Select options={barberOptions} value={barberId} onChange={setBarberId} className="w-48" />
      </div>

      <div className={cn("grid gap-3", view === "day" ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4 xl:grid-cols-7")}>
        {days.map((d) => {
          const dayAppts = filtered
            .filter((a) => a.date === iso(d))
            .sort((a, b) => a.time.localeCompare(b.time));
          const isToday = iso(d) === iso(BASE);
          return (
            <div key={iso(d)} className="rounded-2xl border border-border bg-card">
              <div
                className={cn(
                  "flex items-center justify-between border-b border-border px-3 py-2.5",
                  isToday && "bg-gold/5",
                )}
              >
                <div>
                  <p className={cn("text-xs", isToday ? "text-gold" : "text-muted")}>{WEEKDAY[d.getDay()]}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {MONTH[d.getMonth()]} {d.getDate()}
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted">{dayAppts.length}</span>
              </div>
              <div className="space-y-2 p-2">
                {dayAppts.length === 0 && (
                  <p className="py-6 text-center text-xs text-faint">No bookings</p>
                )}
                {dayAppts.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      "rounded-lg border border-border border-l-2 bg-secondary p-2.5",
                      statusBorder[a.status],
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-gold">{a.time}</span>
                      <span className="text-xs text-muted">{formatCurrency(a.price)}</span>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-foreground">{a.customerName}</p>
                    <p className="truncate text-xs text-muted">{a.serviceName}</p>
                    {view === "day" && (
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-xs text-muted">{a.barberName}</span>
                        <StatusBadge status={a.status} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
