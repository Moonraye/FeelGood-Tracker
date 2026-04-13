import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  extractExerciseNotes,
  prepareSetsForInsert,
} from "../utils/formatters";
import { WorkoutExercise } from "../store/useActiveWorkoutStore";

interface SaveWorkoutVariables {
  name: string;
  exercises: WorkoutExercise[];
  saveAsTemplate: boolean;
  startTime: number;
}

export const useSaveWorkoutMutation = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation<any, Error, SaveWorkoutVariables>({
    mutationFn: async ({ name, exercises, saveAsTemplate, startTime }) => {
      if (!user) throw new Error("No user found");

      const exerciseNotes = extractExerciseNotes(exercises);
      const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);

      const { data: workout, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          user_id: user.id,
          name: name || "New Workout",
          is_completed: true,
          is_template: false,
          exercise_notes: exerciseNotes,
          duration: durationInSeconds,
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

      if (saveAsTemplate) {
        const { data: template, error: templateError } = await supabase
          .from("workouts")
          .insert({
            user_id: user.id,
            name: `${name || "New Workout"} (Template)`,
            is_completed: false,
            is_template: true,
            exercise_notes: exerciseNotes,
          })
          .select()
          .single();

        if (!templateError && setsToInsert.length > 0) {
          const templateSets = setsToInsert.map((s) => ({
            ...s,
            workout_id: template.id,
          }));
          await supabase.from("sets").insert(templateSets);
        }
      }

      return workout;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent_workouts"] });
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
};
