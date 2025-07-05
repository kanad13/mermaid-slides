import { useState } from 'react';
import { Settings, X, Eye, EyeOff, Info } from 'lucide-react';

interface SettingsPanelProps {
  isDarkMode: boolean;
  autoHideEnabled: boolean;
  onAutoHideToggle: (enabled: boolean) => void;
  isExtensionMode?: boolean;
}

export const SettingsPanel = ({
  isDarkMode,
  autoHideEnabled,
  onAutoHideToggle,
  isExtensionMode = false
}: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAbout = () => {
    window.open('https://github.com/kanad13/mermaid-slides', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
          isDarkMode 
            ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
            : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
        }`}
        title="Settings"
      >
        <Settings size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className={`absolute right-0 top-full mt-2 w-80 rounded-lg border shadow-lg z-20 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700' 
              : 'border-gray-200 bg-white'
          }`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <h3 className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded hover:bg-gray-100 ${
                  isDarkMode ? 'hover:bg-gray-600 text-gray-400' : 'text-gray-500'
                }`}
              >
                <X size={14} />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-4 space-y-4">
              {/* Auto-hide Configuration - only show in non-extension mode */}
              {!isExtensionMode && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {autoHideEnabled ? (
                        <EyeOff size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      ) : (
                        <Eye size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      )}
                      <label className={`text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Auto-hide Header
                      </label>
                    </div>
                    <button
                      onClick={() => onAutoHideToggle(!autoHideEnabled)}
                      data-testid="auto-hide-toggle"
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        autoHideEnabled 
                          ? 'bg-blue-600' 
                          : isDarkMode 
                          ? 'bg-gray-600' 
                          : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          autoHideEnabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Header will hide after 3 seconds of inactivity
                  </p>
                </div>
              )}

              {/* About Button */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={handleAbout}
                  className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-md transition-colors ${
                    isDarkMode
                      ? 'text-gray-200 hover:bg-gray-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Info size={16} />
                  <span>About Mermaid Slides</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};