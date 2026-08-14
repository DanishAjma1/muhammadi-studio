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
  name: "James Lee",
  email: "admin@barberand.co",
  role: "Owner",
};

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isAuthed: false,
  admin: null,
  login: (email) => set({ isAuthed: true, admin: { ...demoAdmin, email: email || demoAdmin.email } }),
  logout: () => set({ isAuthed: false, admin: null }),
}));

// Exposed for the login screen hint.
export const ADMIN_DEMO_CREDENTIALS = { email: "admin@barberand.co", password: "admin123" };
