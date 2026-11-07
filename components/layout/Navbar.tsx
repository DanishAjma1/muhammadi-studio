"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Menu, Phone, Sparkles, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { shopSettings } from "@/data";
import { Button } from "@/components/core";
import { Logo } from "./Logo";
import { primaryLinks, secondaryLinks } from "./nav-config";

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useActive();
  const pathname = usePathname();

  // close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-xl shadow-lg transition-all duration-200">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:h-20">
          <Logo />

          {/* Desktop floating pill nav - ALWAYS VISIBLE ON DESKTOP */}
          <div className="hidden items-center rounded-full border border-border/80 bg-secondary/80 p-1 backdrop-blur lg:flex shadow-inner">
            {primaryLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-black font-semibold" : "text-muted hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gold shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href="tel:03137526305"
              className="hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:border-gold hover:text-gold sm:flex"
            >
              <Phone className="size-3.5 text-gold" />
              <span className="tabular-nums">0313-7526305</span>
            </a>

            <Link
              href="/admin/appointments"
              aria-label="Studio Admin"
              className="hidden size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/50 hover:text-gold md:flex"
              title="Studio Portal"
            >
              <User className="size-4" />
            </Link>

            <Button href="/book" size="sm" className="hidden sm:inline-flex" leftIcon={<CalendarCheck className="size-4" />}>
              Book an Event
            </Button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:border-gold lg:hidden transition-colors"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-18 items-center justify-between border-b border-border px-4 sm:px-6">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pb-8 pt-4">
              <nav className="flex flex-col gap-1">
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-gold/10 border border-gold/30 px-3 py-1.5 text-xs text-gold">
                  <Sparkles className="size-3.5" />
                  <span>Owner: <strong>Atiq Butt</strong> · 0313-7526305</span>
                </div>

                {primaryLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block border-b border-border/50 py-3.5 text-2xl font-bold tracking-tight transition-colors",
                        isActive(link.href) ? "text-gold" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs text-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mt-6 space-y-3 pt-4 border-t border-border">
                <Button href="/book" fullWidth size="lg" leftIcon={<CalendarCheck className="size-5" />}>
                  Book Event (Multi-Function)
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button href="tel:03137526305" variant="secondary" fullWidth leftIcon={<Phone className="size-4" />}>
                    Call Atiq Butt
                  </Button>
                  <Button href="https://wa.me/923137526305" variant="secondary" fullWidth>
                    WhatsApp
                  </Button>
                </div>
                <p className="text-center text-xs text-muted">
                  📍 Main Bazar, New Plaza, Shop No: 2, Pakistan
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
