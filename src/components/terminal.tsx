import React, { useRef, useState } from "react";
import { useTheme } from "../context/theme-provider";

enum Commands {
  whois = "whois",
  whoami = "whoami",
  clear = "clear",
  help = "help",
  banner = "banner",
}

export const Terminal: React.FC = () => {
  const { currentTheme } = useTheme();
  const [commands, setCommands] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue) {
        handleCommand(inputValue);
        setInputValue(""); // Clear input value
        setCursorPosition(0); // Reset cursor position
      } else {
        setCommands((prevCommands) => [...prevCommands, "> "]);
      }
    }
  };

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (trimmedCommand) {
      setCommands((prevCommands) => [...prevCommands, `> ${trimmedCommand}`]);
      processCommand(trimmedCommand);
    }
  };

  const processCommand = (command: string) => {
    let output = "";

    switch (command) {
      case Commands.whois:
        output = "Sothearo is a web developer.";
        break;
      case Commands.whoami:
        output = "You are using an interactive command-line interface.";
        break;
      case Commands.clear:
        setCommands([]);
        return;
      case Commands.help:
        output = `
Available commands:
whois       - Who is Sothearo?
whoami      - Who are you?
clear       - Clear the terminal
help        - Show available commands
banner      - Display the header\n
`;
        break;
      case Commands.banner:
        output = `
███████╗ ██████╗ ████████╗██╗  ██╗███████╗ █████╗ ██████╗  ██████╗ 
██╔════╝██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗
███████╗██║   ██║   ██║   ███████║█████╗  ███████║██████╔╝██║   ██║
╚════██║██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██║██╔══██╗██║   ██║
███████║╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║██║  ██║╚██████╔╝
╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝\n
`;
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setCommands((prevCommands) => [...prevCommands, output]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setCursorPosition(event.target.value.length); // Update cursor position based on input length
  };

  // Function to get cursor position based on text
  const getCursorPosition = () => {
    if (!inputRef.current) return 0;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = getComputedStyle(inputRef.current).font; // Get input font styles
      const textWidth = context.measureText(
        inputValue.slice(0, cursorPosition),
      ).width;
      return textWidth;
    }
    return 0;
  };

  return (
    <div
      className="mx-auto mt-10 h-[410px] max-w-[800px] snap-y snap-mandatory overflow-y-auto rounded border px-6 font-mono text-sm [&>*]:h-6 [&>*]:snap-center [&>*]:py-0.5"
      style={{
        color: currentTheme.color,
        borderColor: currentTheme.borderColor,
      }}
    >
      {commands.length
        ? commands.map((cmd, index) => (
            <pre key={index} className="min-h-max">
              {cmd}
            </pre>
          ))
        : null}
      <div className="relative flex items-center gap-[7.5px]">
        <span>&gt; </span>
        <input
          ref={inputRef}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type="text"
          className="flex-1 bg-transparent caret-transparent outline-none"
          autoFocus
        />
        <div
          className="absolute top-1/2 h-[18px] w-2.5 -translate-y-1/2 transition-all duration-150 ease-in-out"
          style={{
            backgroundColor: currentTheme.color,
            left: `${getCursorPosition() + 15}px`,
          }}
        />
      </div>
    </div>
  );
};
