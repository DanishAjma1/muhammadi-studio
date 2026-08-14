"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SelectOption } from "./Select";

interface MultiSelectProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  maxTags?: number;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  searchable = true,
  maxTags = 3,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const selectedOptions = options.filter((o) => value.includes(o.value));
  const filtered = useMemo(
    () =>
      query
        ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
        : options,
    [options, query],
  );

  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

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
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-border bg-secondary px-3 py-1.5 text-sm transition-colors hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-gold/40"
        >
          <span className="flex flex-1 flex-wrap items-center gap-1.5">
            {selectedOptions.length === 0 && <span className="text-faint">{placeholder}</span>}
            {selectedOptions.slice(0, maxTags).map((o) => (
              <span
                key={o.value}
                className="inline-flex items-center gap-1 rounded-md bg-gold/15 px-2 py-0.5 text-xs text-gold"
              >
                {o.label}
                <X
                  className="size-3 cursor-pointer hover:text-gold-hover"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(o.value);
                  }}
                />
              </span>
            ))}
            {selectedOptions.length > maxTags && (
              <span className="text-xs text-muted">+{selectedOptions.length - maxTags} more</span>
            )}
          </span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-faint transition-transform", open && "rotate-180")}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-elevated shadow-2xl"
            >
              {searchable && (
                <div className="border-b border-border p-2">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="w-full rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground placeholder:text-faint focus:outline-none"
                  />
                </div>
              )}
              <ul className="max-h-56 overflow-auto p-1">
                {filtered.length === 0 && (
                  <li className="px-3 py-2 text-sm text-faint">No results</li>
                )}
                {filtered.map((o) => {
                  const active = value.includes(o.value);
                  return (
                    <li key={o.value}>
                      <button
                        type="button"
                        onClick={() => toggle(o.value)}
                        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-white/5"
                      >
                        <span className="truncate">{o.label}</span>
                        <span
                          className={cn(
                            "flex size-4 items-center justify-center rounded border",
                            active ? "border-gold bg-gold text-black" : "border-border-strong",
                          )}
                        >
                          {active && <Check className="size-3" />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
