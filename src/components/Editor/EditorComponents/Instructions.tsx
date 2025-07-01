export const Instructions = ({ isDarkMode }) => {
  return (
    <div className={`mt-8 p-4 border rounded-lg ${
      isDarkMode
        ? 'bg-blue-900 border-blue-700'
        : 'bg-blue-50 border-blue-200'
    }`}>
      <h3 className={`font-medium mb-2 ${
        isDarkMode ? 'text-blue-200' : 'text-blue-900'
      }`}>
        How to use Mermaid Slides:
      </h3>
      <ul className={`text-sm space-y-1 ${
        isDarkMode ? 'text-blue-300' : 'text-blue-800'
      }`}>
        <li>1. Drop a markdown file or paste content containing mermaid diagrams</li>
        <li>2. Click "Parse Diagrams" to extract all mermaid code blocks</li>
        <li>3. Click "View Diagrams" to enter presentation mode</li>
        <li>4. Use arrow keys, Home/End, or navigation buttons to browse through diagrams</li>
        <li>5. Press ESC to return to the editor</li>
      </ul>
    </div>
  );
};