import React from "react";
import { useTheme } from "../context/theme-provider";

export const ThemeSelector: React.FC = () => {
  const { setTheme, themeNames } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {themeNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
