import { useNavigate } from "react-router-dom";
import { formatDate, formatDuration } from "../../../utils/dateFormatter";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AppButton } from "../../../components/ui/AppButton";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDeleteWorkoutMutation } from "../hooks/useDeleteWorkoutMutation";
import { useSnackbarStore } from "../../../store/useSnackbarStore";
import { useState } from "react";
import { AppConfirmDialog } from "../../../components/ui/AppConfirmDialog";
import { DialogContentText } from "@mui/material";

export const HistoryCard = ({ workout }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMutation = useDeleteWorkoutMutation();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const navigate = useNavigate();
  const exerciseNames = [
    ...new Set(workout.sets?.map((s) => s.exercises?.name).filter(Boolean)),
  ].join(", ");

  const totalSets = workout.sets?.length || 0;

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(workout.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        showSnackbar("Workout deleted successfully", "success");
      },
      onError: () => {
        showSnackbar("Failed to delete workout", "error");
      },
    });
  };

  return (
    <>
      <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mb: 1,
            gap: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {workout.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EventAvailableIcon
                  color="action"
                  sx={{ mr: 0.5, fontSize: 16 }}
                />
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {formatDate(workout.created_at)}
                </Typography>
              </Box>
              <Box>
                {workout.duration && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon
                      color="action"
                      sx={{ mr: 0.5, fontSize: 16 }}
                    />
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      sx={{ lineHeight: 1 }}
                    >
                      {formatDuration(workout.duration)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
                    <IconButton 
          onClick={handleDelete}
          sx={{ color: "error.main" }}
          size="small"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
          </Box>
        </Box>

        <Box
          sx={{ mb: 1, bgcolor: "background.default", p: 0.5, borderRadius: 1 }}
        >
          <ol>
            {exerciseNames.split(", ").map((exerciseNames, index) => (
              <li key={index}>{exerciseNames || "No exercises recorded"}</li>
            ))}
          </ol>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
          }}
        >
          <Typography variant="caption" fontWeight="bold" color="primary.main">
            {totalSets} sets total
          </Typography>

          <AppButton
            variant="text"
            color="primary"
            onClick={() => navigate(`/history/${workout.id}`)}
          >
            Details
          </AppButton>
        </Box>
      </Paper>

      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Workout"
        confirmText="Delete"
        confirmColor="error"
        isLoading={deleteMutation.isPending}
      >
        <DialogContentText>
          Are you sure you want to delete "{workout.name}"? This action cannot
          be undone and will affect your overall stats.
        </DialogContentText>
      </AppConfirmDialog>
    </>
  );
};
