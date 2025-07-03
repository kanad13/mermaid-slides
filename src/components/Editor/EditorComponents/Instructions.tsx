export const Instructions = ({ isDarkMode }) => {
  return (
    <div className="mt-8 space-y-6">
      {/* Quick Start Guide */}
      <div className={`p-4 border rounded-lg ${
        isDarkMode
          ? 'bg-blue-900 border-blue-700'
          : 'bg-blue-50 border-blue-200'
      }`}>
        <h3 className={`font-medium mb-3 ${
          isDarkMode ? 'text-blue-200' : 'text-blue-900'
        }`}>
          🚀 Quick Start Guide
        </h3>
        <ol className={`text-sm space-y-2 ${
          isDarkMode ? 'text-blue-300' : 'text-blue-800'
        }`}>
          <li><strong>1. Load Content:</strong> Drop a markdown file, paste content, or try "Load Sample"</li>
          <li><strong>2. Parse Diagrams:</strong> Click "Parse Diagrams" to extract mermaid code blocks</li>
          <li><strong>3. Present:</strong> Click "View Diagrams" to enter full-screen presentation mode</li>
          <li><strong>4. Navigate:</strong> Use arrow keys or navigation buttons to browse diagrams</li>
          <li><strong>5. Exit:</strong> Press ESC or click "Back to Editor" to return</li>
        </ol>
      </div>

      {/* Keyboard Shortcuts */}
      <div className={`p-4 border rounded-lg ${
        isDarkMode
          ? 'bg-green-900 border-green-700'
          : 'bg-green-50 border-green-200'
      }`}>
        <h3 className={`font-medium mb-3 ${
          isDarkMode ? 'text-green-200' : 'text-green-900'
        }`}>
          ⌨️ Keyboard Shortcuts (Presentation Mode)
        </h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ${
          isDarkMode ? 'text-green-300' : 'text-green-800'
        }`}>
          <div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>←/→</kbd> Previous/Next diagram</div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>Home</kbd> First diagram</div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>End</kbd> Last diagram</div>
          </div>
          <div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>G</kbd> Toggle grid view</div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>?</kbd> Show/hide shortcuts</div>
            <div><kbd className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-green-800' : 'bg-green-200'}`}>Esc</kbd> Return to editor</div>
          </div>
        </div>
      </div>

      {/* Supported Diagram Types */}
      <div className={`p-4 border rounded-lg ${
        isDarkMode
          ? 'bg-purple-900 border-purple-700'
          : 'bg-purple-50 border-purple-200'
      }`}>
        <h3 className={`font-medium mb-3 ${
          isDarkMode ? 'text-purple-200' : 'text-purple-900'
        }`}>
          📋 Supported Diagram Types
        </h3>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 text-sm ${
          isDarkMode ? 'text-purple-300' : 'text-purple-800'
        }`}>
          <div>• Flowcharts</div>
          <div>• Sequence Diagrams</div>
          <div>• Class Diagrams</div>
          <div>• State Diagrams</div>
          <div>• ER Diagrams</div>
          <div>• User Journey</div>
          <div>• Gantt Charts</div>
          <div>• Pie Charts</div>
        </div>
      </div>

      {/* Example and Links */}
      <div className={`p-4 border rounded-lg ${
        isDarkMode
          ? 'bg-gray-700 border-gray-600'
          : 'bg-gray-100 border-gray-300'
      }`}>
        <h3 className={`font-medium mb-3 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-900'
        }`}>
          💡 Need Help?
        </h3>
        <div className={`text-sm space-y-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <div>• Click <strong>"Load Sample"</strong> to see example diagrams and learn the format</div>
          <div>• Visit <a 
            href="https://mermaid.js.org/syntax/flowchart.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80`}
          >Mermaid documentation</a> for diagram syntax</div>
          <div>• Check our <a 
            href="https://github.com/kanad13/mermaid-slides" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80`}
          >GitHub repository</a> for more examples and updates</div>
        </div>
      </div>
    </div>
  );
};