'use client';

import React, { useState, useCallback, memo } from 'react';
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
    allowMobileMaximize?: boolean;
}

const Window = memo(function Window({
    title,
    children,
    isActive,
    zIndex,
    icon,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    hasCustomContent,
    isMaximized,
    initialWidth,
    initialHeight,
    allowMobileMaximize = true
}: WindowProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const effectiveMaximized = isMaximized || (isMobile && allowMobileMaximize);
    const isFullScreen = effectiveMaximized;

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(onClose, 200);
    }, [onClose]);

    return (
        <motion.div
            drag={!isFullScreen}
            dragMomentum={false}
            dragElastic={0}
            onMouseDown={onFocus}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={isClosing ? {
                scale: 0.85,
                opacity: 0,
                y: 20,
                transition: { duration: 0.15, ease: 'easeIn' }
            } : {
                scale: 1,
                opacity: 1,
                y: 0,
                width: isFullScreen ? '100%' : `min(${initialWidth || 600}px, 95vw)`,
                height: isFullScreen ? 'calc(100% - 30px)' : `min(${initialHeight || 400}px, 85vh)`,
                transition: {
                    type: 'spring',
                    damping: 25,
                    stiffness: 300,
                    mass: 0.8,
                }
            }}
            exit={{
                scale: 0.85,
                opacity: 0,
                y: 20,
                transition: { duration: 0.15, ease: 'easeIn' }
            }}
            layout
            style={{ zIndex }}
            className={`
        flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)]
        ${isFullScreen ? 'fixed top-0 left-0 w-full h-[calc(100%-30px)] rounded-none' : 'absolute top-[10%] left-[5%] md:top-10 md:left-10 rounded-t-lg'}
        ${isActive ? 'border border-[#0058EE]' : 'border border-[#788B9F]'}
        overflow-hidden
      `}
        >
            <div
                onDoubleClick={!isMobile ? onMaximize : undefined}
                className={`
          h-[30px] flex items-center justify-between px-2 select-none shrink-0
          ${isFullScreen ? 'rounded-none' : 'rounded-t-[7px]'}
          ${isActive
                        ? 'bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#0058EE]'
                        : 'bg-gradient-to-r from-[#7697B8] via-[#9DBBD6] to-[#7697B8]'}
        `}
            >
                <div className="flex items-center gap-2 text-white font-bold text-sm drop-shadow-md min-w-0">
                    {icon && (
                        <div className="relative w-4 h-4 shrink-0">
                            <Image src={icon} alt="" fill className="object-contain" />
                        </div>
                    )}
                    <span className="truncate">{title}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                        aria-label="Minimize"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Minimize.png" alt="" fill className="object-contain" />
                        </div>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                        aria-label="Maximize"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Maximize.png" alt="" fill className="object-contain" />
                        </div>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleClose(); }}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                        aria-label="Close"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Exit.png" alt="" fill className="object-contain" />
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#ECE9D8] p-[3px] border-x-[3px] border-b-[3px] border-[#0058EE] rounded-b-sm relative flex flex-col overflow-hidden min-h-0">
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
});

export default Window;
