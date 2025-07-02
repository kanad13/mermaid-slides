import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';

export const HeaderNavigation = ({
  currentIndex,
  totalDiagrams,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  isDarkMode
}) => {
  const isDisabled = totalDiagrams <= 1;

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onFirst}
        disabled={isDisabled || currentIndex === 0}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 disabled:text-gray-500'
            : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-400'
        }`}
        title="First diagram (Home)"
      >
        <SkipBack size={18} />
      </button>
      
      <button
        onClick={onPrevious}
        disabled={isDisabled || currentIndex === 0}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 disabled:text-gray-500'
            : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-400'
        }`}
        title="Previous diagram (←)"
      >
        <ChevronLeft size={20} />
      </button>
      
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
      
      <button
        onClick={onNext}
        disabled={isDisabled || currentIndex === totalDiagrams - 1}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 disabled:text-gray-500'
            : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-400'
        }`}
        title="Next diagram (→)"
      >
        <ChevronRight size={20} />
      </button>
      
      <button
        onClick={onLast}
        disabled={isDisabled || currentIndex === totalDiagrams - 1}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 disabled:text-gray-500'
            : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-400'
        }`}
        title="Last diagram (End)"
      >
        <SkipForward size={18} />
      </button>
    </div>
  );
};