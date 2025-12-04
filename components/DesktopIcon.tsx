import React from 'react';
import { DesktopIconProps } from './types';
import Image from 'next/image';

export default function DesktopIcon({ id, title, icon, onDoubleClick }: DesktopIconProps) {
    return (
        <div
            className="flex flex-col items-center w-28 m-4 cursor-pointer group"
            onDoubleClick={() => onDoubleClick(id)}
        >
            <div className="w-16 h-16 mb-2 relative flex items-center justify-center drop-shadow-md">
                <Image
                    src={icon || '/icons/folder.png'}
                    alt={title}
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-md"
                />
            </div>
            <span className="text-white text-sm text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] px-1 py-0.5 rounded-sm group-hover:bg-[#0B61FF]/50 leading-tight">
                {title}
            </span>
        </div>
    );
}

