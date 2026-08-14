import { Quote } from "lucide-react";
import { InstagramIcon } from "@/components/common/Icons";
import { Avatar, StarRating } from "@/components/core";
import { cn, formatDate } from "@/lib/utils";
import type { Review } from "@/types";

const sourceLabel: Record<Review["source"], { label: string; icon?: boolean }> = {
  google: { label: "Google" },
  instagram: { label: "Instagram", icon: true },
  site: { label: "Verified booking" },
};

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  const src = sourceLabel[review.source];
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} size={16} />
        <Quote className="size-6 text-gold/30" />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Avatar src={review.avatar} name={review.author} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{review.author}</p>
          <p className="truncate text-xs text-muted">
            {review.service} · {formatDate(review.date, "short")}
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs text-faint">
          {src.icon && <InstagramIcon className="size-3.5" />}
          {src.label}
        </span>
      </figcaption>
    </figure>
  );
}
