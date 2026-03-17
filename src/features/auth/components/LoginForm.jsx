import { Box, Alert } from "@mui/material";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppButton } from "../../../components/ui/AppButton";

export const LoginForm = ({ formik, loginMutation }) => {
    return (
        <form onSubmit={formik.handleSubmit}>
        <AppTextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <AppTextField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {loginMutation.isError && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {loginMutation.error.message}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <AppButton
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