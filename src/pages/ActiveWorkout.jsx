import { Box, Typography } from "@mui/material";
import { ActiveWorkoutHeader } from "../features/active-workout/components/ActiveWorkoutHeader";
import { ExerciseCard } from "../features/active-workout/components/ExerciseCard";

import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../features/active-workout/store/useActiveWorkoutStore";
import { AppButton } from "../components/ui/AppButton";

export const ActiveWorkout = () => {
  const navigate = useNavigate();

  const {
    exercises,
    addSet,
    updateSet,
    toggleSetCompletion,
    removeExercise,
    removeSet,
    updateExerciseNote,
  } = useActiveWorkoutStore();

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      bgcolor: 'background.default',
      alignItems: 'center',
    }}>
      <ActiveWorkoutHeader />

      <Box sx={{ mt: 3 }}>
        {exercises.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ my: 4 }}>
            Is empty. Add an exercise to start.
          </Typography>
        ) : (
          exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onAddSet={addSet}
              onUpdateSet={updateSet}
              onToggleSetCompletion={toggleSetCompletion}
              onRemoveExercise={removeExercise}
              onRemoveSet={removeSet}
              onUpdateExerciseNote={updateExerciseNote}
            />
          ))
        )}
      </Box>
      <AppButton
        variant="contained"
        sx={{ bgcolor: 'primary.dark', width: '90%' }}
        onClick={() => navigate("/add-exercise")}
      >
        + Add Exercise
      </AppButton>
    </Box>
  );
};
