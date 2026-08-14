import { BackButton } from './HeaderControls/BackButton';
import { HeaderNavigation } from './HeaderControls/HeaderNavigation';
import { SettingsPanel } from '../Settings/SettingsPanel';
import { GridViewToggle } from './HeaderControls/GridViewToggle';
import { ProgressBar } from './HeaderControls/ProgressBar';
import { useAutoHide } from '../../hooks/useAutoHide';
import { ViewerHeaderProps } from '../../types/components';

export const ViewerHeader = ({
  currentIndex,
  totalDiagrams,
  isGridView,
  onBackToEditor,
  onToggleGridView,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  isExtensionMode = false,
  autoHideEnabled = false,
  onAutoHideToggle,
  showTitles = true,
  onShowTitlesToggle
}: ViewerHeaderProps) => {
  const { isVisible } = useAutoHide({
    timeout: autoHideEnabled ? 2000 : 0,
    initiallyVisible: true
  });
  const hidden = autoHideEnabled && !isVisible;

  return (
    // Auto-hide has to give the space back, not just move the header out of
    // sight. Translating alone left the header's full height allocated in the
    // flex column, so the slide area never grew and the feature reclaimed
    // nothing. Collapsing max-height as well hands those pixels to the slide,
    // which the layout then uses without any measurement.
    <div
      // min-h-0 matters: a flex item's default `min-height: auto` resolves to
      // its content height and beats `max-height: 0`, so without it the header
      // keeps its full 109px however small the max-height is set.
      className={`border-b shadow-sm bg-white border-gray-200 overflow-hidden min-h-0 transition-all duration-300 ${
        hidden ? 'max-h-0 -translate-y-full opacity-0' : 'max-h-96 translate-y-0 opacity-100'
      }`}
      aria-hidden={hidden}
    >
      {/* Main Header */}
      <div className={`px-6 py-4 flex items-center ${isExtensionMode ? 'justify-between' : 'justify-between'}`}>
        {/* Left: Back button - only show in non-extension mode */}
        {!isExtensionMode ? (
          <BackButton 
            onBackToEditor={onBackToEditor} 
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
        />

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          <SettingsPanel 
            autoHideEnabled={autoHideEnabled}
            onAutoHideToggle={onAutoHideToggle}
            showTitles={showTitles}
            onShowTitlesToggle={onShowTitlesToggle}
            isExtensionMode={isExtensionMode}
          />
          
          <GridViewToggle 
            isGridView={isGridView}
            onToggleGridView={onToggleGridView}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        currentIndex={currentIndex}
        totalDiagrams={totalDiagrams}
      />
    </div>
  );
};