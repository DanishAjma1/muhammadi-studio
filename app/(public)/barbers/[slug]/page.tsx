import { redirect } from "next/navigation";
import { barbers } from "@/data";

export function generateStaticParams() {
  return barbers.map((b) => ({ slug: b.slug }));
}

export default async function BarberSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/cinematographers/${slug}`);
}
