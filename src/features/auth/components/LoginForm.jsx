import { Box, Alert } from "@mui/material";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppButton } from "../../../components/ui/AppButton";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
    const { formik, loginMutation } = useLoginForm();

    const getErrorProps = (fieldName) => ({
        error: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
        helperText: formik.touched[fieldName] && formik.errors[fieldName],
    })

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

        {loginMutation.isError && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {loginMutation.error.message}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <AppButton
            fullWidth
            type="submit"
            variant="contained"
            isLoading={loginMutation.isPending}
          >
            Login
          </AppButton>
        </Box>
      </form>
    )
}