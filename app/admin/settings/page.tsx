"use client";

import { Bell, Calendar, CheckCircle2, Clock, Mail, Save, Send, Share2, ShieldAlert, Store } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [smtpStatus, setSmtpStatus] = useState<{ configured?: boolean; recipientEmail?: string } | null>(null);
  const [testingSmtp, setTestingSmtp] = useState(false);

  useEffect(() => {
    fetch("/api/test-email")
      .then((res) => res.json())
      .then(setSmtpStatus)
      .catch(() => null);
  }, []);

  const set = <K extends keyof ShopSettings>(key: K, value: ShopSettings[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = () => {
    updateSettings(form);
    toast.success("Studio settings saved successfully.");
  };

  const runTestEmail = async () => {
    setTestingSmtp(true);
    try {
      const res = await fetch("/api/test-email", { method: "POST" });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        toast.error(data.message || data.error || "SMTP test failed. Check .env.local.");
      } else {
        toast.success(
          data.simulated
            ? "SMTP simulated successfully! (Configure GMAIL_USER & GMAIL_APP_PASSWORD in .env.local for live Gmail sending)"
            : "Test email dispatched successfully via Gmail SMTP!",
          "SMTP Status Verified"
        );
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to reach SMTP test endpoint.";
      toast.error(errorMsg);
    } finally {
      setTestingSmtp(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-2xl text-foreground">Studio Settings</h1>
          <p className="text-sm text-muted">Manage Muhammadi Studio configuration and SMTP notifications.</p>
        </div>
        <Button leftIcon={<Save className="size-4" />} onClick={save}>
          Save changes
        </Button>
      </div>

      {/* Gmail SMTP Configuration Card */}
      <SectionCard
        icon={<Mail className="size-5" />}
        title="Gmail Notification System (SMTP)"
        description="Google SMTP credentials configured for inquiries and booking confirmations."
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-secondary p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Google Gmail SMTP</span>
                  {smtpStatus?.configured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                      <CheckCircle2 className="size-3.5" /> Active &amp; Configured
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning">
                      <ShieldAlert className="size-3.5" /> Simulation / Fallback Mode
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted">
                  Host: <code className="text-gold">smtp.gmail.com:465</code> (SSL Secure) · Recipient:{" "}
                  <code className="text-foreground">{smtpStatus?.recipientEmail || "attiq@muhammadistudio.com"}</code>
                </p>
              </div>

              <Button
                size="sm"
                variant="secondary"
                loading={testingSmtp}
                leftIcon={<Send className="size-3.5" />}
                onClick={runTestEmail}
              >
                Send Test Gmail Notification
              </Button>
            </div>

            <div className="mt-4 border-t border-border/70 pt-3 text-xs leading-relaxed text-muted">
              <strong className="text-foreground">Setup Instructions:</strong> In your{" "}
              <code className="text-gold">.env.local</code> file, set{" "}
              <code className="text-gold">GMAIL_USER=your_email@gmail.com</code> and{" "}
              <code className="text-gold">GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx</code> (generated from Google Account &gt; Security &gt; 2-Step Verification &gt; App Passwords).
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Studio details */}
      <SectionCard icon={<Store className="size-5" />} title="Studio Brand & Co-Founders">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Studio Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          <Input label="Tagline" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          <Input label="Co-Founder" value={form.coFounder || "Attiq Butt"} onChange={(e) => set("coFounder", e.target.value)} />
          <Input label="Founder" value={form.founder || "Muhammad Usman"} onChange={(e) => set("founder", e.target.value)} />
          <Input label="Studio Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          <Input label="Inquiry Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          <Input label="WhatsApp Direct" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          <Input label="Physical Address" value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
      </SectionCard>

      {/* Hours */}
      <SectionCard icon={<Clock className="size-5" />} title="Studio Shoot Hours">
        <div className="space-y-2">
          {form.hours.map((h, i) => (
            <div key={h.day} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary p-3">
              <span className="w-24 text-sm font-medium text-foreground">{h.day}</span>
              {h.closed ? (
                <span className="flex-1 text-sm text-muted">Closed for shoots</span>
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
      <SectionCard icon={<Calendar className="size-5" />} title="Shoot Reservation Rules">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Advance Booking (days)"
            type="number"
            value={form.booking.advanceDays}
            onChange={(e) => set("booking", { ...form.booking, advanceDays: Number(e.target.value) })}
          />
          <Input
            label="Reschedule Window (hrs)"
            type="number"
            value={form.booking.cancellationWindowHours}
            onChange={(e) => set("booking", { ...form.booking, cancellationWindowHours: Number(e.target.value) })}
          />
          <Input
            label="Buffer Between Shoots (min)"
            type="number"
            value={form.booking.bufferMin}
            onChange={(e) => set("booking", { ...form.booking, bufferMin: Number(e.target.value) })}
          />
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon={<Bell className="size-5" />} title="Active Notification Channels">
        <div className="space-y-4">
          <Switch label="Gmail SMTP Notifications" description="Send instant email alerts to studio admin and client" checked={form.notifications.email} onChange={(v) => set("notifications", { ...form.notifications, email: v })} />
          <Switch label="SMS Text Notifications" description="Dispatch automated shoot call-time reminders" checked={form.notifications.sms} onChange={(v) => set("notifications", { ...form.notifications, sms: v })} />
          <Switch label="WhatsApp Updates" description="Send client gallery previews via WhatsApp" checked={form.notifications.whatsapp} onChange={(v) => set("notifications", { ...form.notifications, whatsapp: v })} />
        </div>
      </SectionCard>

      {/* Social */}
      <SectionCard icon={<Share2 className="size-5" />} title="Social Portfolio Links">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Instagram Handle" value={form.social.instagram} onChange={(e) => set("social", { ...form.social, instagram: e.target.value })} />
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
