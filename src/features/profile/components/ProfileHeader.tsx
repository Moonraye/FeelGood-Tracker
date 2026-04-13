import { Box, Typography } from "@mui/material";
import AppAvatar from "../../../components/ui/AppAvatar";

interface ProfileHeaderProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  joinedDate?: string | null;
}

export const ProfileHeader = ({ avatarUrl, displayName, joinedDate }: ProfileHeaderProps) => {
    return (
        <Box
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
              src={avatarUrl || undefined}
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {displayName || "User"}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">Joined in {joinedDate}</Typography>
            </Box>
          </Box>
    )
}