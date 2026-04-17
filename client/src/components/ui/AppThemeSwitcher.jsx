import { IconButton } from "@mui/material";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import { useThemeStore } from "../../store/useThemeStore";

export const AppThemeSwitcher = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleColorMode = useThemeStore((state) => state.toggleColorMode);

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === "dark" ? (
        <Brightness7RoundedIcon />
      ) : (
        <Brightness4RoundedIcon sx={{ color: '#000000'}} />
      )}
    </IconButton>
  );
};
