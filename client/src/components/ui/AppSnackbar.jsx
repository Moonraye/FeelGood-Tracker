import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../../store/useSnackbarStore";

export const AppSnackBar = () => {
  const { open, message, severity, hideSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ mb: { xs: 7, sm: 0 } }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: 3,
          fontWeight: "bold",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
