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
          <li><strong>1. Load Content:</strong> Choose a file or load sample content</li>
          <li><strong>2. Present:</strong> Click "Start Slideshow" for full-screen mode</li>
          <li><strong>3. Navigate:</strong> Use arrow keys to browse diagrams</li>
          <li><strong>4. Exit:</strong> Press ESC to return to editor</li>
        </ol>
      </div>

      {/* Key Features */}
      <div className={`p-4 border rounded-lg ${
        isDarkMode
          ? 'bg-purple-900 border-purple-700'
          : 'bg-purple-50 border-purple-200'
      }`}>
        <h3 className={`font-medium mb-3 ${
          isDarkMode ? 'text-purple-200' : 'text-purple-900'
        }`}>
          ✨ Key Features
        </h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ${
          isDarkMode ? 'text-purple-300' : 'text-purple-800'
        }`}>
          <div>
            <div>• <strong>Presentation Mode</strong> - Full-screen, distraction-free slides</div>
            <div>• <strong>File Handling</strong> - Drag & drop, browse, or paste content</div>
            <div>• <strong>Smart Navigation</strong> - Shortcuts, progress bar, grid view</div>
            <div>• <strong>Mixed Content</strong> - Mermaid diagrams + images together</div>
          </div>
          <div>
            <div>• <strong>Zero Tracking</strong> - No analytics or data collection</div>
            <div>• <strong>Local Processing</strong> - Everything runs in your browser</div>
            <div>• <strong>Responsive Design</strong> - Works on desktop, tablet, mobile</div>
            <div>• <strong>Offline Ready</strong> - No internet required for core features</div>
          </div>
        </div>
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


      {/* Help Link */}
      <div className="text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          For more help, visit the <a
            href="https://github.com/kanad13/mermaid-slides"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80`}
          >GitHub repository</a>
        </p>
      </div>
    </div>
  );
};
