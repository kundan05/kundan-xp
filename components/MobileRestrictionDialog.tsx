import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MobileRestrictionDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileRestrictionDialog({ isOpen, onClose }: MobileRestrictionDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center font-sans select-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />

            {/* Dialog Box */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-[350px] bg-[#ECE9D8] rounded-t-lg rounded-b-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden border border-[#0055EA]"
            >
                {/* Header */}
                <div className="h-[30px] flex items-center justify-between px-2 bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#288EFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4">
                            <Image src="/icons/media-player.png" alt="Icon" fill className="object-contain" />
                        </div>
                        <span className="text-white text-[13px] font-bold drop-shadow-sm" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>Media Player</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-[21px] h-[21px] bg-[#D7432D] hover:bg-[#E85C45] border border-white/40 rounded-[3px] flex items-center justify-center shadow-sm group active:bg-[#BE3221]"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col items-center gap-4 bg-[#ECE9D8]">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="relative w-12 h-12">
                            <Image src="/icons/media-player.png" alt="Media Player" fill className="object-contain" />
                        </div>
                        <h3 className="text-black font-bold text-lg">Media Player</h3>
                        <p className="text-black text-sm max-w-[280px]">
                            This program is only available on desktop devices.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className="px-6 py-1 min-w-[80px] bg-gradient-to-b from-[#FFF] to-[#ECE9D8] border border-[#003C74] rounded-[3px] text-black text-xs hover:bg-[#F0F0F0] active:bg-[#E0E0E0] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        OK
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
