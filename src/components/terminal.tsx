import React from "react";
import { useTheme } from "../context/theme-provider";

export const Terminal: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div
      className="mt-10 min-h-[400px] border"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
        borderColor: currentTheme.borderColor,
      }}
    >
      <p>Terminal</p>
    </div>
  );
};
