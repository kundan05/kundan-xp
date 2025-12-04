import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AboutMeProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onOpenApp?: (id: string) => void;
}

export default function AboutMe({ onClose, onMinimize, onMaximize, onOpenApp }: AboutMeProps) {
    const [isSocialOpen, setIsSocialOpen] = useState(true);
    const [isSkillsOpen, setIsSkillsOpen] = useState(true);
    const [isSoftwareOpen, setIsSoftwareOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    // Close menus when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setActiveMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-[#ECE9D8] font-tahoma text-xs" onClick={(e) => e.stopPropagation()}>
            {/* Menu Bar */}
            <div className="flex items-center px-1 py-0.5 bg-[#ECE9D8] border-b border-white/50 relative z-50">
                <div className="flex gap-2 px-2">
                    <div className="relative">
                        <span
                            className={`px-1 cursor-default ${activeMenu === 'file' ? 'bg-[#1660E8] text-white' : 'hover:bg-[#1660E8] hover:text-white'}`}
                            onClick={(e) => { e.stopPropagation(); toggleMenu('file'); }}
                        >
                            File
                        </span>
                        {activeMenu === 'file' && (
                            <div className="absolute top-full left-0 bg-white border border-[#828790] shadow-[2px_2px_2px_rgba(0,0,0,0.4)] py-1 min-w-[150px]">
                                <div
                                    className="px-4 py-1 hover:bg-[#1660E8] hover:text-white cursor-pointer"
                                    onClick={() => { onClose?.(); setActiveMenu(null); }}
                                >
                                    Exit
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <span
                            className={`px-1 cursor-default ${activeMenu === 'view' ? 'bg-[#1660E8] text-white' : 'hover:bg-[#1660E8] hover:text-white'}`}
                            onClick={(e) => { e.stopPropagation(); toggleMenu('view'); }}
                        >
                            View
                        </span>
                        {activeMenu === 'view' && (
                            <div className="absolute top-full left-0 bg-white border border-[#828790] shadow-[2px_2px_2px_rgba(0,0,0,0.4)] py-1 min-w-[150px]">
                                <div
                                    className="px-4 py-1 hover:bg-[#1660E8] hover:text-white cursor-pointer"
                                    onClick={() => { onMinimize?.(); setActiveMenu(null); }}
                                >
                                    Minimize
                                </div>
                                <div
                                    className="px-4 py-1 hover:bg-[#1660E8] hover:text-white cursor-pointer"
                                    onClick={() => { onMaximize?.(); setActiveMenu(null); }}
                                >
                                    Maximize
                                </div>
                            </div>
                        )}
                    </div>

                    <span className="hover:bg-[#1660E8] hover:text-white px-1 cursor-default text-gray-400">Help</span>
                </div>
                <div className="ml-auto">
                    <Image src="/icons/xp-logo-user-provided.png" alt="Windows" width={18} height={18} className="opacity-80" />
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8]">
                <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 px-1 border border-transparent rounded-sm group opacity-50 cursor-default">
                        <div className="relative w-8 h-8">
                            <Image src="/icons/Back.png" alt="Back" fill className="object-contain" />
                        </div>
                        <span className="text-[11px] text-gray-400">Back</span>
                    </button>
                    <button className="flex items-center gap-1 px-1 border border-transparent rounded-sm group opacity-50 cursor-default">
                        <div className="relative w-8 h-8">
                            <Image src="/icons/Forward.png" alt="Forward" fill className="object-contain" />
                        </div>
                        <span className="text-[11px] text-gray-400">Forward</span>
                        <div className="w-[1px] h-8 bg-[#D4D0C8] mx-1"></div>
                    </button>
                </div>

                <button
                    className="flex items-center gap-1 px-2 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm active:border-gray-400 active:shadow-inner"
                    onClick={() => onOpenApp?.('projects')}
                >
                    <div className="relative w-6 h-6">
                        <Image src="/icons/internet-explorer.png" alt="Projects" fill className="object-contain" />
                    </div>
                    <span className="text-[11px]">My Projects</span>
                </button>
                <button
                    className="flex items-center gap-1 px-2 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm active:border-gray-400 active:shadow-inner"
                    onClick={() => onOpenApp?.('resume')}
                >
                    <div className="relative w-6 h-6">
                        <Image src="/icons/resume-icon.png" alt="Resume" fill className="object-contain" />
                    </div>
                    <span className="text-[11px]">My Resume</span>
                </button>

                <div className="w-[1px] h-8 bg-[#D4D0C8] mx-1"></div>

                <button className="flex items-center gap-1 px-1 border border-transparent rounded-sm opacity-50 cursor-default">
                    <div className="relative w-6 h-6">
                        <Image src="/icons/Up.png" alt="Up" fill className="object-contain" />
                    </div>
                </button>
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8] shadow-[0_1px_0_#fff]">
                <span className="text-gray-500 text-[11px]">Address</span>
                <div className="flex-1 bg-white border border-[#7F9DB9] flex items-center px-1 h-[22px] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)]">
                    <Image src="/icons/about-custom.png" alt="Icon" width={14} height={14} className="mr-2" />
                    <span className="text-black text-[11px]">About Me</span>
                </div>
                <button className="flex items-center gap-1 px-2 h-[22px] bg-[#ECE9D8] border border-[#D4D0C8] hover:bg-white/50 rounded-sm">
                    <div className="relative w-4 h-4">
                        <Image src="/icons/Go.png" alt="Go" fill className="object-contain" />
                    </div>
                    <span className="text-black text-[11px]">Go</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-[150px] bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] p-3 flex flex-col gap-3 overflow-y-auto shrink-0">
                    {/* Social Links */}
                    <div className="rounded-t-[4px] overflow-hidden shadow-sm">
                        <div
                            className="bg-gradient-to-r from-[#225AD8] to-[#225AD8] px-3 py-1 flex items-center justify-between cursor-pointer border border-white/50"
                            onClick={() => setIsSocialOpen(!isSocialOpen)}
                        >
                            <span className="text-white font-bold text-[11px]">Social Links</span>
                            <button className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center border border-white/40 hover:bg-white/30">
                                {isSocialOpen ? <ChevronUp size={12} className="text-white" /> : <ChevronDown size={12} className="text-white" />}
                            </button>
                        </div>
                        {isSocialOpen && (
                            <div className="relative p-2 flex flex-col gap-1 text-[10px] text-[#0C327D] bg-white border-x border-b border-white/50">
                                {/* Grid Pattern */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10"
                                    style={{
                                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                        backgroundSize: '4px 4px'
                                    }}
                                />
                                <div className="relative z-10 flex flex-col gap-1">
                                    <a href="https://www.linkedin.com/in/kundangowda-n-363a50229/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline hover:text-blue-600 cursor-pointer py-0.5">
                                        <Image src="/icons/linkedin.svg" alt="LI" width={14} height={14} /> LinkedIn
                                    </a>
                                    <a href="https://github.com/kundan05" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline hover:text-blue-600 cursor-pointer py-0.5">
                                        <Image src="/icons/github.png" alt="GH" width={14} height={14} /> Github
                                    </a>
                                    <a href="https://www.instagram.com/kundan_gowda_/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline hover:text-blue-600 cursor-pointer py-0.5">
                                        <Image src="/icons/instagram.png" alt="IG" width={14} height={14} /> Instagram
                                    </a>

                                </div>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="rounded-t-[4px] overflow-hidden shadow-sm">
                        <div
                            className="bg-gradient-to-r from-[#225AD8] to-[#225AD8] px-3 py-1 flex items-center justify-between cursor-pointer border border-white/50"
                            onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                        >
                            <span className="text-white font-bold text-[11px]">Skills</span>
                            <button className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center border border-white/40 hover:bg-white/30">
                                {isSkillsOpen ? <ChevronUp size={12} className="text-white" /> : <ChevronDown size={12} className="text-white" />}
                            </button>
                        </div>
                        {isSkillsOpen && (
                            <div className="relative p-2 flex flex-col gap-1 text-[10px] text-[#0C327D] bg-white border-x border-b border-white/50">
                                {/* Grid Pattern */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10"
                                    style={{
                                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                        backgroundSize: '4px 4px'
                                    }}
                                />
                                <div className="relative z-10 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/java-original.svg" alt="Icon" width={14} height={14} /> Java</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/python-original.svg" alt="Icon" width={14} height={14} /> Python</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/angularjs-original.svg" alt="Icon" width={14} height={14} /> Angular</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/nodejs-original.svg" alt="Icon" width={14} height={14} /> Node.js</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/typescript-original.svg" alt="Icon" width={14} height={14} /> TypeScript</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/api.png" alt="Icon" width={14} height={14} /> REST APIs</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/nextjs-original.svg" alt="Icon" width={14} height={14} /> Next.js</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/express-original.svg" alt="Icon" width={14} height={14} /> Express.js</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/tailwindcss-original.svg" alt="Icon" width={14} height={14} /> Tailwind CSS</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/react-original.svg" alt="Icon" width={14} height={14} /> React</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/azuresqldatabase-original.svg" alt="Icon" width={14} height={14} /> Sql</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Software */}
                    <div className="rounded-t-[4px] overflow-hidden shadow-sm">
                        <div
                            className="bg-gradient-to-r from-[#225AD8] to-[#225AD8] px-3 py-1 flex items-center justify-between cursor-pointer border border-white/50"
                            onClick={() => setIsSoftwareOpen(!isSoftwareOpen)}
                        >
                            <span className="text-white font-bold text-[11px]">Software</span>
                            <button className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center border border-white/40 hover:bg-white/30">
                                {isSoftwareOpen ? <ChevronUp size={12} className="text-white" /> : <ChevronDown size={12} className="text-white" />}
                            </button>
                        </div>
                        {isSoftwareOpen && (
                            <div className="relative p-2 flex flex-col gap-1 text-[10px] text-[#0C327D] bg-white border-x border-b border-white/50">
                                {/* Grid Pattern */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10"
                                    style={{
                                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                        backgroundSize: '4px 4px'
                                    }}
                                />
                                <div className="relative z-10 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/amazonwebservices-original-wordmark.svg" alt="Icon" width={14} height={14} /> AWS</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/vscode-original.svg" alt="Icon" width={14} height={14} /> VS Code</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/jenkins-original.svg" alt="Icon" width={14} height={14} /> Jenkins</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/icons8-anthropic-96.png" alt="Icon" width={14} height={14} /> Claude</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/icons8-chatgpt-96.png" alt="Icon" width={14} height={14} /> ChatGPT</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/git-original.svg" alt="Icon" width={14} height={14} /> Git/GitHub</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/docker-original.svg" alt="Icon" width={14} height={14} /> Docker</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/kubernetes-plain.svg" alt="Icon" width={14} height={14} /> Kubernetes</div>
                                    <div className="flex items-center gap-2 py-0.5"><Image src="/icons/linux-original.svg" alt="Icon" width={14} height={14} /> Linux</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto relative bg-gradient-to-r from-[#536AE4] to-[#3E55C8]">
                    {/* Grid Pattern Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                            backgroundSize: '4px 4px'
                        }}
                    />

                    <div className="relative z-10 p-8 max-w-3xl">
                        <h1 className="text-4xl font-bold text-white mb-12 drop-shadow-md">My Journey</h1>

                        <div className="relative border-l-2 border-white/20 ml-4 space-y-12">
                            {/* Fidelity Investments */}
                            <div className="relative pl-10">
                                <div className="absolute -left-[21px] top-0 w-[42px] h-[42px] rounded-full bg-[#1e1e1e] border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
                                    <Image src="/icons/fidelity.svg" alt="Fidelity" width={42} height={42} className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">Fidelity Investments</h3>
                                    <p className="text-white text-sm mb-4 font-medium drop-shadow-sm">SDE Apprentice -- Feb 2025 - Present</p>
                                    <p className="text-[13px] text-white leading-relaxed font-sans drop-shadow-md font-medium">I’ve spent my time at Fidelity working across different parts of the stack, building real products, improving how they run, and helping teams ship with more confidence. I enjoy understanding how things behave in production, making systems smoother, and keeping things reliable for the people who use them. I like solving problems end-to-end, from creating features to testing, monitoring, and making sure everything works when it actually matters.</p>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="relative pl-10">
                                <div className="absolute -left-[21px] top-0 w-[42px] h-[42px] rounded-full bg-[#1e1e1e] border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
                                    <Image src="/icons/nitte.svg" alt="Education" width={42} height={42} className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">Education</h3>
                                    <p className="text-white text-sm mb-4 font-medium drop-shadow-sm">Bachelor of Engineering - June 2023</p>
                                    <p className="text-[13px] text-white leading-relaxed font-sans drop-shadow-md font-medium">
                                        I completed my Bachelor of Engineering in Electronics and Communication at N.M.A.M. Institute of Technology, Nitte, Karnataka, where I gained a strong foundation through coursework in Object-Oriented Programming in Java, Python Programming, Database Management Systems, Embedded Linux, and Software Engineering Practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 border-t border-[#D1D1D1] bg-[#ECE9D8] flex items-center px-2 text-xs text-gray-600 shadow-[inset_0_1px_0_#fff]">
                Learn more about Kundan
            </div>
        </div>
    );
}
