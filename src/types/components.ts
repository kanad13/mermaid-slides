import React from 'react';
import { Diagram } from './diagram';

/**
 * Props for every component in the app.
 *
 * Parameter names in function types carry a leading underscore to satisfy the
 * `no-unused-vars` lint rule, which is configured with `argsIgnorePattern: '^_'`.
 */

// ---------------------------------------------------------------------------
// Application shell
// ---------------------------------------------------------------------------

export interface EditorProps {
  onViewDiagrams: (_diagrams: Diagram[]) => void;
}

export interface ViewerProps {
  diagrams: Diagram[];
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

export interface MarkdownTextareaProps {
  markdownText: string;
  onTextChange: (_value: string) => void;
}

export interface StatusMessagesProps {
  error: string;
}

// ---------------------------------------------------------------------------
// File upload
// ---------------------------------------------------------------------------

export interface FileUploadProps {
  onFileLoad: (_content: string, _name: string) => void;
  onLoadSample: () => void;
  onViewDiagrams: () => void;
  onClear: () => void;
  hasMarkdown: boolean;
}

export interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (_e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (_e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (_e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export interface FileInputProps {
  onFileSelect: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ActionButtonsProps {
  onLoadSample: () => void;
  onViewDiagrams: () => void;
  onClear: () => void;
  hasMarkdown: boolean;
}

export interface CurrentFileDisplayProps {
  fileName: string;
}

// ---------------------------------------------------------------------------
// Viewer
// ---------------------------------------------------------------------------

export interface DiagramViewerProps {
  diagram?: Diagram;
  onError?: (_error: string) => void;
  showTitles?: boolean;
}

export interface GridViewProps {
  diagrams: Diagram[];
  currentIndex: number;
  onDiagramSelect: (_index: number) => void;
  isExtensionMode?: boolean;
  showTitles?: boolean;
}

export interface ViewerHeaderProps {
  currentIndex: number;
  totalDiagrams: number;
  isGridView: boolean;
  onBackToEditor: () => void;
  onToggleGridView: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  isExtensionMode?: boolean;
  autoHideEnabled?: boolean;
  onAutoHideToggle: (_enabled: boolean) => void;
  showTitles?: boolean;
  onShowTitlesToggle: (_enabled: boolean) => void;
}

// ---------------------------------------------------------------------------
// Header controls
// ---------------------------------------------------------------------------

export interface BackButtonProps {
  onBackToEditor: () => void;
  isExtensionMode?: boolean;
}

export interface HeaderNavigationProps {
  currentIndex: number;
  totalDiagrams: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export interface GridViewToggleProps {
  isGridView: boolean;
  onToggleGridView: () => void;
}

export interface DiagramCounterProps {
  currentIndex: number;
  totalDiagrams: number;
}

export interface ProgressBarProps {
  currentIndex: number;
  totalDiagrams: number;
}

// ---------------------------------------------------------------------------
// Standalone navigation
//
// NavigationControls and ProgressIndicator are not currently rendered anywhere.
// They are typed here for completeness; U13 decides whether they stay.
// ---------------------------------------------------------------------------

export interface NavigationControlsProps {
  currentIndex: number;
  totalDiagrams: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  isVisible?: boolean;
}

export interface ProgressIndicatorProps {
  currentIndex: number;
  totalDiagrams: number;
}
