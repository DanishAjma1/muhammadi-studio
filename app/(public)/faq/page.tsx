import type { Metadata } from "next";
import { MessageCircleQuestion } from "lucide-react";
import { Accordion, Button } from "@/components/core";
import { PageHeader, Reveal } from "@/components/common";
import { faqs } from "@/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about booking photography and cinematography packages with Muhammadi Studio.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Muhammadi Studio Guide"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about booking our cinematography &amp; photography packages, cameras, delivery timelines, and destination travel."
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
          <h2 className="heading text-xl text-foreground">Have a Custom Project or Destination Wedding?</h2>
          <p className="max-w-md text-sm text-muted">
            Attiq Butt and our production team are happy to discuss custom multi-day schedules, international travel, or brand commercial proposals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact">Send Studio Message</Button>
            <Button href="/book" variant="outline">
              Book a Shoot Session
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
