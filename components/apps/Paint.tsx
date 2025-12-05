import React from 'react';

export default function Paint() {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <div className="w-full h-full bg-[#C0C0C0] overflow-hidden relative">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ECE9D8] z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 relative animate-spin">
                            {/* Simple CSS spinner or just an icon */}
                            <div className="w-full h-full border-4 border-[#0055EA] border-t-transparent rounded-full"></div>
                        </div>
                        <span className="text-sm font-sans text-black">Loading Paint...</span>
                    </div>
                </div>
            )}
            <iframe
                src="https://jspaint.app"
                className="w-full h-full border-none"
                title="Paint"
                allow="clipboard-read; clipboard-write"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
