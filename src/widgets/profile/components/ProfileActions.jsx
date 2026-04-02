import { Box, DialogContentText } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { AppConfirmDialog } from "../../../components/ui/AppConfirmDialog";
import { AppButton } from "../../../components/ui/AppButton";
import { useNavigate } from "react-router-dom";
import { useLogoutAction } from "../../../features/auth/hooks/useLogoutAction";

export const ProfileAction = () => {
    const navigate = useNavigate();
    const {
    isLogoutDialogOpen,
    handleLogoutClick,
    handleCloseDialog,
    confirmLogout,
    isPending
  } = useLogoutAction();

  return(
              <Box sx={{ mt: 3, borderRadius: 1 }}>
            <AppButton
              fullWidth
              color="background.paper"
              onClick={() => navigate("/settings")}
              sx={{ border: 0,}}
            >
              <ModeEditOutlineIcon />
              Personal Info
            </AppButton>
            <AppButton
              fullWidth
              onClick={() => handleLogoutClick(true)}
              color="error"
              sx={{ mt: 1 }}
            >
              <LogoutOutlinedIcon />
              Logout
            </AppButton>

            <AppConfirmDialog 
              open={isLogoutDialogOpen}
              onClose={() => handleCloseDialog(false)}
              onConfirm={confirmLogout}
              title="Confirm Logout"
              confirmText="Logout"
              cancelText="Cancel"
              confirmColor="error"
              isLoading={isPending}
            >
              <DialogContentText>
                Are you sure you want to logout?
              </DialogContentText>
            </AppConfirmDialog>
          </Box>
  )
}