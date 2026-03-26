import { Paper, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export const ProfileStats = ({ workoutsCount = 0, favoriteExercise = "N/A" }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        borderRadius: "30%",
        borderColor: "divider",
        background: "none",
      }}
    >
      <Paper
        sx={{
          border: "2px solid",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FitnessCenterIcon />
        <Typography>{workoutsCount}</Typography>
        <Typography>Workouts</Typography>
      </Paper>

      <Paper
        sx={{
          border: "2px solid",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FitnessCenterIcon />
        <Typography>{favoriteExercise}</Typography>
        <Typography>Favorite Exercise</Typography>
      </Paper>
    </Paper>
  );
};
