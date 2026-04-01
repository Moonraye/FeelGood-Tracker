import { Typography, Box, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HistoryCard } from "../features/history/components/HistoryCard";
import { useWorkoutHistoryQuery } from "../features/history/hooks/useWorkoutHistoryQuery";
import { useNavigate } from "react-router-dom";

export const History = () => {
  const { data: workouts, isLoading } = useWorkoutHistoryQuery();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Box
        sx={{
          position: "sticky",
          top: 56, 
          display: "flex",
          alignItems: "center",
          mb: 3,
          bgcolor: "background.default",
          zIndex: 10, 
          py: 2,
          mx: -2, 
          px: 2,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Workout History
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : workouts?.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No workout recorded
        </Typography>
      ) : (
        workouts?.map((workout) => (
          <HistoryCard key={workout.id} workout={workout} />
        ))
      )}
    </Box>
  );
};
