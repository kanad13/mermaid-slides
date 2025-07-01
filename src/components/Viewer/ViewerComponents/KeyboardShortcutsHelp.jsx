export const KeyboardShortcutsHelp = ({ isDarkMode }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className={`px-3 py-2 rounded-lg text-xs backdrop-blur-sm border ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-600 text-gray-300' 
          : 'bg-white/80 border-gray-200 text-gray-600'
      }`}>
        ← → Navigate • ESC Exit
      </div>
    </div>
  );
};