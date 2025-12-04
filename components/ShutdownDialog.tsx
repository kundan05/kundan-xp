import React from 'react';
import Image from 'next/image';

interface ShutdownDialogProps {
    onCancel: () => void;
    onRestart: () => void;
    onShutdown: () => void;
}

export default function ShutdownDialog({ onCancel, onRestart, onShutdown }: ShutdownDialogProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans select-none">
            {/* Backdrop - Grayscale and Dimmed */}
            <div className="absolute inset-0 bg-black/40 backdrop-grayscale transition-all duration-500" />

            {/* Dialog Box */}
            <div className="relative w-[410px] bg-[#003399] rounded-t-lg rounded-b-md shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden border border-[#003399] animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="h-[42px] flex items-center justify-between px-3 bg-gradient-to-r from-[#003399] via-[#003399] to-[#003399]">
                    <span className="text-white text-lg font-medium drop-shadow-md">Turn off Kundan XP</span>
                    <div className="relative w-6 h-6 opacity-80">
                        <Image src="/icons/xp-logo-user-provided.png" alt="Windows" fill className="object-contain" />
                    </div>
                </div>

                {/* Body */}
                <div className="bg-gradient-to-b from-[#628BCE] to-[#4277C6] p-6 pt-8 pb-4 relative">
                    {/* Grid Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '4px 4px'
                        }}
                    />

                    <div className="flex justify-center gap-8 relative z-10">
                        {/* Turn Off Button */}
                        <button
                            onClick={onRestart}
                            className="flex flex-col items-center gap-1 group">
                            <div className="w-[42px] h-[42px] bg-gradient-to-b from-[#3E9C36] to-[#2F7629] rounded-[3px] border border-[#fff]/30 shadow-sm flex items-center justify-center group-hover:brightness-110 transition-all group-active:translate-y-[1px]">

                                <div className="relative w-8 h-8">
                                    <Image src="/icons/restart.png" alt="Restart" fill className="object-contain" />
                                </div>
                            </div>
                            <span className="text-white text-xs font-bold drop-shadow-sm">Restart</span>
                        </button>

                        {/* Restart Button */}
                        <button
                            onClick={onShutdown}
                            disabled
                            className="flex flex-col items-center gap-1 group opacity-50 cursor-not-allowed"
                        >
                            <div className="w-[42px] h-[42px] bg-gradient-to-b from-[#E14242] to-[#B02B2C] rounded-[3px] border border-[#fff]/30 shadow-sm flex items-center justify-center">
                                <div className="relative w-8 h-8">
                                    <Image src="/icons/turn-off.png" alt="Shut Down" fill className="object-contain" />
                                </div>
                            </div>
                            <span className="text-white text-xs font-bold drop-shadow-sm">Shut Down</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#003399] h-[40px] flex items-center justify-end px-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1 bg-gradient-to-b from-[#FFF] to-[#ECE9D8] border border-[#003399] rounded-[3px] text-xs font-sans hover:bg-[#F0F0F0] active:bg-[#E0E0E0] shadow-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
