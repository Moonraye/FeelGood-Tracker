import { create } from "zustand";
import { Theme } from "@mui/material";
import { getAppTheme } from "../config/theme";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  mode: ThemeMode;
  theme: Theme;
  toggleColorMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    mode: localStorage.getItem("themeMode") as ThemeMode|| "light",
    theme: getAppTheme(localStorage.getItem("themeMode") as ThemeMode || "light"),

    toggleColorMode: () => set((state) => {
        const newMode: ThemeMode = state.mode === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", newMode);

        return {
            mode: newMode,
            theme: getAppTheme(newMode),
        };
    }),
}));


