import { useState } from 'react';
import { parseMermaidDiagrams } from '../utils/mermaidParser';
import { Diagram } from '../types/diagram';

interface UseDiagramParserReturn {
  diagrams: Diagram[];
  error: string;
  isProcessing: boolean;
  processDiagrams: (_markdownText: string) => Promise<void>;
  clearDiagrams: () => void;
}

export const useDiagramParser = (): UseDiagramParserReturn => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const processDiagrams = async (markdownText: string): Promise<void> => {
    if (!markdownText.trim()) {
      setDiagrams([]);
      setError('');
      return;
    }

    setIsProcessing(true);
    try {
      const extractedDiagrams = parseMermaidDiagrams(markdownText);

      if (extractedDiagrams.length === 0) {
        setError('No mermaid diagrams or images found in the markdown text.');
        setDiagrams([]);
        return;
      }

      setDiagrams(extractedDiagrams);
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Error parsing markdown: ' + errorMessage);
      setDiagrams([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearDiagrams = (): void => {
    setDiagrams([]);
    setError('');
  };

  return {
    diagrams,
    error,
    isProcessing,
    processDiagrams,
    clearDiagrams
  };
};