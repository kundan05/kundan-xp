import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ResumeProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function Resume({ onClose, onMinimize, onMaximize }: ResumeProps) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [activeMenu, setActiveMenu] = useState<'file' | 'view' | null>(null);

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
        const link = document.createElement('a');
        link.href = '/KundanGowda_Resume.pdf';
        link.download = 'KundanGowda_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.print();
        }
    };

    const handleContact = () => {
        window.location.href = 'mailto:kundangowda.n@gmail.com';
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setScrollPos({
            x: scrollContainerRef.current.scrollLeft,
            y: scrollContainerRef.current.scrollTop
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        scrollContainerRef.current.scrollLeft = scrollPos.x - dx;
        scrollContainerRef.current.scrollTop = scrollPos.y - dy;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        setIsDragging(false);
        // If we didn't drag much, treat it as a click to zoom
        const dx = Math.abs(e.clientX - startPos.x);
        const dy = Math.abs(e.clientY - startPos.y);
        if (dx < 5 && dy < 5) {
            handleZoom();
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] select-none" onClick={() => setActiveMenu(null)}>
            {/* Menu Bar */}
            <div className="flex items-center px-1 py-0.5 bg-[#ECE9D8] border-b border-[#D1D1D1] text-[11px] font-tahoma relative">
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'file' ? null : 'file'); }}
                        className={`px-2 py-0.5 hover:bg-[#1660E8] hover:text-white focus:outline-none cursor-default ${activeMenu === 'file' ? 'bg-[#1660E8] text-white' : ''}`}
                    >
                        File
                    </button>
                    {activeMenu === 'file' && (
                        <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] z-50 py-0.5">
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
                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'view' ? null : 'view'); }}
                        className={`px-2 py-0.5 hover:bg-[#1660E8] hover:text-white focus:outline-none cursor-default ${activeMenu === 'view' ? 'bg-[#1660E8] text-white' : ''}`}
                    >
                        View
                    </button>
                    {activeMenu === 'view' && (
                        <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] z-50 py-0.5">
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

                <button className="px-2 py-0.5 text-gray-400 cursor-default" disabled>Help</button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 p-1 border-b border-[#D1D1D1] bg-[#ECE9D8] shadow-[0_1px_0_#fff]">
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
                    className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                    onClick={handleSave}
                >
                    <div className="relative w-[24px] h-[24px] mb-0.5">
                        <Image src="/icons/Save.png" alt="Save" fill className="object-contain" sizes="24px" />
                    </div>
                    <span className="text-[11px] text-[#000000]">Save</span>
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

                <div className="w-[1px] h-[40px] bg-[#D6D6D6] mx-1" />

                <button
                    onClick={handleContact}
                    className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#FFE7A2] border border-transparent hover:border-[#D2B47A] rounded-[3px] group"
                >
                    <div className="relative w-[24px] h-[24px] mb-0.5">
                        <Image src="/icons/outlook.png" alt="Contact" fill className="object-contain" sizes="24px" />
                    </div>
                    <span className="text-[11px] text-[#000000]">Contact Me</span>
                </button>
            </div>

            {/* PDF Viewer Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 bg-[#808080] overflow-auto flex justify-center relative cursor-default"
            >
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '4px 4px'
                    }}
                />

                {/* Resume Page Container */}
                <div
                    className="relative z-10 transition-transform duration-200 origin-top my-8"
                    style={{ transform: `scale(${zoomLevel})` }}
                >
                    {/* Interaction Overlay */}
                    <div
                        className={`absolute inset-0 z-20 ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    />

                    <iframe
                        ref={iframeRef}
                        src="/KundanGowda_Resume.pdf#toolbar=0&navpanes=0"
                        className="w-[800px] h-[1132px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                        title="Resume"
                    />
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 border-t border-[#D1D1D1] bg-[#ECE9D8] flex items-center px-2 text-[11px] text-gray-600 shadow-[inset_0_1px_0_#fff] gap-2">
                <div className="w-[1px] h-3 bg-gray-400"></div>
                <span>Click to zoom, then drag to view other areas</span>
            </div>
        </div>
    );
}
