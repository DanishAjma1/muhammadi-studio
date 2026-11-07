import type { Metadata } from "next";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/core";
import { CTABand, InstagramIcon, PageHeader, Reveal } from "@/components/common";
import { gallery, shopSettings } from "@/data";

export const metadata: Metadata = {
  title: "Instagram Portfolio",
  description: "Follow the craft — behind-the-scenes cinema rigs, wedding movie trailers, and fine-art portraits on Instagram.",
};

export default function SocialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Follow the Craft"
        title={shopSettings.social.instagram}
        subtitle="We post 4K film trailers, camera rig breakdowns, and bridal portraits daily. Follow us to explore our latest shoots."
        align="center"
      >
        <Button href="https://instagram.com" leftIcon={<InstagramIcon className="size-5" />} size="lg">
          Follow @muhammadistudio
        </Button>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.06}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 300px"
                />
                <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                    <Heart className="size-4 fill-white" /> {240 + i * 19}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                    <MessageCircle className="size-4" /> {18 + i * 2}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <CTABand />
    </>
  );
}
