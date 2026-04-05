// src/widgets/dashboard/components/WorkoutStatsWidget.jsx
import { Box, CircularProgress } from "@mui/material";
import { WorkoutStats } from "../../../features/dashboard/components/WorkoutStats"; 
import { useUserStatsQuery } from "../../../features/dashboard/hooks/useUserStatsQuery";

export const WorkoutStatsWidget = () => {
  const { data: stats, isLoading } = useUserStatsQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <WorkoutStats 
      streak={stats?.workoutsCount || 0} 
      volume={stats?.monthlyVolume || 0} 
    />
  );
};