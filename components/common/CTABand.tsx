import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@/components/core";
import { img } from "@/data";
import { Reveal } from "./Reveal";

/** The recurring "ready to book?" banner used across marketing pages. */
export function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img.ctaBanner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
          <div className="relative flex flex-col gap-6 px-6 py-14 sm:px-12 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">Muhammadi Studio Production</p>
              <h2 className="heading text-3xl text-foreground sm:text-4xl md:text-5xl">
                Capture the extraordinary. <span className="text-gradient-gold">Reserve your date now.</span>
              </h2>
              <p className="mt-4 text-muted">
                Choose your signature cinema package or photography session, select your Lead Director (Attiq Butt / Muhammad Usman), and book online with instant notification.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="/book" size="lg" leftIcon={<CalendarCheck className="size-5" />}>
                Book Shoot Session
              </Button>
              <Button href="/contact" size="lg" variant="outline" leftIcon={<Phone className="size-5" />}>
                Contact Studio
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
