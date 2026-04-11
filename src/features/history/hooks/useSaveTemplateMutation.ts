import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";
import { prepareTemplateSets } from "../utils/prepareTemplateSets";
import { DatabaseWorkoutSet } from "@/types/workout";

export interface SaveTemplateInput {
    name: string;
    sets: DatabaseWorkoutSet[] | null;
}

export const useSaveTemplateMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (originalWorkout: SaveTemplateInput) => {
            if (!user) throw new Error("User not authenticated");

            const { data: newWorkout, error: workoutError } = await supabase
                .from("workouts")
                .insert({
                    user_id: user.id,
                    name: `Template: ${originalWorkout.name}`,
                    is_template: true,
                })
                .select()
                .single();

            if (workoutError) throw workoutError;

            const setsToInsert = prepareTemplateSets(originalWorkout.sets, newWorkout.id);

            if (setsToInsert.length > 0) {
                const { error: setsError } = await supabase
                    .from("sets")
                    .insert(setsToInsert);

                if (setsError) throw setsError;
            }

            return newWorkout;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["templates"] });
        },
        onError: (error: Error) => {
            console.error("Failed to save template:", error.message);
        }
    });
};