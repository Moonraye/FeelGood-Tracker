import { create } from 'zustand';
import { AlertColor } from '@mui/material';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface SnackbarActions {
  showSnackbar: (message: string, severity?: AlertColor) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState & SnackbarActions>((set) => ({
  open: false,
  message: '',
  severity: 'success', // 'success', 'error', 'info', 'warning'

  showSnackbar: (message, severity = 'success') => 
    set({ open: true, message, severity }),
    
  hideSnackbar: () => 
    set({ open: false }),
}));