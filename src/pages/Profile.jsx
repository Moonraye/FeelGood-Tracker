import { Box, CircularProgress, Divider } from "@mui/material";
import { useLogoutMutation } from "../features/auth/hooks/useAuthMutation";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";

import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";

import { ProfileHeader } from "../features/profile/components/ProfileHeader";
import { ProfileStats } from "../features/profile/components/ProfileStats";

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
          <ProfileHeader
            avatarUrl={profile?.avatar_url}
            displayName={profile?.display_name}
          />

          <ProfileStats />

          <Box sx={{ mt: 3, pt: 2, border: "1px solid", borderRadius: 1 }}>
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
