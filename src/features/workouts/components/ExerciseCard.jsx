import { Box, Paper, Typography, IconButton, InputBase } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useActiveWorkoutStore } from "../../../store/useActiveWorkoutStore";
import { AppButton } from "../../../components/ui/AppButton";

export const ExerciseCard = ({ exercise }) => {
  const {
    addSet,
    updateSet,
    toggleSetCompletion,
    removeExercise,
    removeSet,
    updateExerciseNote,
  } = useActiveWorkoutStore();

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
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
        <Box
          key={set.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr",
            gap: 1,
            alignItems: "center",
            mb: 1,
            backgroundColor: set.isCompleted
              ? "action.selected"
              : "transparent",
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Typography textAlign="center" fontWeight="bold">
            {index + 1}
          </Typography>

          <Paper
            elevation={0}
            sx={{ bgcolor: "background.default", borderRadius: 2 }}
          >
            <InputBase
              fullWidth
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              type="number"
              placeholder="-"
              value={set.kg || ""}
              onChange={(e) =>
                updateSet(exercise.id, set.id, "kg", e.target.value)
              }
              disabled={set.isCompleted}
            />
          </Paper>

          <Paper
            elevation={0}
            sx={{ bgcolor: "background.default", borderRadius: 2 }}
          >
            <InputBase
              fullWidth
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              type="number"
              placeholder="-"
              value={set.reps}
              onChange={(e) =>
                updateSet(exercise.id, set.id, "reps", e.target.value)
              }
              disabled={set.isCompleted}
            />
          </Paper>

          <Paper
            elevation={0}
            sx={{ bgcolor: "background.default", borderRadius: 2 }}
          >
            <InputBase
              fullWidth
              inputProps={{ min: 0, max: 10, style: { textAlign: "center" } }}
              type="number"
              placeholder="-"
              value={set.rpe}
              onChange={(e) =>
                updateSet(exercise.id, set.id, "rpe", e.target.value)
              }
              disabled={set.isCompleted}
            />
          </Paper>

          <Box sx={{ display: "flex" }}>
            <IconButton
              size="small"
              color={set.isCompleted ? "success" : "default"}
              onClick={() => toggleSetCompletion(exercise.id, set.id)}
            >
              {set.isCompleted ? (
                <CheckCircleIcon />
              ) : (
                <CheckCircleOutlineIcon />
              )}
            </IconButton>
            <IconButton
              size="small"
              color={set.isCompleted ? "success" : "default"}
              onClick={() => removeSet(exercise.id, set.id)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box>
        <AppButton
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 1, bgcolor: "primary.light", color: "primary.dark" }}
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
            mt: 1

          }}
        >
          Add Description
        </InputBase>
      </Box>
    </Paper>
  );
};
