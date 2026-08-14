import type { Metadata } from "next";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { BarberCard } from "@/components/barbers/BarberCard";
import { barbers, img } from "@/data";

export const metadata: Metadata = {
  title: "Barbers",
  description: "Meet our team of master barbers, each with their own signature style.",
};

export default function BarbersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="Meet the barbers"
        subtitle="Master craftsmen with a combined 35+ years behind the chair. Find your barber and book directly."
        image={img.heroPrimary}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
