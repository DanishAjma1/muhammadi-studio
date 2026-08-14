"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  error,
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className={cn("w-full", className)} ref={ref}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-secondary px-3.5 text-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-gold/40",
            error ? "border-error/60" : "border-border hover:border-border-strong",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span className={cn("flex items-center gap-2 truncate", !selected && "text-faint")}>
            {selected?.icon}
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-faint transition-transform", open && "rotate-180")}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-border bg-elevated p-1 shadow-2xl"
            >
              {options.map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/5",
                      o.value === value ? "text-gold" : "text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {o.icon}
                      {o.label}
                    </span>
                    {o.value === value && <Check className="size-4 shrink-0" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  );
}
