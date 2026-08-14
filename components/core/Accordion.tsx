"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({
  items,
  className,
  defaultOpen,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors",
                  isOpen ? "text-gold" : "text-foreground",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-all",
                  isOpen && "rotate-45 border-gold/50 text-gold",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-sm leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
