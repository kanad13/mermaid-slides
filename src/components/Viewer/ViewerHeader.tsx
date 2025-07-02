import { BackButton } from './HeaderControls/BackButton';
import { HeaderNavigation } from './HeaderControls/HeaderNavigation';
import { ThemeDropdown } from './HeaderControls/ThemeDropdown';
import { GridViewToggle } from './HeaderControls/GridViewToggle';
import { ProgressBar } from './HeaderControls/ProgressBar';

export const ViewerHeader = ({
  currentIndex,
  totalDiagrams,
  isDarkMode,
  mermaidTheme,
  isGridView,
  onBackToEditor,
  onThemeChange,
  onToggleGridView,
  onPrevious,
  onNext,
  onFirst,
  onLast
}) => {
  return (
    <div className={`border-b shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Main Header */}
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left: Back button */}
        <BackButton 
          onBackToEditor={onBackToEditor} 
          isDarkMode={isDarkMode} 
        />

        {/* Center: Navigation controls with counter */}
        <HeaderNavigation 
          currentIndex={currentIndex}
          totalDiagrams={totalDiagrams}
          onPrevious={onPrevious}
          onNext={onNext}
          onFirst={onFirst}
          onLast={onLast}
          isDarkMode={isDarkMode}
        />

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          <ThemeDropdown 
            mermaidTheme={mermaidTheme}
            onThemeChange={onThemeChange}
            isDarkMode={isDarkMode}
          />
          
          <GridViewToggle 
            isGridView={isGridView}
            onToggleGridView={onToggleGridView}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        currentIndex={currentIndex}
        totalDiagrams={totalDiagrams}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};