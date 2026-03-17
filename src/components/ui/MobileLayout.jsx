import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  FitnessCenter,
  FormatListBulleted,
  Person,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from "./FloatingActiveButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const MobileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FeelGood Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box>
        <Outlet />
      </Box>

      <FloatingActionButton
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 24, left: 24 }}
        onClick={() => navigate("/workout/active")}
      >
        <AddIcon />
      </FloatingActionButton>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={location.pathname}
          onChange={(event, newValue) => {
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            label="Workouts"
            value="/"
            icon={<FitnessCenter />}
          />
          <BottomNavigationAction
            label="Exercises"
            value="/exercises"
            icon={<FormatListBulleted />}
          />
          <BottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<Person />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
