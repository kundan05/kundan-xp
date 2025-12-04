import React from 'react';
import Image from 'next/image';

interface WorldOfWarcraftProps {
    onClose?: () => void;
}

export default function WorldOfWarcraft({ onClose }: WorldOfWarcraftProps) {
    return (
        <div
            className="relative w-full h-full bg-black overflow-hidden font-serif select-none text-[#FFD700]"
            style={{ cursor: `url('/icons/wow-cursor.png'), auto` }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/wow_bg.png"
                    alt="World of Warcraft Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Logo Overlay (Optional, if not in BG) */}
            <div className="absolute top-8 left-8 z-10 w-64 h-32">
                {/* Assuming logo might be part of BG or we can add one if needed. 
                     For now, relying on the generated BG to have the vibe. 
                     The reference has a logo top left. */}
                {/* <Image src="/icons/wow-logo.png" ... /> if we had one */}
            </div>

            {/* Realm is Full Dialog */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[400px] bg-black/80 border-[3px] border-[#444] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col items-center p-6 text-center">
                {/* Inner Border */}
                <div className="absolute inset-1 border border-[#666] rounded pointer-events-none"></div>

                <h2 className="text-2xl mb-6 tracking-wide text-[#FFD700] drop-shadow-md">Realm is Full</h2>

                <div className="space-y-2 mb-8 text-lg text-[#EEE] font-medium">
                    <p>Position in Queue: <span className="text-white">2012</span></p>
                    <p>Estimated time: <span className="text-white">318 min</span></p>
                </div>

                <button className="px-6 py-1.5 bg-[#800000] border-2 border-[#555] text-[#FFD700] hover:bg-[#A00000] hover:border-[#777] active:border-[#444] rounded shadow-md transition-colors text-sm font-bold tracking-wide cursor-inherit">
                    Change Realm
                </button>
            </div>

            {/* Bottom Left Version Text */}
            <div className="absolute bottom-2 left-2 z-20 text-[10px] text-[#888] font-sans">
                Version 1.12.1 (5875) (Release)<br />
                Sep 19 2006
            </div>

            {/* Bottom Center Copyright */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 text-[10px] text-[#888] font-sans">
                Copyright 2004-2006 Blizzard Entertainment. All Rights Reserved.
            </div>

            {/* Bottom Right Buttons */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
                <button className="w-32 py-1 bg-[#800000] border-2 border-[#555] text-[#FFD700] hover:bg-[#A00000] hover:border-[#777] active:border-[#444] rounded shadow-md transition-colors text-sm font-bold tracking-wide cursor-inherit">
                    Options
                </button>
                <button
                    onClick={onClose}
                    className="w-32 py-1 bg-[#800000] border-2 border-[#555] text-[#FFD700] hover:bg-[#A00000] hover:border-[#777] active:border-[#444] rounded shadow-md transition-colors text-sm font-bold tracking-wide cursor-inherit"
                >
                    Quit
                </button>
            </div>
        </div>
    );
}
