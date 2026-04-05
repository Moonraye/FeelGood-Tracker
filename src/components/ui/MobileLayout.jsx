import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBottomNavigation } from "./AppBottomNavigation";
import { AppThemeSwitcher } from "./AppThemeSwitcher";

export const MobileLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          <Typography
            color="text.primary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            FeelGood
          </Typography>
          <AppThemeSwitcher />
        </Toolbar>
      </AppBar>

      <Box>
        <Outlet />
      </Box>

      <AppBottomNavigation />
    </Box>
  );
};
