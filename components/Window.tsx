import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface WindowProps {
    title: string;
    children: React.ReactNode;
    isActive: boolean;
    zIndex: number;
    icon?: string;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    hasCustomContent?: boolean;
    isMaximized?: boolean;
    initialWidth?: number;
    initialHeight?: number;
}

export default function Window({ title, children, isActive, zIndex, icon, onClose, onMinimize, onMaximize, onFocus, hasCustomContent, isMaximized, initialWidth, initialHeight }: WindowProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const effectiveMaximized = isMaximized || isMobile;

    return (
        <motion.div
            drag={!effectiveMaximized}
            dragMomentum={false}
            onMouseDown={onFocus}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                x: effectiveMaximized ? 0 : undefined,
                y: effectiveMaximized ? 0 : undefined,
                width: effectiveMaximized ? '100%' : `min(${initialWidth || 600}px, 95vw)`,
                height: effectiveMaximized ? 'calc(100% - 30px)' : `min(${initialHeight || 400}px, 85vh)`
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ zIndex }}
            className={`
        flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)]
        ${effectiveMaximized ? 'fixed top-0 left-0 w-full h-[calc(100%-30px)] rounded-none' : 'absolute top-[10%] left-[5%] md:top-10 md:left-10 rounded-t-lg'}
        ${isActive ? 'border border-[#0058EE]' : 'border border-[#788B9F]'}
      `}
        >
            {/* Title Bar */}
            <div
                onDoubleClick={!isMobile ? onMaximize : undefined}
                className={`
          h-[30px] flex items-center justify-between px-2 select-none
          ${effectiveMaximized ? 'rounded-none' : 'rounded-t-[7px]'}
          ${isActive
                        ? 'bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#0058EE]'
                        : 'bg-gradient-to-r from-[#7697B8] via-[#9DBBD6] to-[#7697B8]'}
        `}
            >
                <div className="flex items-center gap-2 text-white font-bold text-sm drop-shadow-md">
                    {/* Icon */}
                    <div className="relative w-4 h-4 shrink-0">
                        <Image
                            src={icon || '/icons/folder.png'}
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    {title}
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Minimize.png" alt="Minimize" fill className="object-contain" />
                        </div>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Maximize.png" alt="Maximize" fill className="object-contain" />
                        </div>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Exit.png" alt="Close" fill className="object-contain" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#ECE9D8] p-[3px] border-x-[3px] border-b-[3px] border-[#0058EE] rounded-b-sm relative flex flex-col overflow-hidden">
                {hasCustomContent ? (
                    children
                ) : (
                    <div className="w-full h-full bg-white border border-[#828790] shadow-[inset_1px_1px_0px_#000000]">
                        <div className="w-full h-full overflow-auto p-4">
                            {children}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
