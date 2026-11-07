import { create } from "zustand";
import type { Appointment } from "@/types";

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  venue?: string;
  notes: string;
}

interface BookingState {
  step: number; // 1..5
  serviceId: string | null;
  serviceIds: string[]; // Supports booking more than one function!
  barberId: string | null; // "any" or specific director
  date: string | null; // ISO yyyy-mm-dd
  time: string | null;
  details: BookingDetails;
  lastBooking: Appointment | null;

  setService: (id: string) => void;
  toggleService: (id: string) => void;
  setServiceIds: (ids: string[]) => void;
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

const emptyDetails: BookingDetails = { name: "", phone: "", email: "", venue: "", notes: "" };

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  serviceId: null,
  serviceIds: [],
  barberId: "brb_attiq",
  date: null,
  time: null,
  details: emptyDetails,
  lastBooking: null,

  setService: (id) =>
    set((s) => ({
      serviceId: id,
      serviceIds: s.serviceIds.includes(id) ? s.serviceIds : [...s.serviceIds, id],
    })),

  toggleService: (id) =>
    set((s) => {
      const exists = s.serviceIds.includes(id);
      const next = exists ? s.serviceIds.filter((item) => item !== id) : [...s.serviceIds, id];
      return {
        serviceIds: next,
        serviceId: next.length > 0 ? next[0] : null,
      };
    }),

  setServiceIds: (ids) =>
    set({
      serviceIds: ids,
      serviceId: ids.length > 0 ? ids[0] : null,
    }),

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
      serviceIds: [],
      barberId: "brb_attiq",
      date: null,
      time: null,
      details: emptyDetails,
    }),
  setLastBooking: (a) => set({ lastBooking: a }),
}));
