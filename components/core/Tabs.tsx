"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: "underline" | "pill";
}

export function Tabs({ tabs, value, onChange, className, variant = "underline" }: TabsProps) {
  const layoutId = useId();

  if (variant === "pill") {
    return (
      <div className={cn("inline-flex rounded-xl border border-border bg-secondary p-1", className)}>
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
              value === t.value ? "text-black" : "text-muted hover:text-foreground",
            )}
          >
            {value === t.value && (
              <motion.span
                layoutId={`${layoutId}-pill`}
                className="absolute inset-0 rounded-lg bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              {t.label}
              {t.count !== undefined && <span className="ml-1.5 opacity-70">{t.count}</span>}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-1 border-b border-border", className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            value === t.value ? "text-foreground" : "text-muted hover:text-foreground",
          )}
        >
          <span className="flex items-center gap-1.5">
            {t.label}
            {t.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  value === t.value ? "bg-gold/20 text-gold" : "bg-white/5 text-faint",
                )}
              >
                {t.count}
              </span>
            )}
          </span>
          {value === t.value && (
            <motion.span
              layoutId={`${layoutId}-underline`}
              className="absolute inset-x-0 -bottom-px h-0.5 bg-gold"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
