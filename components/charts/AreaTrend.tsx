"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART, ChartTooltip } from "./chartTheme";

interface AreaTrendProps {
  // recharts types its own chart data as `any[]`; keep parity so any row shape works.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  xKey: string;
  dataKey: string;
  height?: number;
  color?: string;
  formatter?: (v: number) => string;
  showGrid?: boolean;
}

export function AreaTrend({
  data,
  xKey,
  dataKey,
  height = 280,
  color = CHART.gold,
  formatter,
  showGrid = true,
}: AreaTrendProps) {
  const gradId = `area-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={false} />}
        <XAxis
          dataKey={xKey}
          stroke={CHART.axis}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          stroke={CHART.axis}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={formatter ? (v) => formatter(Number(v)) : undefined}
          width={56}
        />
        <Tooltip
          cursor={{ stroke: CHART.grid }}
          content={<ChartTooltip formatter={formatter} />}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradId})`}
          activeDot={{ r: 5, fill: color, stroke: "#0b0b0b", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
