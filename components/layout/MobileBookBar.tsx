"use client";

import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sticky "Book Event" bar for mobile. */
export function MobileBookBar() {
  const pathname = usePathname();
  // Hide on the booking flow itself, admin, and inside account pages.
  if (pathname.startsWith("/book") || pathname.startsWith("/account") || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background/95 p-2.5 backdrop-blur-xl sm:hidden shadow-2xl">
      <a
        href="tel:03137526305"
        className="flex h-11 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold active:scale-95"
        aria-label="Call Atiq Butt"
      >
        <Phone className="size-5" />
      </a>
      <Link
        href="/book"
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gold text-sm font-bold text-black shadow-lg shadow-gold/20 active:scale-[0.98]"
      >
        <CalendarCheck className="size-4" />
        Book Event (Multi-Function)
      </Link>
    </div>
  );
}
