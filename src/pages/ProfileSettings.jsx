import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  DialogContentText
} from "@mui/material";
import { AppButton } from "../components/ui/AppButton";
import { AppTextField } from "../components/ui/AppTextField";
import { AppConfirmDialog } from "../components/ui/AppConfirmDialog";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadAvatar from "../features/profile/components/UploadAvatar";

import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../features/profile/hooks/useUpdateProfileMutation";
import { useState } from "react";
import { useProfileQuery } from "../features/profile/hooks/useProfileQuery";
import { useSnackbarStore } from "../store/useSnackbarStore";

const SettingForm = ({ profile }) => {
  const [isInfoEditDialogOpen, setInfoEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateProfileMutation();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const [displayName, setDisplayName] = useState(profile?.display_name || "");

  const handleConfirmSave = () => {
    updateProfileMutation.mutate({ 
      displayName: displayName,
    }, {
      onSuccess: () => {
        setInfoEditDialogOpen(false);
        showSnackbar("Profile updated successfully")
      }
      ,
      onError: () => {
        showSnackbar("Error updating profile")
      }
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 3 }}>
        <IconButton onClick={() => navigate("/profile")}>
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
        <UploadAvatar currentAvatarUrl={profile?.avatar_url} />

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
            onClick={() => setInfoEditDialogOpen(true)}
            color="primary"
            variant="contained"
            disabled={updateProfileMutation.isPending}
            isLoading={updateProfileMutation.isPending}
          >
            Save Changes
          </AppButton>

          <AppConfirmDialog
            open={isInfoEditDialogOpen}
            onClose={() => setInfoEditDialogOpen(false)}
            onConfirm={handleConfirmSave}
            title="Confirm Changes"
            confirmText="Save Changes"
            cancelText="Cancel"
            confirmColor="error"
          >
            <DialogContentText>
              Are you sure you want to save changes?
            </DialogContentText>
          </AppConfirmDialog>
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
};
