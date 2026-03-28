import { create } from 'zustand';

export const useSnackbarStore = create((set) => ({
  open: false,
  message: '',
  severity: 'success', // 'success', 'error', 'info', 'warning'

  showSnackbar: (message, severity = 'success') => 
    set({ open: true, message, severity }),
    
  hideSnackbar: () => 
    set({ open: false }),
}));