import { ViewerHeader } from './ViewerHeader';
import { DiagramViewer } from './DiagramViewer';
import { GridView } from './GridView';
import { NavigationControls } from '../Navigation/NavigationControls';
import { KeyboardShortcutsHelp } from './ViewerComponents/KeyboardShortcutsHelp';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useViewerNavigation } from '../../hooks/useViewerNavigation';
import { useTheme } from '../../hooks/useTheme';

export const Viewer = ({ 
  diagrams, 
  onBackToEditor,
  isDarkMode
}) => {
  const { mermaidTheme, setMermaidTheme } = useTheme();
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
    <div className={`min-h-screen flex flex-col relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <ViewerHeader
        currentIndex={currentIndex}
        totalDiagrams={diagrams.length}
        isDarkMode={isDarkMode}
        mermaidTheme={mermaidTheme}
        isGridView={isGridView}
        onBackToEditor={onBackToEditor}
        onThemeChange={setMermaidTheme}
        onToggleGridView={toggleGridView}
      />

      <div className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {isGridView ? (
          <GridView
            diagrams={diagrams}
            currentIndex={currentIndex}
            isDarkMode={isDarkMode}
            mermaidTheme={mermaidTheme}
            onDiagramSelect={handleDiagramSelect}
          />
        ) : (
          <DiagramViewer
            diagram={diagrams[currentIndex]}
            isDarkMode={isDarkMode}
            mermaidTheme={mermaidTheme}
          />
        )}
      </div>

      {/* Floating Navigation Controls */}
      {!isGridView && (
        <NavigationControls
          currentIndex={currentIndex}
          totalDiagrams={diagrams.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onFirst={goToFirst}
          onLast={goToLast}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Keyboard shortcuts help - only show in single view */}
      {!isGridView && <KeyboardShortcutsHelp isDarkMode={isDarkMode} />}
    </div>
  );
};