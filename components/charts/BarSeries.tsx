"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART, ChartTooltip } from "./chartTheme";

interface BarSeriesProps {
  data: Array<Record<string, string | number>>;
  xKey: string;
  dataKey: string;
  height?: number;
  color?: string;
  formatter?: (v: number) => string;
  /** Highlight the bar with the highest value in gold, others muted. */
  highlightMax?: boolean;
  horizontal?: boolean;
}

export function BarSeries({
  data,
  xKey,
  dataKey,
  height = 280,
  color = CHART.gold,
  formatter,
  highlightMax,
  horizontal,
}: BarSeriesProps) {
  const max = Math.max(...data.map((d) => Number(d[dataKey])));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 8, bottom: 0, left: horizontal ? 8 : -12 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} vertical={horizontal} horizontal={!horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" stroke={CHART.axis} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis type="category" dataKey={xKey} stroke={CHART.axis} tickLine={false} axisLine={false} fontSize={12} width={80} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} stroke={CHART.axis} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis
              stroke={CHART.axis}
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={48}
              tickFormatter={formatter ? (v) => formatter(Number(v)) : undefined}
            />
          </>
        )}
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ChartTooltip formatter={formatter} />} />
        <Bar dataKey={dataKey} radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]} maxBarSize={48}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={highlightMax ? (Number(d[dataKey]) === max ? CHART.gold : "#3a3a3a") : color}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
