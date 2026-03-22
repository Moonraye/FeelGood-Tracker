import { Box } from "@mui/material";
import { QuickStartButtons } from "../features/workouts/components/QuickStartButtons";
import { WorkoutStats } from "../features/workouts/components/WorkoutStats";
import { RecentWorkout } from "../features/workouts/components/RecentWorkout";

export const Home = () => {
  return (
    <Box sx={{ pb: 10, pt: 2 }}>
      <QuickStartButtons /> 
      <WorkoutStats streak={12} volume={100} />
      <RecentWorkout />
    </Box>
  );
};

