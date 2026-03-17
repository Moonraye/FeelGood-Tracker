import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    session: null,
    isInitialized: false,

    setAuth: (session) => set({
        session: session,
        user: session?.user ?? null,
        isInitialized: true,
    }),
}));