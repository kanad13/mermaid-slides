import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';

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
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`flex items-center space-x-2 px-4 py-3 rounded-full shadow-lg backdrop-blur-sm border ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-600' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <button
          onClick={onFirst}
          disabled={isDisabled || currentIndex === 0}
          className={`p-2 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            isDarkMode
              ? 'hover:bg-gray-700 text-gray-300'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title="First diagram (Home)"
        >
          <SkipBack size={18} />
        </button>
        
        <button
          onClick={onPrevious}
          disabled={isDisabled}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-all hover:scale-110 disabled:hover:scale-100 shadow-md"
          title="Previous diagram (←)"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
        }`}>
          {currentIndex + 1} / {totalDiagrams}
        </div>
        
        <button
          onClick={onNext}
          disabled={isDisabled}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-all hover:scale-110 disabled:hover:scale-100 shadow-md"
          title="Next diagram (→)"
        >
          <ChevronRight size={20} />
        </button>
        
        <button
          onClick={onLast}
          disabled={isDisabled || currentIndex === totalDiagrams - 1}
          className={`p-2 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
            isDarkMode
              ? 'hover:bg-gray-700 text-gray-300'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title="Last diagram (End)"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};