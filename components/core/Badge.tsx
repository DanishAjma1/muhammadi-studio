import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "gold"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-elevated text-foreground border border-border",
  gold: "bg-gold/15 text-gold border border-gold/25",
  success: "bg-success/15 text-success border border-success/25",
  warning: "bg-warning/15 text-warning border border-warning/25",
  error: "bg-error/15 text-error border border-error/25",
  info: "bg-info/15 text-info border border-info/25",
  muted: "bg-white/5 text-muted border border-transparent",
  outline: "border border-border-strong text-muted",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({ variant = "default", dot, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// Convenience mapping for appointment statuses used across the app.
const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "info" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "error" },
  no_show: { label: "No Show", variant: "muted" },
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "muted" },
  vip: { label: "VIP", variant: "gold" },
  new: { label: "New", variant: "info" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusMap[status] ?? { label: status, variant: "default" as BadgeVariant };
  return (
    <Badge variant={cfg.variant} dot>
      {cfg.label}
    </Badge>
  );
}
