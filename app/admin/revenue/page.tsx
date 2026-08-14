"use client";

import { CalendarRange, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { StatsCard } from "@/components/core";
import { AreaTrend, BarSeries, ChartCard, DonutChart } from "@/components/charts";
import { adminKpis, revenueByDay, revenueByMonth, serviceBreakdown } from "@/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminRevenuePage() {
  const r = adminKpis.revenue;
  const money = (v: number) => `$${(v / 1000).toFixed(v >= 1000 ? 1 : 0)}k`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Today" value={formatCurrency(r.today)} icon={<DollarSign className="size-5" />} accent="gold" change={5} changeLabel="vs yesterday" />
        <StatsCard label="This week" value={formatCurrency(r.week)} icon={<CalendarRange className="size-5" />} accent="success" change={9} changeLabel="vs last week" />
        <StatsCard label="This month" value={formatCurrency(r.month)} icon={<Wallet className="size-5" />} accent="info" change={14} changeLabel="vs last month" />
      </div>

      <ChartCard
        title="Revenue over time"
        subtitle="Last 12 months"
        action={<span className="flex items-center gap-1 text-sm text-success"><TrendingUp className="size-4" /> +14%</span>}
      >
        <AreaTrend data={revenueByMonth} xKey="label" dataKey="revenue" height={320} formatter={money} />
      </ChartCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue by day" subtitle="This week">
          <BarSeries data={revenueByDay} xKey="label" dataKey="revenue" formatter={money} highlightMax />
        </ChartCard>
        <ChartCard title="Revenue by service" subtitle="Share of bookings">
          <DonutChart data={serviceBreakdown} centerValue={formatCurrency(r.month)} centerLabel="this month" />
        </ChartCard>
      </div>
    </div>
  );
}
