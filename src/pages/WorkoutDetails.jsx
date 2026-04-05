import { useParams, useNavigate } from "react-router-dom";
import { useWorkoutDetailsQuery } from "../features/history/hooks/useWorkoutDetailsQuery";
import { formatDate } from "../utils/dateFormatter";
import { CircularProgress, Typography } from "@mui/material";
import { Box, Paper, Divider, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { groupSetsByExercise } from "../features/history/utils/groupSetsByExercise";
import { PageHeader } from "../components/ui/PageHeader";
import { ExerciseSetsGroup } from "../features/history/components/ExerciseSetsGroup";

export const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: workout, isLoading } = useWorkoutDetailsQuery(id);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!workout) {
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>
        Workout not found
      </Typography>
    );
  }

  const groupedSets = groupSetsByExercise(workout.sets);

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <PageHeader
        title={workout.name}
        subtitle={formatDate(workout.created_at)}
      />

      {Object.entries(groupedSets || {}).map(([exerciseName, sets], index) => (
        <ExerciseSetsGroup
          key={index}
          exerciseName={exerciseName}
          sets={sets}
        />
      ))}
    </Box>
  );
};
