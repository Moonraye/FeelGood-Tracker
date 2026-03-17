import TextField from "@mui/material/TextField";

export const AppTextField = ({
  label,
  variant = "outlined",
  required = false,
  error = false,
  helperText = "",
  type = "text",
  fullWidth = true,
  placeholder = "",
  ...props
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      variant={variant}
      required={required}
      error={error}
      type={type}
      placeholder={placeholder}
      margin="normal"
      {...props}
    />
  );
};
