// src/widgets/dashboard/components/RecentWorkoutWidget.jsx
import { Box, CircularProgress } from "@mui/material";
import { RecentWorkout } from "../../../features/dashboard/components/RecentWorkout"; 
import { useRecentWorkoutQuery } from "../../../features/dashboard/hooks/useRecentWorkoutQuery";

export const RecentWorkoutWidget = () => {
  const { data: recentWorkout, isLoading } = useRecentWorkoutQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return <RecentWorkout workout={recentWorkout} />;
};