import { Paper, Typography, Box } from "@mui/material";

export const RecentWorkout = ({ workout }) => {
  if (!workout) {
    return (
      <Box sx={{ mt: 4, px: 2, textAlign: "center" }}>
        <Typography color="text.secondary">No recent workouts yet.</Typography>
      </Box>
    );
  }

  const exerciseNames = [
    ...new Set(workout.sets?.map((s) => s.exercises?.name).filter(Boolean)),
  ].join(", ");

  const previewSets = workout.sets?.slice(0, 2) || [];

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Recent History
      </Typography>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {workout.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {exerciseNames || "No exercises recorded"}
        </Typography>

      {previewSets.length > 0 && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {previewSets.map((set, index) => (
            <Paper
                key={set.id || index}
                variant="outlined"
                sx={{
                  p: 1,
                  flex: 1,
                  textAlign: "center",
                  bgcolor: "background.default",
                }}
              >
                <Typography variant="caption">
                  Set {index + 1}: {set.weight ? `${set.weight}kg x ` : ""}{set.reps}
                </Typography>
              </Paper>
          ))}
        </Box>
        )}
      </Paper>
    </Box>
  );
};
