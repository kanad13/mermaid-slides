import React, { useState } from 'react';
import { ViewerHeader } from './ViewerHeader';
import { DiagramViewer } from './DiagramViewer';
import { GridView } from './GridView';
import { KeyboardShortcutsHelp } from './ViewerComponents/KeyboardShortcutsHelp';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useViewerNavigation } from '../../hooks/useViewerNavigation';
import { ViewerProps } from '../../types/components';

export const Viewer: React.FC<ViewerProps> = ({ 
  diagrams, 
  onBackToEditor,
  isDarkMode,
  isExtensionMode = false,
  autoHideEnabled = false
}) => {
  const [autoHideState, setAutoHideState] = useState(autoHideEnabled);
  const {
    currentIndex,
    isGridView,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    toggleGridView,
    handleDiagramSelect
  } = useViewerNavigation(diagrams.length);

  useKeyboardNavigation({
    isActive: true,
    onPrevious: goToPrevious,
    onNext: goToNext,
    onFirst: goToFirst,
    onLast: goToLast,
    onEscape: onBackToEditor
  });

  return (
    <div className={`${isExtensionMode ? 'h-screen' : 'min-h-screen'} flex flex-col relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <ViewerHeader
        currentIndex={currentIndex}
        totalDiagrams={diagrams.length}
        isDarkMode={isDarkMode}
        isGridView={isGridView}
        onBackToEditor={onBackToEditor}
        onToggleGridView={toggleGridView}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onFirst={goToFirst}
        onLast={goToLast}
        isExtensionMode={isExtensionMode}
        autoHideEnabled={autoHideState}
        onAutoHideToggle={setAutoHideState}
      />

      <div className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {isGridView ? (
          <GridView
            diagrams={diagrams}
            currentIndex={currentIndex}
            isDarkMode={isDarkMode}
            onDiagramSelect={handleDiagramSelect}
            isExtensionMode={isExtensionMode}
          />
        ) : (
          <DiagramViewer
            diagram={diagrams[currentIndex]}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Keyboard shortcuts help - only show in single view */}
      {!isGridView && <KeyboardShortcutsHelp isDarkMode={isDarkMode} currentIndex={currentIndex} />}
    </div>
  );
};