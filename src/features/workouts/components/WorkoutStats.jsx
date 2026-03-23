import { Paper, Box, Typography } from "@mui/material";

export const WorkoutStats = ({ streak = 0, volume = 0 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        mt: 2,
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          {streak}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Streak (Days)
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          {volume}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Volume (kg)
        </Typography>
      </Paper>
    </Box>
  );
};
