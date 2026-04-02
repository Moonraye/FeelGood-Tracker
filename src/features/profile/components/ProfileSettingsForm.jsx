import {
  Box,
  Typography,
  DialogContentText,
} from "@mui/material";

import { AppButton } from "../../../components/ui/AppButton";
import { AppTextField } from "../../../components/ui/AppTextField";
import { AppConfirmDialog } from "../../../components/ui/AppConfirmDialog";

import UploadAvatar from "./UploadAvatar";
import { useUpdateProfileForm } from "../hooks/useUpdateProfileForm";

import { PageHeader } from "../../../components/ui/PageHeader";

export const ProfileSettingsForm = ({ profile }) => {
  const {
    displayName,
    setDisplayName,
    isConfirmDialogOpen,
    handleSaveClick,
    handleCloseDialog,
    confirmSave,
    isPending,
  } = useUpdateProfileForm(profile?.display_name);

  return (
    <Box>
      <PageHeader title="Profile Settings" showBack={true} />

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
            onClick={handleSaveClick}
            color="primary"
            variant="contained"
            disabled={isPending}
            isLoading={isPending}
            fullWidth
          >
            Save Changes
          </AppButton>

          <AppConfirmDialog
            open={isConfirmDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={confirmSave}
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