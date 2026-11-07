import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { Badge, Button } from "@/components/core";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
  className?: string;
}

export function ServiceCard({ service, featured, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured ? "border-gold/50 shadow-gold/5" : "border-border hover:border-gold/40",
        className,
      )}
    >
      {/* Function / Setup Image Header */}
      <div className="relative h-44 w-full overflow-hidden bg-secondary">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant={service.category === "setup" ? "gold" : "default"}>
            {service.category === "setup" ? "Specialized Setup" : "Occasion"}
          </Badge>
          {service.popular && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-gold backdrop-blur">
              <Sparkles className="size-3" /> Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="heading text-xl font-bold text-white drop-shadow-md">{service.name}</h3>
          {service.tagline && (
            <p className="text-xs font-semibold text-gold drop-shadow">{service.tagline}</p>
          )}
        </div>
      </div>

      {/* Details & Features */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs leading-relaxed text-muted line-clamp-3">{service.description}</p>

        {service.includes && service.includes.length > 0 && (
          <ul className="mt-3.5 space-y-1.5 border-t border-border/60 pt-3">
            {service.includes.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs text-foreground/90">
                <Check className="size-3.5 text-gold shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex-1" />

        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-muted block">Arrangement</span>
            <span className="text-xs font-semibold text-gold">Custom Quote</span>
          </div>

          <Button
            href={`/book?service=${service.id}`}
            size="sm"
            variant={featured ? "primary" : "secondary"}
          >
            Book Function
          </Button>
        </div>
      </div>
    </div>
  );
}
