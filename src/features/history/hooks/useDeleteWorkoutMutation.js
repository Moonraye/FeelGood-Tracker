import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const useDeleteWorkoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (workoutId) => {
            const { error } = await supabase
                .from('workouts')
                .delete()
                .eq('id', workoutId);

            if (error) throw error
            return workoutId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workout_history"] });
            queryClient.invalidateQueries({ queryKey: ["user_stats"] });
            queryClient.invalidateQueries({ queryKey: ["recent_workout"] });
            queryClient.invalidateQueries({ queryKey: ['templates'] });
        },
        onError: (error) => {
            console.error("Error deleting workout:", error);
        },
    });
};