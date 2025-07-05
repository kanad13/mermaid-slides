import { useState } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';

export const ThemeDropdown = ({ mermaidTheme, onThemeChange, isDarkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const themeOptions = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'forest', label: 'Forest' },
    { value: 'base', label: 'Base' },
    { value: 'neutral', label: 'Neutral' }
  ];

  return (
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
        <span className="text-sm font-medium">Theme</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
      </button>

      {isDropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsDropdownOpen(false)}
          />
          
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
  );
};