import type { Metadata } from "next";
import { CTABand, PageHeader, Reveal } from "@/components/common";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Grooming tips, style trends and care guides from our barbers.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHeader
        eyebrow="Style guide"
        title="Tips from the chair"
        subtitle="Grooming advice, trend breakdowns and care guides — straight from our barbers."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured && (
            <Reveal className="sm:col-span-2 lg:col-span-3">
              <BlogCard post={featured} />
            </Reveal>
          )}
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>

      <CTABand />
    </>
  );
}
