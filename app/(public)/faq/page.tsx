import type { Metadata } from "next";
import { MessageCircleQuestion } from "lucide-react";
import { Accordion, Button } from "@/components/core";
import { PageHeader, Reveal } from "@/components/common";
import { faqs } from "@/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about booking, walk-ins and payments.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to know"
        title="Frequently asked questions"
        subtitle="Everything you need to know before your visit. Can't find an answer? Just reach out."
        align="center"
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="rounded-2xl border border-border bg-card px-6 sm:px-8">
          <Accordion items={faqs} defaultOpen={faqs[0]?.id} />
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-secondary p-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <MessageCircleQuestion className="size-6" />
          </span>
          <h2 className="heading text-xl text-foreground">Still have a question?</h2>
          <p className="max-w-sm text-sm text-muted">
            Our team is happy to help. Reach out and we&apos;ll get right back to you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact">Contact us</Button>
            <Button href="/book" variant="outline">
              Book appointment
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
