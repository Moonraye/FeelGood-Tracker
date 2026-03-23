import { Box, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../../../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "../hooks/useWorkoutMutation";
import { AppButton } from "../../../components/ui/AppButton";
import { AppTextField } from "../../../components/ui/AppTextField";

export const ActiveWorkoutHeader = () => {
  const navigate = useNavigate();
  const { startTime, exercises, clearWorkout, workoutName, setWorkoutName } = useActiveWorkoutStore();
  const saveWorkoutMutation = useSaveWorkoutMutation();

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
        <Box>
          <InputBase
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            sx={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                flexGrow: 1, 
                mr: 2 
            }}
            placeholder="Workout Name"
        />
        </Box>
        <AppButton 
        onClick={handleFinish} 
        isLoading={saveWorkoutMutation.isPending}
        disabled={saveWorkoutMutation.isPending || !exercises.length}
        variant="outlined"
        color="success"
        sx={{ width: 'auto', px: 3 }}>
            Finish
        </AppButton>
    </Box>
  );
};
