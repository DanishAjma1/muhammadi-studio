"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

const filters: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fade", label: "Fade" },
  { value: "classic", label: "Classic" },
  { value: "beard", label: "Beard" },
  { value: "styling", label: "Styling" },
];

export function GalleryGrid({
  items,
  filterable = true,
}: {
  items: GalleryItem[];
  filterable?: boolean;
}) {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      {filterable && (
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === f.value
                  ? "border-gold bg-gold text-black"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        <AnimatePresence>
          {shown.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(item)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium text-white">{item.title}</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          >
            <button
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                width={1000}
                height={1200}
                className="h-auto max-h-[85vh] w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-lg font-semibold text-white">{lightbox.title}</p>
                <p className="text-sm capitalize text-white/70">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
