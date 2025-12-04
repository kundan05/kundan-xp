import React, { useState } from 'react';
import Image from 'next/image';
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Github,
    ExternalLink
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    techStack: string[];
    link: string;
    color: string;
}

const projects: Project[] = [
    {
        id: 'https://ai-resume-analyzer-0x4h.onrender.com/',
        title: 'AI Resume Analyzer',
        description: 'Resume Analysis Tool',
        longDescription: 'AI Resume Analyzer is a modern, intelligent application designed to help job seekers optimize their resumes. By leveraging AI, it analyzes resumes against specific job descriptions, providing an ATS (Applicant Tracking System) score and actionable feedback to improve chances of hiring. Built with the latest web technologies, it offers a seamless, serverless experience for managing resumes and getting instant insights.',
        image: '/icons/resume-project.png', // Using existing placeholder
        techStack: ['/icons/react-original.svg', '/icons/typescript-original.svg', '/icons/tailwindcss-original.svg', '/icons/puterjs.png'],
        link: 'https://ai-resume-analyzer-0x4h.onrender.com/',
        color: 'from-blue-600 to-blue-900'
    },
    {
        id: 'https://notes-app-with-ai-summarization-1.onrender.com/',
        title: 'Notes-App with AI summarization',
        description: 'AI-Powered Note Taking',
        longDescription: 'This project is a modern web-based note-taking application that allows users to create, edit, view, and delete notes, with a built-in AI-powered summarization feature. By integrating Google’s Gemini API, the application can take long or unstructured notes and instantly generate concise summaries. The project uses a full-stack architecture powered by React and Vite on the frontend, offering a clean, minimal, glass-morphism design that is responsive across devices.',
        image: '/icons/notes-project.png',
        techStack: ['/icons/react-original.svg', '/icons/express-original.svg', '/icons/nodejs-original.svg', '/icons/MongoDB.svg'],
        link: 'https://notes-app-with-ai-summarization-1.onrender.com/',
        color: 'from-purple-600 to-purple-900'
    },
    {
        id: 'https://kundan-weather-app.netlify.app/weather-app',
        title: 'Weather App',
        description: 'Real-time Weather Updates',
        longDescription: 'The weather application built using Next.js (version 14) and Tailwind CSS, along with Shadcn UI and Lucide React for UI components and icons. It fetches weather data from OpenWeatherMap API — providing users with current weather conditions, an hourly-forecast strip, and a 7-day forecast for any searched city worldwide. The app features geolocation support (so it can show weather for the user’s current location on startup), plus a toggle between metric and imperial units.',
        image: '/icons/weather-project.png',
        techStack: ['/icons/react-original.svg', '/icons/nextjs-original.svg', '/icons/shadcn.png', '/icons/tailwindcss-original.svg'],
        link: 'https://kundan-weather-app.netlify.app/',
        color: 'from-orange-600 to-orange-900'
    },
    {
        id: 'https://spontaneous-travesseiro-b88e19.netlify.app/',
        title: 'Travel Booking Website',
        description: 'Travel Package Booking Website',
        longDescription: 'A visually appealing and responsive travel booking showcase designed to highlight tour packages and destination experiences. Built using HTML, CSS, JavaScript, and PHP for contact form handling, the site presents travel offerings with high-quality imagery, smooth navigation, providing an engaging browsing experience for users exploring tour options or submitting inquiries for bookings.',
        image: '/icons/tour-project.png',
        techStack: ['/icons/html.png', '/icons/css.png', '/icons/javascript.png', '/icons/php.png'],
        link: 'https://spontaneous-travesseiro-b88e19.netlify.app/',
        color: 'from-green-600 to-green-900'
    }
];

