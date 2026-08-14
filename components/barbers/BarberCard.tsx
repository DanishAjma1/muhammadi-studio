import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/common/Icons";
import { Button, StarRating } from "@/components/core";
import { cn } from "@/lib/utils";
import type { Barber } from "@/types";

export function BarberCard({ barber, className }: { barber: Barber; className?: string }) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40",
        className,
      )}
    >
      <Link href={`/barbers/${barber.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={barber.cover}
          alt={barber.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        {barber.instagram && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
            <InstagramIcon className="size-3.5 text-gold" /> {barber.instagram}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gold">{barber.title}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{barber.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={barber.rating} size={14} />
            <span className="text-xs text-white/70">
              {barber.rating} · {barber.experienceYears} yrs
            </span>
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 gap-2 p-4">
        <Button href={`/barbers/${barber.slug}`} variant="secondary" size="sm">
          View Profile
        </Button>
        <Button href={`/book?barber=${barber.id}`} size="sm">
          Book
        </Button>
      </div>
    </div>
  );
}
