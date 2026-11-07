import { create } from "zustand";
import { avatar } from "@/data";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favoriteBarberId?: string;
  favoriteServiceId?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (data: { name: string; email: string; phone: string }) => void;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

// The mockup starts signed in as a demo customer so the account area is populated.
const demoUser: AuthUser = {
  id: "cus_ahmed",
  name: "Ahmed Khan",
  email: "ahmed.khan@email.com",
  phone: "+1 (555) 201-4471",
  avatar: avatar(11),
  favoriteBarberId: "brb_attiq",
  favoriteServiceId: "svc_signature_royal",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: demoUser,
  isAuthenticated: true,
  login: (email) =>
    set({
      isAuthenticated: true,
      user: { ...demoUser, email: email || demoUser.email },
    }),
  register: (data) =>
    set({
      isAuthenticated: true,
      user: {
        id: "cus_ahmed",
        name: data.name || demoUser.name,
        email: data.email || demoUser.email,
        phone: data.phone || demoUser.phone,
        avatar: avatar(11),
      },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateProfile: (patch) =>
    set((state) => ({ user: state.user ? { ...state.user, ...patch } : state.user })),
}));
