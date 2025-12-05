'use client';

import React, { useEffect, useState, useRef } from 'react';

const DESIGN_WIDTH = 1024;
const DESIGN_HEIGHT = 768;

interface ScaleWrapperProps {
    children: React.ReactNode;
}

export default function ScaleWrapper({ children }: ScaleWrapperProps) {
    const [scale, setScale] = useState(1);
    const [isScaled, setIsScaled] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // If screen is wide enough (desktop/tablet landscape), use fluid layout
            // We use 1024 as the breakpoint.
            if (windowWidth >= 1024) {
                setIsScaled(false);
                setScale(1);
            } else {
                // On mobile, we want to disable scaling and let the layout be fluid
                // The previous behavior was to scale down, which made everything tiny.
                setIsScaled(false);
                setScale(1);
            }
        };

        // Initial calculation
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isScaled) {
        return <>{children}</>;
    }

    return (
        <div
            className="flex items-center justify-center w-screen h-screen overflow-hidden bg-black"
        >
            <div
                ref={containerRef}
                style={{
                    width: `${DESIGN_WIDTH}px`,
                    height: `${DESIGN_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                }}
                className="relative shadow-2xl overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
}
