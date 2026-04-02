import { useState } from "react";
import { Box, Tab, Tabs, Typography} from "@mui/material";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const AuthForm = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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

      {tabIndex === 0 ? <LoginForm /> : <RegisterForm />}
    </Box>
  );
};
export default AuthForm;
