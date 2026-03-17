import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email, password,
            })

            if (error) throw error;

            return data;    
        },
    })
}

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { data, error } = await supabase.auth.signUp({
                email, password,
            })

            if (error) throw error;

            return data;    
        },
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;
        },
    })

}