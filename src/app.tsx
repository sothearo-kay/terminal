import { ThemeProvider } from "./context/theme-provider";
import { ThemeSelector } from "./components/theme-selector";
import { Terminal } from "./components/terminal";

function App() {
  return (
    <ThemeProvider>
      <header className="sticky top-0">
        <div className="container py-4 text-right">
          <ThemeSelector />
        </div>
      </header>

      <main className="container">
        <Terminal />
      </main>
    </ThemeProvider>
  );
}

export default App;
