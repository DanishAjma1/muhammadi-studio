import type { BreakdownPoint, RevenuePoint, TrafficSource } from "@/types";

export const revenueByMonth: RevenuePoint[] = [
  { label: "Sep", revenue: 22400, appointments: 640 },
  { label: "Oct", revenue: 24100, appointments: 690 },
  { label: "Nov", revenue: 21850, appointments: 620 },
  { label: "Dec", revenue: 28900, appointments: 810 },
  { label: "Jan", revenue: 25300, appointments: 720 },
  { label: "Feb", revenue: 24750, appointments: 705 },
  { label: "Mar", revenue: 27600, appointments: 780 },
  { label: "Apr", revenue: 29200, appointments: 830 },
  { label: "May", revenue: 30850, appointments: 880 },
  { label: "Jun", revenue: 29980, appointments: 855 },
  { label: "Jul", revenue: 32400, appointments: 910 },
  { label: "Aug", revenue: 31420, appointments: 890 },
];

export const revenueByDay: RevenuePoint[] = [
  { label: "Mon", revenue: 1180 },
  { label: "Tue", revenue: 1320 },
  { label: "Wed", revenue: 990 },
  { label: "Thu", revenue: 1450 },
  { label: "Fri", revenue: 1780 },
  { label: "Sat", revenue: 1930 },
  { label: "Sun", revenue: 760 },
];

export const serviceBreakdown: BreakdownPoint[] = [
  { name: "Haircuts", value: 52 },
  { name: "Packages", value: 20 },
  { name: "Beard", value: 18 },
  { name: "Other", value: 10 },
];

export const trafficSources: TrafficSource[] = [
  { source: "Instagram", visitors: 420 },
  { source: "Google", visitors: 280 },
  { source: "Direct", visitors: 160 },
  { source: "Facebook", visitors: 80 },
];

export const appointmentsTrend: RevenuePoint[] = [
  { label: "Mon", revenue: 0, appointments: 26 },
  { label: "Tue", revenue: 0, appointments: 30 },
  { label: "Wed", revenue: 0, appointments: 22 },
  { label: "Thu", revenue: 0, appointments: 34 },
  { label: "Fri", revenue: 0, appointments: 41 },
  { label: "Sat", revenue: 0, appointments: 48 },
  { label: "Sun", revenue: 0, appointments: 18 },
];

export const customerTypeSplit: BreakdownPoint[] = [
  { name: "Returning", value: 68 },
  { name: "New", value: 32 },
];

export const adminKpis = {
  today: {
    appointments: 32,
    newCustomers: 8,
    revenue: 1240,
    noShows: 2,
  },
  revenue: {
    today: 1240,
    week: 7850,
    month: 31420,
  },
  analytics: {
    appointments: 890,
    newCustomers: 214,
    returningRate: 68,
    cancellationRate: 6.4,
    noShowRate: 3.1,
    avgBookingValue: 38,
  },
};
