import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/common/Icons";
import { Badge, Button, StarRating } from "@/components/core";
import { CTABand, Reveal } from "@/components/common";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { barbers, reviews } from "@/data";

export function generateStaticParams() {
  return barbers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const barber = barbers.find((b) => b.slug === slug);
  return {
    title: barber ? `${barber.name} — ${barber.title}` : "Artist Profile",
    description: barber?.bio,
  };
}

export default async function CinematographerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const barber = barbers.find((b) => b.slug === slug);
  if (!barber) notFound();

  const barberReviews = reviews.filter((r) => r.barberId === barber.id);

  return (
    <>
      {/* Cover */}
      <header className="relative h-[42vh] min-h-72 overflow-hidden">
        <Image src={barber.cover} alt={barber.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Identity */}
        <div className="-mt-20 flex flex-col gap-6 sm:-mt-24 sm:flex-row sm:items-end">
          <div className="relative size-36 shrink-0 overflow-hidden rounded-3xl border-4 border-background bg-card sm:size-44">
            <Image src={barber.avatar} alt={barber.name} fill className="object-cover" sizes="176px" />
          </div>
          <div className="flex-1 pb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{barber.title}</p>
            <h1 className="heading mt-1 text-4xl text-foreground sm:text-5xl">{barber.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <StarRating rating={barber.rating} size={15} /> {barber.rating} ({barber.reviewsCount} reviews)
              </span>
              <span>{barber.experienceYears} years in cinema &amp; photography</span>
              {barber.instagram && (
                <a href="https://instagram.com" className="flex items-center gap-1.5 hover:text-gold">
                  <InstagramIcon className="size-4" /> {barber.instagram}
                </a>
              )}
            </div>
          </div>
          <Button href={`/book?barber=${barber.id}`} size="lg" leftIcon={<Calendar className="size-5" />}>
            Book with {barber.name.split(" ")[0]}
          </Button>
        </div>

        {/* Detail grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="heading text-2xl text-foreground">Artistic Bio &amp; Direction</h2>
            <p className="mt-4 leading-relaxed text-muted text-base">{barber.bio}</p>

            <h3 className="heading mt-10 text-xl text-foreground">Specialties &amp; Expertise</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {barber.specialties.map((s) => (
                <Badge key={s} variant="gold" className="px-3 py-1">
                  <CheckCircle2 className="size-3.5" /> {s}
                </Badge>
              ))}
            </div>

            <h3 className="heading mt-10 text-xl text-foreground">Selected Work &amp; Film Frames</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {barber.gallery.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <Image src={src} alt="Recent Film Still" fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="200px" />
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <Clock className="size-4 text-gold" /> Production Availability
              </h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Available Days</span>
                  <span className="text-foreground">{barber.workingDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shoot Hours</span>
                  <span className="text-foreground">{barber.workingHours}</span>
                </div>
              </div>
              <Button href={`/book?barber=${barber.id}`} fullWidth className="mt-5">
                Check Open Dates
              </Button>
            </div>
          </aside>
        </div>

        {/* Reviews */}
        {barberReviews.length > 0 && (
          <div className="mt-16">
            <h2 className="heading text-2xl text-foreground">Client Reviews for {barber.name}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {barberReviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.08}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <CTABand />
    </>
  );
}
