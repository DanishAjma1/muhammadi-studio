import type { AppNotification, BlogPost, FaqItem, GalleryItem } from "@/types";
import { blogImages, galleryImages } from "./images";

export const gallery: GalleryItem[] = [
  { id: "g1", image: "/images/setup-decor.jpg", category: "weddings", title: "Royal Pakistani Stage & Sofa Decor", barberId: "brb_attiq" },
  { id: "g2", image: "/images/setup-movie.jpg", category: "films", title: "Movie Setup (Cinema Like Experience)", barberId: "brb_attiq" },
  { id: "g3", image: "/images/setup-lighting.jpg", category: "commercial", title: "Concert Grade Beam Lighting Truss", barberId: "brb_attiq" },
  { id: "g4", image: "/images/setup-studio.jpg", category: "portraits", title: "Professional 4K Studio Setup", barberId: "brb_attiq" },
  { id: "g5", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80", category: "weddings", title: "Barat & Walima Royal Couple Moments", barberId: "brb_usman" },
  { id: "g6", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80", category: "weddings", title: "Mehndi Night Marigold Floral Canopy", barberId: "brb_attiq" },
  { id: "g7", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80", category: "weddings", title: "Mangni (Engagement) Ring Ceremony", barberId: "brb_attiq" },
  { id: "g8", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80", category: "commercial", title: "Themed Birthday Party Decor & Neon", barberId: "brb_attiq" },
  { id: "g9", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80", category: "commercial", title: "Corporate Conference & LED Screen Wall", barberId: "brb_attiq" },
  { id: "g10", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80", category: "commercial", title: "Grand Celebration Fireworks & Night Gala", barberId: "brb_attiq" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post_1",
    slug: "complete-event-arrangement-pakistan",
    title: "Planning the Perfect Pakistani Wedding: Decor, Lighting & Cinema",
    excerpt: "How Atiq Butt and Muhammadi Studio bring together royal stage design, concert lighting, and 4K cinema multi-cam for unforgettable celebrations.",
    cover: "/images/setup-decor.jpg",
    category: "Event Planning",
    readTime: 5,
    date: "2026-10-10",
    author: "Atiq Butt",
    content: [
      "In Pakistan, weddings are not just events — they are once-in-a-lifetime family milestones filled with love, tradition, and grand celebration.",
      "1. Synchronized Lighting: Intelligent moving heads and warm uplighting highlight the bride and groom while creating an ambient atmosphere for guests.",
      "2. Big-Screen Movie Setup: An open-air giant screen or LED video wall allows all guests to watch the live ceremony and childhood memory retrospectives.",
      "3. Bespoke Floral Stage: From fresh rose and jasmine walkthroughs to royal velvet sofas, our decorators construct authentic palaces inside marquees.",
      "4. Direct Supervision: Atiq Butt personally oversees call-sheets and coordination so you can relax and truly enjoy your special day.",
    ],
  },
  {
    id: "post_2",
    slug: "movie-setup-cinema-like-experience",
    title: "Transforming Celebrations with a Big-Screen Movie Setup",
    excerpt: "Why outdoor cinema screens and LED video walls have become the ultimate highlight for modern weddings and private parties.",
    cover: "/images/setup-movie.jpg",
    category: "Movie Setup",
    readTime: 4,
    date: "2026-09-25",
    author: "Atiq Butt",
    content: [
      "Imagine watching your couple entrance or live ceremony projected in crystal-clear high definition on a giant screen with concert-grade surround sound.",
      "Our Movie Setup brings a true theater experience to any garden, banquet hall, or farm house across Pakistan.",
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq_1",
    question: "Can I book more than one function or setup at the same time?",
    answer:
      "Yes! Our booking system allows you to select multiple functions (e.g. Mehndi + Barat + Walima) alongside our specialized setups (Movie Setup, Studio Setup, Event Decoration, and Lighting Setup) in a single request.",
  },
  {
    id: "faq_2",
    question: "How does the admin approval and confirmation email process work?",
    answer:
      "When you submit your booking request, our Owner Atiq Butt reviews your requested dates and venue logistics. Once approved, you immediately receive an official Confirmation Email with all arrangements, contact details, and confirmation reference.",
  },
  {
    id: "faq_3",
    question: "Where is the Muhammadi Studio office located?",
    answer:
      "Our studio office is located at Main Bazar, New Plaza, Shop No: 2, Pakistan. You are always welcome to visit us for a tea and in-person consultation.",
  },
  {
    id: "faq_4",
    question: "Why is there no generic fixed pricing shown on the cards?",
    answer:
      "Because every Pakistani celebration is unique! Hall dimensions, guest counts, customized floral themes, and multi-day requirements vary. We provide personalized, transparent quotes tailored to your exact budget and vision upon review.",
  },
  {
    id: "faq_5",
    question: "How do I contact Atiq Butt directly for urgent inquiries?",
    answer:
      "You can call or WhatsApp Atiq Butt directly at 0313-7526305. We respond promptly to all wedding and event inquiries.",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "ntf_1",
    type: "appointment",
    title: "New Multi-Function Booking Request",
    message: "Hamza & Fatima submitted request for Wedding (Barat) + Movie Setup + Event Decor.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "ntf_2",
    type: "appointment",
    title: "Mehndi & Lighting Booking Pending",
    message: "Rizwan Ahmed requested Mehndi Night + Lighting Setup for Nov 22.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "ntf_3",
    type: "review",
    title: "5-Star Review Received",
    message: "Zubair & Sarah: 'Atiq Butt arranged our complete wedding celebration! Unforgettable!'",
    time: "3 hours ago",
    read: true,
  },
];

export const instagramFeed = [
  "/images/setup-movie.jpg",
  "/images/setup-studio.jpg",
  "/images/setup-decor.jpg",
  "/images/setup-lighting.jpg",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80",
];
