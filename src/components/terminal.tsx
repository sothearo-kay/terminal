import React, { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const command = inputRef.current?.value;
      if (command) {
        handleCommand(command);
        inputRef.current.value = "";
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
        output = "";
        break;
      case Commands.whoami:
        output = "";
        break;
      case Commands.clear:
        setCommands([]);
        break;
      case Commands.help:
        output = "Available commands: whois, whoami, clear, help, banner";
        break;
      case Commands.banner:
        output = "";
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setCommands((prevCommands) => [...prevCommands, output]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div
      ref={terminalRef}
      className="mx-auto mt-10 h-[400px] max-h-[400px] max-w-[800px] overflow-y-auto rounded border px-6 py-3"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
        borderColor: currentTheme.borderColor,
      }}
    >
      {commands.map((cmd, index) => (
        <div key={index}>{cmd}</div>
      ))}
      <div className="inline-flex w-full gap-4">
        <span>&gt; </span>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleKeyDown}
          className="flex-1 outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};
