"use client";

import { useMemo } from "react";
import { useDataStore } from "@/store/dataStore";
import type { AppointmentStatus } from "@/types";

const TODAY = "2026-08-14";

/** Central appointments hook — data + derived views + mutations. */
export function useAppointments() {
  const appointments = useDataStore((s) => s.appointments);
  const addAppointment = useDataStore((s) => s.addAppointment);
  const updateAppointmentStatus = useDataStore((s) => s.updateAppointmentStatus);
  const updateAppointment = useDataStore((s) => s.updateAppointment);
  const removeAppointment = useDataStore((s) => s.removeAppointment);

  const derived = useMemo(() => {
    const today = appointments.filter((a) => a.date === TODAY);
    const upcoming = appointments
      .filter((a) => a.date >= TODAY && a.status !== "cancelled")
      .sort((a, b) => a.date.localeCompare(b.date));
    const past = appointments
      .filter((a) => a.date < TODAY || a.status === "completed")
      .sort((a, b) => b.date.localeCompare(a.date));
    return { today, upcoming, past };
  }, [appointments]);

  return {
    appointments,
    ...derived,
    forCustomer: (customerId: string) => appointments.filter((a) => a.customerId === customerId),
    byStatus: (status: AppointmentStatus) => appointments.filter((a) => a.status === status),
    byDate: (date: string) => appointments.filter((a) => a.date === date),
    addAppointment,
    updateAppointmentStatus,
    updateAppointment,
    removeAppointment,
  };
}
