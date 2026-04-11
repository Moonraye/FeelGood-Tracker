import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { formatDate } from "../../../utils/dateFormatter";
import { DeleteOutline } from "@mui/icons-material";

interface DialogWorkoutItem {
  id: string;
  name: string;
  created_at: string | null;
  sets?: any;
}

interface WorkoutSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  workouts?: DialogWorkoutItem[] | null;
  isLoading: boolean;
  onSelect: (workout: any) => void;
  onDelete?: (id: string) => void;
}

export const WorkoutSelectionDialog = ({
  onSelect,
  open,
  onClose,
  title,
  workouts,
  isLoading,
  onDelete,
}: WorkoutSelectionDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : workouts?.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            No workout recorded
          </Typography>
        ) : (
          <List>
            {workouts?.map((workout) => (
              <ListItem
                key={workout.id}
                disablePadding
                secondaryAction={
                  onDelete ? (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(workout.id);
                      }}
                    >
                      <DeleteOutline color="error" />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemButton onClick={() => onSelect(workout)}>
                  <ListItemText
                    primary={workout.name.replace(" (Template)", "")}
                    secondary={formatDate(workout.created_at)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};
