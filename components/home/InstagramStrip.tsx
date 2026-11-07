import Image from "next/image";
import { InstagramIcon } from "@/components/common/Icons";
import { Button } from "@/components/core";
import { instagramFeed, shopSettings } from "@/data";

export function InstagramStrip() {
  const loop = [...instagramFeed, ...instagramFeed];
  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-14">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6">
        <div>
          <p className="eyebrow mb-2">Behind the Lens</p>
          <h2 className="heading text-2xl text-foreground sm:text-3xl">
            {shopSettings.social.instagram}
          </h2>
        </div>
        <Button
          href="https://instagram.com"
          variant="outline"
          leftIcon={<InstagramIcon className="size-4" />}
        >
          Follow Our Journey
        </Button>
      </div>

      <div className="relative flex gap-3">
        <div className="flex shrink-0 animate-marquee gap-3">
          {loop.map((src, i) => (
            <div
              key={i}
              className="relative size-40 shrink-0 overflow-hidden rounded-xl border border-border sm:size-48"
            >
              <Image src={src} alt="Muhammadi Studio Cinema Frame" fill className="object-cover" sizes="192px" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all hover:bg-black/50 hover:opacity-100">
                <InstagramIcon className="size-6 text-white" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
