"use client";

import { CalendarDays, DollarSign, TrendingUp, UserPlus, UserX } from "lucide-react";
import Link from "next/link";
import { Avatar, Button, StatsCard, StatusBadge } from "@/components/core";
import { AreaTrend, ChartCard, DonutChart } from "@/components/charts";
import { useAppointments } from "@/hooks";
import { adminKpis, revenueByMonth, serviceBreakdown } from "@/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const { today } = useAppointments();
  const k = adminKpis.today;
  const schedule = [...today].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading text-2xl text-foreground sm:text-3xl">Good morning, James 👋</h2>
        <p className="mt-1 text-muted">Here&apos;s how the shop is doing today.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Appointments" value={k.appointments} icon={<CalendarDays className="size-5" />} accent="gold" change={12} changeLabel="vs yesterday" />
        <StatsCard label="New customers" value={k.newCustomers} icon={<UserPlus className="size-5" />} accent="info" change={8} changeLabel="vs yesterday" />
        <StatsCard label="Revenue" value={formatCurrency(k.revenue)} icon={<DollarSign className="size-5" />} accent="success" change={5} changeLabel="vs yesterday" />
        <StatsCard label="No shows" value={k.noShows} icon={<UserX className="size-5" />} accent="error" change={-3} changeLabel="vs yesterday" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Revenue"
          subtitle="Last 12 months"
          action={
            <span className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="size-4" /> +14%
            </span>
          }
        >
          <AreaTrend data={revenueByMonth} xKey="label" dataKey="revenue" formatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        </ChartCard>

        <ChartCard title="Service mix" subtitle="This month">
          <DonutChart data={serviceBreakdown} centerValue="890" centerLabel="bookings" />
        </ChartCard>
      </div>

      {/* Today's schedule */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="font-semibold text-foreground">Today&apos;s schedule</h3>
          <Button href="/admin/appointments" size="sm" variant="secondary">
            View all
          </Button>
        </div>
        <ul className="divide-y divide-border">
          {schedule.map((a) => (
            <li key={a.id} className="flex items-center gap-4 p-4">
              <span className="w-16 shrink-0 text-sm font-medium text-gold">{a.time}</span>
              <Avatar src={a.customerAvatar} name={a.customerName} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{a.customerName}</p>
                <p className="truncate text-xs text-muted">
                  {a.serviceName} · {a.barberName}
                </p>
              </div>
              <StatusBadge status={a.status} />
            </li>
          ))}
          {schedule.length === 0 && (
            <li className="p-8 text-center text-sm text-faint">No appointments today.</li>
          )}
        </ul>
      </div>

      <p className="text-center text-xs text-faint">
        <Link href="/admin/analytics" className="hover:text-gold">
          See full analytics →
        </Link>
      </p>
    </div>
  );
}
