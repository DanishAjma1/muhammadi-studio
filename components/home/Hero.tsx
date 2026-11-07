"use client";

import { motion } from "motion/react";
import {
  CalendarCheck,
  CheckCircle2,
  Film,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/core";
import { shopSettings } from "@/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#090909]">
      {/* Background with luxury golden lighting atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
        style={{ backgroundImage: "url(/images/setup-lighting.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
      <div className="hero-vignette absolute inset-0" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pt-12 pb-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
      >
        {/* Left Column: Hero Content */}
        <div className="max-w-2xl">
          <motion.div variants={item} className="mb-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
              <Sparkles className="size-3.5" /> Event Management
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white">
              👑 Owner: <strong>Atiq Butt</strong>
            </span>
          </motion.div>

          <motion.p variants={item} className="text-sm font-semibold italic text-gold/90 sm:text-base">
            &quot;Dream It... We Plan It... You Enjoy It...&quot;
          </motion.p>

          <motion.h1
            variants={item}
            className="heading mt-2 text-4xl font-extrabold uppercase leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
          >
            We Make Your Event <br />
            <span className="text-gradient-gold">Unforgettable!</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Complete event arrangement for every occasion. From cinema-grade <strong>Movie Setups</strong>, 4K <strong>Studio Photography</strong>, royal <strong>Event Decoration</strong>, and concert-grade <strong>Lighting Setups</strong> for Weddings (Barat &amp; Walima), Mehndi, Mangni, and Birthdays across Pakistan.
          </motion.p>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1 text-gold font-medium">
              <CheckCircle2 className="size-4" /> Multi-Function Booking
            </span>
            <span className="flex items-center gap-1 text-gold font-medium">
              <CheckCircle2 className="size-4" /> Admin Email Confirmation
            </span>
            <span className="flex items-center gap-1 text-gold font-medium">
              <CheckCircle2 className="size-4" /> Customized Setup Quotes
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/book" size="lg" leftIcon={<CalendarCheck className="size-5" />}>
              Book Event Arrangements
            </Button>
            <Button href="tel:03137526305" size="lg" variant="outline" leftIcon={<Phone className="size-5" />}>
              Call Atiq Butt: 0313-7526305
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-5 flex items-center gap-2 text-xs text-muted">
            <MapPin className="size-4 text-gold shrink-0" />
            <span>Studio Office: <strong>Main Bazar, New Plaza, Shop No: 2, Pakistan</strong></span>
          </motion.div>
        </div>

        {/* Right Column: Visual Card with Atiq Butt & The 4 Setups */}
        <motion.div variants={item} className="mt-10 lg:mt-0 lg:w-[460px] shrink-0">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 bg-gradient-to-b from-secondary to-card p-5 shadow-2xl ring-1 ring-gold/20">
            {/* Top banner tag */}
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Complete Event Arrangement</p>
                <h3 className="heading text-lg font-bold text-white">For Every Occasion</h3>
              </div>
              <span className="rounded-full bg-gold/15 border border-gold/40 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                Muhammadi Studio
              </span>
            </div>

            {/* Atiq Butt Feature Badge */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border/80 bg-background/80 p-3 backdrop-blur">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-gold shadow-md">
                <Image
                  src="/images/atiq-butt.jpg"
                  alt="Atiq Butt - Owner"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Studio Owner</span>
                <h4 className="heading text-base font-bold text-white leading-tight">Atiq Butt</h4>
                <p className="text-xs text-muted">Direct: 0313-7526305</p>
              </div>
              <div className="ml-auto">
                <Button href="https://wa.me/923137526305" size="sm" variant="secondary">
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* 4 Core Setups Grid */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Our 4 Core Setups:</p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: "Movie Setup", sub: "Cinema Like Experience", img: "/images/setup-movie.jpg" },
                  { name: "Studio Setup", sub: "4K Photography & Video", img: "/images/setup-studio.jpg" },
                  { name: "Event Decoration", sub: "Unique Pakistani Decor", img: "/images/setup-decor.jpg" },
                  { name: "Lighting Setup", sub: "Stunning Lighting Effects", img: "/images/setup-lighting.jpg" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/90 p-2">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-gold/30">
                      <Image src={s.img} alt={s.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-foreground">{s.name}</p>
                      <p className="truncate text-[10px] text-gold">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan ribbon */}
            <div className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-2.5 text-center">
              <p className="text-xs font-semibold text-gold">
                &quot;Your Event, Our Responsibility, Memories Forever! ❤️&quot;
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
