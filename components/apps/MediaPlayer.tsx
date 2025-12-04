import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface MediaPlayerProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function MediaPlayer({ onClose, onMinimize, onMaximize }: MediaPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [activeMenu, setActiveMenu] = useState<'file' | 'view' | null>(null);
    const playerRef = useRef<any>(null);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    // Load YouTube API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        } else {
            initializePlayer();
        }

        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    const initializePlayer = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: 'dQw4w9WgXcQ', // Default video (Rick Roll for demo, or change to user preference)
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    const onPlayerReady = (event: any) => {
        setDuration(event.target.getDuration());
        setVolume(event.target.getVolume());
    };

    const onPlayerStateChange = (event: any) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTimer();
        } else {
            setIsPlaying(false);
            stopProgressTimer();
        }
    };

    const startProgressTimer = () => {
        if (progressInterval.current) clearInterval(progressInterval.current);
        progressInterval.current = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 500);
    };

    const stopProgressTimer = () => {
        if (progressInterval.current) clearInterval(progressInterval.current);
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const stopVideo = () => {
        if (!playerRef.current) return;
        playerRef.current.stopVideo();
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (playerRef.current) {
            playerRef.current.seekTo(time, true);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (playerRef.current) {
            playerRef.current.setVolume(newVolume);
            if (newVolume > 0 && isMuted) {
                playerRef.current.unMute();
                setIsMuted(false);
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="w-full h-full flex flex-col bg-black text-white font-sans select-none" onClick={() => setActiveMenu(null)}>
            {/* Title Bar Gradient Overlay (Simulated) */}
            <div className="absolute top-0 left-0 w-full h-[30px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10"></div>

            {/* Menu Bar */}
            <div className="h-6 bg-[#182C62] flex items-center px-2 text-[11px] gap-3 border-b border-[#3A4E85] relative z-20">
                <div className="relative">
                    <span
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'file' ? null : 'file'); }}
                        className={`px-1 cursor-default hover:bg-[#3A4E85] ${activeMenu === 'file' ? 'bg-[#3A4E85]' : ''}`}
                    >
                        File
                    </span>
                    {activeMenu === 'file' && (
                        <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] z-50 py-0.5 text-black">
                            <button
                                onClick={() => onClose?.()}
                                className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white flex items-center justify-between group"
                            >
                                <span>Exit</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <span
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'view' ? null : 'view'); }}
                        className={`px-1 cursor-default hover:bg-[#3A4E85] ${activeMenu === 'view' ? 'bg-[#3A4E85]' : ''}`}
                    >
                        View
                    </span>
                    {activeMenu === 'view' && (
                        <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] z-50 py-0.5 text-black">
                            <button
                                onClick={() => onMinimize?.()}
                                className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white"
                            >
                                Minimize
                            </button>
                            <button
                                onClick={() => onMaximize?.()}
                                className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white"
                            >
                                Maximize
                            </button>
                        </div>
                    )}
                </div>
                <span className="px-1 cursor-default text-gray-400">Play</span>
                <span className="px-1 cursor-default text-gray-400">Tools</span>
                <span className="px-1 cursor-default text-gray-400">Help</span>
            </div>

            {/* Video Area */}
            <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
                <div id="youtube-player" className="w-full h-full"></div>

                {/* Overlay for "Now Playing" info if needed, or just keep video clean */}
                {!isPlaying && currentTime === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
                        <div className="w-16 h-16 relative opacity-50">
                            <Image src="/icons/media-player.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="text-gray-400 mt-2 text-sm">Windows Media Player</span>
                    </div>
                )}
            </div>

            {/* Controls Area (Glossy Blue) */}
            <div className="h-[70px] bg-gradient-to-b from-[#3A4E85] via-[#1E2C44] to-[#000000] flex flex-col px-4 py-1 border-t border-[#536BA0] relative shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">

                {/* Seek Bar */}
                <div className="w-full flex items-center gap-2 mb-1">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-[#0D1421] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#8EA2C6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-white"
                    />
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-between mt-1">

                    {/* Time Display */}
                    <div className="text-[10px] text-[#8EA2C6] font-mono w-20">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Center Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Prev */}
                        <button className="w-8 h-8 flex items-center justify-center hover:brightness-125 active:scale-95 transition-transform opacity-80 hover:opacity-100">
                            <SkipBack size={16} fill="#8EA2C6" color="#8EA2C6" />
                        </button>

                        {/* Play/Pause (Big Button) */}
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-gradient-to-b from-[#3B76EA] to-[#1E2C44] flex items-center justify-center hover:brightness-110 border-2 border-[#5386EA] shadow-[0_0_10px_rgba(0,0,0,0.5),inset_0_1px_5px_rgba(255,255,255,0.4)] group active:scale-95 transition-transform relative -top-2"
                        >
                            {isPlaying ? (
                                <Pause size={20} fill="white" color="white" />
                            ) : (
                                <div className="relative w-5 h-5 ml-1">
                                    <Image src="/icons/play.png" alt="Play" fill className="object-contain brightness-200" />
                                </div>
                            )}
                        </button>

                        {/* Stop */}
                        <button
                            onClick={stopVideo}
                            className="w-8 h-8 flex items-center justify-center hover:brightness-125 active:scale-95 transition-transform opacity-80 hover:opacity-100"
                        >
                            <div className="relative w-3 h-3">
                                <Image src="/icons/stop.png" alt="Stop" fill className="object-contain" />
                            </div>
                        </button>

                        {/* Next */}
                        <button className="w-8 h-8 flex items-center justify-center hover:brightness-125 active:scale-95 transition-transform opacity-80 hover:opacity-100">
                            <SkipForward size={16} fill="#8EA2C6" color="#8EA2C6" />
                        </button>
                    </div>

                    {/* Volume & Settings */}
                    <div className="flex items-center gap-2 w-24 justify-end">
                        <div className="relative w-4 h-4 opacity-80">
                            <Image src="/icons/volume.png" alt="Volume" fill className="object-contain" />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-[#0D1421] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-[#8EA2C6] [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-white"
                        />
                        <button className="ml-1 opacity-80 hover:opacity-100">
                            <Repeat size={14} color="#8EA2C6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
