import React from 'react';
import { Diagram } from './diagram';

// Common Props
export interface CommonProps {
  isDarkMode: boolean;
}

// Editor Component Props
export interface EditorProps extends CommonProps {
  onViewDiagrams: (diagrams: Diagram[]) => void;
}

// Viewer Component Props
export interface ViewerProps extends CommonProps {
  diagrams: Diagram[];
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
}

// File Upload Props
export interface FileUploadProps extends CommonProps {
  onFileLoad: (content: string, name: string) => void;
  fileName: string;
  onLoadSample: () => void;
}

// Navigation Props
export interface NavigationControlsProps extends CommonProps {
  currentIndex: number;
  totalDiagrams: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

// Viewer Header Props
export interface ViewerHeaderProps extends CommonProps {
  currentIndex: number;
  totalDiagrams: number;
  isGridView: boolean;
  onBackToEditor: () => void;
  onToggleGridView: () => void;
}

// Diagram Viewer Props
export interface DiagramViewerProps extends CommonProps {
  diagram: Diagram;
}

// Grid View Props
export interface GridViewProps extends CommonProps {
  diagrams: Diagram[];
  currentIndex: number;
  onDiagramSelect: (index: number) => void;
}

// Editor Component Props
export interface EditorHeaderProps extends CommonProps {}

export interface MarkdownTextareaProps extends CommonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ActionButtonsProps {
  onProcessDiagrams: () => void;
  onViewDiagrams: () => void;
  diagramsCount: number;
}

export interface StatusMessagesProps extends CommonProps {
  error: string;
  diagrams: Diagram[];
}

export interface InstructionsProps extends CommonProps {}

// File Upload Component Props
export interface DropZoneProps extends CommonProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadSample: () => void;
}

export interface CurrentFileDisplayProps extends CommonProps {
  fileName: string;
}

export interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Progress and Navigation
export interface ProgressIndicatorProps {
  currentIndex: number;
  totalDiagrams: number;
}

export interface ProgressBarProps {
  currentIndex: number;
  totalDiagrams: number;
}

// Keyboard Shortcuts
export interface KeyboardShortcutsHelpProps extends CommonProps {}
