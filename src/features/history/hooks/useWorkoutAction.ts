import { useSaveTemplateMutation } from "./useSaveTemplateMutation";
import { useActiveWorkoutStore } from "../../active-workout/store/useActiveWorkoutStore";
import { useSnackbarStore } from "../../../store/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { SaveTemplateInput } from "./useSaveTemplateMutation";

export const useWorkoutAction = (workout: SaveTemplateInput) => {
    const navigate = useNavigate();
    const saveTemplateMutation = useSaveTemplateMutation();
    const loadWorkoutFromHistory = useActiveWorkoutStore((state) => state.loadWorkoutFromHistory);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleSaveAsTemplate = () => {
        saveTemplateMutation.mutate(workout, {
            onSuccess: () => {
                showSnackbar("Workout saved as template!", "success");
            },
            onError: (error) => {
                console.error("Error saving template:", error);
                showSnackbar("Failed to save template. Please try again.", "error");
            }
        })
    };

    const handleRepeatWorkout = () => {
        if (!workout || !workout.sets) return;
        loadWorkoutFromHistory(workout.name, workout.sets);
        showSnackbar("Workout loaded! You can start your workout now.", "success");
        navigate("/active");
    };

    return {
        handleSaveAsTemplate,
        handleRepeatWorkout,
        isSavingTemplate: saveTemplateMutation.isPending,
    };
};