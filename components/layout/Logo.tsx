import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30 transition-transform group-hover:scale-105">
        {/* Cinema Camera / Aperture Shutter Icon */}
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m10 7 5 3-5 3z" fill="#C9A227" stroke="none" />
          <rect x="2" y="4" width="20" height="16" rx="4" />
          <path d="M2 8h20" />
          <circle cx="6" cy="6" r="1" fill="#C9A227" />
          <circle cx="10" cy="6" r="1" fill="#C9A227" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="heading text-lg font-extrabold uppercase tracking-tight text-foreground">
            Muhammadi<span className="text-gold">Studio</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-muted font-medium">
            Films &amp; Photography
          </span>
        </span>
      )}
    </Link>
  );
}
