import React from 'react';
import Image from 'next/image';


interface LoginScreenProps {
    onLogin: () => void;
    onShutdown: () => void;
}

export default function LoginScreen({ onLogin, onShutdown }: LoginScreenProps) {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLoginClick = () => {
        setIsLoggingIn(true);
        setTimeout(onLogin, 3000); // Wait 3 seconds before showing desktop
    };

    return (
        <div className="w-full h-screen bg-[#003399] flex flex-col relative overflow-hidden font-sans">
            {/* Top Blue Bar */}
            <div className="h-[80px] w-full bg-[#003399] border-b-[2px] border-[#E57E31] shadow-md z-20"></div>

            {/* Main Content Area - Grid Background */}
            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
                {/* Background Color */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#536AE4] to-[#3E55C8]"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '4px 4px'
                    }}
                ></div>

                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A7EDC] via-transparent to-[#5A7EDC] opacity-60"></div>

                {/* Center Divider */}
                <div className={`h-[350px] w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent absolute left-1/2 -translate-x-1/2 shadow-[1px_0_0_rgba(0,0,0,0.1)] transition-opacity duration-500 ${isLoggingIn ? 'opacity-0' : 'opacity-100'}`}></div>

                {isLoggingIn ? (
                    <div className="z-30 animate-fade-in">
                        <h1 className="text-white text-6xl italic font-bold tracking-wider drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                            welcome
                        </h1>
                    </div>
                ) : (
                    <div className="flex w-full max-w-5xl items-center relative z-10 animate-fade-in">
                        {/* Left Side - Logo */}
                        {/* Left Side - Logo */}
                        <div className="w-1/2 pr-12 flex flex-col items-end text-right">
                            <div className="flex flex-col items-end">
                                <div className="relative w-35 h-25 mb-0.1 mr-4">
                                    <Image src="/icons/xp-logo-user-provided.png" alt="XP Logo" fill className="object-contain" />
                                </div>
                                <h1 className="text-white text-[54px] font-bold tracking-tighter drop-shadow-md flex items-start justify-end gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                                    Kundan<span className="text-[#E57E31] text-[32px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                                </h1>
                                <p className="text-white text-1xl font-normal mt-0.2 tracking-wide mr-18" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                            </div>
                            <p className="text-white text-1xl font-normal mb-4 mt-4" style={{ fontFamily: 'Tahoma, sans-serif' }}>To begin, click on KundanGowda N to log in</p>
                        </div>

                        {/* Right Side - User List */}
                        <div className="w-1/2 pl-12 flex flex-col items-start">
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center gap-5 group p-3 rounded-xl hover:bg-gradient-to-b hover:from-[#2F68E8]/50 hover:to-[#0F42C0]/50 border border-transparent hover:border-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all w-full max-w-md text-left"
                            >
                                <div className="w-20 h-20 bg-orange-200 rounded-[4px] border-[3px] border-white/80 overflow-hidden relative shadow-lg group-hover:border-[#FFD700] transition-colors">
                                    <Image
                                        src="/icons/user.jpeg"
                                        alt="User"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-white text-3xl font-normal" style={{ fontFamily: 'Tahoma, sans-serif' }}>KundanGowda N</span>
                                    <span className="text-[#003399] text-lg font-bold group-hover:text-[#FFD700] transition-colors" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="h-[80px] w-full bg-[#003399] border-t-[2px] border-[#E57E31] flex items-center justify-between px-12 z-20">
                {!isLoggingIn && (
                    <>
                        <button
                            onClick={onShutdown}
                            className="flex items-center gap-3 text-white hover:text-white/80 transition-colors group"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-[#3B9D00] to-[#286800] rounded-[3px] border border-white/40 flex items-center justify-center shadow-md group-hover:brightness-110 relative">
                                <Image src="/icons/restart.png" alt="Restart" width={24} height={24} className="drop-shadow-sm" />
                            </div>
                            <span className="font-bold text-base tracking-wide" style={{ fontFamily: 'Tahoma, sans-serif' }}>Restart Kundan XP</span>
                        </button>

                        <div className="text-white/60 text-sm max-w-md text-right leading-tight font-medium" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                            After you log on, the system's yours to explore.<br />
                            Every detail has been designed with a purpose.
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

