import type { Metadata } from "next";
import Image from "next/image";
import { Award, Clapperboard, Heart, Sparkles } from "lucide-react";
import { CTABand, PageHeader, Reveal, SectionHeading } from "@/components/common";
import { img, shopStats } from "@/data";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Muhammadi Studio — Co-Founder Attiq Butt and Founder Muhammad Usman. High-end photography and cinema production.",
};

const values = [
  { icon: Clapperboard, title: "Cinema Grade Craft", text: "We shoot with cinema camera rigs, Zeiss prime lenses, and broadcast wireless audio to ensure every frame belongs on the big screen." },
  { icon: Heart, title: "Emotive Storytelling", text: "A great movie captures soul. We preserve genuine laughter, quiet tears, and authentic human chemistry without artificial staging." },
  { icon: Sparkles, title: "DaVinci Color Grading", text: "Every project receives an individualized color grading pass inspired by classic 35mm film stocks and natural warm skin tones." },
  { icon: Award, title: "Heirloom Quality", text: "From 4K HDR digital deliveries to handcrafted Italian velvet albums, our work is designed to endure for generations." },
];

const timeline = [
  { year: "2012", text: "Founded by Muhammad Usman with a focused mission in luxury bridal photography and fine art portraiture." },
  { year: "2016", text: "Welcomed Attiq Butt as Co-Founder & Director of Cinematography, launching our narrative 4K wedding film and movie production unit." },
  { year: "2021", text: "Expanded to Studio 4 in Media City with an indoor cyclorama, commercial soundstage, and licensed aerial drone operations." },
  { year: "2026", text: "Crossed 1,800+ wedding films and commercial productions worldwide with seamless digital booking and Gmail SMTP client alerts." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={<>Cinematic Vision. Timeless Stories.</>}
        subtitle="Founded by Muhammad Usman and co-founded by Attiq Butt — we are a boutique cinematography and photography studio dedicated to visual perfection."
        image={img.aboutCraft}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image src={img.aboutShop} alt="Muhammadi Studio Set" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="The Muhammadi Legacy"
            title="The Vision Behind the Lens"
            subtitle="At Muhammadi Studio, Co-Founder Attiq Butt and Founder Muhammad Usman unite two creative worlds: master still portraiture and big-screen cinema. Every wedding, commercial, and portrait session is approached with directorial finesse, ensuring your story is immortalized with timeless sophistication."
          />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: `${shopStats.yearsExperience}+`, label: "Years Experience" },
              { value: `${formatCompact(shopStats.clients)}+`, label: "Happy Clients" },
              { value: `${shopStats.rating}★`, label: "Client Rating" },
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
          <SectionHeading align="center" eyebrow="Our Philosophy" title="What Defines Our Work" className="mb-12" />
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
        <SectionHeading align="center" eyebrow="The Journey" title="A Decade of Cinematic Milestones" className="mb-12" />
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
