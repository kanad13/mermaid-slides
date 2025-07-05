import { BackButton } from './HeaderControls/BackButton';
import { HeaderNavigation } from './HeaderControls/HeaderNavigation';
import { SettingsPanel } from '../Settings/SettingsPanel';
import { GridViewToggle } from './HeaderControls/GridViewToggle';
import { ProgressBar } from './HeaderControls/ProgressBar';
import { useAutoHide } from '../../hooks/useAutoHide';

export const ViewerHeader = ({
  currentIndex,
  totalDiagrams,
  isDarkMode,
  isGridView,
  onBackToEditor,
  onToggleGridView,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  isExtensionMode = false,
  autoHideEnabled = false,
  onAutoHideToggle
}) => {
  const { isVisible } = useAutoHide({
    timeout: autoHideEnabled ? 3000 : 0,
    initiallyVisible: true
  });
  return (
    <div className={`border-b shadow-sm transition-transform duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } ${autoHideEnabled && !isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
      {/* Main Header */}
      <div className={`px-6 py-4 flex items-center ${isExtensionMode ? 'justify-between' : 'justify-between'}`}>
        {/* Left: Back button - only show in non-extension mode */}
        {!isExtensionMode ? (
          <BackButton 
            onBackToEditor={onBackToEditor} 
            isDarkMode={isDarkMode}
            isExtensionMode={isExtensionMode}
          />
        ) : (
          <div></div>
        )}

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
          <SettingsPanel 
            isDarkMode={isDarkMode}
            autoHideEnabled={autoHideEnabled}
            onAutoHideToggle={onAutoHideToggle}
            isExtensionMode={isExtensionMode}
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