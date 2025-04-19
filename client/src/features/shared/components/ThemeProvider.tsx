import { createContext, ReactNode, use, useEffect, useState } from "react";

import { getItem, setItem } from "@/lib/utils/localStorage";

type Theme = "dark" | "light" | "system";

type ThemeProviderType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const ThemeContext = createContext<ThemeProviderType>({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "jb-event-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    getItem(storageKey) ?? defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setItem(storageKey, systemTheme);
      return;
    }

    root.classList.add(theme);
    setItem(storageKey, theme);
  }, [storageKey, theme]);
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
