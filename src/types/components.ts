import React from 'react';
import { Diagram } from './diagram';

// Editor Component Props
export interface EditorProps {
  onViewDiagrams: (diagrams: Diagram[]) => void;
}

// Viewer Component Props
export interface ViewerProps {
  diagrams: Diagram[];
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
}

// File Upload Props
export interface FileUploadProps {
  onFileLoad: (content: string, name: string) => void;
  onLoadSample: () => void;
  onViewDiagrams: () => void;
  onClear: () => void;
  hasMarkdown: boolean;
}

// Navigation Props
export interface NavigationControlsProps {
  currentIndex: number;
  totalDiagrams: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

// Viewer Header Props
export interface ViewerHeaderProps {
  currentIndex: number;
  totalDiagrams: number;
  isGridView: boolean;
  onBackToEditor: () => void;
  onToggleGridView: () => void;
}

// Diagram Viewer Props
export interface DiagramViewerProps {
  diagram: Diagram;
}

// Grid View Props
export interface GridViewProps {
  diagrams: Diagram[];
  currentIndex: number;
  onDiagramSelect: (index: number) => void;
}

// Editor Component Props
export interface EditorHeaderProps {}

export interface MarkdownTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ActionButtonsProps {
  onProcessDiagrams: () => void;
  onViewDiagrams: () => void;
}

export interface StatusMessagesProps {
  error: string;
}

export interface InstructionsProps {}

// File Upload Component Props
export interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadSample: () => void;
}

export interface CurrentFileDisplayProps {
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
export interface KeyboardShortcutsHelpProps {}
