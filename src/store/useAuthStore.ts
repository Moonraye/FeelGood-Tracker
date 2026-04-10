import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isInitialized: boolean;
}

interface AuthActions {
  setAuth: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    session: null,
    isInitialized: false,

    setAuth: (session) => set({
        session: session,
        user: session?.user ?? null,
        isInitialized: true,
    }),
}));