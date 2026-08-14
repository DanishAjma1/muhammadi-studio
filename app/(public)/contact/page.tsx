import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/core";
import { PageHeader, Reveal } from "@/components/common";
import { ContactForm } from "@/components/contact/ContactForm";
import { shopSettings } from "@/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit us downtown. Get directions, call, or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Come see us"
        title="Contact & location"
        subtitle="Walk in or book ahead. We're in the heart of downtown, open seven days a week."
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
                Call us
              </Button>
              <Button href="https://wa.me/15551002014" variant="secondary" leftIcon={<MessageCircle className="size-4" />}>
                WhatsApp
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="rounded-2xl border border-border bg-card p-6">
                <MapPin className="mb-3 size-5 text-gold" />
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="mt-1 text-sm text-muted">{shopSettings.address}</p>
                <p className="mt-3 text-sm text-muted">{shopSettings.phone}</p>
                <p className="text-sm text-muted">{shopSettings.email}</p>
              </Reveal>
              <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-6">
                <Clock className="mb-3 size-5 text-gold" />
                <h3 className="font-semibold text-foreground">Opening hours</h3>
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
                title="Shop location"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=downtown+barber+shop&output=embed"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="heading mb-5 text-2xl text-foreground">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
