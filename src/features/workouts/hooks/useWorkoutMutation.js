import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";
import { extractExerciseNotes, prepareSetsForInsert } from "../utils/formatters";

export const useSaveWorkoutMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, startTime, exercises, }) => {
            if (!user) throw new Error('No user found');

            const exerciseNotes = extractExerciseNotes(exercises);

            const {
                data: workout,
                error: workoutError
            } = await supabase
                .from('workouts')
                .insert({
                    user_id: user.id,
                    name: name || 'New Workout',
                    is_completed: true,
                    is_template: false,
                    exercise_notes: exerciseNotes,
                })
                .select()
                .single();

            if (workoutError) throw workoutError;

            const setsToInsert = prepareSetsForInsert(exercises, workout.id);

            if (setsToInsert.length > 0) {
                const { error: setsError } = await supabase
                    .from("sets")
                    .insert(setsToInsert);

                if (setsError) throw setsError;
            }

            return workout;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recent_workouts'] });
        }
    });
}