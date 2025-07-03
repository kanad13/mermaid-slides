export const EditorHeader = ({ isDarkMode }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mermaid Slides
          </h1>
          <p className={`text-lg mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Upload markdown files with Mermaid diagrams and view them as interactive presentation slides.
          </p>
        </div>
        <div className="flex space-x-2">
          <a
            href="https://github.com/kanad13/mermaid-slides"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1 text-sm rounded border ${
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            } transition-colors`}
          >
            GitHub
          </a>
        </div>
      </div>

      <div className={`text-center mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p className="text-sm font-medium">Choose the option that works best for you:</p>
      </div>
      
      <div className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-6 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <div className="text-center flex-1">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🌐 Try Online
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Use it right here in your browser
          </div>
        </div>
        
        <div className={`text-lg font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</div>
        
        <div className="text-center flex-1">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            💻 Local Package
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Self-hosted for complete privacy (available now)
          </div>
        </div>
        
        <div className={`text-lg font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</div>
        
        <div className="text-center flex-1">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🔧 VS Code Extension
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Work directly in your editor (in progress)
          </div>
        </div>
      </div>
    </div>
  );
};