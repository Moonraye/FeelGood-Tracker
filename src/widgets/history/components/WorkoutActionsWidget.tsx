import { Box, IconButton, Tooltip } from "@mui/material";
import { useWorkoutAction } from "../../../features/history/hooks/useWorkoutAction";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import { SaveTemplateInput } from "@/features/history/hooks/useSaveTemplateMutation";

interface WorkoutActionsWidgetProps {
  workout: SaveTemplateInput;
}

export const WorkoutActionsWidget = ({workout}: WorkoutActionsWidgetProps) => {
  const { handleSaveAsTemplate, handleRepeatWorkout, isSavingTemplate } =
    useWorkoutAction(workout);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Save as Template">
        <IconButton
          onClick={handleSaveAsTemplate}
          disabled={isSavingTemplate}
          color="primary"
        >
          <BookmarkAddOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Repeat Workout">
        <IconButton
          onClick={handleRepeatWorkout}
          color="secondary"
          sx={{ bgcolor: "action.hover" }}
        >
          <RepeatIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
