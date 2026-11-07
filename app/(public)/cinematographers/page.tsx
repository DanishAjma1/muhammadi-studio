import type { Metadata } from "next";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { BarberCard } from "@/components/barbers/BarberCard";
import { barbers, img } from "@/data";

export const metadata: Metadata = {
  title: "Cinematographers & Master Photographers",
  description: "Meet the directors, cinematographers, and photographers of Muhammadi Studio, led by Co-Founder Attiq Butt.",
};

export default function CinematographersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Creative Team"
        title="Directors &amp; Master Photographers"
        subtitle="Led by Co-Founder Attiq Butt and Founder Muhammad Usman, our team brings together award-winning cinematographers, licensed drone pilots, and editorial colorists."
        image={img.heroPrimary}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06}>
              <BarberCard barber={b} />
            </Reveal>
          ))}
        </div>
      </div>
      <CTABand />
    </>
  );
}
