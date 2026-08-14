import React, { useState, useEffect } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { LegalFooter } from '../Legal';
import { sampleMarkdown } from '../../utils/sampleData';
import { useDiagramParser } from '../../hooks/useDiagramParser';
import { useFileHandler } from '../../hooks/useFileHandler';
import { EditorHeader } from './EditorComponents/EditorHeader';
import { MarkdownTextarea } from './EditorComponents/MarkdownTextarea';
import { StatusMessages } from './EditorComponents/StatusMessages';
import { Instructions } from './EditorComponents/Instructions';
import { EditorProps } from '../../types/components';

export const Editor: React.FC<EditorProps> = ({ onViewDiagrams }) => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const { setFileName } = useFileHandler();
  const { diagrams, error, processDiagrams } = useDiagramParser();

  const handleFileLoad = (content: string, name: string): void => {
    setMarkdownText(content);
    setFileName(name);
  };

  const loadSample = (): void => {
    setMarkdownText(sampleMarkdown);
    setFileName('Sample Document');
  };

  const handleViewDiagrams = (): void => {
    onViewDiagrams(diagrams);
  };

  const handleClear = (): void => {
    setMarkdownText('');
    setFileName('');
  };

  // Auto-process diagrams when markdown content changes
  useEffect(() => {
    if (markdownText.trim()) {
      processDiagrams(markdownText);
    }
  }, [markdownText, processDiagrams]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <EditorHeader />

          <div className="space-y-4">
            <FileUpload
              onFileLoad={handleFileLoad}
              onLoadSample={loadSample}
              onViewDiagrams={handleViewDiagrams}
              onClear={handleClear}
              hasMarkdown={markdownText.trim().length > 0}
            />

            <MarkdownTextarea
              markdownText={markdownText}
              onTextChange={setMarkdownText}
            />
          </div>

          <StatusMessages error={error} />

          <Instructions />
        </div>

        <LegalFooter />
      </div>
    </div>
  );
};
