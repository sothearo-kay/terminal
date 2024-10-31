import React, { useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { Theme, themes } from "../themes";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  themeNames: string[];
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = usePersistedState<Theme>(
    "theme",
    themes.dark,
  );

  const setTheme = (themeName: string) => {
    const theme = themes[themeName];
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setTheme, themeNames: Object.keys(themes) }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
