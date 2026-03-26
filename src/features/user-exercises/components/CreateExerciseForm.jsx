import { Box, CircularProgress, Paper, MenuItem } from "@mui/material";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppButton } from "../../../components/ui/AppButton";
import { useCreateExerciseForm } from "../hooks/useCreateExerciseForm";
import { useMuscleGroupsQuery } from "../hooks/useMuscleGroupsQuery";

export const CreateExerciseForm = () => {
  const { formik, exerciseMutation } = useCreateExerciseForm();
  const { data: muscleGroups = [], isLoading: isMuscleGroupsLoading } = useMuscleGroupsQuery();

  return (  
    <Box sx={{ p: 2, flexGrow: 1 }}>
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
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder="e.g. Weighted Pull-ups"
          />

          <AppTextField
            select
            fullWidth
            label="Muscle Group"
            name="muscle_group"
            value={formik.values.muscle_group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.muscle_group && Boolean(formik.errors.muscle_group)
            }
            helperText={
              formik.touched.muscle_group && formik.errors.muscle_group
            }
            InputProps={{
                endAdornment: isMuscleGroupsLoading ? <CircularProgress size={20}/> : null
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
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            placeholder="Add any specific notes..."
          />

          <Box sx={{ mt: 2 }}>
            <AppButton type="submit" isLoading={exerciseMutation.isPending}>
              Save Exercise
            </AppButton>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};
