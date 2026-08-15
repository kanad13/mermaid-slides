import type { ChangeEvent, DragEvent, ReactNode } from 'react';
import type { Diagram } from './diagram';

// Viewer Component Props
export interface ViewerProps {
  diagrams: Diagram[];
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
}

// File Upload Props
export interface FileUploadProps {
  onFileLoad: (_content: string, _name: string) => void;
  onLoadSample: () => void;
  onViewDiagrams: () => void;
  onClear: () => void;
  hasMarkdown: boolean;
}

// Navigation Props
interface NavigationProps {
  currentIndex: number;
  totalDiagrams: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export type HeaderNavigationProps = NavigationProps;

// Viewer Header Props
export interface ViewerHeaderProps extends NavigationProps {
  isGridView: boolean;
  onBackToEditor: () => void;
  onToggleGridView: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
  onAutoHideToggle: (_enabled: boolean) => void;
  showTitles?: boolean;
  onShowTitlesToggle: (_enabled: boolean) => void;
}

// Diagram Viewer Props
export interface DiagramViewerProps {
  diagram: Diagram;
  showTitles?: boolean;
}

// Grid View Props
export interface GridViewProps {
  diagrams: Diagram[];
  currentIndex: number;
  onDiagramSelect: (_index: number) => void;
  isExtensionMode?: boolean;
  showTitles?: boolean;
}

// Editor Component Props
export interface MarkdownTextareaProps {
  markdownText: string;
  onTextChange: (_value: string) => void;
}

export interface FileUploadActionButtonsProps {
  onLoadSample: () => void;
  onViewDiagrams: () => void;
  onClear: () => void;
  hasMarkdown: boolean;
}

export interface StatusMessagesProps {
  error: string;
}

// File Upload Component Props
export interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (_event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (_event: DragEvent<HTMLDivElement>) => void;
  onDrop: (_event: DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

export interface FileInputProps {
  onFileSelect: (_event: ChangeEvent<HTMLInputElement>) => void;
}

// Progress and Navigation
export interface ProgressBarProps {
  currentIndex: number;
  totalDiagrams: number;
}

export interface BackButtonProps {
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
}

export interface GridViewToggleProps {
  isGridView: boolean;
  onToggleGridView: () => void;
}
