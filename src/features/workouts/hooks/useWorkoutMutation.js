import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useSaveWorkoutMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, startTime, exercises, }) => {
            if (!user) throw new Error('No user found');


            const exerciseNotes = {};
            exercises.forEach(ex => {
                if (ex.notes && ex.notes.trim() !== "") {
                    exerciseNotes[ex.exerciseId] = ex.notes.trim();
                }
            });

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
                    exercise_notes: Object.keys(exerciseNotes).length > 0 ? exerciseNotes : null

                })
                .select()
                .single();

            if (workoutError) throw workoutError;

            const setsToInsert = [];
            exercises.forEach((ex) => {
                ex.sets.forEach((set, index) => {
                    if (set.isCompleted) {
                        setsToInsert.push({
                            workout_id: workout.id,
                            exercise_id: ex.exerciseId,
                            set_number: index + 1,
                            weight: parseFloat(set.weight) || 0,
                            reps: parseInt(set.reps) || 0,
                            rpe: parseFloat(set.rpe) || 0,
                        });
                    }
                });
            });

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