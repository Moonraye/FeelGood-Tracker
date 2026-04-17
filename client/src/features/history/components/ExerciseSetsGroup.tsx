import { Box, Divider, Paper, Typography } from "@mui/material";

export interface ExerciseSetData {
  id?: string | number;
  weight?: string | number | null;
  reps?: string | number | null;
  rpe?: string | number | null;
}

interface ExerciseSetsGroupProps {
  exerciseName: string;
  sets?: ExerciseSetData[] | null;
}

export const ExerciseSetsGroup = ({ exerciseName, sets }: ExerciseSetsGroupProps) => {
    if (!sets || sets.length === 0) return null;

    return(
        <Paper elevation={0} sx={{ p: 2, mt:2, mb: 2, borderRadius: 3 }}>
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
              key={set.id || setIndex}
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
    )
}