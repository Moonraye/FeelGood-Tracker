import { useAuthStore } from "../../../store/useAuthStore";
import { supabase } from "../../../config/supabase";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['profile', user?.id],
        queryFn: async () => {
            if (!user) return null;

            const { data, error } = await supabase
                .from('profiles')
                .select('display_name, avatar_url')
                .eq('id', user.id)
                .single();

            if(error) throw error;
            return data;
        },
        enabled: !!user,
    });
};
    