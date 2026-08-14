import { Clock } from "lucide-react";
import { Badge, Button } from "@/components/core";
import { cn, formatCurrency } from "@/lib/utils";
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
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1",
        featured ? "border-gold/40 hover:border-gold/70" : "border-border hover:border-border-strong",
        className,
      )}
    >
      {service.popular && (
        <span className="absolute right-4 top-4 z-10">
          <Badge variant="gold">Popular</Badge>
        </span>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <Clock className="size-3.5" /> {service.durationMin} min
            </p>
          </div>
          <span className="heading text-2xl text-gold">{formatCurrency(service.price)}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

        {service.includes && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {service.includes.map((item) => (
              <li key={item}>
                <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex-1" />
        <Button
          href={`/book?service=${service.id}`}
          variant={featured ? "primary" : "secondary"}
          fullWidth
        >
          Book {service.name}
        </Button>
      </div>
    </div>
  );
}
