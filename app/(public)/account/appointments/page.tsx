"use client";

import { CalendarX } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, EmptyState, Modal, Tabs, useToast } from "@/components/core";
import { AppointmentCard } from "@/components/account/AppointmentCard";
import { useAppointments } from "@/hooks";
import { useAuthStore } from "@/store/authStore";
import type { Appointment } from "@/types";

const TODAY = "2026-08-14";

export default function AppointmentsPage() {
  const router = useRouter();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const { forCustomer, updateAppointmentStatus } = useAppointments();
  const [tab, setTab] = useState("upcoming");
  const [toCancel, setToCancel] = useState<Appointment | null>(null);

  const mine = user ? forCustomer(user.id) : [];
  const upcoming = mine
    .filter((a) => a.date >= TODAY && a.status !== "cancelled")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = mine
    .filter((a) => a.date < TODAY && a.status !== "cancelled")
    .sort((a, b) => b.date.localeCompare(a.date));
  const cancelled = mine.filter((a) => a.status === "cancelled");

  const lists: Record<string, Appointment[]> = { upcoming, past, cancelled };
  const current = lists[tab] ?? [];

  const reschedule = (a: Appointment) =>
    router.push(`/book?service=${a.serviceId}&barber=${a.barberId}`);

  const confirmCancel = () => {
    if (!toCancel) return;
    updateAppointmentStatus(toCancel.id, "cancelled");
    toast.success("Appointment cancelled.");
    setToCancel(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="heading text-3xl text-foreground">My appointments</h1>
        <Button href="/book">Book new</Button>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "upcoming", label: "Upcoming", count: upcoming.length },
          { value: "past", label: "Past", count: past.length },
          { value: "cancelled", label: "Cancelled", count: cancelled.length },
        ]}
      />

      {current.length === 0 ? (
        <EmptyState
          icon={<CalendarX className="size-6" />}
          title={`No ${tab} appointments`}
          description={tab === "upcoming" ? "Book your next visit and it'll show up here." : undefined}
          action={tab === "upcoming" ? <Button href="/book">Book appointment</Button> : undefined}
        />
      ) : (
        <div className="space-y-3">
          {current.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              onReschedule={tab === "upcoming" ? reschedule : undefined}
              onCancel={tab === "upcoming" ? setToCancel : undefined}
            />
          ))}
        </div>
      )}

      <Modal
        open={!!toCancel}
        onClose={() => setToCancel(null)}
        title="Cancel appointment?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToCancel(null)}>
              Keep it
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Yes, cancel
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          You&apos;re about to cancel your{" "}
          <span className="font-medium text-foreground">{toCancel?.serviceName}</span> with{" "}
          {toCancel?.barberName}. This can&apos;t be undone.
        </p>
      </Modal>
    </div>
  );
}
