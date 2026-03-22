import { Paper, Typography, Box } from "@mui/material";

export const RecentWorkout = ({
  workoutName = "Calisthenics Pull Day",
  exercises = "Muscle-ups, Front Lever progressions, Pull-ups",
}) => {
  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Recent History
      </Typography>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {workoutName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {exercises}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              flex: 1,
              textAlign: "center",
              bgcolor: "background.default",
            }}
          >
            <Typography variant="caption">Set 1: 10 reps</Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              flex: 1,
              textAlign: "center",
              bgcolor: "background.default",
            }}
          >
            <Typography variant="caption">Set 2: 8 reps</Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};
