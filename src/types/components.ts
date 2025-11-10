import React from 'react';
import { Diagram } from './diagram';

// Editor Component Props
export interface EditorProps {
  onViewDiagrams: (_diagrams: Diagram[]) => void;
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
  onFileLoad: (_content: string, _name: string) => void;
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
  onDiagramSelect: (_index: number) => void;
}

// Editor Component Props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditorHeaderProps {
  // No props currently defined
}

export interface MarkdownTextareaProps {
  value: string;
  onChange: (_value: string) => void;
  placeholder?: string;
}

export interface ActionButtonsProps {
  onProcessDiagrams: () => void;
  onViewDiagrams: () => void;
}

export interface StatusMessagesProps {
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InstructionsProps {
  // No props currently defined
}

// File Upload Component Props
export interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (_e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (_e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (_e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadSample: () => void;
}

export interface CurrentFileDisplayProps {
  fileName: string;
}

export interface FileInputProps {
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeyboardShortcutsHelpProps {
  // No props currently defined
}
