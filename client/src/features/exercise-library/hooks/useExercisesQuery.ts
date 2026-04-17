import { supabase } from "../../../config/supabase";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/database.types";

type ExerciseBase = Database['public']['Tables']['exercises']['Row'];

export type ExerciseSummary = Pick<ExerciseBase, 'id' | 'name' | 'muscle_group'>;

export const useExercisesQuery = () => {
    return useQuery({
        queryKey: ['exercises'],
        queryFn: async (): Promise<ExerciseSummary[]> => {
            const { data, error } = await supabase
                .from('exercises')
                .select('id, name, muscle_group')
                .order("muscle_group");
            
            if (error) throw error;
            return data as ExerciseSummary[];
        },
        staleTime: 1000 * 60 * 60,
    })
}