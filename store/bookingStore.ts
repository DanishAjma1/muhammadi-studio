import { create } from "zustand";
import type { Appointment } from "@/types";

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface BookingState {
  step: number; // 1..5
  serviceId: string | null;
  barberId: string | null; // "any" allowed
  date: string | null; // ISO yyyy-mm-dd
  time: string | null;
  details: BookingDetails;
  lastBooking: Appointment | null;

  setService: (id: string) => void;
  setBarber: (id: string) => void;
  setDate: (iso: string) => void;
  setTime: (t: string) => void;
  setDetails: (patch: Partial<BookingDetails>) => void;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  reset: () => void;
  setLastBooking: (a: Appointment) => void;
}

const emptyDetails: BookingDetails = { name: "", phone: "", email: "", notes: "" };

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  details: emptyDetails,
  lastBooking: null,

  setService: (id) => set({ serviceId: id }),
  setBarber: (id) => set({ barberId: id }),
  setDate: (iso) => set({ date: iso, time: null }),
  setTime: (t) => set({ time: t }),
  setDetails: (patch) => set((s) => ({ details: { ...s.details, ...patch } })),
  next: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
  back: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  goTo: (step) => set({ step }),
  reset: () =>
    set({
      step: 1,
      serviceId: null,
      barberId: null,
      date: null,
      time: null,
      details: emptyDetails,
    }),
  setLastBooking: (a) => set({ lastBooking: a }),
}));
