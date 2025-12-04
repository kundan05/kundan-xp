import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WindowState } from './types';
import { format } from 'date-fns';


interface TaskbarProps {
    windows: WindowState[];
    activeWindowId: string | null;
    onToggleWindow: (id: string) => void;
    onToggleStart: () => void;
    isCRTEnabled: boolean;
    onToggleCRT: () => void;
    onToggleFullscreen: () => void;
    onToggleNotification: () => void;
}

export default function Taskbar({
    windows,
    activeWindowId,
    onToggleWindow,
    onToggleStart,
    isCRTEnabled,
    onToggleCRT,
    onToggleFullscreen,
    onToggleNotification
}: TaskbarProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="fixed bottom-0 left-0 w-full h-[30px] bg-xp-taskbar flex items-center z-50 select-none border-t-2 border-[#3B76EA]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Start Button */}
            <button
                onClick={onToggleStart}
                className="h-full px-2 flex items-center gap-1 bg-gradient-to-b from-[#3B9D00] to-[#3B9D00] hover:brightness-110 rounded-r-[10px] mr-2 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.4)] italic font-bold text-white text-lg pr-4 pl-3 relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-[5px] bg-white/30"></div>
                <span className="drop-shadow-md flex items-center gap-1">
                    <div className="relative w-5 h-5 mr-1">
                        <Image
                            src="/icons/xp-logo-final.png"
                            alt="Windows"
                            fill
                            className="object-contain"
                        />
                    </div>
                    start
                </span>
            </button>

            {/* Divider */}
            <div className="w-[2px] h-[80%] bg-[#1846BB] border-r border-[#5386EA] mx-1"></div>

            {/* Window List */}
            <div className="flex-1 flex items-center gap-1 px-1 overflow-hidden">
                {windows.map(w => w.isOpen && (
                    <button
                        key={w.id}
                        onClick={() => onToggleWindow(w.id)}
                        className={`
              h-[22px] px-2 min-w-[60px] md:min-w-[120px] max-w-[160px] flex items-center gap-2 rounded-[2px] text-xs text-white truncate
              ${activeWindowId === w.id && !w.isMinimized
                                ? 'bg-[#1E52B7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]'
                                : 'bg-[#3C81F3] hover:bg-[#5390F6] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)] border-b border-[#1F48B0]'}
            `}
                    >
                        {/* Icon */}
                        <div className="relative w-4 h-4 shrink-0">
                            <Image
                                src={w.icon || '/icons/folder.png'}
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="truncate hidden sm:inline">{w.title}</span>
                    </button>
                ))}
            </div>

            {/* System Tray */}
            <div className="h-full bg-[#0B78E2] px-3 flex items-center gap-2 border-l border-[#122E76] shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2)]">
                <button
                    onClick={onToggleNotification}
                    className="group relative p-0.5 hover:bg-[#1C5BB8] rounded-sm transition-colors"
                    title="About"
                >
                    <div className="relative w-[18px] h-[18px]">
                        <Image
                            src="/icons/info.png"
                            alt="About"
                            fill
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                </button>

                <button
                    onClick={onToggleCRT}
                    className="group relative p-0.5 hover:bg-[#1C5BB8] rounded-sm transition-colors"
                    title={`CRT Effects: ${isCRTEnabled ? 'ON' : 'OFF'}`}
                >
                    <div className="relative w-[18px] h-[18px]">
                        <Image
                            src={isCRTEnabled ? '/icons/crt-on.png' : '/icons/crt-off.png'}
                            alt="CRT Toggle"
                            fill
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                </button>

                <button
                    onClick={onToggleFullscreen}
                    className="group relative p-0.5 hover:bg-[#1C5BB8] rounded-sm transition-colors"
                    title="Toggle Fullscreen"
                >
                    <div className="relative w-[18px] h-[18px]">
                        <Image
                            src="/icons/fullscreen.png"
                            alt="Fullscreen"
                            fill
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                </button>

                <div className="text-white text-xs ml-1">
                    {format(time, 'h:mm a')}
                </div>
            </div>
        </div>
    );
}
