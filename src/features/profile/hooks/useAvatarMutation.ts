import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";
import { useAuthStore } from "../../../store/useAuthStore";

export const useAvatarMutation = () => {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File): Promise<string> => {
            if (!user) throw new Error('No user');

            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;


            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const avatarUrlWithCacheBuster = `${publicUrl}?t=${Date.now()}`;

            const { error: updateError } = await supabase 
                .from('profiles')
                .update({ avatar_url: avatarUrlWithCacheBuster })
                .eq('id', user.id);

            if (updateError) throw updateError;

            return avatarUrlWithCacheBuster;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
        }
    });
};