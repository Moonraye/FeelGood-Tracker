import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { getAppTheme } from "./config/theme";
import { useAuthListener } from "./features/auth/hooks/useAuthListener";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { MobileLayout } from "./components/ui/MobileLayout";
import { Profile } from "./pages/Profile";
import AuthForm from "./features/auth/components/AuthForm";


const Home = () => <div>Dashboard (Workouts)</div>; // Додано компонент Home
const ActiveWorkout = () => <div>Active Workout Tracking</div>;

function App() {

  const isInitialized = useAuthListener();
  
  if (!isInitialized) {
    return <div>Loading...</div>; // add loader component later
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

            </Route>

            <Route path="/workout/active" element={<ActiveWorkout />} />

          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
