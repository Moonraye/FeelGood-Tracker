import { Box, IconButton, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { useSaveWorkoutMutation } from "../hooks/useSaveWorkoutMutation";
import { AppButton } from "../../../components/ui/AppButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WorkoutTimer } from "./WorkoutTimer";
import { useSnackbarStore } from "../../../store/useSnackbarStore";

export const ActiveWorkoutHeader = () => {
  const navigate = useNavigate();
  const { startTime, exercises, clearWorkout, workoutName, setWorkoutName } =
    useActiveWorkoutStore();
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

  return (
    <Box 
      sx={{
        width: '100%',
        p:1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: 'column',justifyContent:'center', alignItems: 'center', }}>
        <InputBase
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{
            fontSize: "1 rem",
            fontWeight: "bold",
          }}
          placeholder="Workout Name"
          inputProps={{ style: { textAlign: 'center' } }}
        />
        <WorkoutTimer />

      </Box>
      <Box>
        <AppButton
          variant="contained"
          fullWidth
          onClick={handleFinish}
          isLoading={saveWorkoutMutation.isPending}
          disabled={saveWorkoutMutation.isPending || !exercises.length}
          color="error"
          sx={{ height: '40px' }}
        >
          Finish
        </AppButton>
      </Box>
    </Box>
  );
};
