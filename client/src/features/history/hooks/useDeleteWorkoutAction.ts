import { useState } from "react";
import { useDeleteWorkoutMutation } from "../../../hooks/api/useDeleteWorkoutMutation";
import { useSnackbarStore } from "../../../store/useSnackbarStore";
import { HistoryWorkoutData } from "../components/HistoryCard";

export const useDeleteWorkoutAction = (workout: HistoryWorkoutData) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const deleteMutation = useDeleteWorkoutMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();    
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        deleteMutation.mutate(workout.id, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                showSnackbar("Workout deleted successfully", "success");
            },
            onError: () => {
                showSnackbar("Failed to delete workout", "error");
            },
        });
    };

    return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteClick,
    confirmDelete,
    isPending: deleteMutation.isPending
  };
}