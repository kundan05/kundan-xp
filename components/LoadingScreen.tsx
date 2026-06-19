'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[100dvh] bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden">
            <div className="flex flex-col items-center gap-16 mb-20">
                <div className="flex flex-col items-center md:items-end">
                    <div className="flex flex-col items-center md:items-end">
                        <div className="relative w-24 h-24 md:w-60 md:h-60 mb-2 md:mr-4">
                            <Image src="/icons/xp-flag-black.png" alt="XP Logo" width={240} height={240} className="object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-[50px] md:text-[94px] font-bold tracking-tighter drop-shadow-md flex items-start justify-center md:justify-end gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                            Kundan<span className="text-[#E57E31] text-[30px] md:text-[54px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                        </h1>
                        <p className="text-white text-xl md:text-3xl font-normal mt-0.2 tracking-wide md:mr-22" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                    </div>
                </div>

                <div className="w-[220px] md:w-[280px] h-[20px] border-[2px] border-[#B2B2B2] rounded-[5px] p-[2px] relative overflow-hidden bg-black shadow-[0_0_0_1px_rgba(0,0,0,1)]">
                    <div
                        className="h-full bg-gradient-to-r from-[#2653E3] via-[#4887F1] to-[#2653E3] rounded-[2px] shadow-[inset_0_0_1px_rgba(255,255,255,0.6)] transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 flex items-center gap-2">
                <span className="text-white font-bold text-6xl">Portfolio</span>
                <span className="text-white text-xs align-top">&reg;</span>
            </div>

            <div className="hidden md:block absolute bottom-8 left-8 text-white/80 text-xl">
                For the best experience<br />
                Enter Full Screen (F11)
            </div>
        </div>
    );
}
