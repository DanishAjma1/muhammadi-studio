import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Star, Users } from "lucide-react";
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
  googleRating,
  img,
  reviews,
  services,
  shopStats,
} from "@/data";
import { formatCompact } from "@/lib/utils";

export default function LandingPage() {
  const popular = services.filter((s) => s.popular).slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            title="Signature services"
            subtitle="Precision cuts and premium grooming, priced honestly. Every service is booked in seconds."
          />
          <Button href="/services" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
            View all services
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <ServiceCard service={s} featured={s.category === "package"} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
            <Image src={img.aboutShop} alt="Inside the shop" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="More than a haircut"
              title={<>We&apos;re about confidence, craftsmanship &amp; community.</>}
              subtitle="Since 2014, we&apos;ve helped thousands of gentlemen look and feel their best. Skilled barbers, premium products, and an atmosphere built for you to unwind."
            />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Award, value: `${shopStats.yearsExperience}+`, label: "Years" },
                { icon: Users, value: `${formatCompact(shopStats.clients)}+`, label: "Clients" },
                { icon: Star, value: `${shopStats.rating}★`, label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                  <stat.icon className="mx-auto mb-2 size-5 text-gold" />
                  <p className="heading text-2xl text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <Button href="/about" className="mt-8" variant="secondary" rightIcon={<ArrowRight className="size-4" />}>
              Our story
            </Button>
          </div>
        </div>
      </section>

      {/* Barbers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="The team" title="Meet the barbers" subtitle="Master craftsmen, each with their own signature style." />
          <Button href="/barbers" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
            All barbers
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

      {/* Gallery */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The work" title="Fresh from the chair" subtitle="A look at the cuts, fades and beard work walking out our door." />
            <Button href="/gallery" variant="ghost" rightIcon={<ArrowRight className="size-4" />}>
              Full gallery
            </Button>
          </div>
          <GalleryGrid items={gallery.slice(0, 8)} filterable={false} />
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading align="center" eyebrow="Reviews" title="What our clients say" className="mb-12" />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredReviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 flex max-w-md items-center justify-center gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/5">
            <span className="heading text-lg text-gold">G</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted">Google Rating</p>
            <p className="flex items-center gap-2 text-lg font-semibold text-foreground">
              {googleRating.score} / 5
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 text-gold" fill="currentColor" />
                ))}
              </span>
            </p>
          </div>
          <Link href="/reviews" className="text-sm font-medium text-gold hover:underline">
            {formatCompact(googleRating.count)} reviews
          </Link>
        </Reveal>
      </section>

      <InstagramStrip />
      <CTABand />
    </>
  );
}
