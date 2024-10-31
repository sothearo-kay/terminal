import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/theme-provider";
import { ThemeSelector } from "./components/theme-selector";
import { Terminal } from "./components/terminal";

interface IRipple {
  x: number;
  y: number;
  color: string;
}

const App = () => {
  const { currentTheme, setTheme } = useTheme();
  const [ripple, setRipple] = useState<IRipple | null>(null);

  const triggerRipple = (
    x: number,
    y: number,
    newThemeName: string,
    newThemeColor: string,
  ) => {
    if (newThemeColor === currentTheme.backgroundColor) return;

    setRipple({ x, y, color: newThemeColor });
    setTimeout(() => {
      setTheme(newThemeName);
      setRipple(null);
    }, 700);
  };

  return (
    <div
      className="app min-h-screen"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
      }}
    >
      {ripple && (
        <span
          className="ripple-overlay"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: ripple.color,
          }}
        />
      )}
      <header className="sticky top-0">
        <div className="container py-4 text-right">
          <ThemeSelector triggerRipple={triggerRipple} />
        </div>
      </header>
      <main className="container">
        <Terminal />
      </main>
    </div>
  );
};

const WrappedApp = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default WrappedApp;
