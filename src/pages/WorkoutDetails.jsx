import { useParams, useNavigate } from "react-router-dom";
import { useWorkoutDetailsQuery } from "../features/history/hooks/useWorkoutDetailsQuery";
import { formatDate } from "../utils/dateFormatter";
import { CircularProgress, Typography } from "@mui/material";
import { Box, Paper, Divider, IconButton } from "@mui/material"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


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

  const groupedSets = workout.sets?.reduce((acc, set) => {
    const name = set.exercises?.name || "Unknown Exercise";
    if (!acc[name]) acc[name] = [];
    acc[name].push(set);
    return acc;
  }, {});

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {workout.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(workout.created_at)}
          </Typography>
        </Box>
      </Box>

      {Object.entries(groupedSets || {}).map(([exerciseName, sets], index) => (
        <Paper key={index} elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="primary.main"
            sx={{ mb: 1 }}
          >
            {exerciseName}
          </Typography>
          <Divider sx={{ mb: 1 }} />

          {sets.map((set, setIndex) => (
            <Box
              key={set.id}
              sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}
            >
              <Typography variant="body2" color="text.secondary">
                Set {setIndex + 1}
              </Typography>
              <Typography variant="overline" fontWeight="bold">
                {set.weight ? `${set.weight} kg × ` : ""}{set.reps} reps (RPE {set.rpe})
              </Typography>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};
