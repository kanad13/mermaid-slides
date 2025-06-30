import { useState } from 'react';
import { ViewerHeader } from './ViewerHeader';
import { DiagramViewer } from './DiagramViewer';
import { GridView } from './GridView';
import { NavigationControls } from '../Navigation/NavigationControls';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export const Viewer = ({ 
  diagrams, 
  onBackToEditor,
  isDarkMode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mermaidTheme, setMermaidTheme] = useState('default');
  const [isGridView, setIsGridView] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : diagrams.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < diagrams.length - 1 ? prev + 1 : 0);
  };

  const goToFirst = () => {
    setCurrentIndex(0);
  };

  const goToLast = () => {
    setCurrentIndex(diagrams.length - 1);
  };

  const handleDiagramSelect = (index) => {
    setCurrentIndex(index);
    setIsGridView(false);
  };

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
        onToggleGridView={() => setIsGridView(!isGridView)}
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
      {!isGridView && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className={`px-3 py-2 rounded-lg text-xs backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-600 text-gray-300' 
              : 'bg-white/80 border-gray-200 text-gray-600'
          }`}>
            ← → Navigate • ESC Exit
          </div>
        </div>
      )}
    </div>
  );
};