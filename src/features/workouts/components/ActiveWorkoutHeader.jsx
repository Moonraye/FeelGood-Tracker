import { Box, IconButton, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../../../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "../hooks/useWorkoutMutation";
import { AppButton } from "../../../components/ui/AppButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WorkoutTimer } from "./WorkoutTimer";

export const ActiveWorkoutHeader = () => {
  const navigate = useNavigate();
  const { startTime, exercises, clearWorkout, workoutName, setWorkoutName } =
    useActiveWorkoutStore();
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
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ width: '50%' }}>
        <InputBase
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{
            fontSize: "1 rem",
            fontWeight: "bold",
          }}
          placeholder="Workout Name"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 3}}>
        <WorkoutTimer />
        <AppButton
          onClick={handleFinish}
          isLoading={saveWorkoutMutation.isPending}
          disabled={saveWorkoutMutation.isPending || !exercises.length}
          variant="outlined"
          color="success"
          sx={{ width: "auto", px: 3 }}
        >
          Finish
        </AppButton>
      </Box>
    </Box>
  );
};
