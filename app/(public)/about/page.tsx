import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Sparkles, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/core";
import { CTABand, PageHeader, Reveal, SectionHeading } from "@/components/common";
import { shopSettings, shopStats } from "@/data";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Muhammadi Studio & Event Management",
  description: "Muhammadi Studio & Event Management — Owned and directed by Atiq Butt. Located at Main Bazar, New Plaza, Shop No: 2.",
};

const values = [
  { icon: Sparkles, title: "Movie Setup & Cinema", text: "Big-screen cinema setups, giant projector screens, and outdoor movie nights with surround audio for celebrations and ceremonies." },
  { icon: CheckCircle2, title: "Studio Setup & 4K Shoots", text: "Professional mobile and in-studio photography and video shoots with calibrated studio strobes and prime cinema optics." },
  { icon: Heart, title: "Royal Event Decoration", text: "Unique Pakistani stage decorations, fresh and silk floral walkthroughs, royal bridal sofas, chandeliers, and customized theme decor." },
  { icon: Award, title: "Stunning Lighting Systems", text: "Concert and marquee-grade atmospheric lighting with intelligent moving beam heads, stage trusses, and fairy light canopies." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Muhammadi Studio &amp; Event Management"
        title={<>Dream It... We Plan It... You Enjoy It!</>}
        subtitle="Owned and directed by Atiq Butt. We provide complete event arrangements for every occasion — from royal weddings and Mehndi nights to corporate galas and birthdays."
        image="/images/setup-lighting.jpg"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-gold/40 shadow-xl">
          <Image src="/images/event-flyer.jpg" alt="Muhammadi Studio Event Management Banner" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Leadership &amp; Vision · Owner: Atiq Butt"
            title="We Make Your Event Unforgettable!"
            subtitle="Whether it's a wedding, birthday, engagement, corporate event or any special occasion, we are here to turn your dreams into reality. Headquartered at Main Bazar, New Plaza, Shop No: 2, our team coordinates full event architecture, cinema-grade movie setups, high-fashion photography, and breathtaking lighting."
          />

          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-gold shadow-md">
              <Image src="/images/atiq-butt.jpg" alt="Atiq Butt" fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-gold">Owner &amp; Lead Event Director</span>
              <h4 className="heading text-lg font-bold text-foreground">Atiq Butt</h4>
              <p className="text-xs text-muted">Direct Helpline: 0313-7526305</p>
            </div>
            <div className="ml-auto">
              <Button href="tel:03137526305" size="sm" variant="secondary" leftIcon={<Phone className="size-3.5" />}>
                Call
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: `${shopStats.yearsExperience}+`, label: "Years Experience" },
              { value: `${formatCompact(shopStats.clients)}+`, label: "Events Arranged" },
              { value: `${shopStats.rating}★`, label: "Client Rating" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="heading text-xl text-gold">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted">
            <MapPin className="size-4 text-gold shrink-0" />
            <span>Studio Office: <strong>Main Bazar, New Plaza, Shop No: 2, Pakistan</strong></span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Complete Arrangement"
            title="Our Four Specialized Production Pillars"
            subtitle="Everything needed for a grand, flawless celebration under one roof."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-2xl border border-border bg-card p-6">
                <v.icon className="mb-4 size-6 text-gold" />
                <h3 className="heading text-lg text-foreground">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
