"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bell, ExternalLink, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Loader } from "@/components/core";
import { Logo } from "@/components/layout";
import { useNotifications } from "@/hooks";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import { cn } from "@/lib/utils";
import { adminNav } from "./admin-nav";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {adminNav.map((item) => {
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-gold/10 text-gold" : "text-muted hover:bg-white/5 hover:text-foreground",
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const { isAuthed, admin, logout } = useAdminAuthStore();

  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!isAuthed && !isLoginRoute) router.replace("/admin/login");
  }, [isAuthed, isLoginRoute, router]);

  // The login screen renders without the dashboard chrome.
  if (isLoginRoute) return <>{children}</>;
  if (!isAuthed) return <Loader label="Redirecting to sign in…" className="min-h-screen" />;

  const title =
    adminNav.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.label ?? "Admin";

  const signOut = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Fixed desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-secondary lg:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
          <Logo />
        </div>
        <NavList />
        <div className="shrink-0 space-y-1 border-t border-border p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ExternalLink className="size-5" /> View public site
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-error/10 hover:text-error"
          >
            <LogOut className="size-5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border bg-secondary"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
                <Logo />
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted">
                  <X className="size-5" />
                </button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
              <div className="shrink-0 border-t border-border p-3">
                <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:text-error">
                  <LogOut className="size-5" /> Sign out
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Scrollable content column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="heading text-lg text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/notifications"
              className="relative flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-black">
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2 rounded-lg border border-border py-1 pl-1 pr-3">
              <Avatar name={admin?.name ?? "Admin"} size="xs" />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium text-foreground">{admin?.name ?? "Admin"}</p>
                <p className="text-[10px] text-muted">{admin?.role ?? "Owner"}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
