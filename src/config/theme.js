import { alpha, createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "#f15c12",
      light: "#ff7b3f",
      dark: "#c74200",
      contrastText: "#ffffff",
    },
    background: {
      default: mode === 'light' ? "#f4f7f8" : "#0f172a",
      paper: mode === 'light' ? "#ffffff" : "#1e293b",
    },
    text: {
      primary: mode === 'light' ? "#0f172a" : "#f8fafc",
      secondary: mode === 'light' ? "#64748b" : "#94a3b8",
    },
    divider: mode === 'light' ? "#e2e8f0" : "#334155",
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
        root: ({ theme }) => ({
          boxShadow: theme.palette.mode === 'light'
            ? "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
            : "0px 4px 6px rgba(0, 0, 0, 0.4)",
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
        }),
      },
    },

    MuiCssBaseline: {
      styleOverrides: `
        /* Chrome, Safari, Edge, Opera */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `,
    },
  }
});

export default getAppTheme('light');