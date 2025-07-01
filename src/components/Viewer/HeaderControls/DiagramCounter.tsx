export const DiagramCounter = ({ currentIndex, totalDiagrams, isDarkMode }) => {
  return (
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
  );
};