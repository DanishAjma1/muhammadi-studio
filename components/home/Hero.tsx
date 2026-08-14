"use client";

import { motion } from "motion/react";
import { CalendarCheck, Scissors, Star } from "lucide-react";
import { Button } from "@/components/core";
import { avatar, img, shopStats } from "@/data";
import { formatCompact } from "@/lib/utils";

const clients = [avatar(11), avatar(13), avatar(14), avatar(15)];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img.heroPrimary})` }}
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pt-28 pb-16 sm:px-6"
      >
        <motion.div variants={item} className="mb-5 flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium tracking-widest text-gold">
            <Scissors className="size-3.5" /> EST. 2014
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="heading max-w-3xl text-5xl uppercase leading-[0.95] text-foreground sm:text-7xl lg:text-8xl"
        >
          Your Style.
          <br />
          <span className="text-gradient-gold">Our Craft.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Premium grooming for the modern gentleman. Sharp cuts, clean fades and timeless styling
          in the heart of downtown.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg" leftIcon={<CalendarCheck className="size-5" />}>
            Book Appointment
          </Button>
          <Button href="/services" size="lg" variant="outline">
            View Services
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 text-gold" fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{shopStats.rating}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {clients.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="size-8 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              <span className="font-semibold text-foreground">{formatCompact(shopStats.clients)}+</span>{" "}
              happy clients
            </span>
          </div>
          <div className="text-sm text-muted">
            <span className="font-semibold text-foreground">{shopStats.yearsExperience}+</span> years
            experience
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
