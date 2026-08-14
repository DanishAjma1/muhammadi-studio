"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button, Input, Select, TextArea, useToast } from "@/components/core";
import { services } from "@/data";

const topicOptions = [
  { label: "General enquiry", value: "general" },
  { label: "Booking help", value: "booking" },
  ...services.slice(0, 4).map((s) => ({ label: s.name, value: s.id })),
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState<string | null>("general");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent — we'll get back to you shortly.", "Thanks!");
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <Select label="Topic" options={topicOptions} value={topic} onChange={setTopic} />
      <TextArea
        label="Message"
        rows={5}
        placeholder="How can we help?"
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />
      <Button type="submit" loading={loading} fullWidth size="lg" leftIcon={<Send className="size-4" />}>
        Send message
      </Button>
    </form>
  );
}
