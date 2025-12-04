import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface NotificationProps {
    onClose: () => void;
    onLinkClick: (id: string) => void;
}

export default function Notification({ onClose, onLinkClick }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 10000); // Auto close after 10s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-10 right-2 z-[9000] animate-slide-up">
            <div className="relative bg-[#FFFFE1] border border-black rounded-[4px] p-3 shadow-md w-80 text-xs text-black font-sans">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 w-4 h-4 bg-transparent hover:bg-[#FF0000] rounded-sm flex items-center justify-center border border-transparent hover:border-white group transition-colors"
                >
                    <X size={12} className="text-gray-600 group-hover:text-white" />
                </button>

                <div className="flex items-start gap-2">
                    <div className="relative w-4 h-4 flex-shrink-0">
                        <Image src="/icons/info.png" alt="Info" fill className="object-contain" sizes="16px" />
                    </div>
                    <div className="flex flex-col text-xs text-[#000000] leading-tight">
                        <span className="font-bold">Welcome to Kundan XP</span>
                        <span className="mt-1">A faithful XP-inspired interface, custom-built to showcase my work and attention to detail.</span>
                        <div className="mt-2 text-blue-800 underline flex gap-1">
                            <span className="no-underline text-black">Get Started:</span>
                            <button onClick={() => onLinkClick('about')} className="hover:text-blue-600">About Me</button>
                            <span className="no-underline text-black">|</span>
                            <button onClick={() => onLinkClick('projects')} className="hover:text-blue-600">My Projects</button>
                        </div>
                    </div>
                </div>
                {/* Arrow Pointer */}
                <div className="absolute -bottom-[6px] right-[145px] w-3 h-3 bg-[#FFFFE1] border-b border-r border-black transform rotate-45"></div>
            </div>
        </div>
    );
}
