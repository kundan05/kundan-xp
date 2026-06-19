'use client';

import React from 'react';

interface ScaleWrapperProps {
    children: React.ReactNode;
}

export default function ScaleWrapper({ children }: ScaleWrapperProps) {
    return <>{children}</>;
}
