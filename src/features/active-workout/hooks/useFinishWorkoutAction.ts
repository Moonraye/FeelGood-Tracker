import { useState } from "react";
import { useSnackbarStore } from "../../../store/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "./useSaveWorkoutMutation";

interface FinishWorkoutAction {
    handleFinish: () => void;
    saveAsTemplate: boolean;
    setSaveAsTemplate: (value: boolean) => void;
    isPending: boolean;
    canFinish: boolean;
}

export const useFinishWorkoutAction = (): FinishWorkoutAction => {
    const navigate = useNavigate();
    const { startTime, exercises, clearWorkout, workoutName } = useActiveWorkoutStore();

    const [saveAsTemplate, setSaveAsTemplate] = useState(false);

    const saveWorkoutMutation = useSaveWorkoutMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleFinish = () => {
        saveWorkoutMutation.mutate(
            {
                name: workoutName,
                startTime: startTime || Date.now(),
                exercises,
                saveAsTemplate,
            },
            {
                onSuccess: () => {
                    clearWorkout();
                    navigate("/");
                    showSnackbar(saveAsTemplate ? "Workout and template saved!" : "Workout saved successfully");
                },
                onError: (error: any) => {
                    console.log(error);
                    showSnackbar("Error saving workout", 'error');
                },
            },
        );
    };

    return {
        handleFinish,
        saveAsTemplate,
        setSaveAsTemplate,
        isPending: saveWorkoutMutation.isPending,
        canFinish: !saveWorkoutMutation.isPending && exercises.length > 0,
    };

}