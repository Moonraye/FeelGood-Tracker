import { Box, Typography } from "@mui/material";
import { AppButton } from "../../../components/ui/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../../active-workout/store/useActiveWorkoutStore";

export const QuickStartButtons = () => {
  const navigate = useNavigate();
  const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);

  const handleStartNew = () => {
    startWorkout();
    navigate("/active");
  };

  return (
    <Box>
      <Typography>Start Workout</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          mt: 2,
          p: 2,
        }}
      >
        <AppButton
          sx={{
            backgroundColor: "orange",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={handleStartNew}
        >
          <AddIcon sx={{ width: 40, height: 40 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Start New
          </Typography>
        </AppButton>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <AppButton variant="outline" sx={{ backgroundColor: "white" }}>
            Push Day
          </AppButton>
          <AppButton variant="outline" sx={{ backgroundColor: "white" }}>
            Pull Day
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};
