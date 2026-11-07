"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sticky "Book a Shoot" bar for mobile. */
export function MobileBookBar() {
  const pathname = usePathname();
  // Hide on the booking flow itself and inside account pages.
  if (pathname.startsWith("/book") || pathname.startsWith("/account")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-xl sm:hidden">
      <Link
        href="/book"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-black shadow-lg shadow-gold/20 active:scale-[0.98]"
      >
        <Camera className="size-4" />
        Book a Shoot Session
      </Link>
    </div>
  );
}
