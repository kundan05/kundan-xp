'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import StartMenu from './StartMenu';
import { WindowState } from './types';
import AboutMe from './apps/AboutMe';
import MyProjects from './apps/MyProjects';
import Resume from './apps/Resume';
import Contact from './apps/Contact';
import ImageViewer from './apps/ImageViewer';
import MediaPlayer from './apps/MediaPlayer';
import Paint from './apps/Paint';
import MusicPlayer from './apps/MusicPlayer';
import CommandPrompt from './apps/CommandPrompt';
import WorldOfWarcraft from './apps/WorldOfWarcraft';
import LoginScreen from './LoginScreen';
import ShutdownDialog from './ShutdownDialog';
import LogOffDialog from './LogOffDialog';
import Notification from './Notification';
import LoadingScreen from './LoadingScreen';


type AppState = 'booting' | 'login' | 'desktop' | 'shutdown_dialog' | 'powered_off';

export default function Desktop() {
    const [windows, setWindows] = useState<WindowState[]>([
        {
            id: 'about',
            title: 'About Me',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <AboutMe />,
            icon: '/icons/about-custom.png',
            hasCustomContent: true,
            initialWidth: 800,
            initialHeight: 700
        },
        {
            id: 'resume',
            title: 'My Resume',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <Resume
                onClose={() => handleCloseWindow('resume')}
                onMinimize={() => handleMinimizeWindow('resume')}
                onMaximize={() => handleMaximizeWindow('resume')}
            />,
            icon: '/icons/resume-custom.png',
            hasCustomContent: true,
            initialWidth: 900,
            initialHeight: 850
        },
        {
            id: 'projects',
            title: 'My Projects',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <MyProjects
                onClose={() => handleCloseWindow('projects')}
                onMinimize={() => handleMinimizeWindow('projects')}
                onMaximize={() => handleMaximizeWindow('projects')}
            />,
            icon: '/icons/projects-custom.png',
            hasCustomContent: true,
            initialWidth: 1000,
            initialHeight: 700
        },
        {
            id: 'contact',
            title: 'Contact Me',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <Contact />,
            icon: '/icons/outlook.png',
            hasCustomContent: true
        },
        {
            id: 'media-player',
            title: 'Media Player',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <MediaPlayer
                onClose={() => handleCloseWindow('media-player')}
                onMinimize={() => handleMinimizeWindow('media-player')}
                onMaximize={() => handleMaximizeWindow('media-player')}
            />,
            icon: '/icons/media-player.png',
            initialWidth: 800,
            initialHeight: 600,
            hasCustomContent: true
        },
        {
            id: 'paint',
            title: 'Paint',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <Paint />,
            icon: '/icons/paint.png',
            hasCustomContent: true
        },
        {
            id: 'image-viewer',
            title: 'Image Viewer',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <ImageViewer
                onClose={() => handleCloseWindow('image-viewer')}
                onMinimize={() => handleMinimizeWindow('image-viewer')}
                onMaximize={() => handleMaximizeWindow('image-viewer')}
            />,
            icon: '/icons/image-viewer.png',
            hasCustomContent: true
        },
        {
            id: 'music-player',
            title: 'Music Player',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <MusicPlayer />,
            icon: '/icons/music.png',
            hasCustomContent: true
        },
        {
            id: 'cmd',
            title: 'Command Prompt',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <CommandPrompt onClose={() => handleCloseWindow('cmd')} />,
            icon: '/icons/cmd.png',
            hasCustomContent: true
        },
        {
            id: 'wow',
            title: 'World of Warcraft',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: <WorldOfWarcraft onClose={() => handleCloseWindow('wow')} />,
            icon: '/icons/gamew.png',
            initialWidth: 800,
            initialHeight: 600,
            hasCustomContent: true
        }
    ]);

    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [showShutdownDialog, setShowShutdownDialog] = useState(false);
    const [showLogOffDialog, setShowLogOffDialog] = useState(false);
    const [maxZIndex, setMaxZIndex] = useState(10);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [appState, setAppState] = useState<AppState>('booting');

    const [showNotification, setShowNotification] = useState(false);
    const [isCRTEnabled, setIsCRTEnabled] = useState(false);

    const toggleCRT = () => setIsCRTEnabled(!isCRTEnabled);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Boot sequence
    useEffect(() => {
        if (appState === 'booting') {
            const timer = setTimeout(() => {
                setAppState('login');
            }, 3000); // 3 seconds boot time
            return () => clearTimeout(timer);
        }
    }, [appState]);

    const startupAudioRef = React.useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (appState === 'desktop') {
            startupAudioRef.current?.play().catch(e => console.error("Audio play failed", e));
        }
    }, [appState]);

    const handleOpenWindow = (id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
        setIsStartMenuOpen(false);
    };

    const handleCloseWindow = (id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isOpen: false };
            }
            return w;
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const handleMinimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isMinimized: true };
            }
            return w;
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const handleMaximizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isMaximized: !w.isMaximized };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
    };

    const handleFocusWindow = (id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, zIndex: maxZIndex + 1, isMinimized: false };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
    };

    const handleToggleWindow = (id: string) => {
        const win = windows.find(w => w.id === id);
        if (win?.isMinimized || activeWindowId !== id) {
            handleFocusWindow(id);
        } else {
            handleMinimizeWindow(id);
        }
    };

    const handleLogin = () => {
        setAppState('desktop');
        setTimeout(() => setShowNotification(true), 1000); // Show notification after 1s
    };

    const handleLogOff = () => {
        setIsStartMenuOpen(false);
        setShowLogOffDialog(true);
    };

    const confirmLogOff = () => {
        // Play logoff sound
        const audio = new Audio('/icons/windows-xp-logoff.mp3');
        audio.play().catch(e => console.error("Audio play failed", e));

        // Close all windows and reset state
        setWindows(windows.map(w => ({ ...w, isOpen: false, isMinimized: false })));
        setShowLogOffDialog(false);
        setAppState('login');
    };

    const confirmSwitchUser = () => {
        // Keep windows open, just go to login screen
        setShowLogOffDialog(false);
        setAppState('login');
    };

    const handleTurnOffRequest = () => {
        setShowShutdownDialog(true);
        setIsStartMenuOpen(false);
    };

    const handleCancelShutdown = () => {
        setShowShutdownDialog(false);
    };

    const handleRestart = () => {
        setAppState('booting');
        setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMaximized: false })));
        setShowShutdownDialog(false);
    };

    const handleShutdown = () => {
        // Play shutdown sound
        const audio = new Audio('/icons/windows-shutdown_lWRhnkD.mp3');
        audio.play().catch(e => console.error("Audio play failed", e));

        setAppState('powered_off');
        setShowShutdownDialog(false);
    };

    if (appState === 'booting') {
        return <LoadingScreen />;
    }

    if (appState === 'login') {
        return <LoginScreen onLogin={handleLogin} onShutdown={handleRestart} />;
    }

    if (appState === 'powered_off') {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center font-sans text-orange-500 text-2xl font-bold">
                It is now safe to turn off your computer.
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-xp-blue select-none bg-cover bg-center"
            style={{ backgroundImage: 'url(/wallpaper-custom.png)' }}
            onClick={() => setIsStartMenuOpen(false)}
        >
            {/* Desktop Icons */}
            {/* Desktop Icons */}
            <div className="absolute top-0 left-0 bottom-8 right-0 flex flex-col flex-wrap content-start p-2 gap-2 z-0 overflow-hidden pointer-events-none">
                <div className="pointer-events-auto">
                    <DesktopIcon id="about" icon="/icons/about-custom.png" title="About Me" onDoubleClick={() => handleOpenWindow('about')} />
                </div>
                <div className="pointer-events-auto">
                    <DesktopIcon id="resume" icon="/icons/resume-custom.png" title="My Resume" onDoubleClick={() => handleOpenWindow('resume')} />
                </div>
                <div className="pointer-events-auto">
                    <DesktopIcon id="projects" icon="/icons/projects-custom.png" title="My Projects" onDoubleClick={() => handleOpenWindow('projects')} />
                </div>
                <div className="pointer-events-auto">
                    <DesktopIcon id="contact" icon="/icons/outlook.png" title="Contact Me" onDoubleClick={() => handleOpenWindow('contact')} />
                </div>
            </div>

            {/* Windows */}
            {windows.map(window => (
                window.isOpen && !window.isMinimized && (
                    <Window
                        key={window.id}
                        {...window}
                        isActive={activeWindowId === window.id}
                        isMaximized={window.isMaximized}
                        onClose={() => handleCloseWindow(window.id)}
                        onMinimize={() => handleMinimizeWindow(window.id)}
                        onMaximize={() => handleMaximizeWindow(window.id)}
                        onFocus={() => handleFocusWindow(window.id)}
                    >
                        {window.id === 'contact' ? (
                            <Contact
                                onClose={() => handleCloseWindow('contact')}
                                onMinimize={() => handleMinimizeWindow('contact')}
                                onMaximize={() => handleMaximizeWindow('contact')}
                            />
                        ) : window.id === 'about' ? (
                            <AboutMe
                                onClose={() => handleCloseWindow('about')}
                                onMinimize={() => handleMinimizeWindow('about')}
                                onMaximize={() => handleMaximizeWindow('about')}
                                onOpenApp={handleOpenWindow}
                            />
                        ) : (
                            window.content
                        )}
                    </Window>
                )
            ))}

            {/* Start Menu */}
            <div onClick={(e) => e.stopPropagation()}>
                <StartMenu
                    isOpen={isStartMenuOpen}
                    onClose={() => setIsStartMenuOpen(false)}
                    onItemClick={handleOpenWindow}
                    onLogOff={handleLogOff}
                    onTurnOff={handleTurnOffRequest}
                />
            </div>

            {/* Taskbar */}
            <Taskbar
                windows={windows}
                activeWindowId={activeWindowId}
                onToggleWindow={handleToggleWindow}
                onToggleStart={() => setIsStartMenuOpen(!isStartMenuOpen)}
                isCRTEnabled={isCRTEnabled}
                onToggleCRT={toggleCRT}
                onToggleFullscreen={toggleFullscreen}
                onToggleNotification={() => setShowNotification(!showNotification)}
            />

            {/* CRT Overlay */}
            {isCRTEnabled && (
                <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                </div>
            )}

            {/* Shutdown Dialog */}
            {showShutdownDialog && (
                <ShutdownDialog
                    onCancel={handleCancelShutdown}
                    onRestart={handleRestart}
                    onShutdown={handleShutdown}
                />
            )}

            {showLogOffDialog && (
                <LogOffDialog
                    onCancel={() => setShowLogOffDialog(false)}
                    onLogOff={confirmLogOff}
                    onSwitchUser={confirmSwitchUser}
                />
            )}
            {/* Notification */}
            {showNotification && (
                <Notification onClose={() => setShowNotification(false)} onLinkClick={handleOpenWindow} />
            )}

            {/* Startup Sound */}
            <audio ref={startupAudioRef} src="/icons/windows-xp-startup.mp3" />
        </div>
    );
}
