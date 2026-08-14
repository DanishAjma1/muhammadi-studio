import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number; // percentage, positive or negative
  changeLabel?: string;
  accent?: "gold" | "success" | "error" | "info" | "default";
  className?: string;
}

const accents = {
  gold: "text-gold bg-gold/10",
  success: "text-success bg-success/10",
  error: "text-error bg-error/10",
  info: "text-info bg-info/10",
  default: "text-muted bg-white/5",
};

export function StatsCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  accent = "default",
  className,
}: StatsCardProps) {
  const positive = (change ?? 0) >= 0;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        {icon && (
          <span className={cn("flex size-11 items-center justify-center rounded-xl", accents[accent])}>
            {icon}
          </span>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
              positive ? "bg-success/10 text-success" : "bg-error/10 text-error",
            )}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(change)}%
          </span>
          {changeLabel && <span className="text-faint">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
