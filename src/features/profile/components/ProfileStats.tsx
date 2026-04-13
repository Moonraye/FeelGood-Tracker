import { Paper, Box, Typography } from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

interface ProfileStatsProps{
  workoutsCount?: number;
  favoriteExercise?: string;
}
export const ProfileStats = ({
  workoutsCount = 0,
  favoriteExercise = "N/A",
}: ProfileStatsProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        mt: 2,
      }}
    >
      <Paper
        sx={{
          position: "relative",
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          gap: 1,
        }}
      >
        <WorkspacePremiumOutlinedIcon
          sx={{
            color: "#3356c9",
            bgcolor: "#ccd8ffb7",
            borderRadius: "30%",
            fontSize: 40,
            p: 1,
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {workoutsCount}
        </Typography>
        <Typography variant="overline" color="text.secondary">
          My Workouts
        </Typography>
      </Paper>

      <Paper
        sx={{
          position: "relative",
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          gap: 1,
        }}
      >
        <StarBorderOutlinedIcon
          color="error"
          sx={{ bgcolor: "#ffdbd4", borderRadius: "30%", fontSize: 40, p: 1 }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {favoriteExercise}
        </Typography>
        <Typography variant="overline" color="text.secondary">
          My Favorite Exercise
        </Typography>
      </Paper>
    </Box>
  );
};
