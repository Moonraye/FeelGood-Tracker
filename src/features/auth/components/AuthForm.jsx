import { Box, Tab, Tabs, Typography} from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";
import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { formik: loginFormik, loginMutation } = useLoginForm();
  const { formik: registerFormik, registerMutation } = useRegisterForm();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        FeelGood Tracker
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        {tabIndex === 0 ? "Login" : "Register"}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <LoginForm formik={loginFormik} loginMutation={loginMutation} />
      )
    }
      {tabIndex === 1 && (
        <RegisterForm formik={registerFormik} registerMutation={registerMutation} />
      )}
    </Box>
  );
};
export default AuthForm;
