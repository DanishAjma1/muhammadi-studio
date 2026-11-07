import type { Metadata } from "next";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { ServiceCard } from "@/components/services/ServiceCard";
import { img, services } from "@/data";

export const metadata: Metadata = {
  title: "Core Setups & Event Functions",
  description: "Explore our Movie Setup, Studio Setup, Event Decoration, Lighting Setup, and full event management for Weddings, Mehndi, Birthdays, and Corporate Galas.",
};

const groups = [
  {
    key: "setup",
    label: "Core Specialized Setups",
    description: "Movie Setup (Cinema Like Experience), Studio Setup (4K Shoots), Event Decoration & Lighting Systems.",
  },
  {
    key: "function",
    label: "Complete Event Arrangements for Every Occasion",
    description: "Weddings (Barat & Walima), Mehndi & Qawwali Nights, Mangni, Birthday Parties, and Corporate Events.",
  },
] as const;

export default function ServicesPage() {
  const active = services.filter((s) => s.active);

  return (
    <>
      <PageHeader
        eyebrow="Muhammadi Studio &amp; Event Management"
        title="Setups &amp; Event Arrangements"
        subtitle="Dream It... We Plan It... You Enjoy It! We turn your occasion into an unforgettable memory with custom quotes tailored to your venue and guest requirements."
        image={img.heroSecondary}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 sm:py-20">
        {groups.map((group) => {
          const items = active.filter((s) => s.category === group.key);
          if (!items.length) return null;
          return (
            <section key={group.key} id={group.key}>
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="heading text-2xl text-foreground sm:text-3xl">{group.label}</h2>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className="mt-2 text-sm text-muted">{group.description}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06}>
                    <ServiceCard service={s} featured={s.popular} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CTABand />
    </>
  );
}
