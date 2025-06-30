export const ProgressIndicator = ({ currentIndex, totalDiagrams, isDarkMode }) => {
  const progress = ((currentIndex + 1) / totalDiagrams) * 100;

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-32 h-2 rounded-full overflow-hidden ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {Math.round(progress)}%
      </span>
    </div>
  );
};