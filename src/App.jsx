import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CircularProgress, CssBaseline } from "@mui/material";

import { useAuthListener } from "./features/auth/hooks/useAuthListener";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { MobileLayout } from "./components/ui/MobileLayout";
import { Profile } from "./pages/Profile";
import { ProfileSettings } from "./pages/ProfileSettings";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { SelectExercise } from "./pages/SelectExercise";
import { ActiveWorkout } from "./pages/ActiveWorkout";
import AuthForm from "./features/auth/components/AuthForm";
import { CreateUserExercise } from "./pages/CreateUserExercise";
import { AppSnackBar } from "./components/ui/AppSnackbar";
import { WorkoutDetails } from "./pages/WorkoutDetails";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const isInitialized = useAuthListener();
  const theme = useThemeStore((state) => state.theme);

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<AuthForm />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MobileLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<ProfileSettings />} />
              <Route path="/user-exercises" element={<CreateUserExercise />} />
              <Route path="/history" element={<History />} />
            </Route>

            <Route path="/active" element={<ActiveWorkout />} />
            <Route path="/add-exercise" element={<SelectExercise />} />
            <Route path="/history/:id" element={<WorkoutDetails />} />
          </Route>
        </Routes>
      </Router>
      <AppSnackBar />
    </ThemeProvider>
  );
}

export default App;
