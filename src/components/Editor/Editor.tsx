import React, { useState, useEffect } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { LegalFooter } from '../Legal';
import { sampleMarkdown } from '../../utils/sampleData';
import { useDiagramParser } from '../../hooks/useDiagramParser';
import { parseMermaidDiagrams } from '../../utils/mermaidParser';
import { EditorHeader } from './EditorComponents/EditorHeader';
import { MarkdownTextarea } from './EditorComponents/MarkdownTextarea';
import { StatusMessages } from './EditorComponents/StatusMessages';
import { Instructions } from './EditorComponents/Instructions';
import { EditorProps } from '../../types/components';

/** Long enough to skip intermediate keystrokes, short enough to feel instant. */
const PARSE_DEBOUNCE_MS = 200;

export const Editor: React.FC<EditorProps> = ({ onViewDiagrams }) => {
  const [markdownText, setMarkdownText] = useState<string>('');
  // Only `error` is consumed now: the parsed result drives the status message
  // while typing, while presenting parses fresh from the current text.
  const { error, processDiagrams } = useDiagramParser();

  const handleFileLoad = (content: string): void => {
    setMarkdownText(content);
  };

  const loadSample = (): void => {
    setMarkdownText(sampleMarkdown);
  };

  // Parse on demand rather than trusting the debounced effect below to have
  // caught up. Pasting and immediately clicking used to read a `diagrams` array
  // from the render still in flight — an empty one — and App requires a
  // non-empty deck to switch views, so the click did nothing at all, with no
  // message and no state change.
  const handleViewDiagrams = (): void => {
    onViewDiagrams(parseMermaidDiagrams(markdownText));
  };

  const handleClear = (): void => {
    setMarkdownText('');
  };

  // Parsing every keystroke is wasted work on a long document; the result is
  // only needed to drive the error message while typing. The debounce is short
  // enough to feel immediate and long enough to skip most intermediate states.
  useEffect(() => {
    if (!markdownText.trim()) {
      return undefined;
    }

    const timer = setTimeout(() => {
      processDiagrams(markdownText);
    }, PARSE_DEBOUNCE_MS);

    return () => clearTimeout(timer);
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
