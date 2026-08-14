"use client";

import { useDataStore } from "@/store/dataStore";

export function useServices() {
  const services = useDataStore((s) => s.services);
  return {
    services,
    activeServices: services.filter((s) => s.active),
    addService: useDataStore((s) => s.addService),
    updateService: useDataStore((s) => s.updateService),
    removeService: useDataStore((s) => s.removeService),
    getById: (id: string) => services.find((s) => s.id === id),
  };
}

export function useBarbers() {
  const barbers = useDataStore((s) => s.barbers);
  return {
    barbers,
    activeBarbers: barbers.filter((b) => b.status === "active"),
    addBarber: useDataStore((s) => s.addBarber),
    updateBarber: useDataStore((s) => s.updateBarber),
    removeBarber: useDataStore((s) => s.removeBarber),
    getById: (id: string) => barbers.find((b) => b.id === id),
    getBySlug: (slug: string) => barbers.find((b) => b.slug === slug),
  };
}

export function useCustomers() {
  const customers = useDataStore((s) => s.customers);
  return {
    customers,
    updateCustomer: useDataStore((s) => s.updateCustomer),
    getById: (id: string) => customers.find((c) => c.id === id),
  };
}

export function useReviews() {
  return useDataStore((s) => s.reviews);
}

export function useSettings() {
  return {
    settings: useDataStore((s) => s.settings),
    updateSettings: useDataStore((s) => s.updateSettings),
  };
}

export function useNotifications() {
  const notifications = useDataStore((s) => s.notifications);
  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markRead: useDataStore((s) => s.markNotificationRead),
    markAllRead: useDataStore((s) => s.markAllNotificationsRead),
  };
}
