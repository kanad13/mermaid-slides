import { Eye } from 'lucide-react';

export const ActionButtons = ({ 
  onProcessDiagrams, 
  onViewDiagrams, 
  diagramsCount 
}) => {
  return (
    <div className="flex space-x-3">
      <button
        onClick={onProcessDiagrams}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
      >
        Parse Diagrams
      </button>

      {diagramsCount > 0 && (
        <button
          onClick={onViewDiagrams}
          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
        >
          <Eye size={18} />
          <span>View Diagrams ({diagramsCount})</span>
        </button>
      )}
    </div>
  );
};