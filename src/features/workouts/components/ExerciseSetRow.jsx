import { Box, InputBase, Paper, Typography, IconButton} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export const ExerciseSetRow = ({
  exerciseId,
  set,
  index,
  onUpdateSet,
  onToggleCompletion,
  onRemoveSet,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 2fr 2fr 1fr",
        gap: 1,
        alignItems: "center",
        mb: 1,
        backgroundColor: set.isCompleted ? "action.selected" : "transparent",
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
          value={set.weight || ""}
          onChange={(e) =>
            onUpdateSet(exerciseId, set.id, "weight", e.target.value)
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
            onUpdateSet(exerciseId, set.id, "reps", e.target.value)
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
            onUpdateSet(exerciseId, set.id, "rpe", e.target.value)
          }
          disabled={set.isCompleted}
        />
      </Paper>

      <Box sx={{ display: "flex" }}>
        <IconButton
          size="small"
          color={set.isCompleted ? "success" : "default"}
          onClick={() => onToggleCompletion(exerciseId, set.id)}
        >
          {set.isCompleted ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </IconButton>
        <IconButton
          size="small"
          color={set.isCompleted ? "success" : "default"}
          onClick={() => onRemoveSet(exerciseId, set.id)}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
