import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import AppAvatar from "../../../components/ui/AppAvatar";
import ButtonBase from "@mui/material/ButtonBase";
import { useAvatarMutation } from "../hooks/useAvatarMutation";

export default function UploadAvatar({ currentAvatarUrl }) {
  const [localPreview, setLocalPreview] = React.useState(null);
  const AvatarMutation = useAvatarMutation();

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);

      AvatarMutation.mutate(file, {
        onSuccess: () => {
          setLocalPreview(null);
          URL.revokeObjectURL(objectUrl);
        },

        onError: () => {
          setLocalPreview(null);
          URL.revokeObjectURL(objectUrl);
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
      tabIndex={-1} // prevent label from tab focus
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
      <AppAvatar alt="Avatar" src={displayAvatar} />

      {AvatarMutation.isPending && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >

          <CircularProgress size={24} />
        </Box>
      )}

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
