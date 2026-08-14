"use client";

import { CalendarDays, LayoutDashboard, LogOut, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, useToast } from "@/components/core";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/account/profile", label: "Profile", icon: UserCog },
];

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={user?.avatar} name={user?.name ?? "Guest"} size="md" ring />
        <div>
          <p className="text-xs text-muted">Welcome back</p>
          <p className="font-semibold text-foreground">{user?.name ?? "Guest"}</p>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-secondary p-1">
        {links.map((l) => {
          const active = isActive(l.href, l.exact);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-gold text-black" : "text-muted hover:text-foreground",
              )}
            >
              <l.icon className="size-4" />
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={() => {
            logout();
            toast.info("You've been signed out.");
            router.push("/");
          }}
          className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-error"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </nav>
    </div>
  );
}
