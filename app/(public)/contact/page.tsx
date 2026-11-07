import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/core";
import { PageHeader, Reveal } from "@/components/common";
import { ContactForm } from "@/components/contact/ContactForm";
import { shopSettings } from "@/data";

export const metadata: Metadata = {
  title: "Contact & Studio Location",
  description: "Visit Muhammadi Studio downtown. Get directions, call, message on WhatsApp, or send an inquiry via Gmail SMTP.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact &amp; Studio Location"
        subtitle="Visit our office at Main Bazar, New Plaza, Shop No: 2, consult directly with Owner Atiq Butt, or send us an inquiry."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info + map */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Button href="https://maps.google.com" variant="secondary" leftIcon={<Navigation className="size-4" />}>
                Directions
              </Button>
              <Button href={`tel:${shopSettings.phone}`} variant="secondary" leftIcon={<Phone className="size-4" />}>
                Call Atiq Butt
              </Button>
              <Button href="https://wa.me/923137526305" variant="secondary" leftIcon={<MessageCircle className="size-4" />}>
                WhatsApp
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="rounded-2xl border border-border bg-card p-6">
                <MapPin className="mb-3 size-5 text-gold" />
                <h3 className="font-semibold text-foreground">Studio Location</h3>
                <p className="mt-1 text-sm font-medium text-foreground">{shopSettings.address}</p>
                <p className="mt-2 text-sm text-gold font-semibold">📞 {shopSettings.phone}</p>
                <p className="text-xs text-muted mt-1">Owner: Atiq Butt</p>
                <p className="text-xs text-muted">{shopSettings.email}</p>
              </Reveal>
              <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-6">
                <Clock className="mb-3 size-5 text-gold" />
                <h3 className="font-semibold text-foreground">Studio Hours</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {shopSettings.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3">
                      <span className="text-muted">{h.day.slice(0, 3)}</span>
                      <span className="text-foreground">
                        {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Muhammadi Studio location"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=media+city+photography+studio&output=embed"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="heading text-2xl text-foreground">Send an Inquiry</h2>
              <span className="flex items-center gap-1.5 text-xs text-gold">
                <Mail className="size-3.5" /> Gmail SMTP Connected
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
