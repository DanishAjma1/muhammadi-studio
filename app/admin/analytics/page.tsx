"use client";

import { CalendarCheck, Percent, Repeat, TrendingDown, UserPlus, Wallet } from "lucide-react";
import { StatsCard } from "@/components/core";
import { BarSeries, ChartCard, DonutChart } from "@/components/charts";
import {
  adminKpis,
  appointmentsTrend,
  customerTypeSplit,
  trafficSources,
} from "@/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const a = adminKpis.analytics;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard label="Appointments" value={a.appointments} icon={<CalendarCheck className="size-5" />} accent="gold" change={11} changeLabel="this month" />
        <StatsCard label="New customers" value={a.newCustomers} icon={<UserPlus className="size-5" />} accent="info" change={7} changeLabel="this month" />
        <StatsCard label="Returning rate" value={`${a.returningRate}%`} icon={<Repeat className="size-5" />} accent="success" change={3} changeLabel="this month" />
        <StatsCard label="Cancellation rate" value={`${a.cancellationRate}%`} icon={<Percent className="size-5" />} accent="error" change={-2} changeLabel="this month" />
        <StatsCard label="No-show rate" value={`${a.noShowRate}%`} icon={<TrendingDown className="size-5" />} accent="error" change={-1} changeLabel="this month" />
        <StatsCard label="Avg booking value" value={formatCurrency(a.avgBookingValue)} icon={<Wallet className="size-5" />} accent="gold" change={4} changeLabel="this month" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Appointments" subtitle="This week">
          <BarSeries data={appointmentsTrend} xKey="label" dataKey="appointments" highlightMax />
        </ChartCard>
        <ChartCard title="Customer type" subtitle="New vs returning">
          <DonutChart data={customerTypeSplit} centerValue={`${adminKpis.analytics.returningRate}%`} centerLabel="returning" />
        </ChartCard>
      </div>

      <ChartCard title="Traffic sources" subtitle="Where your bookings come from — Instagram leads the way">
        <BarSeries data={trafficSources} xKey="source" dataKey="visitors" horizontal highlightMax height={260} />
      </ChartCard>
    </div>
  );
}
