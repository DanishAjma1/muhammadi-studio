// ============================================================
// Domain types for Muhammadi Studio (Photography & Movie Production)
// ============================================================

export type ServiceCategory = "setup" | "function" | "photography" | "cinematography" | "package";

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  pricingNote?: string;
  durationMin: number;
  category: ServiceCategory;
  popular?: boolean;
  includes?: string[];
  image: string;
  flyerCard?: string;
  active: boolean;
}

export type BarberStatus = "active" | "inactive";

export interface Barber {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  avatar: string;
  cover: string;
  gallery: string[];
  workingDays: string;
  workingHours: string;
  instagram?: string;
  status: BarberStatus;
}

export type CustomerStatus = "active" | "vip" | "new" | "inactive";
export type LeadSource = "instagram" | "google" | "facebook" | "direct" | "walk-in" | "referral";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
  totalVisits: number;
  totalSpent: number;
  favoriteBarberId?: string;
  favoriteServiceId?: string;
  lastVisit?: string;
  status: CustomerStatus;
  source: LeadSource;
  tags?: string[];
}

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAvatar?: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  functionIds?: string[];
  functionNames?: string[];
  venueCity?: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // "10:30 AM" or "Evening Function"
  durationMin: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  adminNotes?: string;
  confirmedAt?: string;
  source: LeadSource;
  createdAt: string;
}

export type ReviewSource = "google" | "instagram" | "site";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  service?: string;
  barberId?: string;
  date: string;
  source: ReviewSource;
}

export type GalleryCategory = "weddings" | "films" | "portraits" | "commercial";

export interface GalleryItem {
  id: string;
  image: string;
  category: GalleryCategory;
  title: string;
  barberId?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
  content: string[];
}

export type NotificationType =
  | "appointment"
  | "cancellation"
  | "customer"
  | "review"
  | "reminder";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface ShopSettings {
  name: string;
  tagline: string;
  slogan?: string;
  owner?: string;
  coFounder: string;
  founder: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: OpeningHour[];
  booking: {
    advanceDays: number;
    cancellationWindowHours: number;
    bufferMin: number;
    walkIns: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  smtp?: {
    service: string;
    host: string;
    port: number;
    secure: boolean;
    user: string;
    notificationEmail: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    facebook: string;
    youtube?: string;
  };
}

// ---- Chart / analytics helpers ----
export interface RevenuePoint {
  label: string;
  revenue: number;
  appointments?: number;
}

export interface BreakdownPoint {
  name: string;
  value: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
}
