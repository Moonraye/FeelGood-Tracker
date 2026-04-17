import { Box } from "@mui/material";
import { QuickStartButtons } from "../features/dashboard/components/QuickStartButtons";
import { WorkoutStatsWidget } from "../widgets/dashboard/components/WorkoutStatsWidget";
import { RecentWorkoutWidget } from "../widgets/dashboard/components/RecentWorkoutWidget";

export const Home = () => {
  return (
    <Box sx={{ pb: 10, pt: 2 }}>
      <QuickStartButtons />

      <WorkoutStatsWidget />

      <RecentWorkoutWidget />
    </Box>
  );
};
