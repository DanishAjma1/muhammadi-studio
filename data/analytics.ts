import type { BreakdownPoint, RevenuePoint, TrafficSource } from "@/types";

export const revenueByMonth: RevenuePoint[] = [
  { label: "Sep", revenue: 48200, appointments: 42 },
  { label: "Oct", revenue: 52400, appointments: 48 },
  { label: "Nov", revenue: 46900, appointments: 40 },
  { label: "Dec", revenue: 68500, appointments: 62 },
  { label: "Jan", revenue: 54100, appointments: 46 },
  { label: "Feb", revenue: 51800, appointments: 44 },
  { label: "Mar", revenue: 59300, appointments: 52 },
  { label: "Apr", revenue: 64200, appointments: 56 },
  { label: "May", revenue: 71500, appointments: 65 },
  { label: "Jun", revenue: 69800, appointments: 60 },
  { label: "Jul", revenue: 76400, appointments: 68 },
  { label: "Aug", revenue: 74200, appointments: 64 },
];

export const revenueByDay: RevenuePoint[] = [
  { label: "Mon", revenue: 3800 },
  { label: "Tue", revenue: 4200 },
  { label: "Wed", revenue: 3100 },
  { label: "Thu", revenue: 5400 },
  { label: "Fri", revenue: 8900 },
  { label: "Sat", revenue: 14500 },
  { label: "Sun", revenue: 9800 },
];

export const serviceBreakdown: BreakdownPoint[] = [
  { name: "Wedding Cinema", value: 48 },
  { name: "Bridal & Stills", value: 26 },
  { name: "Commercial & Ads", value: 16 },
  { name: "Drone & Aerial", value: 10 },
];

export const trafficSources: TrafficSource[] = [
  { source: "Instagram Portfolio", visitors: 840 },
  { source: "Google & Organic", visitors: 460 },
  { source: "Word-of-Mouth / Direct", visitors: 390 },
  { source: "YouTube Showreels", visitors: 280 },
];

export const appointmentsTrend: RevenuePoint[] = [
  { label: "Mon", revenue: 0, appointments: 4 },
  { label: "Tue", revenue: 0, appointments: 5 },
  { label: "Wed", revenue: 0, appointments: 3 },
  { label: "Thu", revenue: 0, appointments: 6 },
  { label: "Fri", revenue: 0, appointments: 11 },
  { label: "Sat", revenue: 0, appointments: 16 },
  { label: "Sun", revenue: 0, appointments: 9 },
];

export const customerTypeSplit: BreakdownPoint[] = [
  { name: "Weddings & Families", value: 65 },
  { name: "Commercial Brands", value: 35 },
];

export const adminKpis = {
  today: {
    appointments: 4,
    newCustomers: 2,
    revenue: 3630,
    noShows: 0,
  },
  revenue: {
    today: 3630,
    week: 49700,
    month: 74200,
  },
  analytics: {
    appointments: 64,
    newCustomers: 28,
    returningRate: 42,
    cancellationRate: 2.1,
    noShowRate: 0.5,
    avgBookingValue: 1150,
  },
};
