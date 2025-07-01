export const StatusMessages = ({ error, diagramsCount, isDarkMode }) => {
  return (
    <>
      {/* Error Display */}
      {error && (
        <div className={`mt-4 p-4 border rounded-lg ${
          isDarkMode
            ? 'bg-red-900 border-red-700 text-red-200'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Diagrams Found */}
      {diagramsCount > 0 && !error && (
        <div className={`mt-6 p-4 border rounded-lg ${
          isDarkMode
            ? 'bg-green-900 border-green-700 text-green-200'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <p className="font-medium">
            ✅ Found {diagramsCount} mermaid diagram{diagramsCount !== 1 ? 's' : ''} in your markdown
          </p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
            Click "View Diagrams" to start browsing in presentation mode
          </p>
        </div>
      )}
    </>
  );
};