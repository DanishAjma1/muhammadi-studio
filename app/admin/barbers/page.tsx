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
  "Cinematic Wedding Films",
  "Director of Photography",
  "4K Movie Production",
  "Royal Bridal Portraits",
  "Drone Cinematography",
  "Commercial Ad Campaigns",
  "Music Video Production",
  "Fashion & Editorial Shoots",
  "DaVinci Resolve Colorist",
  "Studio Strobe Lighting",
  "Steadicam & Gimbal Rigging",
].map((s) => ({ label: s, value: s }));

const emptyForm = {
  name: "",
  title: "Director of Cinematography",
  bio: "",
  experienceYears: 1,
  specialties: [] as string[],
  workingDays: "Mon – Fri",
  workingHours: "09:00 AM – 8:00 PM",
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
      toast.success("Team member updated.");
      setEditing(null);
    } else {
      addBarber({
        slug: slugify(form.name),
        name: form.name,
        title: form.title,
        bio: form.bio || "A talented director & visual artist at Muhammadi Studio.",
        experienceYears: form.experienceYears,
        rating: 5,
        reviewsCount: 0,
        specialties: form.specialties,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        cover: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
        gallery: [],
        workingDays: form.workingDays,
        workingHours: form.workingHours,
        instagram: form.instagram || undefined,
        status: form.status,
      });
      toast.success("Team member added.");
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
    toast.success("Team member removed.");
    setToDelete(null);
  };

  const modalOpen = creating || !!editing;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{barbers.length} directors &amp; master artists</p>
        <Button leftIcon={<Plus className="size-4" />} onClick={openCreate}>
          Add Director / Artist
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
                    <Star className="mr-0.5 inline size-3" /> {b.experienceYears} yrs exp
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
        title={editing ? "Edit Director / Artist" : "Add Director / Artist"}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => { setCreating(false); setEditing(null); }}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add to Team"}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input label="Title / Role" placeholder="e.g. Director of Cinematography" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
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
            label="Production Specialties"
            options={SPECIALTIES}
            value={form.specialties}
            onChange={(v) => setForm((f) => ({ ...f, specialties: v }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Available Days" value={form.workingDays} onChange={(e) => setForm((f) => ({ ...f, workingDays: e.target.value }))} />
            <Input label="Working Hours" value={form.workingHours} onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))} />
          </div>
          <Input label="Instagram Handle" placeholder="@handle" value={form.instagram} onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))} />
          <TextArea label="Artistic Bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Remove Director / Artist?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Remove</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Remove <span className="font-medium text-foreground">{toDelete?.name}</span> from the production team? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
