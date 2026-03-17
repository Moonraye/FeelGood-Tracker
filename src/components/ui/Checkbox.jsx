import { Checkbox, FormControlLabel } from "@mui/material";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

export const AppCheckbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  ...props
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={name}
          color="primary"
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          {...props}
        />
      }
      label={label}
      disabled={disabled}
      sx={{ userSelect: "none", margin: 0 }}
    />
  );
};
