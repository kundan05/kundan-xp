'use client';

import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
    return (
        <div className="w-full h-[100dvh] bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden">
            {/* Keyframes for the sliding blocks */}
            <style jsx>{`
                @keyframes xp-loader {
                    0% { left: -30%; }
                    100% { left: 100%; }
                }
                .xp-blocks {
                    animation: xp-loader 1.8s ease-in-out infinite;
                }
            `}</style>

            <div className="flex flex-col items-center gap-16 mb-20">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 md:w-60 md:h-60 mb-2">
                            <Image src="/icons/xp-flag-black.png" alt="XP Logo" width={240} height={240} className="object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-[50px] md:text-[94px] font-bold tracking-tighter drop-shadow-md flex items-start justify-center gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                            Kundan<span className="text-[#E57E31] text-[30px] md:text-[54px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                        </h1>
                        <p className="text-white text-xl md:text-3xl font-normal mt-0.5 tracking-wide" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                    </div>
                </div>

                {/* Authentic Windows XP Loading Bar */}
                <div
                    className="w-[220px] md:w-[300px] h-[22px] md:h-[26px] rounded-[4px] relative overflow-hidden"
                    style={{
                        border: '2px solid #808080',
                        boxShadow: 'inset 0 0 0 1px #404040, 0 0 0 1px #c0c0c0',
                        background: '#000',
                        padding: '3px',
                    }}
                >
                    {/* Inner track */}
                    <div className="w-full h-full rounded-[2px] relative overflow-hidden" style={{ background: '#000' }}>
                        {/* Sliding 3-block group */}
                        <div className="xp-blocks absolute top-0 h-full flex gap-[2px]" style={{ width: '30%' }}>
                            <div
                                className="flex-1 rounded-[1px]"
                                style={{
                                    background: 'linear-gradient(180deg, #7B8CDE 0%, #3A4BC8 30%, #2A3AB8 50%, #4A5CE0 80%, #6B7CD8 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                                }}
                            />
                            <div
                                className="flex-1 rounded-[1px]"
                                style={{
                                    background: 'linear-gradient(180deg, #7B8CDE 0%, #3A4BC8 30%, #2A3AB8 50%, #4A5CE0 80%, #6B7CD8 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                                }}
                            />
                            <div
                                className="flex-1 rounded-[1px]"
                                style={{
                                    background: 'linear-gradient(180deg, #7B8CDE 0%, #3A4BC8 30%, #2A3AB8 50%, #4A5CE0 80%, #6B7CD8 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                                }}
                            />
                        </div>
                    </div>
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
