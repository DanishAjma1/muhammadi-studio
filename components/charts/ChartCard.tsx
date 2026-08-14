import { cn } from "@/lib/utils";

interface ChartCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** Consistent card frame for any chart. */
export function ChartCard({ title, subtitle, action, className, children }: ChartCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="font-semibold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
