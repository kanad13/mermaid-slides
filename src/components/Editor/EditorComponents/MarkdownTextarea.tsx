export const MarkdownTextarea = ({ markdownText, onTextChange, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Or paste your markdown content here:
        </label>
      </div>

      <textarea
        value={markdownText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste your markdown content with mermaid diagrams here..."
        className={`w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm transition-colors ${
          isDarkMode
            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
        }`}
      />
    </div>
  );
};