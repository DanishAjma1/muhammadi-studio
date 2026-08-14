"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { BreakdownPoint } from "@/types";
import { CHART, ChartTooltip } from "./chartTheme";

interface DonutChartProps {
  data: BreakdownPoint[];
  height?: number;
  centerLabel?: string;
  centerValue?: string;
  colors?: string[];
  formatter?: (v: number) => string;
}

export function DonutChart({
  data,
  height = 240,
  centerLabel,
  centerValue,
  colors = CHART.pie,
  formatter,
}: DonutChartProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative" style={{ width: height, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip formatter={formatter} />} />
          </PieChart>
        </ResponsiveContainer>
        {(centerValue || centerLabel) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && <span className="text-2xl font-semibold text-foreground">{centerValue}</span>}
            {centerLabel && <span className="text-xs text-muted">{centerLabel}</span>}
          </div>
        )}
      </div>
      <ul className="grid w-full flex-1 gap-2">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-muted">
              <span className="size-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
              {d.name}
            </span>
            <span className="font-medium text-foreground">
              {formatter ? formatter(d.value) : `${d.value}%`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
