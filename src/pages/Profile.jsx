import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useLogoutMutation } from "../features/auth/hooks/useAuthMutation";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";

import { AppButton } from "../components/ui/AppButton";
import UploadAvatar from "../features/profile/components/UploadAvatar";

export const Profile = () => {
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
      <Typography variant="h5" fontWeight="bold">
        Profile
      </Typography>

      {user && (
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <UploadAvatar currentAvatarUrl={profile?.avatar_url} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {profile?.display_name || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile?.email}
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              My activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              My progress
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: "auto", pt: 2 }}>
        <AppButton
          onClick={handleLogout}
          color="error"
          variant="outlined"
          isLoading={logoutMutation.isPending}
          disabled={logoutMutation.isPending}
        >
          Logout
        </AppButton>
      </Box>
    </Box>
  );
};
