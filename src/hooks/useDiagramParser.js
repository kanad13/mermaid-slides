import { useState } from 'react';
import { parseMermaidDiagrams } from '../utils/mermaidParser';

export const useDiagramParser = () => {
  const [diagrams, setDiagrams] = useState([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processDiagrams = async (markdownText) => {
    if (!markdownText.trim()) {
      setDiagrams([]);
      setError('');
      return;
    }

    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const clearDiagrams = () => {
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