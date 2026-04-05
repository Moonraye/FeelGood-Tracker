import { create } from "zustand";
import { getAppTheme } from "../config/theme";

export const useThemeStore = create((set) => ({
    mode: localStorage.getItem("themeMode") || "light",
    theme: getAppTheme(localStorage.getItem("themeMode") || "light"),

    toggleColorMode: () => set((state) => {
        const newMode = state.mode === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", newMode);

        return {
            mode: newMode,
            theme: getAppTheme(newMode),
        };
    }),
}));


