import { Box, Paper, Typography, IconButton, InputBase } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AppButton } from "../../../components/ui/AppButton";
import { ExerciseSetRow } from "./ExerciseSetRow";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";

export const ExerciseCard = ({ exercise }) => {

  const {
    addSet, 
    removeExercise,
    updateExerciseNote,
  } = useActiveWorkoutStore();


  return (
    <Paper elevation={1} sx={{ p: 2, m: 2, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {exercise.name}
        </Typography>
        <IconButton
          size="small"
          color="error"
          onClick={() => removeExercise(exercise.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr",
          gap: 1,
          mb: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          SET
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          KG
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          REPS
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          RPE
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          ✓
        </Typography>
      </Box>

      {exercise.sets.map((set, index) => (
        <ExerciseSetRow
          key={set.id}
          exerciseId={exercise.id}
          set={set}
          index={index}
        />
      ))}

      <Box>
        <AppButton
          variant="text"
          color="text.secondary"
          fullWidth
          sx={{ mt: 1, bgcolor: "primary.",}}
          onClick={() => addSet(exercise.id)}
        >
          + Add Set
        </AppButton>
        <InputBase
          fullWidth
          multiline
          placeholder="Add notes for this exercise..."
          value={exercise.notes || ""}
          onChange={(e) => updateExerciseNote(exercise.id, e.target.value)}
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            "& textarea": { padding: 0 },
            m: 1,
          }}
        >
          Add Description
        </InputBase>
      </Box>
    </Paper>
  );
};
