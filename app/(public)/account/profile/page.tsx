"use client";

import { Camera, Mail, Pencil, Phone, Scissors, Star } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  Select,
  Switch,
  useToast,
} from "@/components/core";
import { useBarbers, useServices } from "@/hooks";
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const { activeBarbers } = useBarbers();
  const { activeServices } = useServices();

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    favoriteBarberId: user?.favoriteBarberId ?? "",
    favoriteServiceId: user?.favoriteServiceId ?? "",
  });
  const [prefs, setPrefs] = useState({ email: true, sms: true, whatsapp: false });

  const barberOptions = activeBarbers.map((b) => ({ label: b.name, value: b.id }));
  const serviceOptions = activeServices.map((s) => ({ label: s.name, value: s.id }));
  const favBarber = activeBarbers.find((b) => b.id === user?.favoriteBarberId);
  const favService = activeServices.find((s) => s.id === user?.favoriteServiceId);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile(form);
      setSaving(false);
      setOpen(false);
      toast.success("Profile updated.");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <h1 className="heading text-3xl text-foreground">Profile</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Identity card */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="relative mx-auto w-fit">
            <Avatar src={user?.avatar} name={user?.name ?? ""} size="xl" ring />
            <button
              onClick={() => toast.info("Photo upload is disabled in the demo.")}
              className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-gold text-black"
              aria-label="Change photo"
            >
              <Camera className="size-4" />
            </button>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">{user?.name}</h2>
          <p className="text-sm text-muted">Member since 2022</p>
          <Button variant="secondary" fullWidth className="mt-5" leftIcon={<Pencil className="size-4" />} onClick={() => setOpen(true)}>
            Edit profile
          </Button>
        </div>

        {/* Details */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Contact details</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Detail icon={<Mail className="size-4" />} label="Email" value={user?.email} />
              <Detail icon={<Phone className="size-4" />} label="Phone" value={user?.phone} />
              <Detail icon={<Star className="size-4" />} label="Preferred barber" value={favBarber?.name ?? "No preference"} />
              <Detail icon={<Scissors className="size-4" />} label="Preferred service" value={favService?.name ?? "No preference"} />
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted">Choose how you&apos;d like appointment reminders.</p>
            <div className="mt-4 space-y-4">
              <Switch
                label="Email reminders"
                description="Booking confirmations and reminders by email"
                checked={prefs.email}
                onChange={(v) => {
                  setPrefs((p) => ({ ...p, email: v }));
                  toast.info(`Email reminders ${v ? "on" : "off"}.`);
                }}
              />
              <Switch
                label="SMS reminders"
                description="Text message the day before"
                checked={prefs.sms}
                onChange={(v) => {
                  setPrefs((p) => ({ ...p, sms: v }));
                  toast.info(`SMS reminders ${v ? "on" : "off"}.`);
                }}
              />
              <Switch
                label="WhatsApp reminders"
                description="Get reminders on WhatsApp"
                checked={prefs.whatsapp}
                onChange={(v) => {
                  setPrefs((p) => ({ ...p, whatsapp: v }));
                  toast.info(`WhatsApp reminders ${v ? "on" : "off"}.`);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} loading={saving}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <Select
            label="Preferred barber"
            options={barberOptions}
            value={form.favoriteBarberId || null}
            onChange={(v) => setForm((f) => ({ ...f, favoriteBarberId: v }))}
            placeholder="No preference"
          />
          <Select
            label="Preferred service"
            options={serviceOptions}
            value={form.favoriteServiceId || null}
            onChange={(v) => setForm((f) => ({ ...f, favoriteServiceId: v }))}
            placeholder="No preference"
          />
        </div>
      </Modal>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <dt className="text-xs text-muted">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{value ?? "—"}</dd>
      </div>
    </div>
  );
}
