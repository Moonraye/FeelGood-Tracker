import { Box, CircularProgress, Paper, MenuItem } from "@mui/material";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppButton } from "../../../components/ui/AppButton";
import { useCreateExerciseForm } from "../hooks/useCreateExerciseForm";
import { useMuscleGroupsQuery } from "../hooks/useMuscleGroupsQuery";

export const CreateExerciseForm = ({ onSuccess }) => {
  const { formik, exerciseMutation } = useCreateExerciseForm({ onSuccess });
  const { data: muscleGroups = [], isLoading: isMuscleGroupsLoading } = useMuscleGroupsQuery();

  const getErrorProps = (fieldName) => ({
    error: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
    helperText: formik.touched[fieldName] && formik.errors[fieldName],
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <AppTextField
            label="Exercise Name"
            name="name"
            {...formik.getFieldProps("name")}
            {...getErrorProps("name")}
          />

          <AppTextField
            select
            fullWidth
            label="Muscle Group"
            name="muscle_group"
            {...formik.getFieldProps("muscle_group")}
            {...getErrorProps("muscle_group")}
            InputProps={{
              endAdornment: isMuscleGroupsLoading ? (
                <CircularProgress size={20} />
              ) : null,
            }}
            disabled={isMuscleGroupsLoading}
          >
            {muscleGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </AppTextField>

          <AppTextField
            label="Description (Optional)"
            name="description"
            multiline
            rows={3}
            {...formik.getFieldProps("description")}
            {...getErrorProps("description")}
          />

          <Box sx={{ mt: 2 }}>
            <AppButton
              fullWidth
              type="submit"
              isLoading={exerciseMutation.isPending}
            >
              Save Exercise
            </AppButton>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};
