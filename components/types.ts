export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  content: React.ReactNode;
  icon?: string; // Path to icon image
  hasCustomContent?: boolean;
  isMaximized?: boolean;
  initialWidth?: number;
  initialHeight?: number;
}

export interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  onDoubleClick: (id: string) => void;
}
