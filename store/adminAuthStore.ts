import { create } from "zustand";

export interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  isAuthed: boolean;
  admin: AdminUser | null;
  login: (email: string) => void;
  logout: () => void;
}

const demoAdmin: AdminUser = {
  name: "Attiq Butt",
  email: "attiq@muhammadistudio.com",
  role: "Co-Founder & Creative Director",
};

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isAuthed: false,
  admin: null,
  login: (email) => set({ isAuthed: true, admin: { ...demoAdmin, email: email || demoAdmin.email } }),
  logout: () => set({ isAuthed: false, admin: null }),
}));

// Exposed for the login screen hint.
export const ADMIN_DEMO_CREDENTIALS = { email: "attiq@muhammadistudio.com", password: "admin123" };
