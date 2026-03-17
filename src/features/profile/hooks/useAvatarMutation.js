import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useAvatarMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file) => {
            if (!user) throw new Error('No user');

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase 
                .from('profiles')
                .update({ avatarUrl: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            return publicUrl;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['profile', user?.id])
        }
    });
};