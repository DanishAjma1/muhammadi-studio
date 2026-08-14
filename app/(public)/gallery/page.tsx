import type { Metadata } from "next";
import { CTABand, PageHeader } from "@/components/common";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { gallery } from "@/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at the cuts, fades, beard work and styling from our chairs.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The work"
        title="Gallery"
        subtitle="Real cuts from real clients. Filter by style and tap any shot to view it larger."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <GalleryGrid items={gallery} />
      </div>
      <CTABand />
    </>
  );
}
