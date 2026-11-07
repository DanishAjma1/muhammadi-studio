"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send, XCircle } from "lucide-react";
import { Avatar, Button, DataTable, Modal, Select, StatusBadge, TextArea, useToast } from "@/components/core";
import type { Column } from "@/components/core";
import { useAppointments } from "@/hooks";
import { formatDate } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";

const statusFilters = [
  { label: "All bookings", value: "all" },
  { label: "Pending Approval", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminAppointmentsPage() {
  const toast = useToast();
  const { appointments, updateAppointmentStatus } = useAppointments();
  const [status, setStatus] = useState<string | null>("all");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [approving, setApproving] = useState(false);

  const rows = status === "all" ? appointments : appointments.filter((a) => a.status === status);

  const handleApproveAndSendMail = async () => {
    if (!selected) return;
    setApproving(true);

    try {
      const res = await fetch("/api/booking/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selected.id,
          clientName: selected.customerName,
          clientEmail: selected.customerEmail || `${selected.customerName.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`,
          clientPhone: selected.customerPhone,
          functions: selected.functionNames && selected.functionNames.length > 0 ? selected.functionNames : [selected.serviceName],
          date: selected.date,
          time: selected.time,
          venue: selected.venueCity,
          adminNotes: adminNote || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        updateAppointmentStatus(selected.id, "confirmed");
        toast.success(
          data.message || `Booking #${selected.id} approved! Confirmation email dispatched to client.`,
          "Booking Approved"
        );
        setSelected(null);
        setAdminNote("");
      } else {
        toast.error(data.error || "Failed to dispatch approval email.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error approving booking";
      toast.error(msg);
    } finally {
      setApproving(false);
    }
  };

  const columns: Column<Appointment>[] = [
    {
      key: "date",
      header: "Date & Session",
      width: 170,
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
      header: "Client Details",
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
            {a.customerEmail && <p className="truncate text-[11px] text-gold/80">{a.customerEmail}</p>}
          </div>
        </div>
      ),
    },
    {
      key: "service",
      header: "Selected Functions / Setups",
      width: 240,
      sortable: true,
      sortValue: (a) => a.serviceName,
      cell: (a) => (
        <div>
          <p className="font-medium text-foreground line-clamp-1">{a.serviceName}</p>
          <span className="text-xs text-gold">Custom Quote</span>
        </div>
      ),
    },
    {
      key: "barber",
      header: "Lead Director",
      width: 160,
      sortable: true,
      sortValue: (a) => a.barberName,
      cell: (a) => <span className="text-sm font-medium">{a.barberName}</span>,
    },
    {
      key: "status",
      header: "Status",
      width: 140,
      sortable: true,
      sortValue: (a) => a.status,
      csvValue: (a) => a.status,
      cell: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: "actions",
      header: "",
      width: 130,
      cell: (a) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant={a.status === "pending" ? "primary" : "secondary"}
            onClick={() => {
              setSelected(a);
              setAdminNote("");
            }}
          >
            {a.status === "pending" ? "Review & Approve" : "Manage"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading text-2xl text-foreground">Event Bookings &amp; Confirmations</h1>
          <p className="text-sm text-muted">
            Manage incoming event requests. Approving a booking dispatches the official confirmation email to the client with studio details.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={rows}
        rowKey={(a) => a.id}
        exportFilename="muhammadi-studio-bookings"
        searchValue={(a) => `${a.customerName} ${a.serviceName} ${a.barberName} ${a.customerPhone} ${a.customerEmail || ""}`}
        onRowClick={(a) => {
          setSelected(a);
          setAdminNote("");
        }}
        pageSize={10}
        toolbar={
          <Select
            options={statusFilters}
            value={status}
            onChange={setStatus}
            className="w-48"
          />
        }
      />

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Event Booking Management &amp; Approval"
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
                <p className="font-semibold text-foreground text-lg">{selected.customerName}</p>
                <p className="text-sm text-muted">{selected.customerPhone}</p>
                {selected.customerEmail && (
                  <p className="text-xs text-gold flex items-center gap-1 mt-0.5">
                    <Mail className="size-3" /> {selected.customerEmail}
                  </p>
                )}
              </div>
              <span className="ml-auto">
                <StatusBadge status={selected.status} />
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-secondary p-4 text-sm">
              <Field label="Booked Function(s)" value={selected.serviceName} />
              <Field label="Event Director" value={selected.barberName} />
              <Field label="Scheduled Date" value={formatDate(selected.date, "medium")} />
              <Field label="Session Time" value={selected.time} />
              <Field label="Venue Location" value={selected.venueCity || "Main Bazar, New Plaza, Shop No: 2"} />
              <Field label="Pricing Arrangement" value="Custom Quote (Direct Coordination)" />
            </dl>

            {selected.notes && (
              <div className="rounded-xl border border-border bg-secondary p-4 text-xs text-muted">
                <span className="font-semibold text-foreground block mb-1">Client Special Vision &amp; Notes:</span>
                <p className="whitespace-pre-line leading-relaxed">{selected.notes}</p>
              </div>
            )}

            {/* Approval & Confirmation Email Action */}
            <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 space-y-3">
              <div className="flex items-center gap-2 text-gold font-semibold text-sm">
                <CheckCircle2 className="size-4" />
                <span>Client Confirmation Email Trigger</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Approving this booking triggers an official confirmation email via Gmail SMTP directly to <strong>{selected.customerEmail || selected.customerName}</strong> including your studio contact (<strong>0313-7526305</strong>) and office location (<strong>Main Bazar, New Plaza, Shop No: 2</strong>).
              </p>

              <TextArea
                label="Custom Message from Atiq Butt to Client (Optional)"
                placeholder="e.g. Assalam-o-Alaikum, your date is confirmed. Our setup team will reach your marquee at 3 PM..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={2}
              />

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  onClick={handleApproveAndSendMail}
                  loading={approving}
                  className="flex-1"
                  leftIcon={<Send className="size-4" />}
                >
                  Approve &amp; Send Confirmation Email
                </Button>
                {selected.status !== "cancelled" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      updateAppointmentStatus(selected.id, "cancelled");
                      toast.success("Booking marked as cancelled.");
                      setSelected(null);
                    }}
                    leftIcon={<XCircle className="size-4" />}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
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
      <dd className="font-medium text-foreground text-xs mt-0.5">{value}</dd>
    </div>
  );
}
