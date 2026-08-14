import { create } from "zustand";
import type {
  AppNotification,
  Appointment,
  AppointmentStatus,
  Barber,
  Customer,
  Review,
  Service,
  ShopSettings,
} from "@/types";
import {
  appointments as seedAppointments,
  barbers as seedBarbers,
  customers as seedCustomers,
  notifications as seedNotifications,
  reviews as seedReviews,
  services as seedServices,
  shopSettings as seedSettings,
} from "@/data";
import { makeId } from "@/lib/utils";

interface DataState {
  appointments: Appointment[];
  customers: Customer[];
  services: Service[];
  barbers: Barber[];
  reviews: Review[];
  notifications: AppNotification[];
  settings: ShopSettings;

  // Appointments
  addAppointment: (a: Omit<Appointment, "id" | "createdAt">) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;

  // Services
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, patch: Partial<Service>) => void;
  removeService: (id: string) => void;

  // Barbers
  addBarber: (b: Omit<Barber, "id">) => void;
  updateBarber: (id: string, patch: Partial<Barber>) => void;
  removeBarber: (id: string) => void;

  // Customers
  updateCustomer: (id: string, patch: Partial<Customer>) => void;

  // Settings
  updateSettings: (patch: Partial<ShopSettings>) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

export const useDataStore = create<DataState>((set) => ({
  appointments: seedAppointments,
  customers: seedCustomers,
  services: seedServices,
  barbers: seedBarbers,
  reviews: seedReviews,
  notifications: seedNotifications,
  settings: seedSettings,

  addAppointment: (a) => {
    const appointment: Appointment = {
      ...a,
      id: makeId("apt"),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    set((state) => ({ appointments: [appointment, ...state.appointments] }));
    return appointment;
  },
  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  updateAppointment: (id, patch) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    })),
  removeAppointment: (id) =>
    set((state) => ({ appointments: state.appointments.filter((a) => a.id !== id) })),

  addService: (s) =>
    set((state) => ({ services: [{ ...s, id: makeId("svc") }, ...state.services] })),
  updateService: (id, patch) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })),
  removeService: (id) =>
    set((state) => ({ services: state.services.filter((s) => s.id !== id) })),

  addBarber: (b) => set((state) => ({ barbers: [{ ...b, id: makeId("brb") }, ...state.barbers] })),
  updateBarber: (id, patch) =>
    set((state) => ({
      barbers: state.barbers.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    })),
  removeBarber: (id) => set((state) => ({ barbers: state.barbers.filter((b) => b.id !== id) })),

  updateCustomer: (id, patch) =>
    set((state) => ({
      customers: state.customers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),

  updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
