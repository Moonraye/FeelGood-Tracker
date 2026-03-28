import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export const AppButton = ({
  children,
  variant = "contained",
  color = "primary",
  fullWidth = true,
  isLoading = false,
  ...props
}) => {
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
