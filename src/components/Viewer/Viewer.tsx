import React, { useEffect, useState } from 'react';
import { ViewerHeader } from './ViewerHeader';
import { DiagramViewer } from './DiagramViewer';
import { GridView } from './GridView';
import { PrintView } from './PrintView';
import { KeyboardShortcutsHelp } from './ViewerComponents/KeyboardShortcutsHelp';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useViewerNavigation } from '../../hooks/useViewerNavigation';
import { usePrintDeck } from '../../hooks/usePrintDeck';
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

  const { isPreparing, isPrintReady, startPrinting, handleDeckReady } = usePrintDeck();

  // The print stylesheet keys off the document element, so that a stray Ctrl+P
  // before the deck is drawn prints the current slide rather than nothing.
  useEffect(() => {
    if (!isPrintReady) {
      return undefined;
    }
    document.documentElement.setAttribute('data-print-ready', '');
    return () => document.documentElement.removeAttribute('data-print-ready');
  }, [isPrintReady]);

  useKeyboardNavigation({
    isActive: true,
    onPrevious: goToPrevious,
    onNext: goToNext,
    onFirst: goToFirst,
    onLast: goToLast,
    onEscape: onBackToEditor
  });

  // h-full rides the height chain in index.css rather than using h-screen, so
  // the column is not measured in viewport units. Bounding it here is what lets
  // the slide area take whatever the header leaves, at any width, instead of
  // subtracting a guessed header height.
  return (
    <>
    <div className="app-shell h-full flex flex-col relative bg-white">
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
        onPrint={startPrinting}
        isPreparingPrint={isPreparing}
      />

      {/* flex so that GridView's own flex-1 + overflow-auto actually apply:
          without it the grid is content-sized, escapes the bounded column and
          scrolls the whole page instead of itself. */}
      <div className="flex-1 min-h-0 bg-white flex flex-col">
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

    {isPreparing && (
      <PrintView
        diagrams={diagrams}
        showTitles={showTitles}
        onReady={handleDeckReady}
      />
    )}
    </>
  );
};