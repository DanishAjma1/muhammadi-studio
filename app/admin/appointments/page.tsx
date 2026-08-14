"use client";

import { useState } from "react";
import { Avatar, Button, DataTable, Modal, Select, StatusBadge, useToast } from "@/components/core";
import type { Column } from "@/components/core";
import { useAppointments } from "@/hooks";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";

const statusFilters = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "No show", value: "no_show" },
];

const actions: { label: string; value: AppointmentStatus; variant: "primary" | "secondary" | "danger" }[] = [
  { label: "Mark confirmed", value: "confirmed", variant: "secondary" },
  { label: "Mark completed", value: "completed", variant: "primary" },
  { label: "Mark no-show", value: "no_show", variant: "secondary" },
  { label: "Cancel", value: "cancelled", variant: "danger" },
];

export default function AdminAppointmentsPage() {
  const toast = useToast();
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [status, setStatus] = useState<string | null>("all");
  const [selected, setSelected] = useState<Appointment | null>(null);

  const rows = status === "all" ? appointments : appointments.filter((a) => a.status === status);

  const columns: Column<Appointment>[] = [
    {
      key: "date",
      header: "Date & time",
      width: 160,
      sortable: true,
      sortValue: (a) => `${a.date} ${a.time}`,
      csvValue: (a) => `${a.date} ${a.time}`,
      cell: (a) => (
        <div>
          <p className="font-medium text-foreground">{formatDate(a.date, "short")}</p>
          <p className="text-xs text-muted">{a.time}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      width: 220,
      sortable: true,
      sortValue: (a) => a.customerName,
      csvValue: (a) => `${a.customerName} (${a.customerPhone})`,
      cell: (a) => (
        <div className="flex items-center gap-3">
          <Avatar src={a.customerAvatar} name={a.customerName} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{a.customerName}</p>
            <p className="truncate text-xs text-muted">{a.customerPhone}</p>
          </div>
        </div>
      ),
    },
    { key: "service", header: "Service", width: 160, sortable: true, sortValue: (a) => a.serviceName, cell: (a) => a.serviceName },
    { key: "barber", header: "Barber", width: 150, sortable: true, sortValue: (a) => a.barberName, cell: (a) => a.barberName },
    {
      key: "price",
      header: "Price",
      width: 100,
      align: "right",
      sortable: true,
      sortValue: (a) => a.price,
      cell: (a) => <span className="font-medium text-gold">{formatCurrency(a.price)}</span>,
    },
    {
      key: "status",
      header: "Status",
      width: 130,
      sortable: true,
      sortValue: (a) => a.status,
      csvValue: (a) => a.status,
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: "actions",
      header: "",
      width: 110,
      cell: (a) => (
        <Button size="sm" variant="secondary" onClick={() => setSelected(a)}>
          Manage
        </Button>
      ),
    },
  ];

  const setStatusFor = (s: AppointmentStatus) => {
    if (!selected) return;
    updateAppointmentStatus(selected.id, s);
    toast.success(`Appointment marked ${s.replace("_", " ")}.`);
    setSelected(null);
  };

  return (
    <div className="space-y-5">
      <DataTable
        columns={columns}
        data={rows}
        rowKey={(a) => a.id}
        exportFilename="appointments"
        searchValue={(a) => `${a.customerName} ${a.serviceName} ${a.barberName} ${a.customerPhone}`}
        onRowClick={setSelected}
        pageSize={10}
        toolbar={
          <Select
            options={statusFilters}
            value={status}
            onChange={setStatus}
            className="w-44"
          />
        }
      />

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Manage appointment"
        footer={
          <Button variant="ghost" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar src={selected.customerAvatar} name={selected.customerName} size="lg" />
              <div>
                <p className="font-semibold text-foreground">{selected.customerName}</p>
                <p className="text-sm text-muted">{selected.customerPhone}</p>
              </div>
              <span className="ml-auto">
                <StatusBadge status={selected.status} />
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-secondary p-4 text-sm">
              <Field label="Service" value={selected.serviceName} />
              <Field label="Barber" value={selected.barberName} />
              <Field label="Date" value={formatDate(selected.date, "medium")} />
              <Field label="Time" value={selected.time} />
              <Field label="Duration" value={`${selected.durationMin} min`} />
              <Field label="Price" value={formatCurrency(selected.price)} />
            </dl>
            {selected.notes && (
              <p className="rounded-xl border border-border bg-secondary p-4 text-sm text-muted">
                <span className="font-medium text-foreground">Notes: </span>
                {selected.notes}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {actions.map((act) => (
                <Button key={act.value} variant={act.variant} size="sm" onClick={() => setStatusFor(act.value)}>
                  {act.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
