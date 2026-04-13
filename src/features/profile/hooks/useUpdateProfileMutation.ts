import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useUpdateProfileMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (displayName: string) => {
            if (!user) throw new Error('No user');
            const { error } = await supabase
                .from('profiles')
                .update({ display_name: displayName })
                .eq('id', user.id);

            if (error) throw error;
            return displayName;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
            navigate('/profile');
        }
    })
}