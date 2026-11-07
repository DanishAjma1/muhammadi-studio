"use client";

import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button, Input, Select, TextArea, useToast } from "@/components/core";
import { services } from "@/data";

const topicOptions = [
  { label: "General Production Enquiry", value: "General Enquiry" },
  { label: "Wedding Film & Photography Package", value: "Wedding Cinema & Photo" },
  { label: "Commercial Brand Video / Ad Campaign", value: "Commercial Brand Film" },
  { label: "Studio Portrait & Executive Headshots", value: "Studio Portraits" },
  { label: "Music Video Production", value: "Music Video" },
  { label: "Drone & Aerial 4K Coverage", value: "Drone Cinematography" },
  ...services.map((s) => ({ label: s.name, value: s.name })),
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState<string | null>("General Enquiry");
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const toast = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          topic: topic ?? "General Enquiry",
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to deliver message via SMTP");
      }

      setSentSuccess(true);
      setForm({ name: "", email: "", message: "" });

      if (data.simulated) {
        toast.success(
          "Inquiry logged! (SMTP in simulation mode — add GMAIL_USER & GMAIL_APP_PASSWORD to .env.local for live Gmail sending)",
          "Received!"
        );
      } else {
        toast.success("Gmail notification delivered to Attiq Butt & team!", "Message Dispatched");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      {sentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-gold">
          <CheckCircle2 className="size-5 shrink-0" />
          <span>
            Thank you! Your inquiry was dispatched to <strong>Attiq Butt</strong> and the Muhammadi Studio team. We&apos;ll be in touch shortly.
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Your Name"
          placeholder="e.g. Sarah Khan"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="sarah@example.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>

      <Select label="Project / Shoot Interest" options={topicOptions} value={topic} onChange={setTopic} />

      <TextArea
        label="Shoot Details & Vision"
        rows={5}
        placeholder="Tell us about your date, venue, style preference, or commercial goals..."
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />

      <div className="pt-2">
        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="lg"
          leftIcon={<Send className="size-4" />}
        >
          Send Inquiry (Gmail SMTP)
        </Button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted pt-1">
        <Sparkles className="size-3 text-gold" />
        Instant Gmail notification delivered directly to our production team
      </p>
    </form>
  );
}
