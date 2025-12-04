import React, { useState } from 'react';
import Image from 'next/image';
import {
    ArrowRight
} from 'lucide-react';

interface ImageViewerProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function ImageViewer({ onClose, onMinimize, onMaximize }: ImageViewerProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeMenu, setActiveMenu] = useState<'file' | 'view' | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Placeholder images
    const images = [
        { src: '/icons/mini1.jpg', title: 'Minions' },
        { src: '/icons/mini2.jpg', title: 'Minions' },
        { src: '/icons/mini3.jpg', title: 'Minions' },
        { src: '/icons/mini4.jpg', title: 'Minions' }
    ];

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setZoomLevel(1); // Reset zoom on image change
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        setZoomLevel(1); // Reset zoom on image change
    };

    const handleZoom = () => {
        // Cycle through zoom levels: 50% -> 75% -> 100% -> 125% -> 150% -> 50%
        setZoomLevel(prev => {
            if (prev >= 1.5) return 0.5;
            if (prev === 0.5) return 0.75;
            if (prev === 0.75) return 1;
            if (prev === 1) return 1.25;
            return 1.5;
        });
    };

    const handleSave = () => {
        const currentImage = images[currentImageIndex];
        const link = document.createElement('a');
        link.href = currentImage.src;
        link.download = currentImage.title + '.png'; // Assuming png for now, or extract ext
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#ECE9D8] font-tahoma text-xs select-none" onClick={() => setActiveMenu(null)}>
            {/* Title Bar is handled by Window component, but we have Menu Bar here */}

            {/* Menu Bar */}
            <div className="flex items-center px-1 py-0.5 bg-[#ECE9D8] border-b border-white/50 relative z-20">
                <div className="flex gap-2 px-2">
                    <div className="relative">
                        <span
                            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'file' ? null : 'file'); }}
                            className={`px-1 cursor-default hover:bg-[#316AC5] hover:text-white ${activeMenu === 'file' ? 'bg-[#316AC5] text-white' : ''}`}
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

                    <span className="px-1 cursor-default text-gray-500">Edit</span>

                    <div className="relative">
                        <span
                            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'view' ? null : 'view'); }}
                            className={`px-1 cursor-default hover:bg-[#316AC5] hover:text-white ${activeMenu === 'view' ? 'bg-[#316AC5] text-white' : ''}`}
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

                    <span className="px-1 cursor-default text-gray-500">Help</span>
                </div>
                <div className="ml-auto">
                    <Image src="/icons/xp-logo-final.png" alt="Windows" width={18} height={18} className="opacity-80" />
                </div>
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8]">
                <span className="text-gray-500">Address</span>
                <div className="flex-1 bg-white border border-[#7F9DB9] flex items-center px-1 h-[22px]">
                    <Image src="/icons/folder.png" alt="Folder" width={14} height={14} className="mr-2" />
                    <span className="text-black">C:\Users\kundan\pictures</span>
                    <div className="ml-auto text-gray-400">
                        <ArrowRight size={14} className="rotate-90" />
                    </div>
                </div>
                <button className="flex items-center gap-1 px-2 py-[2px] bg-[#ECE9D8] border border-[#D4D0C8] hover:bg-white/50 rounded-sm">
                    <Image src="/icons/Go.png" alt="Go" width={16} height={16} />
                    <span className="text-black font-bold">Go</span>
                </button>
            </div>

            {/* Main Content - Image Display */}
            <div className="flex-1 bg-[#808080] flex items-center justify-center overflow-auto relative border-t border-white/50 border-b border-[#808080]">
                {/* Checkerboard pattern overlay if needed, but solid gray is also common in some viewers */}
                <div
                    className="relative w-[80%] h-[80%] bg-white shadow-lg flex items-center justify-center transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel})` }}
                >
                    <Image
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].title}
                        fill
                        className="object-contain p-4"
                    />
                </div>
            </div>

            {/* Footer Controls */}
            <div className="h-[50px] bg-[#ECE9D8] border-t border-white flex items-center justify-center relative">
                {/* Navigation Buttons */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={handlePrev}
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    >
                        <div className="relative w-[24px] h-[24px] mb-0.5 opacity-50 group-hover:opacity-100">
                            <Image src="/icons/Back.png" alt="Back" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[11px] text-[#000000] group-hover:text-[#000000]">Prev</span>
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    >
                        <div className="relative w-[24px] h-[24px] mb-0.5 opacity-50 group-hover:opacity-100">
                            <Image src="/icons/Forward.png" alt="Next" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[11px] text-[#000000] group-hover:text-[#000000]">Next</span>
                    </button>

                    <div className="w-[1px] h-[40px] bg-[#D6D6D6] mx-1" />

                    <button
                        onClick={handleZoom}
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    >
                        <div className="relative w-[24px] h-[24px] mb-0.5">
                            <Image src="/icons/Search.png" alt="Zoom" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[11px] text-[#000000]">Zoom</span>
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    >
                        <div className="relative w-[24px] h-[24px] mb-0.5">
                            <Image src="/icons/Printer.png" alt="Print" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[11px] text-[#000000]">Print</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    >
                        <div className="relative w-[24px] h-[24px] mb-0.5">
                            <Image src="/icons/Save.png" alt="Save" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-[11px] text-[#000000]">Save</span>
                    </button>
                </div>

                {/* Status Text */}
                <div className="absolute left-2 bottom-1 text-[10px] text-gray-500">
                    {images[currentImageIndex].title}
                </div>
            </div>
        </div>
    );
}
