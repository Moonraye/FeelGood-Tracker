import {
  Box,
  IconButton,
  InputBase,
  Tooltip, 
  Checkbox,
} from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AppButton } from "../../../components/ui/AppButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WorkoutTimer } from "./WorkoutTimer";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { useFinishWorkoutAction } from "../hooks/useFinishWorkoutAction";
import { useNavigate } from "react-router-dom";

export const ActiveWorkoutHeader = () => {
  const navigate = useNavigate();
  const workoutName = useActiveWorkoutStore((state) => state.workoutName);
  const setWorkoutName = useActiveWorkoutStore((state) => state.setWorkoutName);

  const {
    handleFinish,
    saveAsTemplate,
    setSaveAsTemplate,
    isPending,
    canFinish,
  } = useFinishWorkoutAction();

  return (
    <Box
      sx={{
        width: "100%",
        px: 1, 
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        minHeight: "64px",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 4,
          px: 1, 
        }}
      >
        <InputBase
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{
            fontSize: "1.15rem",
            fontWeight: "bold",
            width: "100%",
          }}
          placeholder="Workout Name"
          inputProps={{ style: { textAlign: "center" }, maxLength: 30 }}
        />
        <WorkoutTimer />
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Tooltip
          title={saveAsTemplate ? "Will save as template" : "Save as template"}
        >
          <Checkbox
            icon={<BookmarkBorderIcon color="action" />}
            checkedIcon={<BookmarkIcon color="primary" />}
            checked={saveAsTemplate}
            onChange={(e) => setSaveAsTemplate(e.target.checked)}
            sx={{ p: 0.5 }}
          />
        </Tooltip>

        <AppButton
          variant="contained"
          fullWidth
          onClick={handleFinish}
          isLoading={isPending}
          disabled={isPending || !canFinish}
          color="primary"
          sx={{
            minWidth: "70px", 
            height: "32px",
            px: 2,
            borderRadius: 6,
            fontSize: "0.85rem",
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Finish
        </AppButton>
      </Box>
    </Box>
  );
};
