import {
  BarChart3,
  Bell,
  CalendarDays,
  CalendarRange,
  Clapperboard,
  DollarSign,
  LayoutDashboard,
  ListChecks,
  Settings,
  Users,
} from "lucide-react";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/appointments", label: "Shoot Bookings", icon: CalendarDays },
  { href: "/admin/calendar", label: "Studio Calendar", icon: CalendarRange },
  { href: "/admin/customers", label: "Clients", icon: Users },
  { href: "/admin/barbers", label: "Artists & Crew", icon: Clapperboard },
  { href: "/admin/services", label: "Services & Packages", icon: ListChecks },
  { href: "/admin/revenue", label: "Revenue", icon: DollarSign },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
