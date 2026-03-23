import { supabase } from "../../../config/supabase";
import { useQuery } from "@tanstack/react-query";

export const useExercisesQuery = () => {
    return useQuery({
        queryKey: ['exercises'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('exercises')
                .select('id, name, muscle_group')
                .order("muscle_group");
            
            if (error) throw error;
            return data;
        },
        staleTime: 1000 * 60 * 60,
    })
}