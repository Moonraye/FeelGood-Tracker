import { Box, Typography } from "@mui/material";
import { AppButton } from "../../../components/ui/AppButton";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";

interface WorkoutSelectionWidgetProps {
  onOpenTemplates: () => void;
  onOpenHistory: () => void;
}

export const WorkoutSelectionWidget = ({ onOpenTemplates, onOpenHistory }: WorkoutSelectionWidgetProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <AppButton
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          gap: 1,
          justifyContent: "left",
        }}
        onClick={onOpenTemplates}
      >
        <PlayArrowSharpIcon
          sx={{
            bgcolor: "#e5e4f8",
            color: "#3356c9",
            borderRadius: "30%",
            fontSize: 40,
            p: 1,
          }}
        />
        <Typography color={"text.primary"} variant="button">Templates</Typography>
      </AppButton>
      <AppButton
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          gap: 1,
          justifyContent: "left",
          color: "text.primary",
        }}
        onClick={onOpenHistory}
      >
        <PlayArrowSharpIcon
          sx={{
            bgcolor: "#f5fddf",
            color: "#046900",
            borderRadius: "30%",
            fontSize: 40,
            p: 1,
          }}
        />
        <Typography color={"text.primary"} variant="button">History</Typography>
      </AppButton>
    </Box>
  );
};
