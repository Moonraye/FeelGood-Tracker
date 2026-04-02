import { alpha, createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "#f15c12", 
      light: "#ff5722",
      dark: "#0c0b0b",
      contrastText: mode === 'light' ? "#ffffff" : "#000000",
    },
    background: {
      default: mode === 'light' ? "#f4f7f8" : "#121212",
      paper: mode === 'light' ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === 'light' ? "#000000" : "#ffffff", 
      secondary: mode === 'light' ? "#424752" : "#a0a0a0",
    },
  },
  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
          border: "1px solid #E5E7EB",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", 
          fontWeight: 600,
          padding: "10px 20px",
        },
      },
    },
  },
});

export default getAppTheme('light');