import * as React from "react";
import { Box, CircularProgress, Badge } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AppAvatar from "../../../components/ui/AppAvatar";
import ButtonBase from "@mui/material/ButtonBase";
import { useAvatarMutation } from "../hooks/useAvatarMutation";
import { useSnackbarStore } from "../../../store/useSnackbarStore";

export default function UploadAvatar({ currentAvatarUrl }) {
  const [localPreview, setLocalPreview] = React.useState(null);
  const AvatarMutation = useAvatarMutation();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);


  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);

      AvatarMutation.mutate(file, {
        onSuccess: () => {
          setLocalPreview(null);
          URL.revokeObjectURL(objectUrl);
          showSnackbar("Avatar updated successfully");
        },

        onError: () => {
          setLocalPreview(null);
          URL.revokeObjectURL(objectUrl);
          showSnackbar("Error updating avatar");
        },
      });
    }
  };

  const displayAvatar = localPreview || currentAvatarUrl;

  return (
    <ButtonBase
      component="label"
      role={undefined}
      disabled={AvatarMutation.isPending}
      tabIndex={-1} 
      aria-label="Avatar image"
      sx={{
        borderRadius: "40px",
        position: "relative",
        "&:has(:focus-visible)": {
          outline: "2px solid",
          outlineOffset: "2px",
        },
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Box
            sx={{
              backgroundColor: "text.secondary", 
              color: "white",
              borderRadius: "50%",
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid",
              borderColor: "background.paper", 
            }}
          >
            <EditIcon sx={{ fontSize: 14 }} />
          </Box>
        }
      >
        <Box sx={{ position: "relative" }}>
          <AppAvatar
            alt="Avatar"
            src={displayAvatar}
            sx={{ width: 60, height: 60 }}
          />

          {AvatarMutation.isPending && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>
      </Badge>

      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: "rect(0 0 0 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          whiteSpace: "nowrap",
          width: "1px",
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
