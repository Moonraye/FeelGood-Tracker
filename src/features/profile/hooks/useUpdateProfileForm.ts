// src/features/profile/hooks/useUpdateProfileForm.js
import { useState } from "react";
import { useUpdateProfileMutation } from "./useUpdateProfileMutation";
import { useSnackbarStore } from "../../../store/useSnackbarStore";

export const useUpdateProfileForm = (initialDisplayName: string | undefined) => {
  const [displayName, setDisplayName] = useState(initialDisplayName || "");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const updateProfileMutation = useUpdateProfileMutation();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const handleSaveClick = () => setIsConfirmDialogOpen(true);
  const handleCloseDialog = () => setIsConfirmDialogOpen(false);

  const confirmSave = () => {
    updateProfileMutation.mutate(
      displayName,
      {
        onSuccess: () => {
          setIsConfirmDialogOpen(false);
          showSnackbar("Profile updated successfully", "success");
        },
        onError: () => {
          showSnackbar("Error updating profile", "error");
        }
      }
    );
  };

  return {
    displayName,
    setDisplayName,
    isConfirmDialogOpen,
    handleSaveClick,
    handleCloseDialog,
    confirmSave,
    isPending: updateProfileMutation.isPending,
  };
};