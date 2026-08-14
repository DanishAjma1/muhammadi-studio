"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART, ChartTooltip } from "./chartTheme";

interface LineTrendProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  xKey: string;
  /** One or more series to plot. */
  series: { dataKey: string; color?: string; name?: string }[];
  height?: number;
  formatter?: (v: number) => string;
}

export function LineTrend({ data, xKey, series, height = 280, formatter }: LineTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />
        <XAxis dataKey={xKey} stroke={CHART.axis} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          stroke={CHART.axis}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={48}
          tickFormatter={formatter ? (v) => formatter(Number(v)) : undefined}
        />
        <Tooltip cursor={{ stroke: CHART.grid }} content={<ChartTooltip formatter={formatter} />} />
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name ?? s.dataKey}
            stroke={s.color ?? CHART.gold}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, stroke: "#0b0b0b", strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
