import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FitnessCenter, Person } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

export const AppBottomNavigation = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
  );
};
