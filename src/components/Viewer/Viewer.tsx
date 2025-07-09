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
  isExtensionMode = false,
  autoHideEnabled = false
}) => {
  const [autoHideState, setAutoHideState] = useState(autoHideEnabled);
  const [showTitles, setShowTitles] = useState(true);
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
    <div className={`${isExtensionMode ? 'h-screen' : 'min-h-screen'} flex flex-col relative bg-white`}>
      <ViewerHeader
        currentIndex={currentIndex}
        totalDiagrams={diagrams.length}
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
        showTitles={showTitles}
        onShowTitlesToggle={setShowTitles}
      />

      <div className="flex-1 bg-white">
        {isGridView ? (
          <GridView
            diagrams={diagrams}
            currentIndex={currentIndex}
            onDiagramSelect={handleDiagramSelect}
            isExtensionMode={isExtensionMode}
            showTitles={showTitles}
          />
        ) : (
          <DiagramViewer
            diagram={diagrams[currentIndex]}
            showTitles={showTitles}
          />
        )}
      </div>

      {/* Keyboard shortcuts help - only show in single view */}
      {!isGridView && <KeyboardShortcutsHelp currentIndex={currentIndex} />}
    </div>
  );
};