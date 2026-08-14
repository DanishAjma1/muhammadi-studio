import type { AppNotification, BlogPost, FaqItem, GalleryItem } from "@/types";
import { blogImages, galleryImages } from "./images";

export const gallery: GalleryItem[] = [
  { id: "g1", image: galleryImages[0], category: "fade", title: "Low Skin Fade", barberId: "brb_alex" },
  { id: "g2", image: galleryImages[1], category: "classic", title: "Classic Side Part", barberId: "brb_mike" },
  { id: "g3", image: galleryImages[2], category: "styling", title: "Textured Crop", barberId: "brb_omar" },
  { id: "g4", image: galleryImages[3], category: "beard", title: "Full Beard Sculpt", barberId: "brb_james" },
  { id: "g5", image: galleryImages[4], category: "fade", title: "Mid Fade + Design", barberId: "brb_omar" },
  { id: "g6", image: galleryImages[5], category: "beard", title: "Hot Towel Finish", barberId: "brb_james" },
  { id: "g7", image: galleryImages[6], category: "classic", title: "Slick Back", barberId: "brb_mike" },
  { id: "g8", image: galleryImages[7], category: "beard", title: "Beard Line-up", barberId: "brb_alex" },
  { id: "g9", image: galleryImages[8], category: "fade", title: "High Skin Fade", barberId: "brb_mike" },
  { id: "g10", image: galleryImages[9], category: "styling", title: "Modern Quiff", barberId: "brb_omar" },
  { id: "g11", image: galleryImages[10], category: "fade", title: "Burst Fade", barberId: "brb_omar" },
  { id: "g12", image: galleryImages[11], category: "classic", title: "Executive Contour", barberId: "brb_alex" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post_1",
    slug: "best-hairstyles-2026",
    title: "5 Best Hairstyles for 2026",
    excerpt: "From the textured crop to the modern mullet — the cuts our barbers can't stop recommending this year.",
    cover: blogImages[0],
    category: "Trends",
    readTime: 5,
    date: "2026-08-01",
    author: "Alex Johnson",
    content: [
      "Every year brings a fresh rotation of styles, and 2026 is no different. Here are the five cuts we're doing most in the shop right now.",
      "1. The Textured Crop — low maintenance, high impact. Works on almost every face shape and grows out cleanly.",
      "2. The Modern Mullet — business in the front, personality in the back. Bolder clients love it.",
      "3. The Mid Skin Fade — still the most requested fade in the chair. Timeless and sharp.",
      "4. The Slick Back — pair it with a lined-up beard for an executive finish.",
      "5. The Buzz + Beard — confidence in its simplest form. Let the beard do the talking.",
    ],
  },
  {
    id: "post_2",
    slug: "maintain-your-fade",
    title: "How to Maintain Your Fade Between Cuts",
    excerpt: "A fresh fade only lasts if you look after it. Here's how to keep those lines crisp for longer.",
    cover: blogImages[1],
    category: "Guides",
    readTime: 4,
    date: "2026-07-18",
    author: "Omar Farooq",
    content: [
      "A fade looks best in the first two weeks — but with the right routine you can stretch that sharp look.",
      "Brush daily to keep the blend even and train your hair.",
      "Book a line-up at the two-week mark instead of waiting for a full cut.",
      "Use a light pomade to keep the top looking intentional, not messy.",
    ],
  },
  {
    id: "post_3",
    slug: "how-often-haircut",
    title: "How Often Should You Get a Haircut?",
    excerpt: "The honest answer depends on your style — here's our barber-backed guide by cut type.",
    cover: blogImages[2],
    category: "Guides",
    readTime: 3,
    date: "2026-07-04",
    author: "Mike Smith",
    content: [
      "There's no single right answer, but here's what we tell our regulars.",
      "Fades: every 2–3 weeks to keep them sharp.",
      "Classic cuts: every 4–5 weeks works well.",
      "Longer styles: every 6–8 weeks to keep the shape.",
    ],
  },
  {
    id: "post_4",
    slug: "beard-care-guide",
    title: "The Complete Beard Care Guide",
    excerpt: "Oils, brushes, trims and timing — everything you need for a healthier, fuller-looking beard.",
    cover: blogImages[3],
    category: "Beard",
    readTime: 6,
    date: "2026-06-20",
    author: "James Lee",
    content: [
      "A great beard is 50% genetics and 50% routine. Let's focus on the part you control.",
      "Wash 2–3 times a week with a dedicated beard wash, not regular shampoo.",
      "Oil daily to keep the skin underneath healthy and the hair soft.",
      "Brush to train growth direction and distribute oils.",
      "Book a shape-up every 2–4 weeks — even a great beard needs structure.",
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq_1",
    question: "Do I need an appointment?",
    answer:
      "We recommend booking to guarantee your slot with your preferred barber, but we welcome walk-ins whenever we have availability.",
  },
  {
    id: "faq_2",
    question: "Can I choose my barber?",
    answer:
      "Absolutely. During booking you can pick any of our barbers, or choose 'Any Available' and we'll match you with the next open chair.",
  },
  {
    id: "faq_3",
    question: "How long does a haircut take?",
    answer:
      "A classic haircut takes around 45 minutes. Packages like the Full Experience run up to 90 minutes. Each service shows its duration when you book.",
  },
  {
    id: "faq_4",
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes — you can cancel or reschedule from your account up to 2 hours before your appointment at no charge.",
  },
  {
    id: "faq_5",
    question: "Do you accept walk-ins?",
    answer:
      "We do. Weekdays are usually the quietest. On weekends we'd suggest booking ahead as slots fill fast.",
  },
  {
    id: "faq_6",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major cards, contactless, and cash. You can pay in-store after your service.",
  },
  {
    id: "faq_7",
    question: "Do you cut kids' hair?",
    answer: "Yes — we offer a dedicated Kids Cut for children under 12, at a friendly price.",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "ntf_1",
    type: "appointment",
    title: "New Appointment",
    message: "Ahmed Khan booked a Haircut & Beard with Alex.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "ntf_2",
    type: "review",
    title: "New Review Received",
    message: "Marco left a 5-star review for James.",
    time: "40 minutes ago",
    read: false,
  },
  {
    id: "ntf_3",
    type: "cancellation",
    title: "Appointment Cancelled",
    message: "Sam Okafor cancelled their Full Experience.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "ntf_4",
    type: "customer",
    title: "New Customer",
    message: "Noah Bennett created an account via Instagram.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "ntf_5",
    type: "reminder",
    title: "Appointment Reminder",
    message: "Hassan Raza has a Full Experience today at 10:30 AM.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "ntf_6",
    type: "appointment",
    title: "New Appointment",
    message: "Bilal Ahmed booked a Classic Haircut with Mike.",
    time: "Yesterday",
    read: true,
  },
];

export const instagramFeed = galleryImages.slice(0, 9);
