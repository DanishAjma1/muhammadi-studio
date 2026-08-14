import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 512 512" className="size-5" aria-hidden>
          <g fill="#C9A227">
            <rect x="104" y="150" width="304" height="62" rx="28" />
            <rect x="124" y="196" width="20" height="150" rx="10" />
            <rect x="160" y="196" width="20" height="150" rx="10" />
            <rect x="196" y="196" width="20" height="150" rx="10" />
            <rect x="232" y="196" width="20" height="150" rx="10" />
            <rect x="268" y="196" width="20" height="150" rx="10" />
            <rect x="304" y="196" width="20" height="150" rx="10" />
            <rect x="340" y="196" width="20" height="150" rx="10" />
            <rect x="376" y="196" width="20" height="150" rx="10" />
          </g>
        </svg>
      </span>
      {!compact && (
        <span className="heading text-lg font-extrabold uppercase tracking-tight text-foreground">
          Barber<span className="text-gold">&amp;</span>Co.
        </span>
      )}
    </Link>
  );
}
