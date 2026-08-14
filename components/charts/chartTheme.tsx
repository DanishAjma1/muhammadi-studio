"use client";

export const CHART = {
  gold: "#c9a227",
  goldSoft: "#e0b93d",
  grid: "#272727",
  axis: "#6b6b73",
  pie: ["#c9a227", "#e0b93d", "#8a6d1a", "#4b4b52", "#6b6b73"],
};

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  formatter?: (value: number) => string;
  labelPrefix?: string;
}

/** Dark, branded tooltip shared by every chart. */
export function ChartTooltip({ active, payload, label, formatter, labelPrefix }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-elevated/95 px-3 py-2 text-xs shadow-2xl backdrop-blur">
      {label !== undefined && (
        <p className="mb-1 font-medium text-foreground">
          {labelPrefix}
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 text-muted">
          <span
            className="size-2 rounded-full"
            style={{ background: entry.color ?? CHART.gold }}
          />
          <span className="capitalize">{entry.name}:</span>
          <span className="font-semibold text-foreground">
            {typeof entry.value === "number" && formatter
              ? formatter(entry.value)
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}
