import React from 'react';
import Image from 'next/image';
import ShutdownDialog from './ShutdownDialog';


interface LoginScreenProps {
    onLogin: () => void;
    onRestart: () => void;
    onShutdown: () => void;
}

export default function LoginScreen({ onLogin, onRestart, onShutdown }: LoginScreenProps) {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [showShutdownDialog, setShowShutdownDialog] = React.useState(false);

    const handleLoginClick = () => {
        setIsLoggingIn(true);
        setTimeout(onLogin, 3000); // Wait 3 seconds before showing desktop
    };

    return (
        <div className="w-full h-screen md:h-screen h-[100dvh] bg-[#003399] flex flex-col relative overflow-hidden font-sans">
            {/* Top Blue Bar */}
            <div className="h-[60px] md:h-[80px] w-full bg-[#003399] relative z-20 shadow-[0_3px_10px_rgba(0,0,0,0.3)] shrink-0">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
            </div>

            {/* Main Content Area - Grid Background */}
            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden pb-[60px] md:pb-0">
                {/* Background Color */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#536AE4] to-[#3E55C8]"></div>

                {/* Grid Pattern */}


                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A7EDC] via-transparent to-[#5A7EDC] opacity-60"></div>

                {/* Center Divider */}
                <div className={`hidden md:block h-[350px] w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent absolute left-1/2 -translate-x-1/2 shadow-[1px_0_0_rgba(0,0,0,0.1)] transition-opacity duration-500 ${isLoggingIn ? 'opacity-0' : 'opacity-100'}`}></div>

                {isLoggingIn ? (
                    <div className="z-30 animate-fade-in">
                        <h1 className="text-white text-6xl italic font-bold tracking-wider drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                            welcome
                        </h1>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row w-full max-w-5xl items-center relative z-10 animate-fade-in gap-0 md:gap-0 h-full md:h-auto justify-center md:justify-start">
                        {/* Left Side - Logo */}
                        <div className="w-full md:w-1/2 md:pr-12 flex flex-col items-center md:items-end text-center md:text-right py-4 md:py-0">
                            <div className="flex flex-col items-center md:items-end">
                                <div className="relative w-32 h-24 md:w-40 md:h-30 mb-0.1 md:mr-0">
                                    <Image src="/icons/xp-logo-final.png" alt="XP Logo" fill className="object-contain" sizes="(max-width: 768px) 150px, 250px" />
                                </div>
                                <div className="flex flex-col items-start md:items-end">
                                    <h1 className="text-white text-[42px] md:text-[54px] font-bold tracking-tighter drop-shadow-md flex items-start justify-start md:justify-end gap-1 leading-none" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                                        Kundan<span className="text-[#E57E31] text-[24px] md:text-[32px] font-bold mt-1 italic" style={{ fontFamily: '"Segoe UI", sans-serif' }}>xp</span>
                                    </h1>
                                    <p className="text-white text-sm md:text-1xl font-bold mt-0.2 tracking-wide md:mr-20" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</p>
                                </div>
                            </div>
                            <p className="hidden md:block text-white text-1xl font-bold mb-4 mt-4" style={{ fontFamily: 'Tahoma, sans-serif' }}>To begin, click on KundanGowda N to log in</p>
                        </div>

                        {/* Mobile Horizontal Divider */}
                        <div className="block md:hidden w-full h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent my-4"></div>

                        {/* Right Side - User List */}
                        <div className="w-full md:w-1/2 md:pl-12 flex flex-col items-center md:items-start py-4 md:py-0">
                            <button
                                onClick={handleLoginClick}
                                className="flex flex-col md:flex-row items-center gap-5 group p-3 rounded-xl hover:bg-gradient-to-b hover:from-[#2F68E8]/50 hover:to-[#0F42C0]/50 border border-transparent hover:border-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all w-full max-w-md text-center md:text-left"
                            >
                                <div className="w-20 h-20 bg-orange-200 rounded-[4px] border-[3px] border-white/80 overflow-hidden relative shadow-lg group-hover:border-[#FFD700] transition-colors">
                                    <Image
                                        src="/icons/user.jpeg"
                                        alt="User"
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center md:items-start">
                                    <span className="text-white text-2xl md:text-3xl font-normal" style={{ fontFamily: 'Tahoma, sans-serif' }}>KundanGowda N</span>
                                    <span className="text-[#003399] text-base md:text-lg font-bold group-hover:text-[#FFD700] transition-colors" style={{ fontFamily: 'Tahoma, sans-serif' }}>Software Developer</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 md:relative h-[60px] md:h-[80px] w-full bg-[#003399] flex items-center justify-center md:justify-between px-4 md:px-12 z-50 md:z-20 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.2)] md:shadow-none">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E57E31] to-transparent"></div>
                {!isLoggingIn && (
                    <>
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => setShowShutdownDialog(true)}
                                className="flex items-center gap-3 text-white hover:text-white/80 transition-colors group"
                            >
                                <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#3B9D00] to-[#2D7600] rounded-[3px] border border-white/40 flex items-center justify-center shadow-md group-hover:brightness-110 relative">
                                    <Image src="/icons/restart.png" alt="Turn Off" width={24} height={24} className="drop-shadow-sm" sizes="24px" />
                                </div>
                                <span className="font-bold text-sm md:text-base tracking-wide" style={{ fontFamily: 'Tahoma, sans-serif' }}>Restart Kundan XP</span>
                            </button>
                        </div>

                        <div className="hidden md:block text-white/100 text-sm max-w-md text-right leading-tight font-medium" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                            After you log on, the system's yours to explore.<br />
                            Every detail has been designed with a purpose.
                        </div>

                        {/* Mobile Footer Text */}
                        <div className="md:hidden text-white text-base font-normal" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                            Tap on the user icon to begin
                        </div>
                    </>
                )}
            </div>

            {/* Shutdown Dialog */}
            {showShutdownDialog && (
                <ShutdownDialog
                    onCancel={() => setShowShutdownDialog(false)}
                    onRestart={onRestart}
                    onShutdown={onShutdown}
                />
            )}
        </div>
    );
}

