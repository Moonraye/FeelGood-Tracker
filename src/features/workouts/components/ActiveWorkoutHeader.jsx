import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../../../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "../hooks/useWorkoutMutation";
import { AppButton } from "../../../components/ui/AppButton";

export const ActiveWorkoutHeader = () => {
  const navigate = useNavigate();
  const { startTime, exercises, clearWorkout } = useActiveWorkoutStore();
  const saveWorkoutMutation = useSaveWorkoutMutation();

  handleFinish = () => {
    saveWorkoutMutation.mutate(
      {
        startTime,
        exercises,
      },
      {
        onSuccess: () => {
          clearWorkout();
          navigate("/");
        },
        onError: (error) => {
          console.log(error);
          {
            /* Додати alert для юзера */
          }
        },
      },
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton 
        onClick={handlefinish} 
        isLoading={saveWorkoutMutation.isPending}
        disabled={saveWorkoutMutation.isPending || !exercises.length}
        variant="outlined"
        color="success">
            Finish
        </AppButton>
    </Box>
  );
};
