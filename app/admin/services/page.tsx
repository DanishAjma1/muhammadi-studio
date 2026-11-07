"use client";

import { Clock, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Badge,
  Button,
  DataTable,
  Input,
  Modal,
  Select,
  Switch,
  TextArea,
  useToast,
} from "@/components/core";
import type { Column } from "@/components/core";
import { useServices } from "@/hooks";
import { formatCurrency } from "@/lib/utils";
import type { Service, ServiceCategory } from "@/types";

const CATEGORIES = [
  { label: "Core Specialized Setup", value: "setup" },
  { label: "Event Occasion / Function", value: "function" },
  { label: "Photography", value: "photography" },
  { label: "Cinematography", value: "cinematography" },
  { label: "Complete Package", value: "package" },
];

const emptyForm = {
  name: "",
  category: "setup" as ServiceCategory,
  price: 0,
  durationMin: 180,
  description: "",
  popular: false,
  active: true,
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminServicesPage() {
  const { services, addService, updateService, removeService } = useServices();
  const toast = useToast();
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setForm(emptyForm);
    setCreating(true);
  };
  const openEdit = (s: Service) => {
    setForm({
      name: s.name,
      category: s.category,
      price: s.price,
      durationMin: s.durationMin,
      description: s.description,
      popular: s.popular ?? false,
      active: s.active,
    });
    setEditing(s);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (editing) {
      updateService(editing.id, { ...form });
      toast.success("Production service updated.");
      setEditing(null);
    } else {
      addService({
        ...form,
        slug: slugify(form.name),
        description: form.description || "A specialized event setup / function.",
        image: "/images/setup-decor.jpg",
      });
      toast.success("Production service added.");
      setCreating(false);
    }
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    removeService(toDelete.id);
    toast.success("Production service removed.");
    setToDelete(null);
  };

  const columns: Column<Service>[] = [
    {
      key: "name",
      header: "Service / Package",
      width: 240,
      sortable: true,
      sortValue: (s) => s.name,
      cell: (s) => (
        <div>
          <p className="font-medium text-foreground">{s.name}</p>
          <p className="truncate text-xs text-muted">{s.description}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      width: 140,
      sortable: true,
      sortValue: (s) => s.category,
      cell: (s) => <Badge variant="muted" className="capitalize">{s.category}</Badge>,
    },
    {
      key: "price",
      header: "Investment",
      width: 110,
      align: "right",
      sortable: true,
      sortValue: (s) => s.price,
      csvValue: (s) => s.price,
      cell: (s) => <span className="font-medium text-gold">{formatCurrency(s.price)}</span>,
    },
    {
      key: "duration",
      header: "Shoot Duration",
      width: 130,
      align: "right",
      sortable: true,
      sortValue: (s) => s.durationMin,
      csvValue: (s) => s.durationMin,
      cell: (s) => (
        <span className="inline-flex items-center gap-1 text-muted">
          <Clock className="size-3.5" /> {s.durationMin}m
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: 110,
      sortable: true,
      sortValue: (s) => (s.active ? "active" : "inactive"),
      cell: (s) => (
        <Badge variant={s.active ? "success" : "muted"} dot>
          {s.active ? "Active" : "Hidden"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      width: 110,
      cell: (s) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(s)} className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-foreground" aria-label="Edit">
            <Pencil className="size-4" />
          </button>
          <button onClick={() => setToDelete(s)} className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-error/10 hover:text-error" aria-label="Delete">
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{services.length} production services &amp; packages</p>
        <Button leftIcon={<Plus className="size-4" />} onClick={openCreate}>
          Add Service / Package
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        rowKey={(s) => s.id}
        exportFilename="muhammadi-studio-services"
        searchValue={(s) => `${s.name} ${s.category} ${s.description}`}
        pageSize={10}
      />

      <Modal
        open={creating || !!editing}
        onClose={() => { setCreating(false); setEditing(null); }}
        title={editing ? "Edit Production Service" : "Add Production Service"}
        footer={
          <>
            <Button variant="ghost" onClick={() => { setCreating(false); setEditing(null); }}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add Service"}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Service / Package Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Select
              label="Production Category"
              options={CATEGORIES}
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v as ServiceCategory }))}
            />
            <Input label="Price ($)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            <Input label="Duration (min)" type="number" value={form.durationMin} onChange={(e) => setForm((f) => ({ ...f, durationMin: Number(e.target.value) }))} />
          </div>
          <TextArea label="Description & Inclusions" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-secondary p-4 sm:flex-row sm:justify-between">
            <Switch label="Featured / Popular" description="Highlight on landing page" checked={form.popular} onChange={(v) => setForm((f) => ({ ...f, popular: v }))} />
            <Switch label="Active" description="Available for client booking" checked={form.active} onChange={(v) => setForm((f) => ({ ...f, active: v }))} />
          </div>
        </div>
      </Modal>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Remove Production Service?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Remove</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Remove <span className="font-medium text-foreground">{toDelete?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
