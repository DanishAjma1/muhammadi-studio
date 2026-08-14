import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Scissors, Sparkles } from "lucide-react";
import { CTABand, PageHeader, Reveal, SectionHeading } from "@/components/common";
import { img, shopStats } from "@/data";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "More than a haircut — confidence, craftsmanship and community since 2014.",
};

const values = [
  { icon: Scissors, title: "Craftsmanship", text: "Every cut is a discipline. We sweat the details so you walk out sharp." },
  { icon: Heart, title: "Community", text: "A chair, a conversation, a familiar face. We're a fixture of the neighbourhood." },
  { icon: Sparkles, title: "Premium feel", text: "Hot towels, quality products and an atmosphere built to help you unwind." },
  { icon: Award, title: "Experience", text: "A team with decades of combined experience across every style." },
];

const timeline = [
  { year: "2014", text: "Opened our doors with a single chair and a big vision." },
  { year: "2018", text: "Grew to a four-chair shop and welcomed our master barbers." },
  { year: "2022", text: "Crossed 4,000 loyal clients and a 4.9★ rating." },
  { year: "2026", text: "Launched online booking — sharp cuts, now a tap away." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={<>More than a haircut.</>}
        subtitle="We're about confidence, craftsmanship and community. Here's how it started."
        image={img.aboutCraft}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image src={img.aboutShop} alt="Our shop" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Since 2014"
            title="Built on a simple belief"
            subtitle="A great haircut changes how you carry yourself. We've spent over a decade perfecting that feeling — one client, one cut at a time."
          />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: `${shopStats.yearsExperience}+`, label: "Years" },
              { value: `${formatCompact(shopStats.clients)}+`, label: "Clients" },
              { value: `${shopStats.rating}★`, label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="heading text-2xl text-gold">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading align="center" eyebrow="What we stand for" title="Our values" className="mb-12" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading align="center" eyebrow="The journey" title="How we got here" className="mb-12" />
        <div className="relative space-y-8 border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08} className="relative">
              <span className="absolute -left-[38px] flex size-5 items-center justify-center rounded-full border-2 border-gold bg-background">
                <span className="size-1.5 rounded-full bg-gold" />
              </span>
              <p className="heading text-xl text-gold">{t.year}</p>
              <p className="mt-1 text-muted">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
