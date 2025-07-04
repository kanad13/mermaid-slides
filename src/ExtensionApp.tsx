import React, { useState, useEffect } from 'react';
import { Viewer } from './components/Viewer/Viewer';
import { useDiagramParser } from './hooks/useDiagramParser';
import { Diagram } from './types/diagram';

// VS Code API interface
interface VSCodeAPI {
  postMessage: (message: any) => void;
  setState: (state: any) => void;
  getState: () => any;
}

declare global {
  interface Window {
    acquireVsCodeApi: () => VSCodeAPI;
    vscodeApi: VSCodeAPI;
  }
}

export default function ExtensionApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { diagrams, error, processDiagrams, isProcessing } = useDiagramParser();

  useEffect(() => {
    // Get VS Code API from global window object
    const vscode = window.vscodeApi;
    
    if (!vscode) {
      // Fallback for development/testing
      console.error('VS Code API not available - running in development mode');
      setIsLoading(false);
      return;
    }

    // Listen for messages from VS Code extension
    const handleMessage = async (event: MessageEvent) => {
      const message = event.data;
      
      switch (message.type) {
        case 'loadContent':
          try {
            setIsLoading(true);
            const markdownContent = message.content;
            console.log('ExtensionApp: Received content:', markdownContent.substring(0, 200) + '...');
            await processDiagrams(markdownContent);
            console.log('ExtensionApp: Processed diagrams, count:', diagrams.length);
            setIsLoading(false);
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log('ExtensionApp: Error processing diagrams:', errorMessage);
            vscode.postMessage({ type: 'error', text: errorMessage });
            setIsLoading(false);
          }
          break;
          
        case 'refresh':
          // Refresh the component
          window.location.reload();
          break;
          
        case 'theme':
          setIsDarkMode(message.isDark);
          break;
          
        default:
          break;
      }
    };

    // Add message listener
    window.addEventListener('message', handleMessage);

    // Detect VS Code theme
    const body = document.body;
    const computedStyle = getComputedStyle(body);
    const bgColor = computedStyle.backgroundColor;
    
    // Simple heuristic to detect dark theme
    const isDark = bgColor.includes('rgb') && 
      bgColor.match(/\d+/g)?.map(Number).reduce((a, b) => a + b, 0) < 300;
    setIsDarkMode(isDark);

    // Signal ready to VS Code
    vscode.postMessage({ type: 'ready' });

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [processDiagrams]);

  const handleBackToEditor = () => {
    // In extension context, focus back to the editor
    const vscode = window.vscodeApi;
    if (vscode) {
      console.log('ExtensionApp: Sending focusEditor message');
      vscode.postMessage({ type: 'focusEditor' });
    } else {
      console.log('ExtensionApp: No vscode API available');
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading Mermaid Slides...</p>
          {isProcessing && <p className="text-sm opacity-70">Processing diagrams...</p>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-sm opacity-70">{error}</p>
          <div className="mt-4 text-xs opacity-50">
            <p>Make sure your markdown file contains mermaid diagrams like:</p>
            <pre className="mt-2 text-left bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {`\`\`\`mermaid
graph TD
    A[Start] --> B[End]
\`\`\``}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  if (diagrams.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <p className="text-lg mb-2">No diagrams to display</p>
          <p className="text-sm opacity-70">Open a markdown file with mermaid diagrams and click the preview button</p>
        </div>
      </div>
    );
  }

  return (
    <Viewer
      diagrams={diagrams}
      onBackToEditor={handleBackToEditor}
      isDarkMode={isDarkMode}
      isExtensionMode={true}
    />
  );
}