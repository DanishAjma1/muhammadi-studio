import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Film, Heart, MapPin, Phone, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/core";
import { CTABand, Reveal, SectionHeading } from "@/components/common";
import { Hero } from "@/components/home/Hero";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { ServiceCard } from "@/components/services/ServiceCard";
import { BarberCard } from "@/components/barbers/BarberCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import {
  barbers,
  gallery,
  reviews,
  services,
  shopSettings,
  shopStats,
} from "@/data";
import { formatCompact } from "@/lib/utils";

export default function LandingPage() {
  const coreSetups = services.filter((s) => s.category === "setup");
  const occasions = services.filter((s) => s.category === "function").slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <>
      <Hero />

      {/* The 4 Core Production Setups (From Flyer) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Specialized Setups"
            title="Our 4 Core Production Setups"
            subtitle="Featuring Movie Setup (Cinema Like Experience), Studio Setup (4K Shoots), Event Decoration, and Stunning Lighting Effects."
          />
          <Button href="/services" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
            Explore all setups
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreSetups.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <ServiceCard service={s} featured={true} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Occasions / Complete Event Arrangements (From Flyer) */}
      <section className="border-t border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="For Every Occasion"
              title="Complete Event Arrangement"
              subtitle="Whether it's a wedding, birthday, engagement, corporate event or any special occasion, we turn your dreams into reality without fixed generic pricing."
            />
            <Button href="/book" variant="primary" rightIcon={<ArrowRight className="size-4" />}>
              Book Multiple Functions
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <ServiceCard service={s} featured={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Atiq Butt & Muhammadi Studio */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl">
            <Image src="/images/event-flyer.jpg" alt="Muhammadi Studio Banner" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Owner &amp; Event Architect · Atiq Butt"
              title={<>Your Event, Our Responsibility, Memories Forever! ❤️</>}
              subtitle="At Muhammadi Studio &amp; Event Management, we eliminate the stress of planning. With comprehensive multi-function coordination, cinematic 4K camera teams, luxury floral decor, and responsive Gmail email confirmations upon approval, your milestone celebration is executed with flawless perfection."
            />

            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-gold shadow-md">
                <Image src="/images/atiq-butt.jpg" alt="Atiq Butt" fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0">
                <span className="text-xs uppercase font-bold text-gold">Owner &amp; Event Manager</span>
                <h4 className="heading text-lg font-bold text-foreground">Atiq Butt</h4>
                <p className="text-xs text-muted">Helpline: 0313-7526305</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button href="tel:03137526305" size="sm" variant="secondary" leftIcon={<Phone className="size-3.5" />}>
                  Call
                </Button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Award, value: `${shopStats.yearsExperience}+`, label: "Years Experience" },
                { icon: Users, value: `${formatCompact(shopStats.clients)}+`, label: "Events Arranged" },
                { icon: Star, value: `${shopStats.rating}★`, label: "Client Rating" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <stat.icon className="mx-auto mb-2 size-5 text-gold" />
                  <p className="heading text-xl text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <MapPin className="size-4 text-gold shrink-0" />
              <span>Office: <strong>Main Bazar, New Plaza, Shop No: 2, Pakistan</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Directors & Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Creative Direction"
            title="Meet Our Cinematographers &amp; Artists"
            subtitle="Led by Owner Atiq Butt, our crew of event managers, aerial drone pilots, and master photographers bring cinematic mastery to every shoot."
          />
          <Button href="/cinematographers" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
            All team members
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <BarberCard barber={b} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery / Event Decor */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Visual Portfolio"
              title="Recent Event Decor &amp; Film Stills"
              subtitle="A curated glimpse into our wedding stages, lighting trusses, movie setups, and candid photography."
            />
            <Button href="/gallery" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
              Full portfolio
            </Button>
          </div>
          <GalleryGrid items={gallery.slice(0, 8)} filterable={false} />
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading align="center" eyebrow="Testimonials" title="Words from Our Couples &amp; Event Hosts" className="mb-12" />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredReviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </section>

      <InstagramStrip />
      <CTABand />
    </>
  );
}
