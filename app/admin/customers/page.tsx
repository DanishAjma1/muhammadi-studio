"use client";

import { CalendarDays, Mail, Phone, Scissors, Star, Wallet } from "lucide-react";
import { useState } from "react";
import { Avatar, Badge, Button, DataTable, Modal, StatusBadge } from "@/components/core";
import type { Column } from "@/components/core";
import { useBarbers, useCustomers, useServices } from "@/hooks";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Customer } from "@/types";

export default function AdminCustomersPage() {
  const { customers } = useCustomers();
  const { getById: getBarber } = useBarbers();
  const { getById: getService } = useServices();
  const [selected, setSelected] = useState<Customer | null>(null);

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      width: 240,
      sortable: true,
      sortValue: (c) => c.name,
      csvValue: (c) => c.name,
      cell: (c) => (
        <div className="flex items-center gap-3">
          <Avatar src={c.avatar} name={c.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{c.name}</p>
            <p className="truncate text-xs text-muted">{c.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", width: 160, sortable: true, sortValue: (c) => c.phone, cell: (c) => <span className="text-muted">{c.phone}</span> },
    { key: "visits", header: "Visits", width: 90, align: "right", sortable: true, sortValue: (c) => c.totalVisits, cell: (c) => c.totalVisits },
    {
      key: "spent",
      header: "Total spent",
      width: 120,
      align: "right",
      sortable: true,
      sortValue: (c) => c.totalSpent,
      csvValue: (c) => c.totalSpent,
      cell: (c) => <span className="font-medium text-gold">{formatCurrency(c.totalSpent)}</span>,
    },
    {
      key: "last",
      header: "Last visit",
      width: 120,
      sortable: true,
      sortValue: (c) => c.lastVisit ?? "",
      csvValue: (c) => c.lastVisit ?? "",
      cell: (c) => <span className="text-muted">{c.lastVisit ? formatDate(c.lastVisit, "short") : "—"}</span>,
    },
    {
      key: "source",
      header: "Source",
      width: 120,
      sortable: true,
      sortValue: (c) => c.source,
      cell: (c) => <Badge variant="muted" className="capitalize">{c.source}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      width: 110,
      sortable: true,
      sortValue: (c) => c.status,
      cell: (c) => <StatusBadge status={c.status} />,
    },
  ];

  const favBarber = selected?.favoriteBarberId ? getBarber(selected.favoriteBarberId) : undefined;
  const favService = selected?.favoriteServiceId ? getService(selected.favoriteServiceId) : undefined;

  return (
    <div className="space-y-5">
      <DataTable
        columns={columns}
        data={customers}
        rowKey={(c) => c.id}
        exportFilename="customers"
        searchValue={(c) => `${c.name} ${c.email} ${c.phone} ${c.source}`}
        onRowClick={setSelected}
        pageSize={10}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Customer profile" size="md">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar src={selected.avatar} name={selected.name} size="xl" ring />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{selected.name}</h3>
                  <StatusBadge status={selected.status} />
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Mail className="size-3.5" /> {selected.email}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Phone className="size-3.5" /> {selected.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={<CalendarDays className="size-4" />} label="Visits" value={String(selected.totalVisits)} />
              <Stat icon={<Wallet className="size-4" />} label="Spent" value={formatCurrency(selected.totalSpent)} />
              <Stat icon={<Star className="size-4" />} label="Barber" value={favBarber?.name.split(" ")[0] ?? "—"} />
              <Stat icon={<Scissors className="size-4" />} label="Service" value={favService?.name.split(" ")[0] ?? "—"} />
            </div>

            <div className="rounded-xl border border-border bg-secondary p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Member since</span>
                <span className="text-foreground">{formatDate(selected.joinedDate, "medium")}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-muted">Last appointment</span>
                <span className="text-foreground">{selected.lastVisit ? formatDate(selected.lastVisit, "medium") : "—"}</span>
              </div>
            </div>

            {selected.tags && (
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <Badge key={t} variant="gold">{t}</Badge>
                ))}
              </div>
            )}

            <Button href={`/book`} fullWidth>
              Book for this customer
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary p-3 text-center">
      <span className="mx-auto flex size-8 items-center justify-center rounded-lg bg-gold/10 text-gold">{icon}</span>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
