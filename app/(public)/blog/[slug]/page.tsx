import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Avatar, Badge } from "@/components/core";
import { CTABand } from "@/components/common";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Article", description: post?.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-28 sm:px-6 sm:pt-36">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold">
          <ArrowLeft className="size-4" /> Back to Cinema Insights
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <Badge variant="gold">{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-faint">
            <Clock className="size-3" /> {post.readTime} min read
          </span>
          <span className="text-xs text-faint">{formatDate(post.date, "long")}</span>
        </div>

        <h1 className="heading mt-4 text-3xl text-foreground sm:text-4xl md:text-5xl">{post.title}</h1>

        <div className="mt-6 flex items-center gap-3">
          <Avatar name={post.author} size="sm" />
          <div>
            <p className="text-sm font-medium text-foreground">{post.author}</p>
            <p className="text-xs text-muted">
              {post.author === "Attiq Butt"
                ? "Co-Founder & Director of Cinematography"
                : post.author === "Muhammad Usman"
                  ? "Founder & Master Photographer"
                  : "Senior Creative Director"}
            </p>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image src={post.cover} alt={post.title} fill priority className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
        </div>

        <div className="prose-invert mt-8 space-y-5 pb-8 text-base leading-relaxed text-muted">
          {post.content.map((para, i) => (
            <p key={i} className={i === 0 ? "text-lg text-foreground font-medium" : undefined}>
              {para}
            </p>
          ))}
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="heading mb-8 text-2xl text-foreground">More Insights from Muhammadi Studio</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
