import { useState } from "react";
import { useLogoutMutation } from "./useAuthMutation";
import { useSnackbarStore } from "../../../store/useSnackbarStore";

export const useLogoutAction = () => {
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const logoutMutation = useLogoutMutation();

    const handleLogoutClick = () => setIsLogoutDialogOpen(true);
    const handleCloseDialog = () => setIsLogoutDialogOpen(false);

    const confirmLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                setIsLogoutDialogOpen(false);
            },
        });
    };

    return {
    isLogoutDialogOpen,
    handleLogoutClick,
    handleCloseDialog,
    confirmLogout,
    isPending: logoutMutation.isPending,
  };
}