import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="w-full h-full bg-[#0A1535] flex items-center justify-center p-2 relative overflow-hidden">
            {/* Background Gradient/Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2b5e] to-[#050a1a] opacity-50"></div>

            <div className="relative z-10 flex w-full h-full gap-2">
                {/* Left Side - Album Art */}
                <div className="w-1/2 h-full relative rounded-md overflow-hidden border border-[#3A4E85] shadow-inner bg-black group">
                    <Image
                        src="/icons/oppenhimer.jpg" // Placeholder - ideally user provides an image
                        alt="Album Art"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-white">
                        <div className="font-bold text-sm leading-tight">Oppenheimer Theme</div>
                        <div className="text-[10px] text-gray-300">Ludwig Göransson</div>
                    </div>
                </div>

                {/* Right Side - Controls */}
                <div className="w-1/2 h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#151f38] border border-[#2a3b6e] relative shadow-lg flex items-center justify-center">
                        {/* Circular Control Pad */}

                        {/* Play/Pause Center */}
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-[#0A1535] border border-[#2a3b6e] flex items-center justify-center text-[#3B76EA] hover:text-white hover:shadow-[0_0_10px_rgba(59,118,234,0.5)] transition-all active:scale-95 z-20"
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </button>

                        {/* Ring Controls (Visual mostly, but could be functional) */}
                        <div className="absolute inset-0 rounded-full">
                            {/* Top - Vol Up */}
                            <button className="absolute top-1 left-1/2 -translate-x-1/2 text-[#3a4e85] hover:text-[#5386EA]">
                                <span className="text-xs font-bold">+</span>
                            </button>
                            {/* Bottom - Vol Down */}
                            <button className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[#3a4e85] hover:text-[#5386EA]">
                                <span className="text-xs font-bold">-</span>
                            </button>
                            {/* Left - Prev */}
                            <button className="absolute left-1 top-1/2 -translate-y-1/2 text-[#3a4e85] hover:text-[#5386EA]">
                                <SkipBack size={12} />
                            </button>
                            {/* Right - Next */}
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 text-[#3a4e85] hover:text-[#5386EA]">
                                <SkipForward size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} src="/icons/oppenheimer.mp3" loop />
        </div>
    );
}
