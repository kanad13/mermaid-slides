export const EditorHeader = ({ isDarkMode }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mermaid Slides
          </h1>
          <p className={`text-lg mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Transform your markdown mermaid diagrams into beautiful presentation slides.
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
      
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <div className="text-center">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📊 Multiple Formats
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Flowcharts, Sequence, ER diagrams & more
          </div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            🎨 Beautiful Themes
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Dark/Light modes with professional styling
          </div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            ⚡ No Installation
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Works directly in your browser
          </div>
        </div>
      </div>
    </div>
  );
};