"use client";

import { Bell, Calendar, Clock, Save, Share2, Store } from "lucide-react";
import { useState } from "react";
import { Button, Input, Switch, useToast } from "@/components/core";
import { useSettings } from "@/hooks";
import type { ShopSettings } from "@/types";

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">{icon}</span>
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSettings();
  const toast = useToast();
  const [form, setForm] = useState<ShopSettings>(() => structuredClone(settings));

  const set = <K extends keyof ShopSettings>(key: K, value: ShopSettings[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = () => {
    updateSettings(form);
    toast.success("Settings saved.");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Manage your shop configuration.</p>
        <Button leftIcon={<Save className="size-4" />} onClick={save}>
          Save changes
        </Button>
      </div>

      {/* Shop */}
      <SectionCard icon={<Store className="size-5" />} title="Shop details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Shop name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <Input label="Tagline" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          <Input label="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          <Input label="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          <Input label="WhatsApp" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          <Input label="Address" value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
      </SectionCard>

      {/* Hours */}
      <SectionCard icon={<Clock className="size-5" />} title="Opening hours">
        <div className="space-y-2">
          {form.hours.map((h, i) => (
            <div key={h.day} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <span className="w-24 text-sm font-medium text-foreground">{h.day}</span>
              {h.closed ? (
                <span className="flex-1 text-sm text-muted">Closed</span>
              ) : (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    value={h.open}
                    onChange={(e) => {
                      const hours = [...form.hours];
                      hours[i] = { ...hours[i], open: e.target.value };
                      set("hours", hours);
                    }}
                    className="h-9 w-28 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  <span className="text-muted">–</span>
                  <input
                    value={h.close}
                    onChange={(e) => {
                      const hours = [...form.hours];
                      hours[i] = { ...hours[i], close: e.target.value };
                      set("hours", hours);
                    }}
                    className="h-9 w-28 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>
              )}
              <Switch
                size="sm"
                checked={!h.closed}
                onChange={(v) => {
                  const hours = [...form.hours];
                  hours[i] = { ...hours[i], closed: !v };
                  set("hours", hours);
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Booking */}
      <SectionCard icon={<Calendar className="size-5" />} title="Booking rules">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Advance booking (days)"
            type="number"
            value={form.booking.advanceDays}
            onChange={(e) => set("booking", { ...form.booking, advanceDays: Number(e.target.value) })}
          />
          <Input
            label="Cancellation window (hrs)"
            type="number"
            value={form.booking.cancellationWindowHours}
            onChange={(e) => set("booking", { ...form.booking, cancellationWindowHours: Number(e.target.value) })}
          />
          <Input
            label="Buffer between (min)"
            type="number"
            value={form.booking.bufferMin}
            onChange={(e) => set("booking", { ...form.booking, bufferMin: Number(e.target.value) })}
          />
        </div>
        <div className="mt-4">
          <Switch
            label="Accept walk-ins"
            description="Allow customers to visit without booking"
            checked={form.booking.walkIns}
            onChange={(v) => set("booking", { ...form.booking, walkIns: v })}
          />
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon={<Bell className="size-5" />} title="Notification channels">
        <div className="space-y-4">
          <Switch label="Email" description="Send booking emails" checked={form.notifications.email} onChange={(v) => set("notifications", { ...form.notifications, email: v })} />
          <Switch label="SMS" description="Text reminders" checked={form.notifications.sms} onChange={(v) => set("notifications", { ...form.notifications, sms: v })} />
          <Switch label="WhatsApp" description="WhatsApp reminders" checked={form.notifications.whatsapp} onChange={(v) => set("notifications", { ...form.notifications, whatsapp: v })} />
        </div>
      </SectionCard>

      {/* Social */}
      <SectionCard icon={<Share2 className="size-5" />} title="Social links">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Instagram" value={form.social.instagram} onChange={(e) => set("social", { ...form.social, instagram: e.target.value })} />
          <Input label="TikTok" value={form.social.tiktok} onChange={(e) => set("social", { ...form.social, tiktok: e.target.value })} />
          <Input label="Facebook" value={form.social.facebook} onChange={(e) => set("social", { ...form.social, facebook: e.target.value })} />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button leftIcon={<Save className="size-4" />} onClick={save}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
