"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn, starBreakdown } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

/** Read-only star display supporting half stars. */
export function StarRating({ rating, size = 16, className, showValue }: StarRatingProps) {
  const { full, half } = starBreakdown(rating);
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <span key={i} className="relative">
              <Star size={size} className="text-border-strong" fill="currentColor" />
              {(filled || isHalf) && (
                <Star
                  size={size}
                  className="absolute inset-0 text-gold"
                  fill="currentColor"
                  style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                />
              )}
            </span>
          );
        })}
      </span>
      {showValue && <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}
    </span>
  );
}

/** Interactive star input for review forms. */
export function StarInput({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  return (
    <span className="inline-flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="transition-transform hover:scale-110"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              className={active ? "text-gold" : "text-border-strong"}
              fill="currentColor"
            />
          </button>
        );
      })}
    </span>
  );
}
