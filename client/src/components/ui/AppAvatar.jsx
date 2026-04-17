import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function AppAvatar({ alt = "Avatar", src = "#", ...props }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={alt} src={src} {...props} />
    </Stack>
  );
}
