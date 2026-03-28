import { Box, CircularProgress } from "@mui/material";
import { QuickStartButtons } from "../features/dashboard/components/QuickStartButtons";
import { WorkoutStats } from "../features/dashboard/components/WorkoutStats";
import { RecentWorkout } from "../features/dashboard/components/RecentWorkout";

import { useUserStatsQuery } from "../features/dashboard/hooks/useUserStatsQuery";
import { useRecentWorkoutQuery } from "../features/dashboard/hooks/useRecentWorkoutQuery";

export const Home = () => {
  const { data: stats, isLoading: isStatsLoading } = useUserStatsQuery();
  const { data: recentWorkout, isLoading: isRecentLoading } = useRecentWorkoutQuery();

  return (
    <Box sx={{ pb: 10, pt: 2 }}>
      <QuickStartButtons /> 

      {isStatsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <WorkoutStats 
        streak={stats?.workoutsCount || 0} 
        volume={stats?.monthlyVolume || 0} />
      )}

      {isRecentLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <RecentWorkout workout={recentWorkout} />
      )}   
    </Box>
  );
};

