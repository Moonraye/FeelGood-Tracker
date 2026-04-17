import { Box, Alert } from "@mui/material";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppButton } from "../../../components/ui/AppButton";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { RegisterFormValues } from "../schema/authSchema";

export const RegisterForm = () => {
  const { formik, registerMutation } = useRegisterForm();

    const getErrorProps = (fieldName: keyof RegisterFormValues) => {
      const isTouched = formik.touched[fieldName];
      const errorMessage = formik.errors[fieldName];
  
      return {
        error: Boolean(isTouched && errorMessage),
        helperText: isTouched && errorMessage ? errorMessage : undefined,
      };
    }

  return (
    <form onSubmit={formik.handleSubmit}>
      <AppTextField
        label="Email"
        type="email"
        {...formik.getFieldProps('email')}
        {...getErrorProps('email')}
      />
      <AppTextField
        label="Password"
        type="password"
        {...formik.getFieldProps('password')}
        {...getErrorProps('password')}
      />
      <AppTextField
        label="Confirm Password"
        type="password"
        {...formik.getFieldProps('confirmPassword')}
        {...getErrorProps('confirmPassword')}
      />

      {registerMutation.isError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {registerMutation.error instanceof Error ? registerMutation.error.message : "Unknown error"}
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        <AppButton
          fullWidth
          type="submit"
          variant="contained"
          isLoading={registerMutation.isPending}
        >
          Register
        </AppButton>
      </Box>
    </form>
  );
};
