import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, FileText, Eye, Upload } from 'lucide-react';

const MermaidSlides = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [diagrams, setDiagrams] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewMode, setIsViewMode] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mermaidTheme, setMermaidTheme] = useState('default');
  const [isGridView, setIsGridView] = useState(false);
  const [diagramThumbnails, setDiagramThumbnails] = useState([]);

  // Sample markdown with mermaid diagrams for demo
  const sampleMarkdown = `# Project Documentation

This is some regular markdown content.

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
\`\`\`

## Database Schema

Here's our database structure:

\`\`\`mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string name
        string email
        int id
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int id
        datetime created_at
        string status
    }
    ORDER_ITEM {
        int quantity
        decimal price
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        string name
        decimal price
        string description
    }
\`\`\`

## Process Flow

The following shows our deployment process:

\`\`\`mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as Git Repository
    participant CI as CI/CD Pipeline
    participant Prod as Production

    Dev->>Git: Push code
    Git->>CI: Trigger build
    CI->>CI: Run tests
    CI->>CI: Build application
    CI->>Prod: Deploy if tests pass
    Prod->>Dev: Notify deployment status
\`\`\``;

  // Parse markdown to extract mermaid diagrams
  const parseMermaidDiagrams = useCallback((text) => {
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
    const foundDiagrams = [];
    let match;

    while ((match = mermaidRegex.exec(text)) !== null) {
      foundDiagrams.push({
        code: match[1].trim(),
        id: `mermaid-${foundDiagrams.length}`
      });
    }

    return foundDiagrams;
  }, []);

  // Generate thumbnails for preview strip
  const generateThumbnails = useCallback(async () => {
    if (!window.mermaid || diagrams.length === 0) return;

    const thumbnails = [];

    for (let i = 0; i < diagrams.length; i++) {
      try {
        const uniqueId = `thumb-${i}-${Date.now()}`;
        const { svg } = await window.mermaid.render(uniqueId, diagrams[i].code);
        thumbnails.push({
          id: i,
          svg: svg,
          type: diagrams[i].code.includes('sequenceDiagram') ? 'sequence' :
                diagrams[i].code.includes('erDiagram') ? 'er' :
                diagrams[i].code.includes('graph') ? 'flowchart' : 'diagram'
        });
      } catch (err) {
        console.error(`Error generating thumbnail for diagram ${i}:`, err);
        thumbnails.push({
          id: i,
          svg: null,
          type: 'error'
        });
      }
    }

    setDiagramThumbnails(thumbnails);
  }, [diagrams, mermaidTheme]);

  // Process markdown and extract diagrams
  const processDiagrams = useCallback(() => {
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
      setCurrentIndex(0);
      setError('');
    } catch (err) {
      setError('Error parsing markdown: ' + err.message);
      setDiagrams([]);
    }
  }, [markdownText, parseMermaidDiagrams]);

  // Load mermaid script and render diagram
  useEffect(() => {
    if (diagrams.length > 0 && isViewMode) {
      const loadMermaidAndRender = async () => {
        try {
          // Check if mermaid is already loaded
          if (!window.mermaid) {
            // Load mermaid script
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
            script.onload = () => {
              window.mermaid.initialize({
                startOnLoad: false,
                theme: mermaidTheme,
                securityLevel: 'loose'
              });
              renderCurrentDiagram();
            };
            script.onerror = () => {
              setError('Failed to load Mermaid library');
            };
            document.head.appendChild(script);
          } else {
            // Re-initialize with new theme
            window.mermaid.initialize({
              startOnLoad: false,
              theme: mermaidTheme,
              securityLevel: 'loose'
            });
            renderCurrentDiagram();
          }
        } catch (err) {
          console.error('Error loading mermaid:', err);
          setError('Error loading diagram library: ' + err.message);
        }
      };

      const renderCurrentDiagram = async () => {
        try {
          const element = document.getElementById(diagrams[currentIndex].id);
          if (element && window.mermaid) {
            element.innerHTML = '';

            // Create a unique ID for this render
            const uniqueId = `${diagrams[currentIndex].id}-${Date.now()}`;

            // Render and scale with proper overflow handling
            const { svg } = await window.mermaid.render(uniqueId, diagrams[currentIndex].code);
            element.innerHTML = svg;

            // Apply smart scaling with proper container management
            const svgElement = element.querySelector('svg');
            if (svgElement) {
              // Get the SVG's natural dimensions
              const svgRect = svgElement.getBoundingClientRect();
              const naturalWidth = svgRect.width;
              const naturalHeight = svgRect.height;

              // Get available space more conservatively
              const availableWidth = window.innerWidth * 0.85;
              const availableHeight = window.innerHeight * 0.6;

              // Calculate scale to fit within available space
              const scaleX = availableWidth / naturalWidth;
              const scaleY = availableHeight / naturalHeight;
              const scale = Math.min(scaleX, scaleY, 2.5); // Reduced max scale

              // Apply scaling if beneficial
              if (scale > 1.1) {
                svgElement.style.transform = `scale(${scale})`;
                svgElement.style.transformOrigin = 'center center';

                // Important: Reset container styles to prevent clipping
                element.style.width = 'auto';
                element.style.height = 'auto';
                element.style.overflow = 'visible';
                element.style.display = 'inline-block';

                // Add margin to ensure scaled content fits
                const margin = Math.max(naturalWidth * (scale - 1) / 2, naturalHeight * (scale - 1) / 2);
                element.style.margin = `${margin}px`;
              }
            }

            // Generate thumbnails after main diagram is rendered
            generateThumbnails();
          }
        } catch (err) {
          console.error('Error rendering diagram:', err);
          const element = document.getElementById(diagrams[currentIndex].id);
          if (element) {
            element.innerHTML = `
              <div class="text-red-600 p-4 border border-red-300 rounded bg-red-50">
                <p class="font-medium">Error rendering diagram:</p>
                <p class="text-sm mt-1">${err.message}</p>
                <pre class="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">${diagrams[currentIndex].code}</pre>
              </div>
            `;
          }
        }
      };

      loadMermaidAndRender();
    }
  }, [diagrams, currentIndex, isViewMode, mermaidTheme, generateThumbnails]);

  // Render grid view diagrams
  useEffect(() => {
    if (isGridView && diagrams.length > 0 && window.mermaid) {
      const renderGridDiagrams = async () => {
        for (let i = 0; i < diagrams.length; i++) {
          try {
            const element = document.getElementById(`grid-${diagrams[i].id}`);
            if (element) {
              element.innerHTML = '';
              const uniqueId = `grid-render-${i}-${Date.now()}`;
              const { svg } = await window.mermaid.render(uniqueId, diagrams[i].code);
              element.innerHTML = svg;

              // Scale down for grid view
              const svgElement = element.querySelector('svg');
              if (svgElement) {
                svgElement.style.maxWidth = '100%';
                svgElement.style.maxHeight = '100%';
                svgElement.style.transform = 'scale(0.8)';
                svgElement.style.transformOrigin = 'center center';
              }
            }
          } catch (err) {
            console.error(`Error rendering grid diagram ${i}:`, err);
            const element = document.getElementById(`grid-${diagrams[i].id}`);
            if (element) {
              element.innerHTML = `<div class="text-red-500 text-xs">Error</div>`;
            }
          }
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(renderGridDiagrams, 100);
    }
  }, [isGridView, diagrams, mermaidTheme]);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : diagrams.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < diagrams.length - 1 ? prev + 1 : 0);
  };

  const goToFirst = () => {
    setCurrentIndex(0);
  };

  const goToLast = () => {
    setCurrentIndex(diagrams.length - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isViewMode || diagrams.length === 0) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToFirst();
      } else if (e.key === 'End') {
        e.preventDefault();
        goToLast();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsViewMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isViewMode, diagrams.length]);

  // Load sample data
  const loadSample = () => {
    setMarkdownText(sampleMarkdown);
    setFileName('Sample Document');
  };

  // File handling functions
  const handleFileRead = (content, name) => {
    setMarkdownText(content);
    setFileName(name);
    setError('');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleFileRead(e.target.result, file.name);
        };
        reader.onerror = () => {
          setError('Error reading file. Please try again.');
        };
        reader.readAsText(file);
      } else {
        setError('Please select a markdown (.md) or text (.txt) file.');
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file) {
      if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleFileRead(e.target.result, file.name);
        };
        reader.onerror = () => {
          setError('Error reading file. Please try again.');
        };
        reader.readAsText(file);
      } else {
        setError('Please drop a markdown (.md) or text (.txt) file.');
      }
    }
  };

  if (isViewMode && diagrams.length > 0) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`border-b px-6 py-4 flex justify-between items-center shadow-sm ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsViewMode(false)}
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
              Diagram {currentIndex + 1} of {diagrams.length}
            </span>

            {/* Theme Controls in Presentation Mode */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
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
                onChange={(e) => setMermaidTheme(e.target.value)}
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
                onClick={() => setIsGridView(!isGridView)}
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

            {/* Visual Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-32 h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${((currentIndex + 1) / diagrams.length) * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {Math.round(((currentIndex + 1) / diagrams.length) * 100)}%
              </span>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={goToFirst}
                disabled={diagrams.length <= 1 || currentIndex === 0}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'
                }`}
                title="First diagram (Home)"
              >
                <span className="text-sm">⏮</span>
              </button>
              <button
                onClick={goToPrevious}
                disabled={diagrams.length <= 1}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                title="Previous diagram (←)"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                disabled={diagrams.length <= 1}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                title="Next diagram (→)"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={goToLast}
                disabled={diagrams.length <= 1 || currentIndex === diagrams.length - 1}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700'
                }`}
                title="Last diagram (End)"
              >
                <span className="text-sm">⏭</span>
              </button>
            </div>
          </div>
        </div>

        {/* Diagram Display */}
        <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {isGridView ? (
            /* Grid View */
            <div className="flex-1 p-6 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagrams.map((diagram, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                      currentIndex === index
                        ? 'border-blue-500 shadow-lg'
                        : isDarkMode
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-800'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsGridView(false);
                    }}
                  >
                    <div className="mb-3">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Diagram {index + 1}
                      </span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                        {diagram.code.includes('sequenceDiagram') ? 'Sequence' :
                         diagram.code.includes('erDiagram') ? 'ER Diagram' :
                         diagram.code.includes('graph') ? 'Flowchart' : 'Diagram'}
                      </span>
                    </div>
                    <div
                      id={`grid-${diagram.id}`}
                      className="h-48 flex items-center justify-center border rounded bg-gray-50 overflow-hidden"
                    >
                      <div className="text-gray-400 text-sm">Loading preview...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Single Diagram View */
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
              <div className="flex items-center justify-center" style={{ minHeight: '100%', minWidth: '100%' }}>
                <div
                  id={diagrams[currentIndex].id}
                  className="text-center"
                >
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Rendering diagram...
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Strip - Only in single view mode */}
          {!isGridView && diagramThumbnails.length > 1 && (
            <div className={`border-t px-4 py-3 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex space-x-2 overflow-x-auto">
                {diagramThumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 p-2 rounded-lg border transition-all ${
                      currentIndex === index
                        ? 'border-blue-500 bg-blue-50'
                        : isDarkMode
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                    title={`Go to diagram ${index + 1}`}
                  >
                    <div className="w-16 h-12 flex items-center justify-center">
                      {thumb.svg ? (
                        <div
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: thumb.svg }}
                          style={{ transform: 'scale(0.3)', transformOrigin: 'center center' }}
                        />
                      ) : (
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`border-t px-6 py-3 text-center text-sm ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-gray-400'
            : 'bg-white border-gray-200 text-gray-600'
        }`}>
          {isGridView
            ? 'Click any diagram to view it • Press ESC to return to editor'
            : 'Use ← → arrow keys to navigate • Home/End for first/last • Click thumbnails to jump • Press ESC to return to editor'
          }
        </div>
      </div>
    );
  }

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

            {/* Theme Controls - Only Dark Mode Toggle for Editor */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
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

          {/* Input Section */}
          <div className="space-y-4">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : isDarkMode
                    ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <Upload size={48} className={`${
                  isDragging ? 'text-blue-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <div>
                  <p className={`text-lg font-medium ${
                    isDragging ? 'text-blue-700' : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {isDragging ? 'Drop your file here' : 'Drop markdown file here or click to browse'}
                  </p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Supports .md and .txt files
                  </p>
                </div>
                <input
                  type="file"
                  accept=".md,.txt,.markdown"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="fileInput"
                />
                <div className="flex space-x-3">
                  <label
                    htmlFor="fileInput"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                  <button
                    onClick={loadSample}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Load Sample
                  </button>
                </div>
              </div>
            </div>

            {/* Current File Indicator */}
            {fileName && (
              <div className={`flex items-center space-x-2 text-sm px-3 py-2 rounded-lg ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-700'
                  : 'text-gray-600 bg-gray-50'
              }`}>
                <FileText size={16} />
                <span>Current file: <strong>{fileName}</strong></span>
              </div>
            )}

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
                  onClick={() => setIsViewMode(true)}
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

export default MermaidSlides;
