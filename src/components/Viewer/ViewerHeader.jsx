import { useState } from 'react';
import { FileText, Layout, Palette, ChevronDown, Grid, Check } from 'lucide-react';

export const ViewerHeader = ({
  currentIndex,
  totalDiagrams,
  isDarkMode,
  mermaidTheme,
  isGridView,
  onBackToEditor,
  onThemeChange,
  onToggleGridView
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themeOptions = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'forest', label: 'Forest' },
    { value: 'base', label: 'Base' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const selectedTheme = themeOptions.find(option => option.value === mermaidTheme);

  return (
    <div className={`border-b shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Main Header */}
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left: Back button */}
        <button
          onClick={onBackToEditor}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:scale-105 transform ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <FileText size={18} />
          <span className="font-medium">Back to Editor</span>
        </button>

        {/* Center: Diagram counter with better styling */}
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {currentIndex + 1}
            </span>
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {' '}of {totalDiagrams}
            </span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          {/* Custom Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Palette size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className="text-sm font-medium">
                Theme
              </span>
              <ChevronDown 
                size={14} 
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                {/* Dropdown Options */}
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg border shadow-lg z-20 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-200 bg-white'
                }`}>
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onThemeChange(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        mermaidTheme === option.value
                          ? isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-700'
                          : isDarkMode
                          ? 'text-gray-200 hover:bg-gray-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{option.label}</span>
                      {mermaidTheme === option.value && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Grid View Toggle */}
          <button
            onClick={onToggleGridView}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              isGridView
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm'
                : isDarkMode
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
            }`}
            title={isGridView ? 'Switch to single view' : 'Switch to grid view'}
          >
            <Grid size={16} />
            <span className="text-sm font-medium">
              {isGridView ? 'Single' : 'Grid'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`px-6 pb-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-3">
          <div className={`flex-1 h-2 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentIndex + 1) / totalDiagrams) * 100}%` }}
            />
          </div>
          <span className={`text-sm font-medium min-w-[40px] text-right ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {Math.round(((currentIndex + 1) / totalDiagrams) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};