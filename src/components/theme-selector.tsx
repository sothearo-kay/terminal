import React from "react";
import { useTheme } from "../context/theme-provider";
import { themes } from "../themes";

interface Props {
  triggerRipple: (
    x: number,
    y: number,
    themeName: string,
    themeColor: string,
  ) => void;
}

export const ThemeSelector: React.FC<Props> = ({ triggerRipple }) => {
  const { themeNames } = useTheme();

  const handleThemeChange = (themeName: string, e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const themeColor = themes[themeName].backgroundColor;

    triggerRipple(clientX, clientY, themeName, themeColor);
  };

  return (
    <div className="space-x-6">
      {themeNames.map((name) => (
        <button
          key={name}
          className=""
          onClick={(e) => handleThemeChange(name, e)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
