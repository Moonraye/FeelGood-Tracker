import { supabase } from "../../../config/supabase";
import { useQuery } from "@tanstack/react-query";

export const useWorkoutDetailsQuery = (workoutId: string) => {
    return useQuery({
        queryKey: ["workout_details", workoutId],
        queryFn: async () => {
            const { data, error} = await supabase
                .from('workouts')
                .select(`
                    id,
                    name,
                    duration,
                    created_at,
                    sets (
                        id,
                        weight,
                        set_number,
                        reps,
                        rpe,
                        exercise_id,
                        exercises (name)
                    )
                `)
                .eq("id", workoutId)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!workoutId,
    })
}