import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ContactProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function Contact({ onClose, onMinimize, onMaximize }: ContactProps) {
    const [formData, setFormData] = useState({
        from: '',
        subject: '',
        body: ''
    });
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isFormDirty = formData.from.length > 0 || formData.subject.length > 0 || formData.body.length > 0;

    const handleSend = () => {
        const mailtoLink = `mailto:kundangowda.n@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.from}\n\n${formData.body}`)}`;
        window.open(mailtoLink, '_blank');
    };

    const handleNewMessage = () => {
        if (!isFormDirty) return;
        setFormData({ from: '', subject: '', body: '' });
    };

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-tahoma select-none" ref={menuRef}>
            {/* Menu Bar */}
            <div className="flex items-center justify-between px-1 py-0.5 bg-[#ECE9D8] border-b border-[#D1D1D1] text-[11px] relative z-20">
                <div className="flex items-center">
                    <div className="relative">
                        <button
                            className={`px-1.5 py-0.5 hover:bg-[#316AC5] hover:text-white focus:outline-none ${activeMenu === 'file' ? 'bg-[#316AC5] text-white' : ''}`}
                            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
                        >
                            File
                        </button>
                        {activeMenu === 'file' && (
                            <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] py-0.5 z-50">
                                <button
                                    className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white flex items-center gap-2"
                                    onClick={() => {
                                        if (onClose) onClose();
                                        setActiveMenu(null);
                                    }}
                                >
                                    <span>Exit</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="px-1.5 py-0.5 text-[#808080] cursor-default">Edit</button>

                    <div className="relative">
                        <button
                            className={`px-1.5 py-0.5 hover:bg-[#316AC5] hover:text-white focus:outline-none ${activeMenu === 'view' ? 'bg-[#316AC5] text-white' : ''}`}
                            onClick={() => setActiveMenu(activeMenu === 'view' ? null : 'view')}
                        >
                            View
                        </button>
                        {activeMenu === 'view' && (
                            <div className="absolute top-full left-0 min-w-[150px] bg-white border border-[#808080] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] py-0.5 z-50">
                                <button
                                    className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white"
                                    onClick={() => {
                                        if (onMaximize) onMaximize();
                                        setActiveMenu(null);
                                    }}
                                >
                                    Maximize
                                </button>
                                <button
                                    className="w-full text-left px-4 py-1 hover:bg-[#316AC5] hover:text-white"
                                    onClick={() => {
                                        if (onMinimize) onMinimize();
                                        setActiveMenu(null);
                                    }}
                                >
                                    Minimize
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="px-1.5 py-0.5 text-[#808080] cursor-default">Tools</button>
                    <button className="px-1.5 py-0.5 text-[#808080] cursor-default">Help</button>
                </div>
                <div className="pr-1 opacity-50">
                    <Image src="/icons/xp-logo-final.png" alt="" width={16} height={16} />
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1 border-b border-[#D1D1D1] bg-[#ECE9D8]">
                <div className="flex items-center gap-1">
                    <button
                        className="flex flex-col items-center justify-center w-[50px] h-[50px] hover:bg-[#D1D1D1]/50 active:bg-[#D1D1D1] rounded-sm group"
                        onClick={handleSend}
                    >
                        <div className="relative w-[22px] h-[22px] mb-0.5">
                            <Image src="/icons/Send-message.png" alt="Send" fill className="object-contain" sizes="22px" />
                        </div>
                        <span className="text-[10px] text-[#444] group-active:translate-y-[1px]">Send</span>
                    </button>
                    <button
                        className={`flex flex-col items-center justify-center w-[50px] h-[50px] ${isFormDirty ? 'hover:bg-[#D1D1D1]/50 active:bg-[#D1D1D1] rounded-sm' : 'opacity-50 cursor-default'}`}
                        onClick={handleNewMessage}
                        disabled={!isFormDirty}
                    >
                        <div className="relative w-[22px] h-[22px] mb-0.5">
                            <Image src="/icons/new-message.png" alt="New" fill className="object-contain" sizes="22px" />
                        </div>
                        <span className="text-[10px] text-[#444] group-active:translate-y-[1px]">New</span>
                    </button>

                    <div className="w-[1px] h-8 bg-[#D1D1D1] mx-1" />

                    <div className="flex flex-col items-center justify-center px-1 opacity-50 cursor-default min-w-[30px]">
                        <div className="relative w-[18px] h-[18px] mb-0.5">
                            <Image src="/icons/Cut.png" alt="Cut" fill className="object-contain" sizes="18px" />
                        </div>
                        <span className="text-[10px] text-[#444]">Cut</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-1 opacity-50 cursor-default min-w-[30px]">
                        <div className="relative w-[18px] h-[18px] mb-0.5">
                            <Image src="/icons/Copy.png" alt="Copy" fill className="object-contain" sizes="18px" />
                        </div>
                        <span className="text-[10px] text-[#444]">Copy</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-1 opacity-50 cursor-default min-w-[30px]">
                        <div className="relative w-[18px] h-[18px] mb-0.5">
                            <Image src="/icons/Paste.png" alt="Paste" fill className="object-contain" sizes="18px" />
                        </div>
                        <span className="text-[10px] text-[#444]">Paste</span>
                    </div>

                    <div className="w-[1px] h-8 bg-[#D1D1D1] mx-1" />

                    <button
                        className="flex flex-col items-center justify-center px-2 py-0.5 hover:bg-[#D1D1D1]/50 active:bg-[#D1D1D1] rounded-sm transition-colors min-w-[50px] group"
                        onClick={() => window.open('https://www.linkedin.com/in/kundangowda-n-363a50229/', '_blank')}
                    >
                        <div className="relative w-[22px] h-[22px] mb-0.5">
                            <Image src="/icons/linkedin.svg" alt="LinkedIn" fill className="object-contain" sizes="22px" />
                        </div>
                        <span className="text-[10px] text-black group-active:translate-y-[1px]">LinkedIn</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col p-3 gap-3 bg-[#ECE9D8]">
                {/* Header Fields */}
                <div className="flex flex-col gap-2 relative">
                    {/* Horizontal Lines Background */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                        <div className="h-[1px] bg-[#D1D1D1] mt-[26px]" />
                        <div className="h-[1px] bg-[#D1D1D1] mt-[26px]" />
                        <div className="h-[1px] bg-[#D1D1D1] mt-[26px]" />
                    </div>

                    {/* To Field */}
                    <div className="flex items-center z-10">
                        <div className="w-12 text-right pr-3 text-[11px] text-[#444]">To:</div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value="KundanGowda N <kundangowda.n@gmail.com>"
                                readOnly
                                className="w-full bg-transparent border border-[#7F9DB9] px-1 py-0.5 text-[11px] text-black outline-none select-text"
                            />
                        </div>
                    </div>

                    {/* From Field */}
                    <div className="flex items-center z-10">
                        <div className="w-12 text-right pr-3 text-[11px] text-[#444]">From:</div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Your email address"
                                className="w-full bg-white border border-[#7F9DB9] px-1 py-0.5 text-[11px] text-black outline-none placeholder:text-[#999] placeholder:italic"
                                value={formData.from}
                                onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Subject Field */}
                    <div className="flex items-center z-10">
                        <div className="w-12 text-right pr-3 text-[11px] text-[#444]">Subject:</div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Subject of your message"
                                className="w-full bg-white border border-[#7F9DB9] px-1 py-0.5 text-[11px] text-black outline-none placeholder:text-[#999] placeholder:italic"
                                value={formData.subject}
                                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-[1px] bg-[#D1D1D1]" />

                {/* Message Body */}
                <div className="flex-1 relative bg-white border border-[#7F9DB9] overflow-hidden">
                    <textarea
                        className="w-full h-full resize-none outline-none p-2 text-[12px] font-sans bg-transparent relative z-10 leading-5"
                        placeholder="Write your message here"
                        value={formData.body}
                        onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                    />
                    {/* Grid Background */}

                </div>
            </div>

            {/* Status Bar */}
            <div className="h-[22px] border-t border-[#D1D1D1] bg-[#ECE9D8] flex items-center px-2">
                <span className="text-[11px] text-black">Compose a message to Kundan</span>
            </div>
        </div>
    );
}
