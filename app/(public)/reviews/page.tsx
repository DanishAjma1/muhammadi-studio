import type { Metadata } from "next";
import { Star } from "lucide-react";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { googleRating, reviews } from "@/data";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what our clients say. Rated 4.9/5 across 1,200+ reviews.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="What our clients say" align="center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
            <span className="heading text-3xl text-gold">{googleRating.score}</span>
            <div className="text-left">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 text-gold" fill="currentColor" />
                ))}
              </span>
              <p className="text-xs text-muted">{formatCompact(googleRating.count)} Google reviews</p>
            </div>
          </div>
          <ReviewForm />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </div>
      </div>
      <CTABand />
    </>
  );
}
