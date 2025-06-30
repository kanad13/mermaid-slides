import { ChevronLeft, ChevronRight } from 'lucide-react';

export const NavigationControls = ({
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
    <div className="flex space-x-1">
      <button
        onClick={onFirst}
        disabled={isDisabled || currentIndex === 0}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'
        }`}
        title="First diagram (Home)"
      >
        <span className="text-sm">⏮</span>
      </button>
      
      <button
        onClick={onPrevious}
        disabled={isDisabled}
        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Previous diagram (←)"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={onNext}
        disabled={isDisabled}
        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Next diagram (→)"
      >
        <ChevronRight size={20} />
      </button>
      
      <button
        onClick={onLast}
        disabled={isDisabled || currentIndex === totalDiagrams - 1}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'
        }`}
        title="Last diagram (End)"
      >
        <span className="text-sm">⏭</span>
      </button>
    </div>
  );
};