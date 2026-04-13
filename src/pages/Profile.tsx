import { Box, CircularProgress } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";
import { useUserStatsQuery } from "../features/dashboard/hooks/useUserStatsQuery";

import { ProfileHeader } from "../features/profile/components/ProfileHeader";
import { ProfileStats } from "../features/profile/components/ProfileStats";

import { formatDate } from "../utils/dateFormatter";
import { ProfileAction } from "../widgets/profile/components/ProfileActions";

export const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();
  const { data: stats, isLoading: isStatsLoading } = useUserStatsQuery();

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

  if (!user) return null;

  return (
    <Box
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3, pb: 10 }}
    >
      {user && (
        <Box>
          <ProfileHeader
            avatarUrl={profile?.avatar_url}
            displayName={profile?.display_name}
            joinedDate={formatDate(user.created_at)}
          />

          <ProfileStats
            workoutsCount={stats?.workoutsCount || 0}
            favoriteExercise={stats?.favoriteExercise || "N/A"}
          />

          <ProfileAction />
        </Box>
      )}
    </Box>
  );
};
