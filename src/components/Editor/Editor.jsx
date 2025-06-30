import { useState } from 'react';
import { Eye } from 'lucide-react';
import { FileUpload } from '../FileUpload/FileUpload';
import { parseMermaidDiagrams } from '../../utils/mermaidParser';
import { sampleMarkdown } from '../../utils/sampleData';

export const Editor = ({ 
  onViewDiagrams,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [markdownText, setMarkdownText] = useState('');
  const [diagrams, setDiagrams] = useState([]);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileLoad = (content, name) => {
    setMarkdownText(content);
    setFileName(name);
    setError('');
  };

  const loadSample = () => {
    setMarkdownText(sampleMarkdown);
    setFileName('Sample Document');
  };

  const processDiagrams = () => {
    if (!markdownText.trim()) {
      setDiagrams([]);
      setError('');
      return;
    }

    try {
      const extractedDiagrams = parseMermaidDiagrams(markdownText);

      if (extractedDiagrams.length === 0) {
        setError('No mermaid diagrams found in the markdown text.');
        setDiagrams([]);
        return;
      }

      setDiagrams(extractedDiagrams);
      setError('');
    } catch (err) {
      setError('Error parsing markdown: ' + err.message);
      setDiagrams([]);
    }
  };

  const handleViewDiagrams = () => {
    onViewDiagrams(diagrams);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Mermaid Slides
              </h1>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Transform your markdown mermaid diagrams into beautiful presentation slides.
              </p>
            </div>

            <div className="flex items-center space-x-4">
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
            </div>
          </div>

          <div className="space-y-4">
            <FileUpload
              onFileLoad={handleFileLoad}
              fileName={fileName}
              isDarkMode={isDarkMode}
              onLoadSample={loadSample}
            />

            <div className="flex justify-between items-center">
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Or paste your markdown content here:
              </label>
            </div>

            <textarea
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              placeholder="Paste your markdown content with mermaid diagrams here..."
              className={`w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm transition-colors ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />

            <div className="flex space-x-3">
              <button
                onClick={processDiagrams}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Parse Diagrams
              </button>

              {diagrams.length > 0 && (
                <button
                  onClick={handleViewDiagrams}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  <Eye size={18} />
                  <span>View Diagrams ({diagrams.length})</span>
                </button>
              )}
            </div>
          </div>

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
          {diagrams.length > 0 && !error && (
            <div className={`mt-6 p-4 border rounded-lg ${
              isDarkMode
                ? 'bg-green-900 border-green-700 text-green-200'
                : 'bg-green-50 border-green-200 text-green-700'
            }`}>
              <p className="font-medium">
                ✅ Found {diagrams.length} mermaid diagram{diagrams.length !== 1 ? 's' : ''} in your markdown
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                Click "View Diagrams" to start browsing in presentation mode
              </p>
            </div>
          )}

          {/* Instructions */}
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
        </div>
      </div>
    </div>
  );
};