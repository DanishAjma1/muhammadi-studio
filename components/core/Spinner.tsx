import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  /** Colour of the moving arc. Defaults to gold. */
  tone?: "gold" | "light" | "current";
}

const sizes = {
  xs: "size-3 border-2",
  sm: "size-4 border-2",
  md: "size-6 border-[2.5px]",
  lg: "size-10 border-4",
};

const tones = {
  gold: "border-gold/25 border-t-gold",
  light: "border-white/20 border-t-white",
  current: "border-current/25 border-t-current",
};

export function Spinner({ size = "md", tone = "gold", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full", sizes[size], tones[tone], className)}
    />
  );
}

/** Full-area loader with an optional label — for page/section loading states. */
export function Loader({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-16", className)}>
      <Spinner size="lg" />
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  );
}
