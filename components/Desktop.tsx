'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import OpenLinkDialog from './OpenLinkDialog';
import MobileRestrictionDialog from './MobileRestrictionDialog';
import DesktopParticles from './DesktopParticles';

type AppState = 'booting' | 'login' | 'desktop' | 'shutdown_dialog' | 'powered_off';

export default function Desktop() {
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [maxZIndex, setMaxZIndex] = useState(10);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [appState, setAppState] = useState<AppState>('booting');

    const [windows, setWindows] = useState<WindowState[]>(() => [
        {
            id: 'about',
            title: 'About Me',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
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
            content: null,
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
            content: null,
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
            content: null,
            icon: '/icons/outlook.png',
            hasCustomContent: true
        },
        {
            id: 'media-player',
            title: 'Media Player',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
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
            content: null,
            icon: '/icons/paint.png',
            hasCustomContent: true
        },
        {
            id: 'image-viewer',
            title: 'Image Viewer',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
            icon: '/icons/image-viewer.png',
            hasCustomContent: true
        },
        {
            id: 'music-player',
            title: 'Music Player',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
            icon: '/icons/music.png',
            hasCustomContent: true,
            allowMobileMaximize: false
        },
        {
            id: 'cmd',
            title: 'Command Prompt',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
            icon: '/icons/cmd.png',
            hasCustomContent: true
        },
        {
            id: 'wow',
            title: 'World of Warcraft',
            isOpen: false,
            isMinimized: false,
            zIndex: 1,
            content: null,
            icon: '/icons/gamew.png',
            initialWidth: 800,
            initialHeight: 600,
            hasCustomContent: true
        }
    ]);

    const handleCloseWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isOpen: false };
            }
            return w;
        }));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const handleMinimizeWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isMinimized: true };
            }
            return w;
        }));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const handleMaximizeWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isMaximized: !w.isMaximized };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
    }, []);

    const [showShutdownDialog, setShowShutdownDialog] = useState(false);
    const [showMobileRestriction, setShowMobileRestriction] = useState(false);
    const [showLogOffDialog, setShowLogOffDialog] = useState(false);

    const [showNotification, setShowNotification] = useState(false);
    const [isCRTEnabled, setIsCRTEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [linkDialogState, setLinkDialogState] = useState<{ isOpen: boolean; icon: string; title: string; url: string }>({
        isOpen: false,
        icon: '',
        title: '',
        url: ''
    });

    const handleOpenLink = useCallback((icon: string, title: string, url: string) => {
        setLinkDialogState({ isOpen: true, icon, title, url });
    }, []);

    const handleConfirmLink = useCallback(() => {
        if (linkDialogState.url) {
            window.open(linkDialogState.url, '_blank');
        }
        setLinkDialogState(prev => ({ ...prev, isOpen: false }));
    }, [linkDialogState.url]);

    const handleCancelLink = useCallback(() => {
        setLinkDialogState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const toggleCRT = useCallback(() => setIsCRTEnabled(v => !v), []);
    const toggleSound = useCallback(() => setSoundEnabled(v => !v), []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, []);

    // Boot sequence
    useEffect(() => {
        if (appState === 'booting') {
            const timer = setTimeout(() => {
                setAppState('login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [appState]);

    const startupAudioRef = React.useRef<HTMLAudioElement>(null);

    const handleStartupSoundEnded = useCallback(() => {
        setShowNotification(true);
        if (soundEnabled) {
            const audio = new Audio('/icons/windows-xp-balloon-sound.mp3');
            audio.play().catch(() => {});
        }
    }, [soundEnabled]);

    useEffect(() => {
        if (appState === 'desktop' && soundEnabled) {
            startupAudioRef.current?.play().catch(() => {
                handleStartupSoundEnded();
            });
        }
    }, [appState, soundEnabled, handleStartupSoundEnded]);

    const handleOpenWindow = useCallback((id: string) => {
        if (id === 'media-player' && window.innerWidth < 768) {
            setShowMobileRestriction(true);
            setIsStartMenuOpen(false);
            return;
        }

        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
        setIsStartMenuOpen(false);
    }, [maxZIndex]);

    const handleFocusWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, zIndex: maxZIndex + 1, isMinimized: false };
            }
            return w;
        }));
        setActiveWindowId(id);
        setMaxZIndex(prev => prev + 1);
    }, [maxZIndex]);

    const handleToggleWindow = useCallback((id: string) => {
        const win = windows.find(w => w.id === id);
        if (win?.isMinimized || activeWindowId !== id) {
            handleFocusWindow(id);
        } else {
            handleMinimizeWindow(id);
        }
    }, [windows, activeWindowId, handleFocusWindow, handleMinimizeWindow]);

    const handleLogin = useCallback(() => {
        setAppState('desktop');
    }, []);

    const handleLogOff = useCallback(() => {
        setIsStartMenuOpen(false);
        setShowLogOffDialog(true);
    }, []);

    const confirmLogOff = useCallback(() => {
        if (soundEnabled) {
            const audio = new Audio('/icons/windows-xp-logoff.mp3');
            audio.play().catch(() => {});
        }
        setWindows(windows.map(w => ({ ...w, isOpen: false, isMinimized: false })));
        setShowLogOffDialog(false);
        setAppState('login');
    }, [soundEnabled, windows]);

    const confirmSwitchUser = useCallback(() => {
        setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMaximized: false })));
        setShowLogOffDialog(false);
        setAppState('booting');
    }, []);

    const handleTurnOffRequest = useCallback(() => {
        setShowShutdownDialog(true);
        setIsStartMenuOpen(false);
    }, []);

    const handleCancelShutdown = useCallback(() => {
        setShowShutdownDialog(false);
    }, []);

    const handleRestart = useCallback(() => {
        setAppState('booting');
        setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isMaximized: false })));
        setShowShutdownDialog(false);
    }, []);

    const handleShutdown = useCallback(() => {
        if (soundEnabled) {
            const audio = new Audio('/icons/windows-shutdown_lWRhnkD.mp3');
            audio.play().catch(() => {});
        }
        setAppState('powered_off');
        setShowShutdownDialog(false);
    }, [soundEnabled]);

    const openWindows = useMemo(() => windows.filter(w => w.isOpen), [windows]);
    const visibleWindows = useMemo(() => openWindows.filter(w => !w.isMinimized), [openWindows]);

    function renderWindowContent(window: WindowState) {
        switch (window.id) {
            case 'contact':
                return (
                    <Contact
                        onClose={() => handleCloseWindow('contact')}
                        onMinimize={() => handleMinimizeWindow('contact')}
                        onMaximize={() => handleMaximizeWindow('contact')}
                        onOpenLink={handleOpenLink}
                    />
                );
            case 'about':
                return (
                    <AboutMe
                        onClose={() => handleCloseWindow('about')}
                        onMinimize={() => handleMinimizeWindow('about')}
                        onMaximize={() => handleMaximizeWindow('about')}
                        onOpenApp={handleOpenWindow}
                        onOpenLink={handleOpenLink}
                    />
                );
            case 'resume':
                return (
                    <Resume
                        onClose={() => handleCloseWindow('resume')}
                        onMinimize={() => handleMinimizeWindow('resume')}
                        onMaximize={() => handleMaximizeWindow('resume')}
                        onOpenApp={handleOpenWindow}
                    />
                );
            case 'media-player':
                return (
                    <MediaPlayer
                        onClose={() => handleCloseWindow('media-player')}
                        onMinimize={() => handleMinimizeWindow('media-player')}
                        onMaximize={() => handleMaximizeWindow('media-player')}
                    />
                );
            case 'image-viewer':
                return (
                    <ImageViewer
                        onClose={() => handleCloseWindow('image-viewer')}
                        onMinimize={() => handleMinimizeWindow('image-viewer')}
                        onMaximize={() => handleMaximizeWindow('image-viewer')}
                    />
                );
            case 'cmd':
                return <CommandPrompt onClose={() => handleCloseWindow('cmd')} />;
            case 'wow':
                return <WorldOfWarcraft onClose={() => handleCloseWindow('wow')} />;
            case 'projects':
                return (
                    <MyProjects
                        onClose={() => handleCloseWindow('projects')}
                        onMinimize={() => handleMinimizeWindow('projects')}
                        onMaximize={() => handleMaximizeWindow('projects')}
                    />
                );
            case 'paint':
                return <Paint />;
            case 'music-player':
                return <MusicPlayer />;
            default:
                return null;
        }
    }

    if (appState === 'booting') {
        return <LoadingScreen />;
    }

    if (appState === 'login') {
        return <LoginScreen onLogin={handleLogin} onRestart={handleRestart} onShutdown={handleShutdown} />;
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
            className="relative w-full h-[100dvh] overflow-hidden bg-xp-blue select-none bg-cover bg-center bg-[url('/wallpaper-mobile.jpg')] md:bg-[url('/wallpaper-custom.png')]"
            onClick={() => setIsStartMenuOpen(false)}
        >
            <DesktopParticles />

            <div className="absolute top-0 left-0 bottom-8 right-0 flex flex-col flex-wrap content-start p-3 gap-1 z-0 overflow-hidden pointer-events-none">
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

            {visibleWindows.map(window => (
                <Window
                    key={window.id}
                    title={window.title}
                    icon={window.icon}
                    isActive={activeWindowId === window.id}
                    isMaximized={window.isMaximized}
                    zIndex={window.zIndex}
                    initialWidth={window.initialWidth}
                    initialHeight={window.initialHeight}
                    hasCustomContent={window.hasCustomContent}
                    allowMobileMaximize={window.allowMobileMaximize}
                    onClose={() => handleCloseWindow(window.id)}
                    onMinimize={() => handleMinimizeWindow(window.id)}
                    onMaximize={() => handleMaximizeWindow(window.id)}
                    onFocus={() => handleFocusWindow(window.id)}
                >
                    {renderWindowContent(window)}
                </Window>
            ))}

            <div onClick={(e) => e.stopPropagation()}>
                <StartMenu
                    isOpen={isStartMenuOpen}
                    onClose={() => setIsStartMenuOpen(false)}
                    onItemClick={handleOpenWindow}
                    onLogOff={handleLogOff}
                    onTurnOff={handleTurnOffRequest}
                    onOpenLink={handleOpenLink}
                />
            </div>

            <Taskbar
                windows={openWindows}
                activeWindowId={activeWindowId}
                onToggleWindow={handleToggleWindow}
                onToggleStart={() => setIsStartMenuOpen(!isStartMenuOpen)}
                isCRTEnabled={isCRTEnabled}
                onToggleCRT={toggleCRT}
                onToggleFullscreen={toggleFullscreen}
                onToggleNotification={() => setShowNotification(!showNotification)}
                soundEnabled={soundEnabled}
                onToggleSound={toggleSound}
            />

            {isCRTEnabled && (
                <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                </div>
            )}

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

            <OpenLinkDialog
                isOpen={linkDialogState.isOpen}
                icon={linkDialogState.icon}
                title={linkDialogState.title}
                url={linkDialogState.url}
                onConfirm={handleConfirmLink}
                onCancel={handleCancelLink}
            />

            <MobileRestrictionDialog
                isOpen={showMobileRestriction}
                onClose={() => setShowMobileRestriction(false)}
            />

            {showNotification && (
                <Notification onClose={() => setShowNotification(false)} onLinkClick={handleOpenWindow} />
            )}

            <audio ref={startupAudioRef} src="/icons/windows-xp-startup.mp3" onEnded={handleStartupSoundEnded} />
        </div>
    );
}
