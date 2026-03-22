import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import IconButton from "@mui/material/IconButton";
import { useLogoutMutation } from "../features/auth/hooks/useAuthMutation";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";

import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import AppAvatar from "../components/ui/AppAvatar";

export const Profile = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isProfileLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3, pb: 10 }}
    >
      {user && (
        <Box>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
              p: 3,
              alignItems: "center",
              mt: 1,
              background: "none",
            }}
          >
            <AppAvatar
              src={profile?.avatar_url}
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{}}>
              <Typography variant="h6" fontWeight="bold">
                {profile?.display_name || "User"}
              </Typography>
              {/* <IconButton
                
                sx={{ mr: 1, ml: -1, position: "absolute", right: 0, top: 0}}
              >
                <ModeEditOutlineIcon />
              </IconButton> */}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              borderRadius: "30%",
              borderColor: "divider",
              background: "none",
            }}
          >
            <Paper
              sx={{
                border: "2px solid",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ModeEditOutlineIcon />
              <Typography>42</Typography>
              <Typography>Workouts</Typography>
            </Paper>

            <Paper
              sx={{
                border: "2px solid",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ModeEditOutlineIcon />
              <Typography>8</Typography>
              <Typography>Rest Days</Typography>
            </Paper>
          </Paper>

          <Box sx={{ mt: 3, pt: 2, border: "1px solid", borderRadius: 1}}>
            <AppButton
              variant="outlined"
              onClick={() => navigate("/settings")}
              sx={{ border: 0 }}
            >
              Personal Info
            </AppButton>
            <Divider />
            <AppButton
              variant="outlined"
              onClick={() => navigate("/settings")}
              sx={{ border: 0 }}
            >
              Personal Info
            </AppButton>
            <Divider />

            <AppButton
              onClick={handleLogout}
              color="error"
              variant="outlined"
              isLoading={logoutMutation.isPending}
              disabled={logoutMutation.isPending}
              sx={{ border: 0 }}
            >
              Logout
            </AppButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
