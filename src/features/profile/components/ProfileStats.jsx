import { Paper, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const ProfileStats = ({ workoutsCount = 42, restDaysCount = 8 }) => {
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
        <ModeEditOutlineIcon />
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
        <ModeEditOutlineIcon />
        <Typography>{restDaysCount}</Typography>
        <Typography>Rest Days</Typography>
      </Paper>
    </Paper>
  );
};
