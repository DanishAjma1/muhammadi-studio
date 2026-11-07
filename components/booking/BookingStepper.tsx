"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Functions & Setups", "Director", "Date", "Time", "Details"];

export function BookingStepper({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                  done && "border-gold bg-gold text-black",
                  active && "border-gold text-gold",
                  !done && !active && "border-border text-faint",
                )}
              >
                {done ? <Check className="size-4" /> : step}
              </span>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  active ? "text-foreground" : "text-faint",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={cn("mx-2 h-px flex-1 transition-colors", done ? "bg-gold" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
