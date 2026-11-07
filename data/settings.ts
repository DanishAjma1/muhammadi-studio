import type { ShopSettings } from "@/types";

export const shopSettings: ShopSettings = {
  name: "Muhammadi Studio & Event Management",
  tagline: "Dream It... We Plan It... You Enjoy It! We Make Your Event Unforgettable!",
  slogan: "Your Event, Our Responsibility, Memories Forever!",
  owner: "Atiq Butt",
  coFounder: "Atiq Butt",
  founder: "Muhammad Usman",
  address: "Main Bazar, New Plaza, Shop No: 2",
  phone: "03137526305",
  email: "contact@muhammadistudio.com",
  whatsapp: "+92 313 7526305",
  hours: [
    { day: "Monday", open: "10:00 AM", close: "10:00 PM" },
    { day: "Tuesday", open: "10:00 AM", close: "10:00 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "10:00 PM" },
    { day: "Thursday", open: "10:00 AM", close: "10:00 PM" },
    { day: "Friday", open: "10:00 AM", close: "11:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "11:00 PM" },
    { day: "Sunday", open: "11:00 AM", close: "10:00 PM" },
  ],
  booking: {
    advanceDays: 180,
    cancellationWindowHours: 48,
    bufferMin: 30,
    walkIns: true,
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
