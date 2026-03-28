import { Box, CircularProgress } from "@mui/material";
import { useLogoutMutation } from "../features/auth/hooks/useAuthMutation";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery"
import { useUserStatsQuery } from "../features/dashboard/hooks/useUserStatsQuery";

import { AppButton } from "../components/ui/AppButton";
import { useNavigate } from "react-router-dom";

import { ProfileHeader } from "../features/profile/components/ProfileHeader";
import { ProfileStats } from "../features/profile/components/ProfileStats";

import { formatJoinDate } from "../features/profile/utils/dateFormatter";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const Profile = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);

  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();
  const { data: stats, isLoading: isStatsLoading } = useUserStatsQuery();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isProfileLoading || isStatsLoading) {
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
            joinedDate={formatJoinDate(user.created_at)}
          />

          <ProfileStats workoutsCount={stats?.workoutsCount || 0}
            favoriteExercise={stats?.favoriteExercise || "N/A"}/>

          <Box sx={{ mt: 3, borderRadius: 1 }}>
            <AppButton
              color="background.paper"
              onClick={() => navigate("/settings")}
              sx={{ border: 0,}}
            >
              <ModeEditOutlineIcon />
              Personal Info
            </AppButton>
            <AppButton
              onClick={handleLogout}
              color="error"
              isLoading={logoutMutation.isPending}
              disabled={logoutMutation.isPending}
              sx={{ mt: 1 }}
            >
              <LogoutOutlinedIcon />
              Logout
            </AppButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
