import {
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { ExerciseSearchList } from "../features/workouts/components/ExerciseSearchList";

export const SelectExercise = () => {
  const navigate = useNavigate();
  const { addExercise } = useActiveWorkoutStore();

  const handleSelect = (exercise) => {
    addExercise({ id: exercise.id, name: exercise.name });
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ ml: -1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Add Exercise
        </Typography>
        <IconButton onClick={() => navigate('/user-exercises')} sx={{ ml: -1 }}>
          <AddIcon />
          <Typography variant="button"  >Add Custom Exercise</Typography>
        </IconButton>
      </Paper>

        <ExerciseSearchList onSelect={handleSelect}/> 
    </Box>
  );
};
