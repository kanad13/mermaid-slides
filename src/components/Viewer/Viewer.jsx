import { useState } from 'react';
import { ViewerHeader } from './ViewerHeader';
import { DiagramViewer } from './DiagramViewer';
import { GridView } from './GridView';
import { NavigationControls } from '../Navigation/NavigationControls';
import { ProgressIndicator } from '../Navigation/ProgressIndicator';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export const Viewer = ({ 
  diagrams, 
  onBackToEditor,
  isDarkMode,
  onToggleDarkMode
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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <ViewerHeader
        currentIndex={currentIndex}
        totalDiagrams={diagrams.length}
        isDarkMode={isDarkMode}
        mermaidTheme={mermaidTheme}
        isGridView={isGridView}
        onBackToEditor={onBackToEditor}
        onToggleDarkMode={onToggleDarkMode}
        onThemeChange={setMermaidTheme}
        onToggleGridView={() => setIsGridView(!isGridView)}
      />

      <ProgressIndicator
        currentIndex={currentIndex}
        totalDiagrams={diagrams.length}
        isDarkMode={isDarkMode}
      />

      <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
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

      <div className={`border-t px-6 py-4 flex justify-between items-center ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <NavigationControls
          currentIndex={currentIndex}
          totalDiagrams={diagrams.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onFirst={goToFirst}
          onLast={goToLast}
          isDarkMode={isDarkMode}
        />
        
        <div className={`text-center text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {isGridView
            ? 'Click any diagram to view it • Press ESC to return to editor'
            : 'Use ← → arrow keys to navigate • Home/End for first/last • Press ESC to return to editor'
          }
        </div>
      </div>
    </div>
  );
};