import { Grid } from 'lucide-react';

export const GridViewToggle = ({ isGridView, onToggleGridView, isDarkMode }) => {
  return (
    <button
      onClick={onToggleGridView}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
        isGridView
          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm'
          : isDarkMode
          ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300'
          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
      }`}
      title={isGridView ? 'Switch to single view' : 'Switch to grid view'}
    >
      <Grid size={16} />
      <span className="text-sm font-medium">
        {isGridView ? 'Single' : 'Grid'}
      </span>
    </button>
  );
};