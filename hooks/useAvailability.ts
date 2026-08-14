"use client";

import { useMemo } from "react";

export interface TimeSlot {
  time: string;
  available: boolean;
}

const BASE_TIMES = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

/** Deterministic pseudo-random from a string seed so availability is stable per date/barber. */
function seededTaken(seed: string, index: number): boolean {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return ((h >> (index % 16)) & 3) === 0; // ~25% taken
}

/** Generate available time slots for a given date + barber. */
export function useAvailability(date: string | null, barberId: string | null): TimeSlot[] {
  return useMemo(() => {
    if (!date) return [];
    const seed = `${date}-${barberId ?? "any"}`;
    return BASE_TIMES.map((time, i) => ({
      time,
      available: !seededTaken(seed, i),
    }));
  }, [date, barberId]);
}
