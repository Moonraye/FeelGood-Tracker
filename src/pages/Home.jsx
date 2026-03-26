import { Box } from "@mui/material";
import { QuickStartButtons } from "../features/dashboard/components/QuickStartButtons";
import { WorkoutStats } from "../features/dashboard/components/WorkoutStats";
import { RecentWorkout } from "../features/dashboard/components/RecentWorkout";

export const Home = () => {
  return (
    <Box sx={{ pb: 10, pt: 2 }}>
      <QuickStartButtons /> 
      <WorkoutStats streak={12} volume={100} />
      <RecentWorkout />
    </Box>
  );
};

