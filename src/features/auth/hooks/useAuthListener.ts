import { useEffect } from "react";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useAuthListener = (): boolean => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error("Error fetching session:", error);
            }
            setAuth(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuth(session);
        });

        return () => subscription.unsubscribe();
    }, [setAuth]);

    return isInitialized;
};