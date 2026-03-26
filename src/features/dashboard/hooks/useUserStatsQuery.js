import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";
import { calculateMonthlyVolume, getFavoriteExercise } from "../utils/statsCalculator";

export const useUserStatsQuery = () => {
    const user = useAuthStore((state) => state.user);
    return useQuery({
        queryKey: ['user_stats', user?.id],
        queryFn: async () => {
            const { count: workoutsCount, error: countError } = await supabase
                .from("workouts")
                .select("*", { count: "exact", head: true })
                .eq("user_id", user.id)
                .eq("is_completed", true);

            if (countError) throw countError

            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const { data: monthWorkouts, error: volumeError } = await supabase
                .from("workouts")
                .select(
                    `id, sets ( weight, reps )`
                )
                .eq("user_id", user.id)
                .eq("is_completed", true)
                .gte("created_at", startOfMonth.toISOString());

            if (volumeError) throw volumeError;

            const { data: allSets, error: setsError } = await supabase
                .from("sets")
                .select(`workouts!inner(user_id, is_completed), exercises (name)`)
                .eq("workouts.user_id", user.id)
                .eq("workouts.is_completed", true);

            if (setsError) throw setsError;

            return {
                workoutsCount: workoutsCount || 0,
                monthlyVolume: calculateMonthlyVolume(monthWorkouts),
                favoriteExercise: getFavoriteExercise(allSets),
            };
        },
        enabled: !!user,
    })
}