"use client";

import { CalendarDays, Clock, RotateCcw, User, X } from "lucide-react";
import { Avatar, Button, StatusBadge } from "@/components/core";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule?: (a: Appointment) => void;
  onCancel?: (a: Appointment) => void;
}

export function AppointmentCard({ appointment, onReschedule, onCancel }: AppointmentCardProps) {
  const canManage = appointment.status === "confirmed" || appointment.status === "pending";
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-4">
        <Avatar src={appointment.customerAvatar} name={appointment.barberName} size="md" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-foreground">{appointment.serviceName}</h3>
            <StatusBadge status={appointment.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" /> {formatDate(appointment.date, "medium")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {appointment.time}
            </span>
            <span className="flex items-center gap-1">
              <User className="size-3.5" /> {appointment.barberName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-end lg:flex-row lg:items-center">
        <span className="heading text-lg text-gold">{formatCurrency(appointment.price)}</span>
        {canManage && (
          <div className="flex gap-2">
            {onReschedule && (
              <Button size="sm" variant="secondary" onClick={() => onReschedule(appointment)} leftIcon={<RotateCcw className="size-3.5" />}>
                Reschedule
              </Button>
            )}
            {onCancel && (
              <Button size="sm" variant="ghost" onClick={() => onCancel(appointment)} leftIcon={<X className="size-3.5" />}>
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
