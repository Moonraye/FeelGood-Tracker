import {
  Box,
  IconButton,
  InputBase,
  FormControlLabel,
  Switch,
} from "@mui/material";
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
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box>
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
        }}
      >
        <InputBase
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{
            fontSize: "1 rem",
            fontWeight: "bold",
          }}
          placeholder="Workout Name"
          inputProps={{ style: { textAlign: "center" } }}
        />
        <WorkoutTimer />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={saveAsTemplate}
              onChange={(e) => setSaveAsTemplate(e.target.checked)}
              color="primary"
            />
          }
          label="Save as Template"
          sx={{  }}
        />
        <AppButton
          variant="contained"
          fullWidth
          onClick={handleFinish}
          isLoading={isPending}
          disabled={isPending || !canFinish}
          color="error"
          sx={{ height: "40px" }}
        >
          Finish
        </AppButton>
      </Box>
    </Box>
  );
};
