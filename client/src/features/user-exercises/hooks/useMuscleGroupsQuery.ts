import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const useMuscleGroupsQuery = () => {
    return useQuery({
        queryKey: ['muscle_groups'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('muscle_groups')
                .select('name')
                .order('id');

            if (error) throw error;
            return data.map(item => item.name);
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};