"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Anchor "today" to keep the mockup deterministic with seeded appointments.
const TODAY = new Date(2026, 7, 14);
const MAX = new Date(2026, 7, 14 + 45);

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const sameDay = (a: Date, b: Date) => iso(a) === iso(b);

export function Calendar({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (iso: string) => void;
}) {
  const [view, setView] = useState(() => new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canPrev = new Date(year, month, 1) > new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const canNext = new Date(year, month + 1, 1) <= MAX;

  const isDisabled = (d: Date) => d < TODAY || d > MAX;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold text-foreground">
          {MONTHS[month]} {year}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => canPrev && setView(new Date(year, month - 1, 1))}
            disabled={!canPrev}
            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-white/5 disabled:opacity-30"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => canNext && setView(new Date(year, month + 1, 1))}
            disabled={!canNext}
            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-white/5 disabled:opacity-30"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 text-xs font-medium text-faint">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const disabled = isDisabled(d);
          const selected = value === iso(d);
          const today = sameDay(d, TODAY);
          return (
            <button
              key={iso(d)}
              disabled={disabled}
              onClick={() => onChange(iso(d))}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-sm transition-colors",
                selected
                  ? "bg-gold font-semibold text-black"
                  : disabled
                    ? "cursor-not-allowed text-faint/40"
                    : "text-foreground hover:bg-white/5",
                today && !selected && "ring-1 ring-gold/40",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
