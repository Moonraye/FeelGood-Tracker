
import { useSnackbarStore } from "../../../store/useSnackbarStore";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "./useSaveWorkoutMutation";

export const useFinishWorkoutAction = () => {
    const navigate = useNavigate();
    const { startTime, exercises, clearWorkout, workoutName } = useActiveWorkoutStore();

    const saveWorkoutMutation = useSaveWorkoutMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleFinish = () => {
        saveWorkoutMutation.mutate(
            {
                name: workoutName,
                startTime,
                exercises,
            },
            {
                onSuccess: () => {
                    clearWorkout();
                    navigate("/");
                    showSnackbar("Workout saved successfully");
                },
                onError: (error) => {
                    console.log(error);
                    showSnackbar("Error saving workout");
                },
            },
        );
    };

    return {
        handleFinish,
        isPending: saveWorkoutMutation.isPending,
        canFinish: !saveWorkoutMutation.isPending && exercises.length > 0,
    };

}