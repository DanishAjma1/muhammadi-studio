"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
  size = "md",
  className,
}: SwitchProps) {
  const track = size === "sm" ? "h-5 w-9" : "h-6 w-11";
  const knob = size === "sm" ? "size-4" : "size-5";
  const shift = size === "sm" ? "translate-x-4" : "translate-x-5";

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:opacity-50",
        track,
        checked ? "bg-gold" : "bg-border-strong",
      )}
    >
      <span
        className={cn(
          "inline-block translate-x-0.5 rounded-full bg-white shadow transition-transform duration-200",
          knob,
          checked && shift,
        )}
      />
    </button>
  );

  if (!label && !description) return <span className={className}>{toggle}</span>;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span>
        {label && <span className="block text-sm font-medium text-foreground">{label}</span>}
        {description && <span className="block text-xs text-muted">{description}</span>}
      </span>
      {toggle}
    </label>
  );
}
