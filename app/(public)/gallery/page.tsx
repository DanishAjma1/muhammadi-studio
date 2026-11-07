import type { Metadata } from "next";
import { CTABand, PageHeader } from "@/components/common";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { gallery } from "@/data";

export const metadata: Metadata = {
  title: "Visual Portfolio & Film Stills",
  description: "Explore cinematic wedding films, royal bridal portraits, fashion editorial, and commercial campaigns by Muhammadi Studio.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Portfolio"
        title="Visual Poetry in Stills &amp; Motion"
        subtitle="Real productions for real clients. Filter by category and tap any shot to inspect in high resolution."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <GalleryGrid items={gallery} />
      </div>
      <CTABand />
    </>
  );
}
