import React from 'react';
import { DesktopIconProps } from './types';
import Image from 'next/image';

export default function DesktopIcon({ id, title, icon, onDoubleClick }: DesktopIconProps) {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);

    React.useEffect(() => {
        // Check if the device has a coarse pointer (touch)
        const checkTouch = () => {
            setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        };

        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const handleClick = () => {
        if (isTouchDevice) {
            onDoubleClick(id);
        }
    };

    return (
        <div
            className="flex flex-col items-center w-28 p-2 m-2 cursor-pointer group hover:bg-[#0B61FF]/20 hover:border hover:border-[#0B61FF]/40 rounded-[4px] transition-all"
            onDoubleClick={() => onDoubleClick(id)}
            onClick={handleClick}
        >
            <div className="w-16 h-16 mb-1 relative flex items-center justify-center drop-shadow-md">
                <Image
                    src={icon || '/icons/folder.png'}
                    alt={title}
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-md"
                />
            </div>
            <span className="text-white text-sm text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] px-1 py-0.5 rounded-sm leading-tight">
                {title}
            </span>
        </div>
    );
}

