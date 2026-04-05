// src/pages/ProfileSettings.jsx
import { Box, CircularProgress } from "@mui/material";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";
import { PageHeader } from "../components/ui/PageHeader";
import { ProfileSettingsForm } from "../features/profile/components/ProfileSettingsForm";

export const ProfileSettings = () => {
  const { data: profile, isLoading } = useProfileQuery(); 

  if (isLoading) { 
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <ProfileSettingsForm profile={profile} />
    </Box>
  );
};