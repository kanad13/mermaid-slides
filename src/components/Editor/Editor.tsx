import React, { useState } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { sampleMarkdown } from '../../utils/sampleData';
import { useDiagramParser } from '../../hooks/useDiagramParser';
import { useFileHandler } from '../../hooks/useFileHandler';
import { EditorHeader } from './EditorComponents/EditorHeader';
import { MarkdownTextarea } from './EditorComponents/MarkdownTextarea';
import { ActionButtons } from './EditorComponents/ActionButtons';
import { StatusMessages } from './EditorComponents/StatusMessages';
import { Instructions } from './EditorComponents/Instructions';
import { Diagram } from '../../types/diagram';

interface EditorProps {
  onViewDiagrams: (diagrams: Diagram[]) => void;
  isDarkMode: boolean;
}

export const Editor: React.FC<EditorProps> = ({ 
  onViewDiagrams,
  isDarkMode
}) => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const { fileName, setFileName } = useFileHandler();
  const { diagrams, error, processDiagrams } = useDiagramParser();

  const handleFileLoad = (content: string, name: string): void => {
    setMarkdownText(content);
    setFileName(name);
  };

  const loadSample = (): void => {
    setMarkdownText(sampleMarkdown);
    setFileName('Sample Document');
  };

  const handleProcessDiagrams = (): void => {
    processDiagrams(markdownText);
  };

  const handleViewDiagrams = (): void => {
    onViewDiagrams(diagrams);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <EditorHeader isDarkMode={isDarkMode} />

          <div className="space-y-4">
            <FileUpload
              onFileLoad={handleFileLoad}
              fileName={fileName}
              isDarkMode={isDarkMode}
              onLoadSample={loadSample}
            />

            <MarkdownTextarea 
              markdownText={markdownText}
              onTextChange={setMarkdownText}
              isDarkMode={isDarkMode}
            />

            <ActionButtons 
              onProcessDiagrams={handleProcessDiagrams}
              onViewDiagrams={handleViewDiagrams}
              diagramsCount={diagrams.length}
            />
          </div>

          <StatusMessages 
            error={error}
            diagramsCount={diagrams.length}
            isDarkMode={isDarkMode}
          />

          <Instructions isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};