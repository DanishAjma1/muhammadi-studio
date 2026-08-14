import type { ShopSettings } from "@/types";

export const shopSettings: ShopSettings = {
  name: "Barber & Co.",
  tagline: "Your Style. Our Craft.",
  address: "123 Main Street, Downtown",
  phone: "+1 (555) 100-2014",
  email: "hello@barberand.co",
  whatsapp: "+1 (555) 100-2014",
  hours: [
    { day: "Monday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "5:00 PM" },
  ],
  booking: {
    advanceDays: 30,
    cancellationWindowHours: 2,
    bufferMin: 10,
    walkIns: true,
  },
  notifications: {
    email: true,
    sms: true,
    whatsapp: true,
  },
  social: {
    instagram: "@barberandco",
    tiktok: "@barberandco",
    facebook: "barberandco",
  },
};

export const shopStats = {
  yearsExperience: 10,
  clients: 5000,
  rating: 4.9,
  barbers: 4,
};
