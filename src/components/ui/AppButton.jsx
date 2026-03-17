import Button from '@mui/material/Button';

export const AppButton = ({ children, variant = 'contained', color = 'primary', fullWidth = true, isLoading = false, ...props }) => {
  return (
    <Button variant={variant} color={color} fullWidth={fullWidth}
    disabled={isLoading || props.disabled} 
    sx={{ minHeight: '48px', ...props.sx}} 
    {...props} >
      {isLoading ? "Loading" : children}  {/* add loader here */}
    </Button>
  );
}
