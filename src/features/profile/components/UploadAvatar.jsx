import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';
import AppAvatar from '../../../components/ui/AppAvatar';
import ButtonBase from '@mui/material/ButtonBase';
import { useAvatarMutation } from '../hooks/useAvatarMutation';

export default function UploadAvatars({ currentAvatarUrl }) {
  const [avatarSrc, setAvatarSrc] = React.useState(currentAvatarUrl);

  const AvatarMutation = useAvatarMutation();

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);

      AvatarMutation.mutate(file);
    }
  };

  return (
    <ButtonBase
      component="label"
      role={undefined}
      disabled={AvatarMutation.isPending}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        position: 'relative',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <AppAvatar alt="Avatar" src={avatarSrc} />
      
      {AvatarMutation.isPending && (
        <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyItems: 'center' }}> {/* ADD LOADER */}
          <CircularProgress size={24} />
        </Box>
      )}

      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
