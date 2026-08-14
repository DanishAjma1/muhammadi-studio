"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Menu, Phone, User, X } from "lucide-react";
import { InstagramIcon } from "@/components/common/Icons";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useActive();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/40 to-transparent",
        )}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:h-20">
          <Logo />

          {/* Desktop floating pill nav */}
          <div className="hidden items-center rounded-full border border-border/70 bg-secondary/60 p-1 backdrop-blur lg:flex">
            {primaryLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-black" : "text-muted hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gold"
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
              href={`tel:${shopSettings.phone}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-foreground xl:flex"
            >
              <Phone className="size-4" />
              <span className="tabular-nums">{shopSettings.phone}</span>
            </a>
            <Link
              href="/account"
              aria-label="My account"
              className="hidden size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/50 hover:text-foreground sm:flex"
            >
              <User className="size-5" />
            </Link>
            <Button href="/book" size="sm" className="hidden sm:inline-flex" leftIcon={<CalendarCheck className="size-4" />}>
              Book Now
            </Button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-18 items-center justify-between px-4 sm:px-6">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pb-8 pt-6">
              <nav className="flex flex-col gap-1">
                {primaryLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block border-b border-border/60 py-4 text-3xl font-semibold tracking-tight transition-colors",
                        isActive(link.href) ? "text-gold" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mt-8 space-y-4">
                <Button href="/book" fullWidth size="lg" leftIcon={<CalendarCheck className="size-5" />}>
                  Book Appointment
                </Button>
                <div className="flex items-center justify-between text-sm text-muted">
                  <a href={`tel:${shopSettings.phone}`} className="flex items-center gap-2 hover:text-foreground">
                    <Phone className="size-4" /> {shopSettings.phone}
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-gold"
                  >
                    <InstagramIcon className="size-4" /> {shopSettings.social.instagram}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
