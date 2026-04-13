import { useAuthStore } from "../../../store/useAuthStore";
import { supabase } from "../../../config/supabase";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/database.types";

type Profile = Database['public']['Tables']['profiles']['Row'];


export const useProfileQuery = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['profile', user?.id],
        queryFn: async (): Promise<Profile | null> => {
            if (!user) return null;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if(error) throw error;
            return data;
        },
        enabled: !!user,
    });
};
    