import { Button, ButtonProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const AppButton = ({
  children,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  isLoading = false,
  ...props
} : AppButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={isLoading || props.disabled}
      sx={{ minHeight: "32px", ...props.sx }}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};
