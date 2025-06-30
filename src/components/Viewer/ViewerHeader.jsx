import { FileText } from 'lucide-react';

export const ViewerHeader = ({
  currentIndex,
  totalDiagrams,
  isDarkMode,
  mermaidTheme,
  isGridView,
  onBackToEditor,
  onToggleDarkMode,
  onThemeChange,
  onToggleGridView
}) => {
  return (
    <div className={`border-b px-6 py-4 flex justify-between items-center shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={onBackToEditor}
          className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
          }`}
        >
          <FileText size={18} />
          <span>Back to Editor</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Diagram {currentIndex + 1} of {totalDiagrams}
        </span>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Mermaid Theme Selector */}
        <select
          value={mermaidTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
          title="Select mermaid diagram theme"
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="forest">Forest</option>
          <option value="base">Base</option>
          <option value="neutral">Neutral</option>
        </select>

        {/* Grid View Toggle */}
        <button
          onClick={onToggleGridView}
          className={`p-2 rounded-lg transition-colors ${
            isGridView
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title={isGridView ? 'Switch to single view' : 'Switch to grid view'}
        >
          {isGridView ? '📄' : '⊞'}
        </button>
      </div>
    </div>
  );
};