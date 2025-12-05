import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface OpenLinkDialogProps {
    isOpen: boolean;
    icon: string;
    title: string;
    url: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function OpenLinkDialog({ isOpen, icon, title, url, onConfirm, onCancel }: OpenLinkDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center font-tahoma select-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20" onClick={onCancel} />

            {/* Dialog Window */}
            <div className="relative w-[320px] bg-[#ECE9D8] rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] border-[3px] border-[#0055EA] overflow-hidden">

                {/* Title Bar */}
                <div className="h-[30px] bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#288EFF] flex items-center justify-between px-2 select-none">
                    <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4">
                            <Image src={icon} alt="Icon" fill className="object-contain" sizes="16px" />
                        </div>
                        <span className="text-white font-bold text-[13px] drop-shadow-sm font-sans tracking-wide">Open Link</span>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-[21px] h-[21px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/icons/Exit.png" alt="Close" fill className="object-contain" sizes="21px" />
                        </div>
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-4 bg-[#ECE9D8] relative">
                    {/* Grid Pattern */}


                    <div className="flex flex-col items-center gap-3 relative z-10 py-2">
                        <div className="relative w-12 h-12 drop-shadow-md">
                            <Image src={icon} alt={title} fill className="object-contain" />
                        </div>

                        <div className="text-center space-y-1">
                            <h3 className="font-bold text-lg text-black drop-shadow-sm">Open Link</h3>
                            <p className="text-[11px] text-black px-2">
                                Are you sure you want to open "{title}"?
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6 px-2">
                        <button
                            onClick={onCancel}
                            className="min-w-[75px] px-3 py-1 bg-[#ECE9D8] border border-black/50 rounded-[3px] text-[11px] text-black hover:shadow-[inset_0_0_2px_rgba(255,255,255,0.8)] shadow-[1px_1px_0_black] active:translate-y-[1px] active:shadow-none"
                            style={{ boxShadow: 'inset 1px 1px 0 #fff, 1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="min-w-[90px] px-3 py-1 bg-[#ECE9D8] border border-black/50 rounded-[3px] text-[11px] text-black hover:shadow-[inset_0_0_2px_rgba(255,255,255,0.8)] shadow-[1px_1px_0_black] active:translate-y-[1px] active:shadow-none"
                            style={{ boxShadow: 'inset 1px 1px 0 #fff, 1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                            Visit {title}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
