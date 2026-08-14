import { ActionButtonsProps } from '../../../types/components';
export const ActionButtons = ({ onLoadSample, onViewDiagrams, onClear, hasMarkdown }: ActionButtonsProps) => {
  return (
    <div className="flex gap-4 w-full">
      {/* Load Content Box */}
      <div className="flex-1 flex flex-col gap-3 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 text-center mb-1">Load Content</h3>
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors text-center"
        >
          Choose File
        </label>
        
        <div className="text-center text-xs text-gray-500 font-medium">OR</div>
        
        <button
          onClick={onLoadSample}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Load Sample
        </button>
      </div>
      
      {/* Actions Box */}
      <div className="flex-1 flex flex-col gap-3 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 text-center mb-1">Actions</h3>
        <button
          onClick={onViewDiagrams}
          disabled={!hasMarkdown}
          className={`px-4 py-2 rounded-lg transition-colors ${
            hasMarkdown
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Slideshow
        </button>
        
        <div className="text-center text-xs text-gray-500 font-medium">OR</div>
        
        <button
          onClick={onClear}
          disabled={!hasMarkdown}
          className={`px-4 py-2 rounded-lg transition-colors ${
            hasMarkdown
              ? 'bg-gray-800 hover:bg-gray-900 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Clear Input
        </button>
      </div>
    </div>
  );
};
