import { Box, Paper, Typography } from "@mui/material";
import AppAvatar from "../../../components/ui/AppAvatar";

export const ProfileHeader = ({ avatarUrl, displayName }) => {
    return (
        <Paper
            elevation={0}
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
              src={avatarUrl}
              sx={{ width: 100, height: 100 }}
            />
            <Box sx={{}}>
              <Typography variant="h6" fontWeight="bold">
                {displayName || "User"}
              </Typography>
            </Box>
          </Paper>
    )
}