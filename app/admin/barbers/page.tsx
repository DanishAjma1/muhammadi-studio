"use client";

import { Pencil, Plus, Power, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Badge,
  Button,
  Input,
  Modal,
  MultiSelect,
  Select,
  StarRating,
  TextArea,
  useToast,
} from "@/components/core";
import { useBarbers } from "@/hooks";
import type { Barber } from "@/types";

const SPECIALTIES = [
  "Classic Cuts", "Skin Fades", "Beard Styling", "Hot Towel Shaves",
  "Textured Crops", "Line-ups", "Kids Cuts", "Hair Designs", "Grey Blending",
].map((s) => ({ label: s, value: s }));

const emptyForm = {
  name: "",
  title: "Barber",
  bio: "",
  experienceYears: 1,
  specialties: [] as string[],
  workingDays: "Mon – Fri",
  workingHours: "10:00 AM – 8:00 PM",
  instagram: "",
  status: "active" as Barber["status"],
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminBarbersPage() {
  const { barbers, addBarber, updateBarber, removeBarber } = useBarbers();
  const toast = useToast();
  const [editing, setEditing] = useState<Barber | null>(null);
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState<Barber | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setForm(emptyForm);
    setCreating(true);
  };
  const openEdit = (b: Barber) => {
    setForm({
      name: b.name,
      title: b.title,
      bio: b.bio,
      experienceYears: b.experienceYears,
      specialties: b.specialties,
      workingDays: b.workingDays,
      workingHours: b.workingHours,
      instagram: b.instagram ?? "",
      status: b.status,
    });
    setEditing(b);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (editing) {
      updateBarber(editing.id, { ...form });
      toast.success("Barber updated.");
      setEditing(null);
    } else {
      addBarber({
        slug: slugify(form.name),
        name: form.name,
        title: form.title,
        bio: form.bio || "A talented member of our team.",
        experienceYears: form.experienceYears,
        rating: 5,
        reviewsCount: 0,
        specialties: form.specialties,
        avatar: "https://i.pravatar.cc/400?img=8",
        cover: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        workingDays: form.workingDays,
        workingHours: form.workingHours,
        instagram: form.instagram || undefined,
        status: form.status,
      });
      toast.success("Barber added.");
      setCreating(false);
    }
  };

  const toggleStatus = (b: Barber) => {
    const next = b.status === "active" ? "inactive" : "active";
    updateBarber(b.id, { status: next });
    toast.info(`${b.name} is now ${next}.`);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    removeBarber(toDelete.id);
    toast.success("Barber removed.");
    setToDelete(null);
  };

  const modalOpen = creating || !!editing;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{barbers.length} barbers</p>
        <Button leftIcon={<Plus className="size-4" />} onClick={openCreate}>
          Add barber
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {barbers.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-4 p-5">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={b.avatar} alt={b.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-foreground">{b.name}</h3>
                  <Badge variant={b.status === "active" ? "success" : "muted"} dot>
                    {b.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted">{b.title}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <StarRating rating={b.rating} size={13} />
                  <span className="text-xs text-muted">
                    <Star className="mr-0.5 inline size-3" /> {b.experienceYears} yrs
                  </span>
                </div>
              </div>
            </div>
            <div className="flex divide-x divide-border border-t border-border text-sm">
              <button onClick={() => openEdit(b)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                <Pencil className="size-3.5" /> Edit
              </button>
              <button onClick={() => toggleStatus(b)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                <Power className="size-3.5" /> {b.status === "active" ? "Disable" : "Enable"}
              </button>
              <button onClick={() => setToDelete(b)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-muted transition-colors hover:bg-error/10 hover:text-error">
                <Trash2 className="size-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? "Edit barber" : "Add barber"}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => { setCreating(false); setEditing(null); }}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add barber"}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input label="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Experience (years)"
              type="number"
              value={form.experienceYears}
              onChange={(e) => setForm((f) => ({ ...f, experienceYears: Number(e.target.value) }))}
            />
            <Select
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={form.status}
              onChange={(v) => setForm((f) => ({ ...f, status: v as Barber["status"] }))}
            />
          </div>
          <MultiSelect
            label="Specialties"
            options={SPECIALTIES}
            value={form.specialties}
            onChange={(v) => setForm((f) => ({ ...f, specialties: v }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Working days" value={form.workingDays} onChange={(e) => setForm((f) => ({ ...f, workingDays: e.target.value }))} />
            <Input label="Working hours" value={form.workingHours} onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))} />
          </div>
          <Input label="Instagram" placeholder="@handle" value={form.instagram} onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))} />
          <TextArea label="Bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Remove barber?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Remove</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Remove <span className="font-medium text-foreground">{toDelete?.name}</span> from the team? This can&apos;t be undone.
        </p>
      </Modal>
    </div>
  );
}
