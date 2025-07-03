import { useState, useEffect } from 'react';

interface KeyboardShortcutsHelpProps {
  isDarkMode: boolean;
  currentIndex?: number;
}

export const KeyboardShortcutsHelp = ({ isDarkMode, currentIndex }: KeyboardShortcutsHelpProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show hints when component mounts or currentIndex changes
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds for better UX

    return () => clearTimeout(timer);
  }, [currentIndex]); // Reset visibility when navigating

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className={`px-3 py-2 rounded-lg text-xs backdrop-blur-sm border transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-600 text-gray-300' 
          : 'bg-white/80 border-gray-200 text-gray-600'
      }`}>
        ← → Navigate • ESC Exit
      </div>
    </div>
  );
};