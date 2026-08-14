import type { Metadata } from "next";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { ServiceCard } from "@/components/services/ServiceCard";
import { img, services } from "@/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Haircuts, fades, beard styling, hot towel shaves and premium packages.",
};

const groups = [
  { key: "haircut", label: "Haircuts" },
  { key: "beard", label: "Beard" },
  { key: "shave", label: "Shaves" },
  { key: "package", label: "Packages" },
] as const;

export default function ServicesPage() {
  const active = services.filter((s) => s.active);
  return (
    <>
      <PageHeader
        eyebrow="Our menu"
        title="Services & pricing"
        subtitle="Honest pricing, no surprises. Pick a service and book your chair in seconds."
        image={img.heroSecondary}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 sm:py-20">
        {groups.map((group) => {
          const items = active.filter((s) => s.category === group.key);
          if (!items.length) return null;
          return (
            <section key={group.key}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="heading text-2xl text-foreground">{group.label}</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06}>
                    <ServiceCard service={s} featured={s.category === "package"} />
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
