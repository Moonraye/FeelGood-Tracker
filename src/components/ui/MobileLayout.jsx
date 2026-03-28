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
  Person,
} from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
export const MobileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar color="background.paper" position="sticky">
        <Toolbar>
          <Typography color="text.primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FeelGood
          </Typography>
        </Toolbar>
      </AppBar>

      <Box>
        <Outlet />
      </Box>



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
            label="History"
            value="/history"
            icon={<HistoryOutlinedIcon />}
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
