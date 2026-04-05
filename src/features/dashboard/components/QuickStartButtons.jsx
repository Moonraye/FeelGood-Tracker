import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { AppButton } from "../../../components/ui/AppButton";
import { useQuickStartActions } from "../hooks/useQuickStartActions";
import { WorkoutSelectionDialog } from "../../../widgets/dashboard/components/WorkoutSelectionDialog";
import { WorkoutSelectionWidget } from "../../../widgets/dashboard/components/WorkoutSelectionWidget";
import { useDeleteWorkoutMutation } from "../../history/hooks/useDeleteWorkoutMutation";

export const QuickStartButtons = () => {
  const {
    isTemplatesOpen, setIsTemplatesOpen,
    isHistoryOpen, setIsHistoryOpen,
    templates, isTemplatesLoading, 
    history, isHistoryLoading,
    handleStartSelectedWorkout,
    startEmptyWorkout,   
  } = useQuickStartActions();

  const deleteMutation = useDeleteWorkoutMutation();

  const handleDeleteTemplate = (id) => {
    deleteMutation.mutate(id);
  }

  return (
    <Box>
      <Typography variant="body1" fontSize="1.3rem" sx={{ pl: 2, mt: 2 }}>
        Quick Start
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          p: 2,
        }}
      >
        <AppButton
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            p: 3,
          }}
          onClick={startEmptyWorkout}
        >
          <AddIcon sx={{ width: 40, height: 40 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Empty Workout
          </Typography>
        </AppButton>

          <WorkoutSelectionWidget
            onOpenTemplates={() => setIsTemplatesOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />

          <WorkoutSelectionDialog
            open={isTemplatesOpen}
            onClose={() => setIsTemplatesOpen(false)}
            title="Select a Template"
            workouts={templates}
            isLoading={isTemplatesLoading}
            onSelect={handleStartSelectedWorkout}
            onDelete={handleDeleteTemplate}
          />

          <WorkoutSelectionDialog
            open={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            title="Select a Workout"
            workouts={history}
            isLoading={isHistoryLoading}
            onSelect={handleStartSelectedWorkout}
          />
      </Box>
    </Box>
  );
};
