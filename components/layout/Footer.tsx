import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/common/Icons";
import { shopSettings } from "@/data";
import { Logo } from "./Logo";
import { footerColumns } from "./nav-config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Muhammadi Studio is a premier cinematography and photography production house co-founded by <strong>Attiq Butt</strong> and founded by <strong>Muhammad Usman</strong>. Crafting 4K cinematic wedding movies, royal portraits, and commercial ad campaigns with timeless artistic excellence.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={`mailto:${shopSettings.email}`}
                aria-label="Email Studio"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-faint">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {2026} {shopSettings.name}. Co-Founder: Attiq Butt. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-gold" /> {shopSettings.address}
            </span>
            <a href={`tel:${shopSettings.phone}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Phone className="size-4 text-gold" /> {shopSettings.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
