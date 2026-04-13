import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

interface UseExerciseProps{
    name: string;
    description: string;
    muscle_group: string;
}
export const useExerciseMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, description, muscle_group }: UseExerciseProps) => {
            if (!user) throw new Error('No user found');

            const { data, error } = await supabase
                .from('exercises')
                .insert({
                    name: name.trim(),
                    muscle_group,
                    description: description?.trim() || null,
                    user_id: user.id,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['exercises']
            });
        }
    })
}