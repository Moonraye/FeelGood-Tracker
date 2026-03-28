import { Box, IconButton, Typography, CircularProgress, Paper} from "@mui/material";
import { AppButton } from "../components/ui/AppButton";
import { AppTextField } from "../components/ui/AppTextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadAvatar from "../features/profile/components/UploadAvatar";

import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../features/profile/hooks/useUpdateProfileMutation";
import { useState } from "react";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";

const SettingForm = ({ profile }) => {
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateProfileMutation();

  const [displayName, setDisplayName] = useState(profile?.display_name || "");

  const handleSave = () => {
    if (displayName === profile?.display_name) {
      navigate("/profile");
      return;
    }

    updateProfileMutation.mutate({ displayName });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt:3 }}>
        <IconButton onClick={() => navigate("/profile")} sx={{ mr: 1, ml: -1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Profile Settings
        </Typography>
      </Box>

      <Box
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <UploadAvatar currentAvatarUrl={profile?.avatar_url}/>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Personal information
        </Typography>

        <AppTextField
          label="Name (Display name)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your name"
        />

        <Box sx={{ mt: 3 }}>
          <AppButton
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={updateProfileMutation.isPending}
            isLoading={updateProfileMutation.isPending}
          >
            Save Changes
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

export const ProfileSettings = () => {
    const { data: profile, isLoading } = useProfileQuery();

    if (isLoading) {
        return <CircularProgress />;
    }

    return <SettingForm profile={profile} />;
}
