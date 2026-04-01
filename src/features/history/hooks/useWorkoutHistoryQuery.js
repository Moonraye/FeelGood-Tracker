import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useWorkoutHistoryQuery = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['workout_history', user?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('workouts')
                .select(`
                    id,
                    name,
                    duration,
                    created_at,
                    sets (
                        id,
                        weight,
                        reps,
                        exercises (name),
                        rpe
                    )
                    
                `)
                .eq('user_id', user.id)
                .eq('is_completed', true)
                .order('created_at', { ascending: false })

            if (error) throw error;
            return data;
        },
        enabled: !!user,
    });
}