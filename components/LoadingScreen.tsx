import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
    return (
        <div className="w-full h-screen md:h-screen h-[100dvh] bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden">
            {/* Main Content */}
            <div className="flex flex-col items-center gap-16 mb-20">
                {/* Logo Section */}
                <div className="flex flex-col items-center md:items-end">
                    <div className="flex flex-col items-center md:items-end">
                        <div className="relative w-24 h-24 md:w-60 md:h-60 mb-2 md:mr-4">
                            <Image src="/icons/xp-flag-black.png" alt="XP Logo" fill className="object-contain" sizes="(max-width: 768px) 96px, 240px" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-[50px] md:text-[94px] font-bold tracking-tighter drop-shadow-md flex items-start justify-center md:justify-end gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                            Kundan<span className="text-[#E57E31] text-[30px] md:text-[54px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                        </h1>
                        <p className="text-white text-xl md:text-3xl font-normal mt-0.2 tracking-wide md:mr-22" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="w-[220px] md:w-[280px] h-[20px] border-[2px] border-[#B2B2B2] rounded-[5px] p-[2px] relative overflow-hidden bg-black shadow-[0_0_0_1px_rgba(0,0,0,1)]">
                    <div
                        className="absolute top-[2px] bottom-[2px] w-[80px] flex gap-[3px] animate-xp-loading"
                    >
                        <div className="flex-1 bg-gradient-to-b from-[#2653E3] via-[#4887F1] to-[#2653E3] rounded-[2px] shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"></div>
                        <div className="flex-1 bg-gradient-to-b from-[#2653E3] via-[#4887F1] to-[#2653E3] rounded-[2px] shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"></div>
                        <div className="flex-1 bg-gradient-to-b from-[#2653E3] via-[#4887F1] to-[#2653E3] rounded-[2px] shadow-[inset_0_0_1px_rgba(255,255,255,0.6)]"></div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 flex items-center gap-2">
                <span className="text-white font-bold text-6xl">Portfolio</span>
                <span className="text-white text-xs align-top">®</span>
            </div>

            <div className="hidden md:block absolute bottom-8 left-8 text-white/100 text-xl">
                For the best experience<br />
                Enter Full Screen (F11)
            </div>
        </div>
    );
}
