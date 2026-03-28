import { Box, Typography } from "@mui/material";
import { AppButton } from "../../../components/ui/AppButton";

import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
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
      <Typography variant="body1" fontSize="1.3rem" sx={{ pl: 2, mt: 2 }}>
        Start Workout
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          p: 2,
        }}
      >
        <AppButton
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            p: 3,
          }}
          onClick={handleStartNew}
        >
          <AddIcon sx={{ width: 40, height: 40 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Start New
          </Typography>
        </AppButton>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1}}>
          <AppButton
            variant="outline"
            sx={{ backgroundColor: "white", borderRadius: 2, gap: 1, justifyContent:"left" }}
          >
            <PlayArrowSharpIcon
              sx={{
                bgcolor: "#e5e4f8",
                color: "#3356c9",
                borderRadius: "30%",
                fontSize: 40,
                p: 1,
              }}
            />
            <Typography>Push Day</Typography>
          </AppButton>
          <AppButton
            variant="outline"
            sx={{ backgroundColor: "white", borderRadius: 2, gap: 1, justifyContent:"left" }}
          >
            <PlayArrowSharpIcon
              sx={{
                bgcolor: "#f5fddf",
                color: "#046900",
                borderRadius: "30%",
                fontSize: 40,
                p: 1,
              }}
            />
            <Typography>Pull Day</Typography>
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};
