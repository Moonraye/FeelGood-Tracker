import { Typography, Box, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HistoryCard } from "../features/history/components/HistoryCard";
import { useWorkoutHistoryQuery } from "../features/history/hooks/useWorkoutHistoryQuery";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui/PageHeader";

export const History = () => {
  const { data: workouts, isLoading } = useWorkoutHistoryQuery();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <PageHeader title="Workout History" showBack={true} />

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
