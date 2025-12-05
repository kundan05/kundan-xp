import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';



interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (id: string) => void;
    onLogOff: () => void;
    onTurnOff: () => void;
    onOpenLink: (icon: string, title: string, url: string) => void;
}

export default function StartMenu({ isOpen, onClose, onItemClick, onLogOff, onTurnOff, onOpenLink }: StartMenuProps) {
    const [showAllPrograms, setShowAllPrograms] = React.useState(false);
    const [showRecent, setShowRecent] = React.useState(false);

    const handleLinkClick = (icon: string, title: string, url: string) => {
        onOpenLink(icon, title, url);
        onClose(); // Close Start Menu immediately
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Click Outside Overlay */}
            <div className="fixed inset-0 z-[9997]" onClick={onClose} />

            <div className="absolute bottom-[30px] md:bottom-[30px] left-0 w-[300px] max-w-[380px] h-[480px] max-h-[80vh] bg-white rounded-t-lg shadow-[2px_-2px_10px_rgba(0,0,0,0.5)] flex flex-col z-[9998] font-tahoma select-none" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="h-[80px] bg-gradient-to-b from-[#156FEF] to-[#1056BF] flex items-center px-2 gap-3 border-t-2 border-[#388AFF] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] rounded-t-lg relative">
                    {/* Header Highlight */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30 rounded-t-lg" />

                    <div className="w-12 h-12 bg-white rounded-[3px] border-[2px] border-white shadow-[0_0_2px_rgba(0,0,0,0.5)] overflow-hidden relative shrink-0">
                        <Image
                            src="/icons/user.jpeg"
                            alt="User"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-white font-bold text-[18px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Kundan</span>
                </div>

                {/* Body */}
                <div className="flex-1 flex border-t border-[#E89626]">
                    {/* Left Column - Programs */}
                    <div className="w-1/2 bg-white flex flex-col py-2 pl-1 pr-0.5 gap-1">
                        <StartMenuItem
                            icon="/icons/projects-custom.png"
                            label="My Projects"
                            subLabel="View my work"
                            bold
                            onClick={() => onItemClick('projects')}
                        />
                        <StartMenuItem
                            icon="/icons/outlook.png"
                            label="Contact Me"
                            subLabel="Send me a message"
                            bold
                            onClick={() => onItemClick('contact')}
                        />
                        <StartMenuItem
                            icon="/icons/about-custom.png"
                            label="About Me"
                            bold
                            onClick={() => onItemClick('about')}
                        />

                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D1D1D1] to-transparent my-1 mx-2" />

                        <StartMenuItem
                            icon="/icons/_Image_.png"
                            label="Portfolio"
                            onClick={() => handleLinkClick('/icons/_Image_.png', 'Portfolio', 'https://kundan-threejs-portfolio.netlify.app/')}
                        />
                        <StartMenuItem
                            icon="/icons/media-player.png"
                            label="Media Player"
                            onClick={() => onItemClick('media-player')}
                        />
                        <StartMenuItem
                            icon="/icons/paint.png"
                            label="Paint"
                            onClick={() => onItemClick('paint')}
                        />
                        <StartMenuItem
                            icon="/icons/music.png"
                            label="Music Player"
                            onClick={() => onItemClick('music-player')}
                        />

                        <div
                            className="mt-auto px-2 pb-1 relative"
                            onMouseLeave={() => setShowAllPrograms(false)}
                        >
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D1D1D1] to-transparent mb-1" />
                            <button
                                className={`w-full h-[30px] flex items-center justify-center gap-1.5 hover:bg-[#2F71CD] hover:text-white group transition-colors rounded-sm ${showAllPrograms ? 'bg-[#2F71CD] text-white' : ''}`}
                                onMouseEnter={() => setShowAllPrograms(true)}
                                onClick={() => setShowAllPrograms(!showAllPrograms)}
                            >
                                <span className="font-bold text-[11px] text-black group-hover:text-white font-tahoma">All Programs</span>
                                <div className="relative w-[18px] h-[18px] flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                                        <defs>
                                            <linearGradient id="xpGreenGradient" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#49B626" />
                                                <stop offset="100%" stopColor="#2E7D18" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M8 5V19L19 12L8 5Z" fill="url(#xpGreenGradient)" stroke="#1F5211" strokeWidth="1.5" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>

                            {/* All Programs Submenu */}
                            {showAllPrograms && (
                                <div className="absolute left-[100%] bottom-[-11px] w-44 bg-white border border-[#555] shadow-[4px_4px_4px_rgba(0,0,0,0.5)] flex flex-col py-[2px] z-50 ml-[2px]">
                                    <StartMenuItem icon="/icons/projects-custom.png" label="Projects" onClick={() => onItemClick('projects')} compact />
                                    <StartMenuItem icon="/icons/gamew.png" label="World of Warcraft" onClick={() => onItemClick('wow')} compact />
                                    <StartMenuItem icon="/icons/media-player.png" label="Media Player" onClick={() => onItemClick('media-player')} compact />
                                    <StartMenuItem icon="/icons/music.png" label="Music Player" onClick={() => onItemClick('music-player')} compact />
                                    <StartMenuItem icon="/icons/image-viewer.png" label="Image Viewer" onClick={() => onItemClick('image-viewer')} compact />
                                    <StartMenuItem icon="/icons/paint.png" label="Paint" onClick={() => onItemClick('paint')} compact />
                                    <StartMenuItem icon="/icons/cmd.png" label="Command Prompt" onClick={() => onItemClick('cmd')} compact />
                                    <div className="h-[1px] bg-gray-200 my-1 mx-2" />
                                    <StartMenuItem icon="/icons/instagram.png" label="Instagram" onClick={() => handleLinkClick('/icons/instagram.png', 'Instagram', 'https://www.instagram.com/kundan_gowda_/')} compact />
                                    <StartMenuItem icon="/icons/github.png" label="GitHub" onClick={() => handleLinkClick('/icons/github.png', 'GitHub', 'https://github.com/kundan05')} compact />
                                    <StartMenuItem icon="/icons/linkedin.svg" label="LinkedIn" onClick={() => handleLinkClick('/icons/linkedin.svg', 'LinkedIn', 'https://www.linkedin.com/in/kundangowda-n-363a50229/')} compact />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - System Places */}
                    <div className="w-1/2 bg-[#D3E5FA] border-l border-[#95BDE7] py-2 pr-1 pl-0.5 flex flex-col gap-1 relative">
                        {/* Grid Pattern Overlay */}


                        <div className="relative z-10 flex flex-col gap-1">
                            <StartMenuLink
                                icon="/icons/linkedin.svg"
                                label="LinkedIn"
                                bold
                                onClick={() => handleLinkClick('/icons/linkedin.svg', 'LinkedIn', 'https://www.linkedin.com/in/kundangowda-n-363a50229/')}
                            />
                            <StartMenuLink
                                icon="/icons/github.png"
                                label="GitHub"
                                bold
                                onClick={() => handleLinkClick('/icons/github.png', 'GitHub', 'https://github.com/kundan05')}
                            />
                            <StartMenuLink
                                icon="/icons/instagram.png"
                                label="Instagram"
                                bold
                                onClick={() => handleLinkClick('/icons/instagram.png', 'Instagram', 'https://www.instagram.com/kundan_gowda_/')}
                            />

                            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#A7C6E8] to-transparent my-1 mx-2" />

                            <div
                                className="relative"
                                onMouseLeave={() => setShowRecent(false)}
                            >
                                <div
                                    onMouseEnter={() => setShowRecent(true)}
                                >
                                    <StartMenuLink
                                        icon="/icons/recent.png"
                                        label="Recently Used"
                                        hasArrow
                                        onClick={() => setShowRecent(!showRecent)}
                                    />
                                </div>

                                {/* Recently Used Submenu */}
                                {showRecent && (
                                    <div className="absolute md:left-[100%] right-0 md:right-auto bottom-0 md:bottom-[-100px] w-48 bg-white border border-[#555] shadow-[4px_4px_4px_rgba(0,0,0,0.5)] flex flex-col py-[2px] z-50 ml-[2px]">
                                        <StartMenuItem icon="/icons/antigravity.png" label="Anti-Gravity" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/datadog-original.svg" label="DataDog" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/splunk.svg" label="Splunk" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/jenkins-original.svg" label="Jenkins" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/ubuntu-plain.svg" label="Ubuntu" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/grafana-original.svg" label="Grafana" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/blender-original.svg" label="Blender" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/icons8-chatgpt-96.png" label="ChatGPT" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/icons8-anthropic-96.png" label="Claude" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/cursor.svg" label="Cursor" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/docker-original.svg" label="Docker" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/git-original.svg" label="Git" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/copilot.svg" label="GitHub Copilot" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/obs.svg" label="OBS Studio" onClick={() => { }} compact disabled />
                                        <StartMenuItem icon="/icons/vscode-original.svg" label="VS Code" onClick={() => { }} compact disabled />
                                    </div>
                                )}
                            </div>

                            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#A7C6E8] to-transparent my-1 mx-2" />

                            <StartMenuLink
                                icon="/icons/cmd.png"
                                label="Command Prompt"
                                onClick={() => onItemClick('cmd')}
                            />
                            <StartMenuLink
                                icon="/icons/image-viewer.png"
                                label="Image Viewer"
                                onClick={() => onItemClick('image-viewer')}
                            />
                            <StartMenuLink
                                icon="/icons/resume-custom.png"
                                label="My Resume"
                                onClick={() => onItemClick('resume')}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-[38px] bg-gradient-to-b from-[#4282D6] to-[#3B76EA] flex items-center justify-end px-2 gap-2 border-t border-[#3B76EA] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <button
                        onClick={onLogOff}
                        className="flex items-center gap-1 px-2 py-1 hover:bg-[#1C5BB8] rounded-sm transition-colors group"
                    >
                        <div className="relative w-[18px] h-[18px]">
                            <Image src="/icons/Key.png" alt="Log Off" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-white text-[11px] font-normal shadow-black drop-shadow-sm">Log Off</span>
                    </button>

                    <button
                        onClick={onTurnOff}
                        className="flex items-center gap-1 px-2 py-1 hover:bg-[#1C5BB8] rounded-sm transition-colors group"
                    >
                        <div className="relative w-[24px] h-[24px]">
                            <Image src="/icons/turn-off.png" alt="Turn Off" fill className="object-contain" sizes="24px" />
                        </div>
                        <span className="text-white text-[11px] font-normal shadow-black drop-shadow-sm">Shut Down</span>
                    </button>
                </div>
            </div >
        </>
    );
}

interface StartMenuItemProps {
    icon: string;
    label: string;
    subLabel?: string;
    bold?: boolean;
    compact?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

function StartMenuItem({ icon, label, subLabel, bold, compact, disabled, onClick }: StartMenuItemProps) {
    return (
        <button
            className={`w-full flex items-center gap-2 px-2 ${compact ? 'py-[2px]' : 'py-1.5'} ${disabled ? 'opacity-50 cursor-default grayscale' : 'hover:bg-[#2F71CD] hover:text-white group transition-colors'} text-left`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <div className={`relative ${compact ? 'w-4 h-4' : 'w-8 h-8'} shrink-0`}>
                <Image src={icon} alt={label} fill className="object-contain" />
            </div>
            <div className="flex flex-col">
                <span className={`text-xs ${bold ? 'font-bold' : ''} text-[#333] ${!disabled && 'group-hover:text-white'}`}>
                    {label}
                </span>
                {subLabel && (
                    <span className={`text-[10px] text-[#888] ${!disabled && 'group-hover:text-white/80'} leading-none`}>
                        {subLabel}
                    </span>
                )}
            </div>
        </button>
    );
}

interface StartMenuLinkProps {
    icon: string;
    label: string;
    bold?: boolean;
    hasArrow?: boolean;
    onClick: () => void;
}

function StartMenuLink({ icon, label, bold, hasArrow, onClick }: StartMenuLinkProps) {
    return (
        <button
            className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#2F71CD] hover:text-white group transition-colors text-left"
            onClick={onClick}
        >
            <div className="relative w-6 h-6 shrink-0">
                <Image src={icon} alt={label} fill className="object-contain" />
            </div>
            <span className={`text-xs ${bold ? 'font-bold' : ''} text-[#1A3664] group-hover:text-white flex-1`}>
                {label}
            </span>
            {hasArrow && (
                <ChevronRight className="w-3 h-3 text-[#1A3664] group-hover:text-white" />
            )}
        </button>
    );
}
