import { useAuthStore } from "../../../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const useTemplatesQuery = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["templates"],
        queryFn: async () => {
            if (!user) throw new Error("User not authenticated");

            const { data, error } = await supabase
                .from("workouts")
                .select("*, sets(*, exercises(*))")
                .eq("user_id", user.id)
                .eq("is_template", true)
                .order("created_at", { ascending: false });

            if (error) throw error;

            return data;
        },
        enabled: !!user,
    });
};
