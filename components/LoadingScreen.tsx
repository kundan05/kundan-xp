import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
    return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden">
            {/* Main Content */}
            <div className="flex flex-col items-center gap-16 mb-20">
                {/* Logo Section */}
                <div className="flex flex-col items-end">
                    <div className="relative w-60 h-30 mb-1 mr-4">
                        <Image src="/icons/xp-logo-user-provided.png" alt="XP Logo" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-[94px] font-bold tracking-tighter drop-shadow-md flex items-start justify-end gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                            Kundan<span className="text-[#E57E31] text-[54px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                        </h1>
                        <p className="text-white text-3xl font-normal mt-0.2 tracking-wide mr-22" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="w-[350px] h-[18px] border-[2px] border-[#5A5A5A] rounded-[4px] p-[2px] relative overflow-hidden bg-black">
                    <div
                        className="absolute top-[1px] bottom-[1px] w-[100px] flex gap-[4px] animate-xp-loading"
                    >
                        <div className="flex-1 bg-gradient-to-b from-[#2D58B6] to-[#5A7EDC] rounded-[1px] shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
                        <div className="flex-1 bg-gradient-to-b from-[#2D58B6] to-[#5A7EDC] rounded-[1px] shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
                        <div className="flex-1 bg-gradient-to-b from-[#2D58B6] to-[#5A7EDC] rounded-[1px] shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]"></div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 right-8 flex items-center gap-2">
                <span className="text-white font-bold italic text-xl">Portfolio</span>
                <span className="text-white text-xs align-top">®</span>
            </div>

            <div className="absolute bottom-8 left-8 text-white/50 text-xs">
                For the best experience<br />
                Enter Full Screen (F11)
            </div>
        </div>
    );
}
