import {
  BarChart3,
  Bell,
  CalendarDays,
  CalendarRange,
  DollarSign,
  LayoutDashboard,
  ListChecks,
  Scissors,
  Settings,
  Users,
} from "lucide-react";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarRange },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/barbers", label: "Barbers", icon: Scissors },
  { href: "/admin/services", label: "Services", icon: ListChecks },
  { href: "/admin/revenue", label: "Revenue", icon: DollarSign },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
