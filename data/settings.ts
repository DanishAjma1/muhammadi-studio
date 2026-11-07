import type { ShopSettings } from "@/types";

export const shopSettings: ShopSettings = {
  name: "Muhammadi Studio",
  tagline: "Cinematic Vision. Timeless Stories.",
  coFounder: "Attiq Butt",
  founder: "Muhammad Usman",
  address: "Studio 4, Media City, Downtown Art District",
  phone: "+1 (555) 840-7890",
  email: "contact@muhammadistudio.com",
  whatsapp: "+1 (555) 840-7890",
  hours: [
    { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "9:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "6:00 PM" },
  ],
  booking: {
    advanceDays: 90,
    cancellationWindowHours: 24,
    bufferMin: 30,
    walkIns: false,
  },
  notifications: {
    email: true,
    sms: true,
    whatsapp: true,
  },
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    user: "contact@muhammadistudio.com",
    notificationEmail: "contact@muhammadistudio.com",
  },
  social: {
    instagram: "@muhammadistudio",
    tiktok: "@muhammadistudio",
    facebook: "muhammadistudio",
    youtube: "muhammadistudiocinema",
  },
};

export const shopStats = {
  yearsExperience: 14,
  clients: 1850,
  rating: 4.9,
  barbers: 4, // team members
};