interface MyProjectsProps {
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

export default function MyProjects({ onClose, onMinimize, onMaximize }: MyProjectsProps) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeMenu, setActiveMenu] = useState<'file' | 'view' | 'tools' | 'help' | null>(null);
    const [showBrowser, setShowBrowser] = useState(false);

    const nextProject = () => {
        if (showBrowser) return;
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        if (showBrowser) {
            setShowBrowser(false);
            return;
        }
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentIndex];

    return (
        <div className="flex flex-col h-full w-full bg-[#ECE9D8] font-tahoma text-xs" onClick={() => setActiveMenu(null)}>
            {/* Menu Bar */}
            <div className="flex items-center px-1 py-0.5 bg-[#ECE9D8] border-b border-white/50 relative">
                <div className="flex gap-2 px-2 relative">
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
                    <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default text-gray-400">Tools</span>
                    <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default text-gray-400">Help</span>
                </div>
                <div className="ml-auto">
                    <Image src="/icons/xp-logo-user-provided.png" alt="Windows" width={18} height={18} className="opacity-80" />
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8]">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => {
                            setShowBrowser(false);
                            setCurrentIndex(0);
                        }}
                        className="flex items-center gap-1 px-2 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm active:border-gray-400 active:shadow-inner"
                    >
                        <div className="relative w-6 h-6">
                            <Image src="/icons/IE Home.png" alt="Home" fill className="object-contain" />
                        </div>
                        <span className="text-[11px]">Home</span>
                    </button>
                    <button
                        onClick={prevProject}
                        className="flex items-center gap-1 px-1 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm group active:border-gray-400 active:shadow-inner"
                    >
                        <div className="relative w-6 h-6">
                            <Image src="/icons/Back.png" alt="Back" fill className="object-contain" />
                        </div>
                        <span className="text-[11px]">Back</span>
                    </button>
                    <button
                        onClick={nextProject}
                        disabled={showBrowser}
                        className={`flex items-center gap-1 px-1 border border-transparent rounded-sm group ${showBrowser ? 'opacity-50 cursor-default' : 'hover:bg-white/50 hover:border-[#D4D0C8] active:border-gray-400 active:shadow-inner'}`}
                    >
                        <div className="relative w-6 h-6">
                            <Image src="/icons/Forward.png" alt="Forward" fill className="object-contain" />
                        </div>
                        <span className="text-[11px]">Forward</span>
                    </button>
                </div>

                <div className="w-[1px] h-6 bg-[#D4D0C8] mx-1"></div>


                <button className="flex items-center gap-1 px-2 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm active:border-gray-400 active:shadow-inner">
                    <div className="relative w-6 h-6">
                        <Image src="/icons/Favorites.png" alt="Favorites" fill className="object-contain" />
                    </div>
                    <span className="text-[11px]">Favorites</span>
                </button>
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`flex items-center gap-1 px-2 hover:bg-white/50 border border-transparent hover:border-[#D4D0C8] rounded-sm active:border-gray-400 active:shadow-inner ${!isDarkMode ? 'bg-white/50 border-[#D4D0C8]' : ''}`}
                >
                    <div className="relative w-6 h-6">
                        <Image src="/icons/Theme.png" alt="Theme" fill className="object-contain" />
                    </div>
                    <span className="text-[11px]">Light/Dark</span>
                </button>
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8] shadow-[0_1px_0_#fff]">
                <span className="text-gray-500 text-[11px]">Address</span>
                <div className="flex-1 bg-white border border-[#7F9DB9] flex items-center px-1 h-[22px] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)]">
                    <Image src="/icons/internet-explorer.png" alt="IE" width={14} height={14} className="mr-2" />
                    <span className="text-black text-[11px]">{currentProject.id}</span>
                </div>
                <button
                    onClick={() => setShowBrowser(true)}
                    className="flex items-center gap-1 px-2 h-[22px] bg-[#ECE9D8] border border-[#D4D0C8] hover:bg-white/50 rounded-sm active:border-gray-400 active:shadow-inner"
                >
                    <div className="relative w-4 h-4">
                        <Image src="/icons/Go.png" alt="Go" fill className="object-contain" />
                    </div>
                    <span className="text-black text-[11px]">Go</span>
                </button>
            </div>

            {/* Main Content Area */}
            {showBrowser ? (
                <div className="flex-1 w-full bg-white relative">
                    <iframe
                        src={currentProject.link}
                        className="w-full h-full border-none"
                        title={currentProject.title}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                </div>
            ) : (
                <div className={`flex-1 flex items-center justify-center p-8 overflow-hidden relative transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-[#F0F0F0]'}`}>
                    {/* Background Glow */}
                    <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${currentProject.color} opacity-20 blur-[100px] rounded-full pointer-events-none transition-colors duration-700`} />

                    <div className="w-full max-w-4xl relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            {/* Left Content */}
                            <div className="flex-1 space-y-8">
                                {/* Project Icon */}
                                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center p-3 shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-gray-200'}`}>
                                    <div className="relative w-full h-full">
                                        <Image src={currentProject.image} alt="Icon" fill className="object-contain" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-4">
                                    <h1 className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {currentProject.title}
                                    </h1>
                                    <p className={`text-base md:text-lg leading-relaxed max-w-xl transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {currentProject.longDescription}
                                    </p>
                                </div>

                                {/* Tech Stack & Link */}
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex gap-3">
                                        {currentProject.techStack.map((icon, i) => (
                                            <div key={i} className={`w-10 h-10 rounded-lg border flex items-center justify-center p-2 transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1A1A] border-[#333] hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-400'}`} title="Tech Stack">
                                                <div className="relative w-full h-full">
                                                    <Image src={icon} alt="Tech" fill className="object-contain" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setShowBrowser(true)}
                                        className={`flex items-center gap-2 font-medium text-sm group transition-colors duration-300 ${isDarkMode ? 'text-[#E5E5E5] hover:text-white' : 'text-gray-700 hover:text-black'}`}
                                    >
                                        Check Live Site
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex gap-4 pt-8">
                                    <button
                                        onClick={prevProject}
                                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-95 ${isDarkMode ? 'bg-[#1A1A1A] border-[#333] text-white hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextProject}
                                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-95 ${isDarkMode ? 'bg-[#1A1A1A] border-[#333] text-white hover:bg-[#333]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Right Content - Preview Image (Optional, or just keep layout balanced) */}
                            {/* For this specific design, it seems text focused, but we can add a visual element if needed.
                                The reference image is mostly text and icons on the left/center.
                                We'll keep it clean as per the reference.
                            */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
