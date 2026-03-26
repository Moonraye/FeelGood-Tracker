import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
 

import { useExercisesQuery } from "../../../features/workouts/hooks/useExercisesQuery";
import { AppTextField } from "../../../components/ui/AppTextField";

export const ExerciseSearchList = ({ onSelect }) => {
  const { data: exercises, isLoading } = useExercisesQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises =
    exercises?.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 2, pb: 0 }}>
        <AppTextField
          label="Search"
          placeholder="Search exercise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ mt: 0 }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredExercises.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
            No exercises found.
          </Typography>
        ) : (
          <List
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {filteredExercises.map((exercise, index) => (
              <ListItem
                key={exercise.id}
                disablePadding
                divider={index < filteredExercises.length - 1}
              >
                <ListItemButton
                  onClick={() => onSelect(exercise)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText primary={exercise.name} />
                  {exercise.muscle_group && (
                    <Chip
                      label={exercise.muscle_group}
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1, borderRadius: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};
