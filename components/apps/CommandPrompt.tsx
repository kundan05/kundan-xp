import React, { useState, useEffect, useRef } from 'react';

interface CommandPromptProps {
    onClose?: () => void;
}

export default function CommandPrompt({ onClose }: CommandPromptProps) {
    const [history, setHistory] = useState<string[]>([
        "Kundan XP v1.0 (Dec 2025)",
        "Inspired by Windows XP",
        "",
        "Type 'help' for a list of commands.",
        "Press ENTER/RETURN to execute commands.",
        ""
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            processCommand(currentInput);
            setCurrentInput("");
        }
    };

    const processCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const newHistory = [...history, `C:\\>${cmd}`];

        switch (trimmedCmd) {
            case 'help':
                newHistory.push(
                    "Available commands:",
                    "  help     - Show this help message",
                    "  cls      - Clear the screen",
                    "  exit     - Close Command Prompt",
                    "  ver      - Show OS version",
                    "  date     - Show current date",
                    "  whoami   - Show current user",
                    "  about    - About Kundan XP"
                );
                break;
            case 'cls':
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                if (onClose) onClose();
                return;
            case 'ver':
                newHistory.push("Kundan XP [Version 1.0.0]");
                break;
            case 'date':
                newHistory.push(new Date().toString());
                break;
            case 'whoami':
                newHistory.push("kundan\\admin");
                break;
            case 'about':
                newHistory.push("Kundan XP - A portfolio project by Kundan.");
                break;
            case '':
                break;
            default:
                newHistory.push(`'${cmd}' is not recognized as an internal or external command,`, "operable program or batch file.");
        }

        newHistory.push(""); // Add empty line
        setHistory(newHistory);
    };

    return (
        <div
            className="w-full h-full bg-black text-gray-300 font-mono text-sm p-1 overflow-y-auto cursor-text"
            onClick={focusInput}
            style={{ fontFamily: '"Lucida Console", monospace' }}
        >
            {history.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap leading-tight">{line}</div>
            ))}
            <div className="flex items-center">
                <span className="mr-1">C:\&gt;</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-gray-300 flex-1 caret-gray-300"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
