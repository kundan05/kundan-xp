import React from 'react';

export default function Paint() {
    return (
        <div className="w-full h-full bg-[#C0C0C0] overflow-hidden">
            <iframe
                src="https://jspaint.app"
                className="w-full h-full border-none"
                title="Paint"
                allow="clipboard-read; clipboard-write"
            />
        </div>
    );
}
