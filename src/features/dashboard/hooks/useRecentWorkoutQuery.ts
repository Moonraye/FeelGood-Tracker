import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useRecentWorkoutQuery = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['recent_workouts', user?.id],
        queryFn: async () => {

            if (!user) throw new Error("User must be authenticated to fetch recent workout");

            const { data, error } = await supabase
                .from("workouts")
                .select(`
                    id, 
                    name, 
                    created_at, 
                    sets (
                        id, weight, reps, exercises (
                        name)
                    )
                `)
                .eq("user_id", user.id)
                .eq("is_completed", true)
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null;
                throw error;
            }
            return data;
        }, 
        enabled: !!user,
    })
}