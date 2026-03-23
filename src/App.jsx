import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CircularProgress, CssBaseline } from "@mui/material";

import { getAppTheme } from "./config/theme";
import { useAuthListener } from "./features/auth/hooks/useAuthListener";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { MobileLayout } from "./components/ui/MobileLayout";
import { Profile } from "./pages/Profile";
import { ProfileSettings } from "./pages/ProfileSettings";
import { Home } from "./pages/Home";
import { SelectExercise } from "./pages/SelectExercise";
import { ActiveWorkout } from "./pages/ActiveWorkout";

import AuthForm from "./features/auth/components/AuthForm";


function App() {

  const isInitialized = useAuthListener();
  
  if (!isInitialized) {
    return <CircularProgress />; 
  }

  return (
    <ThemeProvider theme={getAppTheme('light')}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<AuthForm />} />

          <Route element={<ProtectedRoute />}>

            <Route element={<MobileLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/settings" element={<ProfileSettings/>} />


            </Route>

            <Route path="/active" element={<ActiveWorkout />} />
            <Route path="/add-exercise" element={<SelectExercise />} />



          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
