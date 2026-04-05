import { Box, Typography } from "@mui/material";
import { AppButton } from "../../../components/ui/AppButton";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";

export const WorkoutSelectionWidget = ({ onOpenTemplates, onOpenHistory }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <AppButton
        sx={{
          backgroundColor: "white",
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
        <Typography color={"text.secondary"}>Templates</Typography>
      </AppButton>
      <AppButton
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          gap: 1,
          justifyContent: "left",
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
        <Typography color={"text.secondary"}>History</Typography>
      </AppButton>
    </Box>
  );
};
